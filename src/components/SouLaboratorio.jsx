import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/SouLaboratorio.css'
import { handleNavClick } from '../router'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Conteúdo
───────────────────────────────────────────────────────── */
const PIPELINE_STAGES = [
  { stage: 'Recebimento',  count: 12, sla: '4 min',  fill: 0.18, tone: 'teal'  },
  { stage: 'Surfaçagem',   count: 38, sla: '22 min', fill: 0.74, tone: 'teal'  },
  { stage: 'Montagem',     count: 52, sla: '18 min', fill: 0.94, tone: 'amber' },
  { stage: 'Conferência',  count: 24, sla: '6 min',  fill: 0.42, tone: 'teal'  },
  { stage: 'Expedição',    count: 8,  sla: '3 min',  fill: 0.12, tone: 'green' },
]

const PAINS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7 10h4M7 14h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="17" cy="12" r="2.2" fill="#00A0B1" opacity="0.7"/>
        <path d="M3 5l3-2h12l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pedidos descentralizados',
    desc: 'Solicitações vindas por canais diferentes dificultam controle, prioridade e acompanhamento.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 12h4l3-7 4 14 3-7h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Falta de rastreabilidade na produção',
    desc: 'Sem visibilidade por etapa, fica difícil entender status, gargalos e atrasos.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 11h6l2-3 2 6 2-3h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 16c2 1 4 1 6 0M13 16c2 1 4 1 6 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    title: 'Comunicação fragmentada com óticas',
    desc: 'Atualizações manuais geram ruído, retrabalho e perda de informação.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M12 7v5l3.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M19 5l1 1M5 19l-1 1" stroke="#00A0B1" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Dificuldade para acompanhar prazos',
    desc: 'Sem indicadores claros, a gestão perde previsibilidade sobre entregas.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="10" y="6" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="17" y="9" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 3l4 3M22 3l-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      </svg>
    ),
    title: 'Baixa visibilidade de indicadores',
    desc: 'Produção, volume, desempenho e oportunidades ficam dispersos ou pouco acessíveis.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
        <rect x="6" y="3" width="12" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M9 8h6M9 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="15" cy="16" r="2" fill="#FBB040" opacity="0.7"/>
      </svg>
    ),
    title: 'Retrabalho operacional',
    desc: 'Processos manuais aumentam erros, conferências e tempo gasto pela equipe.',
  },
]

const SOLUTIONS = [
  {
    name: 'Gestão de pedidos',
    color: '#00A0B1',
    desc: 'Centralize solicitações, acompanhe status, organize prioridades e reduza falhas na comunicação.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="17" rx="2" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M7 9h10M7 13h7M7 17h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="17" r="2.2" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="1.3"/>
      </svg>
    ),
  },
  {
    name: 'Controle de produção',
    color: '#1FB3B0',
    desc: 'Visualize etapas, prazos, gargalos e andamento dos serviços com mais clareza operacional.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="18" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="12" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8.5 6h7M16 8l-3.5 8M8 8l3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Integração com óticas',
    color: '#3DC9D3',
    desc: 'Melhore o relacionamento com lojas parceiras, reduza retrabalho e mantenha informações conectadas.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <circle cx="17" cy="12" r="3" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M10 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M2 6l3 2M22 6l-3 2M2 18l3-2M22 18l-3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    name: 'Indicadores e BI',
    color: '#FBB040',
    desc: 'Acompanhe produtividade, volume, prazos, desempenho e oportunidades em uma visão gerencial.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="10" y="9" width="4" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="17" y="3" width="4" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    ),
  },
  {
    name: 'CRM e relacionamento',
    color: '#6C63FF',
    desc: 'Organize clientes, histórico comercial, relacionamento com óticas e oportunidades de crescimento.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M2 21c0-4.418 3.134-7 7-7s7 2.582 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M16 3.5a4 4 0 010 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: 'Apps e mobilidade',
    color: '#A6CE39',
    desc: 'Leve processos importantes para a rotina operacional de forma simples, prática e conectada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M9 6h6M9 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
]

