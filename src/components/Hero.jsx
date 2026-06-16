import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { handleNavClick } from '../router'

const metrics = [
  { value: '25+',    label: 'anos no setor óptico' },
  { value: '5.000+', label: 'lojas atendidas' },
  { value: '100mi+', label: 'transações por mês' },
  { value: '92%',    label: 'SLA de suporte' },
]

const flowItems = [
  { label: 'Vendas', tone: 'teal' },
  { label: 'Estoque', tone: 'amber' },
  { label: 'Clientes', tone: 'green' },
  { label: 'BI', tone: 'blue' },
]

const logos = ['Essilor.png', 'Zeiss.png', 'Diniz.png']
const tickerItems = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos]

const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  size:  2 + Math.random() * 3,
  x:     Math.random() * 100,
  y:     Math.random() * 100,
  dur:   8 + Math.random() * 16,
  delay: Math.random() * 12,
  drift: (Math.random() - 0.5) * 120,
}))

export default function Hero() {
  const metricRefs  = useRef([])
  const tickerRef   = useRef(null)
  const tween       = useRef(null)
  const heroRef     = useRef(null)
  const panelRef    = useRef(null)
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const trustRef    = useRef(null)
  const actionsRef  = useRef(null)
  const eyebrowRef  = useRef(null)
  const hlValueRef  = useRef(null)
  const chartPathRef = useRef(null)

  const [panelHovered, setPanelHovered] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      // Skip motion entirely — content is visible at rest; just pin final values.
      if (hlValueRef.current) hlValueRef.current.textContent = '+40%'
      return
    }

    let ctx

    const play = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 })

        tl.fromTo(eyebrowRef.current,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'back.out(2)' }
        )
        .fromTo(titleRef.current?.querySelectorAll('.hero__title-line'),
          { y: 48, opacity: 0, skewY: 3, filter: 'blur(6px)' },
          {
            y: 0, opacity: 1, skewY: 0, filter: 'blur(0px)',
            duration: 0.7, stagger: 0.12, ease: 'power3.out', clearProps: 'filter',
          },
          '-=0.25'
        )
        .fromTo(subtitleRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(trustRef.current,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
          '-=0.25'
        )
        .fromTo(actionsRef.current?.querySelectorAll('a'),
          { y: 16, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: 'back.out(2)' },
          '-=0.2'
        )
        .fromTo(panelRef.current,
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          '-=0.6'
        )

        const path = chartPathRef.current
        if (path) {
          const len = path.getTotalLength?.() || 180
          gsap.fromTo(path,
            { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out', delay: 1.1 }
          )
        }

        const targets = [25, 100, 5000, 92]
        const formats = [
          (n) => `${n}+`,
          (n) => `${n}mi+`,
          (n) => `${n.toLocaleString('pt-BR')}+`,
          (n) => `${n}%`,
        ]
        metricRefs.current.forEach((el, i) => {
          if (!el) return
          const obj = { val: 0 }
          gsap.to(obj, {
            val: targets[i],
            duration: 1.8,
            delay: 0.9 + i * 0.12,
            ease: 'power2.out',
            onUpdate() { el.textContent = formats[i](Math.round(obj.val)) },
          })
        })

        if (hlValueRef.current) {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: 40,
            duration: 1.6,
            delay: 1.0,
            ease: 'power2.out',
            onUpdate() {
              if (hlValueRef.current)
                hlValueRef.current.textContent = `+${Math.round(obj.val)}%`
            },
          })
        }
      }, heroRef)
    }

    // While the splash is covering the page, hold the entrance so the
    // orchestration is actually seen after the wipe.
    if (document.querySelector('.splash')) {
      window.addEventListener('dw:splash-done', play, { once: true })
    } else {
      play()
    }

    return () => {
      window.removeEventListener('dw:splash-done', play)
      ctx?.revert()
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    requestAnimationFrame(() => {
      const track = tickerRef.current
      if (!track) return
      const halfW = track.scrollWidth / 2
      tween.current = gsap.to(track, {
        x: -halfW,
        duration: 24,
        ease: 'none',
        repeat: -1,
        onRepeat() { gsap.set(track, { x: 0 }) },
      })
    })
    return () => { tween.current?.kill() }
  }, [])

  const handlePanelMove = (e) => {
    if (!panelRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = panelRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const rx = ((e.clientY - cy) / rect.height) * 6
    const ry = ((e.clientX - cx) / rect.width)  * -6
    gsap.to(panelRef.current, {
      rotateX: rx, rotateY: ry,
      transformPerspective: 900,
      duration: 0.5, ease: 'power2.out',
    })
  }
  const handlePanelLeave = () => {
    gsap.to(panelRef.current, {
      rotateX: 0, rotateY: 0,
      duration: 0.7, ease: 'elastic.out(1, 0.4)',
    })
    setPanelHovered(false)
  }

  const handleBtnClick = (e) => {
    const btn = e.currentTarget
    const ripple = document.createElement('span')
    const rect = btn.getBoundingClientRect()
    ripple.className = 'btn-ripple'
    ripple.style.left = `${e.clientX - rect.left}px`
    ripple.style.top  = `${e.clientY - rect.top}px`
    btn.appendChild(ripple)
    setTimeout(() => ripple.remove(), 600)
  }

  return (
    <section className="hero" id="hero" ref={heroRef}>

      <div className="hero__bg">
        <video className="hero__video" autoPlay loop muted playsInline>
          <source src="/assets/sistemagestao.mov" type="video/mp4" />
        </video>
        <div className="hero__overlay" />
      </div>

      <div className="hero__particles" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="hero__particle"
            style={{
              width:  p.size,
              height: p.size,
              left:   `${p.x}%`,
              top:    `${p.y}%`,
              animationDuration:  `${p.dur}s`,
              animationDelay:     `-${p.delay}s`,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}
      </div>

      <div className="container hero__container">

        <div className="hero__left">

          <div className="hero__eyebrow" ref={eyebrowRef}>
            <span className="hero__eyebrow-dot" />
            Plataforma Dataweb para o universo óptico
          </div>

          <h1 className="hero__title" ref={titleRef}>
            <span className="hero__title-line">Tecnologia que</span>
            <span className="hero__title-line">conecta todo o</span>
            <span className="hero__title-line">
              <span className="hero__title-accent">universo óptico.</span>
            </span>
          </h1>

          <p className="hero__subtitle" ref={subtitleRef}>
            ERP, CRM, BI e aplicativos conectados para organizar a operação,
            aproximar clientes e transformar dados em decisões comerciais.
          </p>

          <nav className="hero__trust" ref={trustRef} aria-label="Diferenciais">
            <span className="hero__trust-item">
              <span className="hero__trust-dot" />
              ERP, CRM e BI integrados
            </span>
            <span className="hero__trust-divider" aria-hidden="true" />
            <span className="hero__trust-item">
              <span className="hero__trust-dot" />
              Dados em nuvem
            </span>
            <span className="hero__trust-divider" aria-hidden="true" />
            <span className="hero__trust-item">
              <span className="hero__trust-dot" />
              Suporte e implantação próximos
            </span>
          </nav>

          <div className="hero__actions" ref={actionsRef}>
            <a
              href="/sou-loja"
              className="btn btn--hero-white"
              onClick={(e) => { handleBtnClick(e); handleNavClick(e, '/sou-loja') }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M2 6l1-3.5h9L13 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.5 6h12v6.5a1 1 0 01-1 1h-10a1 1 0 01-1-1V6z" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M5.5 13.5v-3.5h4v3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Sou loja
            </a>
            <a
              href="/sou-laboratorio"
              className="btn btn--hero-ghost"
              onClick={(e) => { handleBtnClick(e); handleNavClick(e, '/sou-laboratorio') }}
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1 13.5V7l3.5-2.5V7L8 4.5V7l3.5-2.5v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 13.5h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <rect x="5.5" y="10" width="2" height="3.5" rx="0.4" stroke="currentColor" strokeWidth="1.1"/>
                <rect x="9" y="9" width="2.5" height="1.5" rx="0.4" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M12 2v2.5M13.5 3.5H10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Sou laboratório
            </a>
          </div>
        </div>

        <div
          className={`hero__panel${panelHovered ? ' hero__panel--hovered' : ''}`}
          ref={panelRef}
          onMouseMove={handlePanelMove}
          onMouseEnter={() => setPanelHovered(true)}
          onMouseLeave={handlePanelLeave}
          aria-hidden="true"
        >
          <div className="hero__panel-feature">
            <div className="hero__panel-feature-head">
              <span className="hero__panel-feature-label">Visibilidade da gestão</span>
              <span className="hero__panel-feature-trend">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 8.5L5 5l2.2 2L10 3M10 3H7M10 3v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                +12 meses
              </span>
            </div>

            <div className="hero__panel-feature-row">
              <span className="hero__panel-feature-value" ref={hlValueRef}>+0%</span>
              <span className="hero__panel-feature-sub">mais clareza sobre vendas,<br />estoque e clientes</span>
            </div>

            <div className="hero__panel-chart" aria-hidden="true">
              <svg viewBox="0 0 320 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="320" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFD060"/>
                    <stop offset="100%" stopColor="#FFAE00"/>
                  </linearGradient>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="88" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFAE00" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#FFAE00" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <polygon
                  points="0,70 64,56 128,60 192,36 256,24 320,9 320,88 0,88"
                  fill="url(#ag)"
                />
                <polyline
                  ref={chartPathRef}
                  points="0,70 64,56 128,60 192,36 256,24 320,9"
                  stroke="url(#cg)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="320" cy="9" r="4" fill="#FFAE00">
                  <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="1;0.55;1" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>
          </div>

          <div className="hero__panel-flow" aria-hidden="true">
            {flowItems.map((item) => (
              <span className={`hero__panel-flow-item hero__panel-flow-item--${item.tone}`} key={item.label}>
                {item.label}
              </span>
            ))}
          </div>

          <div className="hero__panel-stats">
            {metrics.map((m, i) => (
              <div className="hero__panel-stat" key={i}>
                <span className="hero__panel-stat-tick" aria-hidden="true" />
                <span
                  className="hero__panel-stat-value"
                  ref={(el) => (metricRefs.current[i] = el)}
                >
                  {m.value}
                </span>
                <span className="hero__panel-stat-label">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="hero__panel-trust">
            <span className="hero__panel-trust-icon">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 7l2.5 2.5L11 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            Implantação e migração acompanhadas de perto
          </div>
        </div>

      </div>

      <div className="hero__ticker-bar" aria-hidden="true">
        <span className="hero__ticker-label">Marcas que fazem parte da rotina óptica</span>
        <div className="hero__ticker-viewport">
          <div className="hero__ticker-track" ref={tickerRef}>
            {tickerItems.map((file, i) => (
              <div className="hero__ticker-item" key={i}>
                <img
                  src={`/assets/logos/${file}`}
                  alt={file.replace('.png', '')}
                  draggable="false"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