const FLOW_STEPS = [
  { num: '01', title: 'Recebimento do pedido',     desc: 'Solicitação registrada no momento em que a ótica envia.' },
  { num: '02', title: 'Registro no sistema',       desc: 'Receita, medidas e dados do cliente entram no fluxo.' },
  { num: '03', title: 'Acompanhamento da produção', desc: 'Cada etapa rastreada com status e responsável.' },
  { num: '04', title: 'Atualização de status',     desc: 'Mudanças refletidas em tempo real para todas as áreas.' },
  { num: '05', title: 'Comunicação com a ótica',   desc: 'Atualizações automáticas reduzem ruído e ligações.' },
  { num: '06', title: 'Indicadores de desempenho', desc: 'Produtividade e prazos visíveis para gestores.' },
  { num: '07', title: 'Entrega com mais controle', desc: 'Expedição registrada e ótica avisada do envio.' },
]

const ECOSYSTEM = [
  {
    key: 'ERP',
    title: 'ERP',
    desc: 'Base para organizar processos, pedidos, cadastros e rotinas administrativas.',
    color: '#00A0B1',
  },
  {
    key: 'CRM',
    title: 'CRM',
    desc: 'Relacionamento com óticas, histórico comercial e acompanhamento de oportunidades.',
    color: '#6C63FF',
  },
  {
    key: 'BI',
    title: 'BI',
    desc: 'Indicadores para analisar produtividade, volume, prazos e desempenho.',
    color: '#f5c518',
  },
  {
    key: 'Apps',
    title: 'Apps',
    desc: 'Ferramentas conectadas para agilizar rotinas operacionais e melhorar mobilidade.',
    color: '#A6CE39',
  },
  {
    key: 'Gestão',
    title: 'Gestão completa',
    desc: 'Visão integrada para tomar decisões com mais segurança e previsibilidade.',
    color: '#FBB040',
  },
]

const BENEFITS = [
  { title: 'Redução de falhas operacionais', desc: 'Menos informações perdidas, menos retrabalho e mais segurança no fluxo de pedidos.' },
  { title: 'Melhor acompanhamento de pedidos', desc: 'Status, prioridades e etapas mais visíveis para a equipe e para a gestão.' },
  { title: 'Maior controle sobre prazos', desc: 'Acompanhe entregas, gargalos e atrasos com mais clareza operacional.' },
  { title: 'Mais clareza sobre a produção', desc: 'Visualize o andamento dos serviços e entenda melhor a capacidade da operação.' },
  { title: 'Integração com óticas', desc: 'Melhore a comunicação com lojas parceiras e reduza ruídos no relacionamento.' },
  { title: 'Visão gerencial com indicadores', desc: 'Acesse dados estratégicos para acompanhar produtividade, volume e desempenho.' },
  { title: 'Operação mais escalável', desc: 'Crie processos mais organizados para sustentar o crescimento do laboratório.' },
  { title: 'Decisão baseada em dados', desc: 'Substitua achismos por informações claras e conectadas ao dia a dia da operação.' },
]

const VALUE_PROOFS = [
  'Pedidos centralizados',
  'Produção acompanhada',
  'Prazos mais visíveis',
  'Indicadores conectados',
  'Óticas melhor atendidas',
]

/* ─────────────────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────────────────── */
export default function SouLaboratorio() {
  const rootRef = useRef(null)
  const heroRef = useRef(null)
  const heroCardRef = useRef(null)
  const stageRefs = useRef([])

  const painsSecRef = useRef(null)
  const painsRefs = useRef([])

  const solSecRef = useRef(null)
  const solRefs = useRef([])

  const flowSecRef = useRef(null)
  const flowRefs = useRef([])

  const ecoSecRef = useRef(null)
  const ecoRefs = useRef([])

  const benSecRef = useRef(null)
  const benRefs = useRef([])

  const proofSecRef = useRef(null)
  const ctaSecRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      /* HERO */
      const heroEls = heroRef.current?.querySelectorAll('[data-anim="hero"]')
      gsap.fromTo(heroEls,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out' }
      )
      const titleLines = heroRef.current?.querySelectorAll('.lab-hero__title-line')
      if (titleLines?.length) {
        gsap.fromTo(titleLines,
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power4.out', delay: 0.1 }
        )
      }
      gsap.fromTo(heroCardRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.3 }
      )
      stageRefs.current.forEach((el, i) => {
        if (!el) return
        const bar = el.querySelector('.lab-card__bar-fill')
        const target = PIPELINE_STAGES[i].fill
        if (bar) {
          gsap.fromTo(bar,
            { scaleX: 0 },
            { scaleX: target, duration: 1.2, ease: 'power3.out', delay: 0.7 + i * 0.1 }
          )
        }
      })

      /* PAINS */
      gsap.fromTo(painsRefs.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: painsSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* SOLUTIONS */
      gsap.fromTo(solRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: solSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* FLOW */
      gsap.fromTo(flowRefs.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: flowSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* ECOSYSTEM */
      gsap.fromTo(ecoRefs.current,
        { y: 32, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(1.4)',
          clearProps: 'transform',
          scrollTrigger: { trigger: ecoSecRef.current, start: 'top 75%', once: true },
        }
      )

      /* BENEFITS */
      gsap.fromTo(benRefs.current,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: benSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* VALUE PROOF + CTA */
      gsap.fromTo(proofSecRef.current?.querySelector('.lab-proof__inner'),
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: proofSecRef.current, start: 'top 82%', once: true },
        }
      )
      gsap.fromTo(ctaSecRef.current?.querySelector('.lab-cta__card'),
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: ctaSecRef.current, start: 'top 82%', once: true },
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="sou-laboratorio" ref={rootRef}>

      {/* ════════════════════════════════════════════
          HERO — editorial split, paleta teal
          ════════════════════════════════════════════ */}
      <section className="lab-hero" ref={heroRef}>
        <div className="lab-hero__bg" aria-hidden="true">
          <div className="lab-hero__grid" />
          <div className="lab-hero__halo" />
        </div>

        <div className="container lab-hero__container">

          <div className="lab-hero__topbar" data-anim="hero">
            <nav className="lab-crumb" aria-label="Navegação">
              <a href="/" onClick={(e) => handleNavClick(e, '/')} className="lab-crumb__link">Início</a>
              <span className="lab-crumb__sep" aria-hidden="true">/</span>
              <span className="lab-crumb__current">Sou Laboratório</span>
            </nav>
            <div className="lab-hero__meta">
              <span className="lab-hero__meta-dot" />
              <span className="lab-hero__meta-mono">LABORATÓRIOS · BRASIL</span>
            </div>
          </div>

          <div className="lab-hero__split">

            <div className="lab-hero__lead">
              <span className="lab-hero__kicker" data-anim="hero">
                <span className="lab-hero__kicker-num">02</span>
                <span className="lab-hero__kicker-bar" />
                <span className="lab-hero__kicker-text">Plataforma para laboratórios</span>
              </span>

              <h1 className="lab-hero__title" data-anim="hero">
                <span className="lab-hero__title-line">Produção, pedidos</span>
                <span className="lab-hero__title-line">e óticas</span>
                <span className="lab-hero__title-line">
                  <span className="lab-hero__title-accent">em um só ecossistema.</span>
                </span>
              </h1>

              <p className="lab-hero__subtitle" data-anim="hero">
                A Dataweb ajuda laboratórios ópticos a centralizar a gestão, acompanhar a operação
                em tempo real e integrar melhor sua relação com óticas, equipes e processos internos.
              </p>

              <div className="lab-hero__actions" data-anim="hero">
                <a
                  href="#contato-lab"
                  className="lab-btn lab-btn--primary lab-btn--lg"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contato-lab')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Falar com especialista
                  <ArrowIcon />
                </a>
                <a
                  href="#solucoes-lab"
                  className="lab-btn lab-btn--ghost lab-btn--lg"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('solucoes-lab')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Conhecer soluções para laboratório
                </a>
              </div>
            </div>

            {/* Pipeline card — RIGHT */}
            <div className="lab-hero__card" ref={heroCardRef} aria-hidden="true">
              <div className="lab-hero__card-frame">
                <div className="lab-card__head">
                  <div className="lab-card__title">
                    <span className="lab-card__live">
                      <span className="lab-card__live-dot" />
                      EM PRODUÇÃO
                    </span>
                    <span className="lab-card__name">Pipeline · Turno A</span>
                  </div>
                  <span className="lab-card__time">14:32</span>
                </div>

                <div className="lab-card__headline">
                  <div className="lab-card__headline-top">
                    <span className="lab-card__label">Pedidos em produção</span>
                    <span className="lab-card__delta">▲ 24 hoje</span>
                  </div>
                  <span className="lab-card__value">
                    247 <span className="lab-card__value-sub">/ 312</span>
                  </span>
                  <div className="lab-card__progress">
                    <span className="lab-card__progress-fill" style={{ width: '79%' }} />
                  </div>
                  <div className="lab-card__progress-info">
                    <span>79% da capacidade do dia</span>
                    <span className="lab-card__progress-status">no prazo</span>
                  </div>
                </div>

                <div className="lab-card__stages">
                  {PIPELINE_STAGES.map((s, i) => (
                    <div
                      key={s.stage}
                      className={`lab-card__stage lab-card__stage--${s.tone}`}
                      ref={(el) => (stageRefs.current[i] = el)}
                    >
                      <div className="lab-card__stage-top">
                        <span className="lab-card__stage-name">{s.stage}</span>
                        <span className="lab-card__stage-count">{s.count}</span>
                      </div>
                      <div className="lab-card__bar">
                        <span className="lab-card__bar-fill" />
                      </div>
                      <span className="lab-card__stage-sla">~{s.sla}</span>
                    </div>
                  ))}
                </div>

                <div className="lab-card__foot">
                  <span className="lab-card__foot-pulse" />
                  <span>SLA médio · 18h</span>
                  <span className="lab-card__foot-sep">·</span>
                  <span>14 óticas conectadas</span>
                </div>
              </div>

              <span className="lab-card__mark lab-card__mark--tl" aria-hidden="true" />
              <span className="lab-card__mark lab-card__mark--tr" aria-hidden="true" />
              <span className="lab-card__mark lab-card__mark--bl" aria-hidden="true" />
              <span className="lab-card__mark lab-card__mark--br" aria-hidden="true" />
            </div>

          </div>

          <div className="lab-hero__strip" data-anim="hero">
            <div className="lab-hero__strip-item">
              <span className="lab-hero__strip-value">25+</span>
              <span className="lab-hero__strip-label">anos no setor óptico</span>
            </div>
            <span className="lab-hero__strip-sep" />
            <div className="lab-hero__strip-item">
              <span className="lab-hero__strip-value">+700</span>
              <span className="lab-hero__strip-label">laboratórios e parceiros</span>
            </div>
            <span className="lab-hero__strip-sep" />
            <div className="lab-hero__strip-item">
              <span className="lab-hero__strip-value">100mi+</span>
              <span className="lab-hero__strip-label">transações por mês</span>
            </div>
            <span className="lab-hero__strip-sep" />
            <div className="lab-hero__strip-item">
              <span className="lab-hero__strip-value">24/7</span>
              <span className="lab-hero__strip-label">dados em nuvem</span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          PAIN POINTS
          ════════════════════════════════════════════ */}
      <section className="section lab-pains section--light" ref={painsSecRef}>
        <div className="container">
          <div className="lab-section-head">
            <span className="section__tag lab-tag">
              <DotIcon /> Desafios operacionais
            </span>
            <h2 className="lab-section-title">
              Quando a operação cresce, controlar tudo manualmente deixa de ser sustentável.
            </h2>
            <p className="lab-section-sub">
              Pedidos chegando por canais diferentes, prazos difíceis de acompanhar, retrabalho na
              comunicação com óticas e indicadores espalhados tornam a rotina do laboratório mais
              lenta, vulnerável a erros e difícil de escalar.
            </p>
          </div>

          <div className="lab-pains__grid">
            {PAINS.map((p, i) => (
              <article
                key={i}
                className="lab-pain"
                ref={(el) => (painsRefs.current[i] = el)}
              >
                <div className="lab-pain__icon">{p.icon}</div>
                <h3 className="lab-pain__title">{p.title}</h3>
                <p className="lab-pain__desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SOLUTIONS
          ════════════════════════════════════════════ */}
      <section className="section section--dark lab-solutions" id="solucoes-lab" ref={solSecRef}>
        <div className="lab-solutions__bg" aria-hidden="true">
          <span className="lab-solutions__wash" />
          <span className="lab-solutions__grid" />
        </div>
        <div className="container">
          <div className="lab-section-head lab-section-head--dark">
            <span className="section__tag lab-tag lab-tag--dark">
              <DotIcon /> Gestão conectada
            </span>
            <h2 className="lab-section-title">
              Uma base tecnológica para controlar pedidos, produção e relacionamento.
            </h2>
            <p className="lab-section-sub">
              Com a Dataweb, o laboratório ganha uma estrutura integrada para organizar processos,
              acompanhar pedidos, conectar informações e tomar decisões com mais clareza.
            </p>
          </div>

          <div className="lab-solutions__grid-cards">
            {SOLUTIONS.map((s, i) => (
              <article
                key={s.name}
                className="lab-solution"
                style={{ '--lc': s.color }}
                ref={(el) => (solRefs.current[i] = el)}
              >
                <div className="lab-solution__icon">{s.icon}</div>
                <h3 className="lab-solution__name">{s.name}</h3>
                <p className="lab-solution__desc">{s.desc}</p>
                <div className="lab-solution__more">
                  Saiba mais
                  <ArrowIcon small />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          OPERATIONAL FLOW
          ════════════════════════════════════════════ */}
      <section className="section lab-flow section--light" ref={flowSecRef}>
        <div className="container">
          <div className="lab-section-head">
            <span className="section__tag lab-tag">
              <DotIcon /> Fluxo operacional
            </span>
            <h2 className="lab-section-title">Do pedido à entrega, tudo conectado.</h2>
            <p className="lab-section-sub">
              A Dataweb ajuda o laboratório a acompanhar cada etapa da operação com mais clareza,
              reduzindo ruídos e aumentando a previsibilidade.
            </p>
          </div>

          <div className="lab-flow__steps">
            <div className="lab-flow__line" aria-hidden="true" />
            {FLOW_STEPS.map((s, i) => (
              <div
                key={s.num}
                className="lab-flow__step"
                ref={(el) => (flowRefs.current[i] = el)}
              >
                <div className="lab-flow__step-marker">
                  <span className="lab-flow__step-num">{s.num}</span>
                </div>
                <h4 className="lab-flow__step-title">{s.title}</h4>
                <p className="lab-flow__step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ECOSYSTEM
          ════════════════════════════════════════════ */}
      <section className="section section--dark lab-eco" ref={ecoSecRef}>
        <div className="lab-eco__bg" aria-hidden="true">
          <span className="lab-eco__halo lab-eco__halo--a" />
          <span className="lab-eco__halo lab-eco__halo--b" />
          <span className="lab-eco__grid" />
        </div>
        <div className="container">
          <div className="lab-section-head lab-section-head--dark">
            <span className="section__tag lab-tag lab-tag--dark">
              <DotIcon /> Ecossistema Dataweb
            </span>
            <h2 className="lab-section-title">
              Mais do que sistemas separados: uma operação conectada.
            </h2>
            <p className="lab-section-sub">
              Pedidos, produção, relacionamento, indicadores e aplicativos trabalham juntos para
              que o laboratório tenha uma visão mais completa da operação.
            </p>
          </div>

          <div className="lab-eco__layout">
            {/* Hub central */}
            <div className="lab-eco__hub" aria-hidden="true">
              <svg className="lab-eco__hub-rings" viewBox="0 0 200 200" fill="none">
                <circle cx="100" cy="100" r="48"  stroke="rgba(0,160,177,0.45)" strokeWidth="1"/>
                <circle cx="100" cy="100" r="74"  stroke="rgba(0,160,177,0.25)" strokeWidth="1" strokeDasharray="4 6"/>
                <circle cx="100" cy="100" r="96"  stroke="rgba(0,160,177,0.12)" strokeWidth="1"/>
              </svg>
              <div className="lab-eco__hub-inner">
                <span className="lab-eco__hub-eyebrow">CORE</span>
                <span className="lab-eco__hub-name">Dataweb</span>
                <span className="lab-eco__hub-tag">Ecossistema</span>
              </div>
            </div>

            {/* Pilares */}
            <div className="lab-eco__cards">
              {ECOSYSTEM.map((e, i) => (
                <article
                  key={e.key}
                  className="lab-eco__card"
                  style={{ '--ec': e.color }}
                  ref={(el) => (ecoRefs.current[i] = el)}
                >
                  <span className="lab-eco__card-mark" />
                  <h3 className="lab-eco__card-title">{e.title}</h3>
                  <p className="lab-eco__card-desc">{e.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BENEFITS
          ════════════════════════════════════════════ */}
      <section className="section lab-benefits section--light" ref={benSecRef}>
        <div className="container">
          <div className="lab-section-head">
            <span className="section__tag lab-tag">
              <DotIcon /> Benefícios
            </span>
            <h2 className="lab-section-title">
              Mais previsibilidade, menos retrabalho e uma operação mais inteligente.
            </h2>
            <p className="lab-section-sub">
              Com informações conectadas, o laboratório ganha mais controle sobre processos,
              prazos, clientes e resultados.
            </p>
          </div>

          <div className="lab-benefits__grid">
            {BENEFITS.map((b, i) => (
              <article
                key={b.title}
                className="lab-benefit"
                ref={(el) => (benRefs.current[i] = el)}
              >
                <span className="lab-benefit__num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="lab-benefit__title">{b.title}</h3>
                <p className="lab-benefit__desc">{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          VALUE PROOF
          ════════════════════════════════════════════ */}
      <section className="section section--dark lab-proof" ref={proofSecRef}>
        <div className="lab-proof__bg" aria-hidden="true">
          <span className="lab-proof__wash" />
        </div>
        <div className="container">
          <div className="lab-proof__inner">
            <span className="section__tag lab-tag lab-tag--dark">
              <DotIcon /> Prova de valor
            </span>
            <h2 className="lab-section-title lab-section-title--center">
              Um laboratório conectado opera com mais controle em cada etapa.
            </h2>
            <p className="lab-section-sub lab-section-sub--center">
              Quando pedidos, produção, comunicação com óticas e indicadores trabalham juntos,
              o laboratório reduz ruídos, ganha previsibilidade e fortalece sua gestão.
            </p>

            <div className="lab-proof__chips">
              {VALUE_PROOFS.map((v) => (
                <span key={v} className="lab-proof__chip">
                  <CheckIcon green />
                  {v}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FINAL CTA
          ════════════════════════════════════════════ */}
      <section className="section lab-cta section--light" id="contato-lab" ref={ctaSecRef}>
        <div className="container">
          <div className="lab-cta__card">
            <div className="lab-cta__shine" aria-hidden="true" />
            <span className="lab-cta__eyebrow">
              <span className="lab-cta__eyebrow-dot" />
              Vamos conversar
            </span>
            <h2 className="lab-cta__title">
              Seu laboratório pronto para operar de forma mais conectada.
            </h2>
            <p className="lab-cta__sub">
              Converse com a Dataweb e entenda como nosso ecossistema pode apoiar a gestão,
              a produção e o crescimento do seu laboratório óptico.
            </p>
            <div className="lab-cta__actions">
              <a href="#contact" className="lab-btn lab-btn--accent lab-btn--lg">
                Quero falar com a Dataweb
                <ArrowIcon />
              </a>
              <a href="tel:+555130000000" className="lab-btn lab-btn--dark lab-btn--lg">
                <PhoneIcon />
                Falar com especialista
              </a>
            </div>
            <p className="lab-cta__note">
              Atendimento humano · Brasil inteiro · Resposta em até 1 dia útil
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Ícones inline
───────────────────────────────────────────────────────── */
function CheckIcon({ small, green }) {
  const s = small ? 14 : 16
  const color = green ? '#4ade80' : 'currentColor'
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.3"/>
      <path d="M5 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function ArrowIcon({ small }) {
  const s = small ? 14 : 16
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 2.5h3l1.5 3.5L5.5 7.5a8 8 0 003 3l1.5-2 3.5 1.5v3a1 1 0 01-1 1A11.5 11.5 0 012 3.5a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  )
}
function DotIcon() {
  return (
    <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden="true">
      <circle cx="3" cy="3" r="3" fill="currentColor"/>
    </svg>
  )
}
