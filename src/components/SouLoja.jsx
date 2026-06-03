import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/SouLoja.css'
import { handleNavClick } from '../router'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────
   Conteúdo
───────────────────────────────────────────────────────── */
const HERO_METRICS = [
  { value: '+38%', label: 'em vendas após a implantação' },
  { value: '−60%', label: 'tempo médio por O.S.' },
  { value: '2×',   label: 'mais retorno de clientes' },
  { value: '24/7', label: 'dados em nuvem' },
]

const PAINS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M3 10h18M8 14h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M14 14l2 2 4-4" stroke="#FBB040" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Estoque descontrolado',
    desc: 'Produtos parados, faltas inesperadas e dificuldade para saber o que comprar.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Retrabalho operacional',
    desc: 'Equipe redigitando informações entre planilhas, sistemas e cadernos.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M8 14l3-3 2 2 3-4" stroke="#FBB040" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Falta de visão sobre resultados',
    desc: 'Sem clareza de margem, ticket médio, conversão e desempenho por loja.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M2 21c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M17 6v4m-2-2h4" stroke="#FBB040" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Equipe sem direção comercial',
    desc: 'Vendedores sem metas claras e sem acompanhamento de performance individual.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M21 11.5a8.5 8.5 0 11-15.7 4.4L3 21l5.2-1.7a8.5 8.5 0 0012.3-7.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 12.5c0 2 2 4 4 4" stroke="#FBB040" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pós-venda inexistente',
    desc: 'Clientes vão embora e não voltam — sem campanhas, lembretes ou aproximação.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M5 7l7-5 7 5M5 17l7 5 7-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Decisões no escuro',
    desc: 'Sem dados consolidados, o sócio toma decisões importantes por feeling.',
  },
]

const PILLARS = [
  {
    num: '01',
    tone: 'teal',
    title: 'Vender com previsibilidade',
    desc: 'PDV ágil, orçamentos guiados e regras comerciais aplicadas automaticamente em cada venda.',
    items: ['PDV integrado', 'Comissionamento', 'Crediário próprio', 'Promoções inteligentes'],
  },
  {
    num: '02',
    tone: 'amber',
    title: 'Atender com proximidade',
    desc: 'Histórico, receitas e medidas sempre à mão. Sua equipe atende mais rápido e com mais carinho.',
    items: ['Ficha do cliente', 'Receitas digitalizadas', 'Histórico de compras', 'CRM com WhatsApp'],
  },
  {
    num: '03',
    tone: 'green',
    title: 'Gerir sem retrabalho',
    desc: 'Estoque, financeiro e ordens de serviço conversam entre si. Menos planilha, menos erro.',
    items: ['Estoque em tempo real', 'Contas a pagar/receber', 'O.S. integrada ao laboratório', 'Conciliação automática'],
  },
  {
    num: '04',
    tone: 'purple',
    title: 'Decidir com dados',
    desc: 'Indicadores claros em tempo real para sócios, gerentes e vendedores agirem no dia certo.',
    items: ['BI Analytics', 'Metas por vendedor', 'Margem e lucratividade', 'Comparativo entre lojas'],
  },
]

const MODULES = [
  {
    name: 'PDV',
    label: 'Ponto de venda',
    color: '#FF6B6B',
    desc: 'Venda, orçamento, troca e fechamento de caixa em uma frente simples e conectada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="2" y="7" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M7 7V5a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M2 11h20" stroke="currentColor" strokeWidth="1.4" opacity="0.5"/>
        <circle cx="12" cy="15.5" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    name: 'Optfácil',
    label: 'Gestão de O.S.',
    color: '#A6CE39',
    desc: 'Receita, medidas, laboratório, prazos e histórico do cliente em um só fluxo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="18" cy="17" r="3.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M16.5 17l1 1 2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    name: 'CRM',
    label: 'Relacionamento',
    color: '#6C63FF',
    desc: 'Automação WhatsApp, campanhas, aniversariantes e cobrança humanizada.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M2 21c0-4.418 3.134-7 7-7s7 2.582 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M16 3.5a4 4 0 010 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6"/>
        <path d="M19.5 14c1.8.9 3 2.6 3 5.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: 'Analytics',
    label: 'BI & Indicadores',
    color: '#f5c518',
    desc: 'Vendas, estoque, vendedores e margem em dashboards fáceis de acompanhar.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="10" y="9"  width="4" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
        <rect x="17" y="3"  width="4" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.7"/>
      </svg>
    ),
  },
  {
    name: 'App da Loja',
    label: 'Gestão no bolso',
    color: '#00A0B1',
    desc: 'Acompanhe faturamento, metas e performance da loja direto do celular.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect x="6" y="2" width="12" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.7"/>
        <path d="M10 18h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
        <path d="M9 6h6M9 10h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    name: 'Estoque & Financeiro',
    label: 'Operação',
    color: '#FBB040',
    desc: 'Controle de produtos, fornecedores, contas a pagar e a receber em tempo real.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.6"/>
      </svg>
    ),
  },
]

const FLOW_STEPS = [
  { num: '01', title: 'Atendimento', desc: 'Cliente é recebido, ficha aberta e histórico consultado em segundos.' },
  { num: '02', title: 'Orçamento',   desc: 'Receita, medidas e regras comerciais aplicadas automaticamente.' },
  { num: '03', title: 'Venda',       desc: 'PDV ágil com pagamento, crediário e comissionamento integrados.' },
  { num: '04', title: 'O.S.',        desc: 'Ordem de serviço enviada ao laboratório com prazos e alertas.' },
  { num: '05', title: 'Entrega',     desc: 'Cliente avisado por WhatsApp, retirada registrada na ficha.' },
  { num: '06', title: 'Pós-venda',   desc: 'CRM cuida do retorno com campanhas, aniversários e reativação.' },
]

const KPIS = [
  { label: 'Faturamento da loja', value: 'R$ 187k', change: '+12,4%', tone: 'green' },
  { label: 'Ticket médio',        value: 'R$ 1.480', change: '+8,1%',  tone: 'green' },
  { label: 'Conversão',           value: '38%',     change: '+3,2pp', tone: 'green' },
  { label: 'Margem bruta',        value: '54%',     change: '+1,8pp', tone: 'green' },
  { label: 'Inadimplência',       value: '2,1%',    change: '−0,6pp', tone: 'green' },
  { label: 'Top vendedor',        value: 'Carla',   change: '23 vendas', tone: 'amber' },
]

const TRUST_STATS = [
  { value: '25+',    label: 'Anos no mercado óptico' },
  { value: '5.000+', label: 'Lojas atendidas' },
  { value: '100mi+', label: 'Transações por mês' },
  { value: '92%',    label: 'SLA de suporte' },
]

const FAQ = [
  {
    q: 'A Dataweb atende óticas de qualquer porte?',
    a: 'Sim. Desde óticas independentes até redes com várias unidades, o ecossistema se adapta ao tamanho da sua operação.',
  },
  {
    q: 'Vocês acompanham a implantação?',
    a: 'Acompanhamos toda a implantação, migração de dados e treinamento da equipe. Você não fica sozinho em nenhum momento.',
  },
  {
    q: 'Preciso contratar todos os módulos?',
    a: 'Não. Você pode começar pelo módulo que resolve sua dor mais urgente e ir agregando os demais conforme evolui.',
  },
  {
    q: 'Os dados ficam em nuvem?',
    a: 'Sim. Todos os dados ficam em nuvem segura, com backup contínuo e acesso de qualquer dispositivo conectado.',
  },
  {
    q: 'Existe integração com laboratórios?',
    a: 'Sim. O Dilab conecta sua loja aos principais laboratórios parceiros, eliminando redigitação e ruídos no pedido.',
  },
]

/* ─────────────────────────────────────────────────────────
   FAQ Item (controlado)
───────────────────────────────────────────────────────── */
function FaqItem({ q, a, index }) {
  const itemRef = useRef(null)
  const bodyRef = useRef(null)

  const toggle = () => {
    const item = itemRef.current
    const body = bodyRef.current
    if (!item || !body) return
    const isOpen = item.classList.contains('sl-faq__item--open')
    if (isOpen) {
      gsap.to(body, { height: 0, duration: 0.3, ease: 'power2.inOut',
        onComplete: () => item.classList.remove('sl-faq__item--open') })
    } else {
      item.classList.add('sl-faq__item--open')
      const h = body.scrollHeight
      gsap.fromTo(body, { height: 0 }, { height: h, duration: 0.35, ease: 'power2.out',
        onComplete: () => { body.style.height = 'auto' } })
    }
  }

  return (
    <div className="sl-faq__item" ref={itemRef}>
      <button className="sl-faq__head" onClick={toggle} aria-expanded="false">
        <span className="sl-faq__num">{String(index + 1).padStart(2, '0')}</span>
        <span className="sl-faq__q">{q}</span>
        <span className="sl-faq__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      <div className="sl-faq__body" ref={bodyRef}>
        <p>{a}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   Componente principal
───────────────────────────────────────────────────────── */
export default function SouLoja() {
  const rootRef       = useRef(null)
  const heroRef       = useRef(null)
  const heroPanelRef  = useRef(null)
  const heroMetricRefs = useRef([])

  const painsSecRef   = useRef(null)
  const painsRefs     = useRef([])

  const pillarsSecRef = useRef(null)
  const pillarsRefs   = useRef([])

  const modulesSecRef = useRef(null)
  const modulesRefs   = useRef([])

  const flowSecRef    = useRef(null)
  const flowRefs      = useRef([])

  const kpiSecRef     = useRef(null)
  const kpiRefs       = useRef([])

  const trustSecRef   = useRef(null)
  const trustRefs     = useRef([])

  const faqSecRef     = useRef(null)
  const ctaSecRef     = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      /* HERO — refined editorial entrance */
      const heroEls = heroRef.current?.querySelectorAll('[data-anim="hero"]')
      gsap.fromTo(heroEls,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: 'power3.out' }
      )
      const titleLines = heroRef.current?.querySelectorAll('.sl-hero__title-line')
      if (titleLines?.length) {
        gsap.fromTo(titleLines,
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: 'power4.out', delay: 0.1 }
        )
      }
      gsap.fromTo(heroPanelRef.current,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(heroMetricRefs.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.6 }
      )

      /* PAINS */
      gsap.fromTo(painsRefs.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: painsSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* PILLARS */
      gsap.fromTo(pillarsRefs.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: pillarsSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* MODULES */
      gsap.fromTo(modulesRefs.current,
        { y: 36, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: modulesSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* FLOW */
      gsap.fromTo(flowRefs.current,
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: flowSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* KPI */
      gsap.fromTo(kpiRefs.current,
        { y: 28, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: kpiSecRef.current, start: 'top 78%', once: true },
        }
      )

      /* TRUST counter-up */
      trustRefs.current.forEach((el, i) => {
        if (!el) return
        const raw = TRUST_STATS[i].value
        const num = parseInt(raw.replace(/\D/g, ''), 10)
        const suffix = raw.replace(/[\d.,]/g, '')
        const obj = { v: 0 }
        gsap.to(obj, {
          v: num, duration: 1.6, ease: 'power2.out',
          scrollTrigger: { trigger: trustSecRef.current, start: 'top 82%', once: true },
          onUpdate() {
            el.textContent = `${Math.round(obj.v).toLocaleString('pt-BR')}${suffix}`
          },
        })
      })

      /* FAQ + CTA fade */
      gsap.fromTo(faqSecRef.current?.querySelectorAll('.sl-faq__item'),
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: { trigger: faqSecRef.current, start: 'top 80%', once: true },
        }
      )
      gsap.fromTo(ctaSecRef.current?.querySelector('.sl-cta__card'),
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
    <div className="sou-loja" ref={rootRef}>

      {/* ════════════════════════════════════════════
          HERO — editorial split, técnico e refinado
          ════════════════════════════════════════════ */}
      <section className="sl-hero" ref={heroRef}>
        <div className="sl-hero__bg" aria-hidden="true">
          <div className="sl-hero__grid" />
          <div className="sl-hero__halo" />
        </div>

        <div className="container sl-hero__container">

          {/* Topbar: breadcrumb + live indicator */}
          <div className="sl-hero__topbar" data-anim="hero">
            <nav className="sl-crumb" aria-label="Navegação">
              <a href="/" onClick={(e) => handleNavClick(e, '/')} className="sl-crumb__link">Início</a>
              <span className="sl-crumb__sep" aria-hidden="true">/</span>
              <span className="sl-crumb__current">Sou Loja</span>
            </nav>
            <div className="sl-hero__meta">
              <span className="sl-hero__meta-dot" />
              <span className="sl-hero__meta-mono">ÓTICAS · BRASIL</span>
            </div>
          </div>

          {/* Editorial split */}
          <div className="sl-hero__split">

            {/* LEFT — typographic statement */}
            <div className="sl-hero__lead">
              <span className="sl-hero__kicker" data-anim="hero">
                <span className="sl-hero__kicker-num">01</span>
                <span className="sl-hero__kicker-bar" />
                <span className="sl-hero__kicker-text">Plataforma para óticas</span>
              </span>

              <h1 className="sl-hero__title" data-anim="hero">
                <span className="sl-hero__title-line">Toda a operação</span>
                <span className="sl-hero__title-line">da sua ótica em</span>
                <span className="sl-hero__title-line">
                  <span className="sl-hero__title-accent">um único fluxo.</span>
                </span>
              </h1>

              <p className="sl-hero__subtitle" data-anim="hero">
                ERP, CRM, BI e aplicativos conectados em uma plataforma desenvolvida
                por quem entende do setor óptico há mais de 25 anos.
              </p>

              <div className="sl-hero__actions" data-anim="hero">
                <a
                  href="#contato-loja"
                  className="sl-btn sl-btn--accent sl-btn--lg"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('contato-loja')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Agendar uma conversa
                  <ArrowIcon />
                </a>
                <a
                  href="#modulos"
                  className="sl-btn sl-btn--ghost sl-btn--lg"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('modulos')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Conhecer a plataforma
                </a>
              </div>
            </div>

            {/* RIGHT — live data card */}
            <div className="sl-hero__card" ref={heroPanelRef} aria-hidden="true">
              <div className="sl-hero__card-frame">
                <div className="sl-hero__card-head">
                  <div className="sl-hero__card-title">
                    <span className="sl-hero__card-live">
                      <span className="sl-hero__card-live-dot" />
                      AO VIVO
                    </span>
                    <span className="sl-hero__card-name">Painel · Ótica Modelo</span>
                  </div>
                  <span className="sl-hero__card-time">14:32</span>
                </div>

                <div className="sl-hero__card-headline">
                  <div className="sl-hero__card-headline-top">
                    <span className="sl-hero__card-label">Faturamento do mês</span>
                    <span className="sl-hero__card-delta">▲ 12,4%</span>
                  </div>
                  <span className="sl-hero__card-value">R$ 187.420</span>
                  <svg className="sl-hero__card-chart" viewBox="0 0 280 56" fill="none" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sl-grad" x1="0" y1="0" x2="0" y2="56" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#FBB040" stopOpacity="0.32"/>
                        <stop offset="100%" stopColor="#FBB040" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <polygon points="0,48 35,42 70,44 105,30 140,36 175,20 210,24 245,12 280,6 280,56 0,56" fill="url(#sl-grad)"/>
                    <polyline points="0,48 35,42 70,44 105,30 140,36 175,20 210,24 245,12 280,6"
                      stroke="#FBB040" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    <circle cx="280" cy="6" r="2.5" fill="#FBB040"/>
                  </svg>
                </div>

                <div className="sl-hero__card-rows">
                  {[
                    { label: 'Vendas hoje',  value: '42',       trend: '+18%',  tone: 'up' },
                    { label: 'Ticket médio', value: 'R$ 1.480', trend: '+8,1%', tone: 'up' },
                    { label: 'Conversão',    value: '38%',      trend: '+3,2pp', tone: 'up' },
                    { label: 'Margem bruta', value: '54%',      trend: '+1,8pp', tone: 'up' },
                    { label: 'Top vendedor', value: 'Carla',    trend: '23 OS', tone: 'flat' },
                  ].map((r, i) => (
                    <div className="sl-hero__card-row" key={r.label}
                      ref={(el) => (heroMetricRefs.current[i] = el)}>
                      <span className="sl-hero__card-row-label">{r.label}</span>
                      <span className="sl-hero__card-row-value">{r.value}</span>
                      <span className={`sl-hero__card-row-trend sl-hero__card-row-trend--${r.tone}`}>
                        {r.tone === 'up' && <span className="sl-hero__card-row-arrow">▲</span>}
                        {r.trend}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="sl-hero__card-foot">
                  <span className="sl-hero__card-foot-pulse" />
                  <span>Sincronizado · 2s atrás</span>
                  <span className="sl-hero__card-foot-sep">·</span>
                  <span>3 lojas conectadas</span>
                </div>
              </div>

              {/* Decorative grid lines around the card */}
              <span className="sl-hero__card-mark sl-hero__card-mark--tl" aria-hidden="true" />
              <span className="sl-hero__card-mark sl-hero__card-mark--tr" aria-hidden="true" />
              <span className="sl-hero__card-mark sl-hero__card-mark--bl" aria-hidden="true" />
              <span className="sl-hero__card-mark sl-hero__card-mark--br" aria-hidden="true" />
            </div>

          </div>

          {/* Trust strip — bottom */}
          <div className="sl-hero__strip" data-anim="hero">
            <div className="sl-hero__strip-item">
              <span className="sl-hero__strip-value">25+</span>
              <span className="sl-hero__strip-label">anos no setor óptico</span>
            </div>
            <span className="sl-hero__strip-sep" />
            <div className="sl-hero__strip-item">
              <span className="sl-hero__strip-value">5.000+</span>
              <span className="sl-hero__strip-label">lojas atendidas</span>
            </div>
            <span className="sl-hero__strip-sep" />
            <div className="sl-hero__strip-item">
              <span className="sl-hero__strip-value">100mi+</span>
              <span className="sl-hero__strip-label">transações por mês</span>
            </div>
            <span className="sl-hero__strip-sep" />
            <div className="sl-hero__strip-item">
              <span className="sl-hero__strip-value">92%</span>
              <span className="sl-hero__strip-label">SLA de suporte</span>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════
          PAINS — A rotina da ótica não pode parar
          ════════════════════════════════════════════ */}
      <section className="section sl-pains section--light" ref={painsSecRef}>
        <div className="container">
          <div className="sl-section-head">
            <span className="section__tag">
              <DotIcon /> Desafios reais
            </span>
            <h2 className="sl-section-title">A rotina da ótica não pode parar — mas também não pode te sufocar.</h2>
            <p className="sl-section-sub">
              Conhecemos de perto o que mais consome a energia de quem opera uma ótica.
              Veja se algum desses cenários soa familiar.
            </p>
          </div>

          <div className="sl-pains__grid">
            {PAINS.map((p, i) => (
              <article
                key={i}
                className="sl-pain"
                ref={(el) => (painsRefs.current[i] = el)}
              >
                <div className="sl-pain__icon">{p.icon}</div>
                <h3 className="sl-pain__title">{p.title}</h3>
                <p className="sl-pain__desc">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PILLARS — 4 pilares
          ════════════════════════════════════════════ */}
      <section className="section section--dark sl-pillars" ref={pillarsSecRef}>
        <div className="sl-pillars__bg" aria-hidden="true">
          <span className="sl-pillars__wash" />
          <span className="sl-pillars__grid" />
        </div>
        <div className="container">
          <div className="sl-section-head sl-section-head--dark">
            <span className="section__tag">
              <DotIcon /> Quatro pilares
            </span>
            <h2 className="sl-section-title">Operação inteira em um único fluxo.</h2>
            <p className="sl-section-sub">
              A Dataweb organiza a sua loja em quatro frentes que conversam o tempo todo —
              cada decisão é mais rápida porque a informação já está no lugar certo.
            </p>
          </div>

          <div className="sl-pillars__grid">
            {PILLARS.map((p, i) => (
              <article
                key={p.num}
                className={`sl-pillar sl-pillar--${p.tone}`}
                ref={(el) => (pillarsRefs.current[i] = el)}
              >
                <div className="sl-pillar__head">
                  <span className="sl-pillar__num">{p.num}</span>
                  <span className="sl-pillar__mark" />
                </div>
                <h3 className="sl-pillar__title">{p.title}</h3>
                <p className="sl-pillar__desc">{p.desc}</p>
                <ul className="sl-pillar__list">
                  {p.items.map((it) => (
                    <li key={it}>
                      <CheckIcon small /> {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MODULES — Módulos para sua loja
          ════════════════════════════════════════════ */}
      <section className="section sl-modules section--light" id="modulos" ref={modulesSecRef}>
        <div className="container">
          <div className="sl-section-head">
            <span className="section__tag">
              <DotIcon /> Módulos
            </span>
            <h2 className="sl-section-title">Tudo que sua loja precisa — em módulos integrados.</h2>
            <p className="sl-section-sub">
              Comece pelo que resolve sua dor mais urgente e cresça com o ecossistema completo.
              Os módulos conversam entre si nativamente.
            </p>
          </div>

          <div className="sl-modules__grid">
            {MODULES.map((m, i) => (
              <article
                key={m.name}
                className="sl-module"
                style={{ '--mc': m.color }}
                ref={(el) => (modulesRefs.current[i] = el)}
              >
                <div className="sl-module__icon">{m.icon}</div>
                <span className="sl-module__label">{m.label}</span>
                <h3 className="sl-module__name">{m.name}</h3>
                <p className="sl-module__desc">{m.desc}</p>
                <div className="sl-module__more">
                  Saiba mais
                  <ArrowIcon small />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FLOW — Fluxo operacional
          ════════════════════════════════════════════ */}
      <section className="section section--dark sl-flow" ref={flowSecRef}>
        <div className="sl-flow__bg" aria-hidden="true">
          <span className="sl-flow__wash" />
        </div>
        <div className="container">
          <div className="sl-section-head sl-section-head--dark">
            <span className="section__tag">
              <DotIcon /> Da venda ao pós-venda
            </span>
            <h2 className="sl-section-title">Toda a jornada da sua loja em um único fluxo.</h2>
            <p className="sl-section-sub">
              Cada passo conversa com o próximo — sem retrabalho, sem redigitação,
              sem informação perdida no caminho.
            </p>
          </div>

          <div className="sl-flow__steps">
            <div className="sl-flow__line" aria-hidden="true" />
            {FLOW_STEPS.map((s, i) => (
              <div
                key={s.num}
                className="sl-flow__step"
                ref={(el) => (flowRefs.current[i] = el)}
              >
                <div className="sl-flow__step-marker">
                  <span className="sl-flow__step-num">{s.num}</span>
                </div>
                <h4 className="sl-flow__step-title">{s.title}</h4>
                <p className="sl-flow__step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          KPIs — Indicadores que importam
          ════════════════════════════════════════════ */}
      <section className="section sl-kpis section--light" ref={kpiSecRef}>
        <div className="container">
          <div className="sl-kpis__layout">
            <div className="sl-kpis__intro">
              <span className="section__tag">
                <DotIcon /> Indicadores em tempo real
              </span>
              <h2 className="sl-section-title sl-section-title--left">
                Decisões mais rápidas — porque os números chegam antes do problema.
              </h2>
              <p className="sl-section-sub sl-section-sub--left">
                Faturamento, ticket médio, conversão, margem, performance individual e
                inadimplência: tudo o que importa, em um painel que cabe no celular.
              </p>
              <ul className="sl-kpis__list">
                <li><CheckIcon small green /> Acompanhe metas por loja, vendedor e segmento</li>
                <li><CheckIcon small green /> Receba alertas quando algo sair do plano</li>
                <li><CheckIcon small green /> Compare unidades sem montar planilha</li>
                <li><CheckIcon small green /> Mobile-first — gestão no bolso</li>
              </ul>
            </div>

            <div className="sl-kpis__grid">
              {KPIS.map((k, i) => (
                <div
                  key={k.label}
                  className={`sl-kpi sl-kpi--${k.tone}`}
                  ref={(el) => (kpiRefs.current[i] = el)}
                >
                  <span className="sl-kpi__label">{k.label}</span>
                  <span className="sl-kpi__value">{k.value}</span>
                  <span className="sl-kpi__change">{k.change}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST — Números Dataweb
          ════════════════════════════════════════════ */}
      <section className="section section--dark sl-trust" ref={trustSecRef}>
        <div className="container">
          <div className="sl-trust__grid">
            {TRUST_STATS.map((s, i) => (
              <div key={s.label} className="sl-trust__item">
                <span className="sl-trust__value" ref={(el) => (trustRefs.current[i] = el)}>
                  {s.value}
                </span>
                <span className="sl-trust__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FAQ
          ════════════════════════════════════════════ */}
      <section className="section sl-faq section--light" ref={faqSecRef}>
        <div className="container">
          <div className="sl-section-head">
            <span className="section__tag">
              <DotIcon /> Dúvidas frequentes
            </span>
            <h2 className="sl-section-title">Tudo que você precisa saber antes de começar.</h2>
          </div>

          <div className="sl-faq__list">
            {FAQ.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CTA — Final
          ════════════════════════════════════════════ */}
      <section className="section sl-cta section--light" id="contato-loja" ref={ctaSecRef}>
        <div className="container">
          <div className="sl-cta__card">
            <div className="sl-cta__shine" aria-hidden="true" />
            <span className="sl-cta__eyebrow">
              <span className="sl-cta__eyebrow-dot" />
              Pronto para começar
            </span>
            <h2 className="sl-cta__title">
              Vamos mostrar a Dataweb operando dentro da sua ótica.
            </h2>
            <p className="sl-cta__sub">
              Em uma conversa curta entendemos sua operação atual e mostramos como o ecossistema
              se encaixa no seu dia-a-dia — sem compromisso.
            </p>
            <div className="sl-cta__actions">
              <a href="#contact" className="sl-btn sl-btn--accent sl-btn--lg">
                Agendar demonstração
                <ArrowIcon />
              </a>
              <a href="tel:+555130000000" className="sl-btn sl-btn--dark sl-btn--lg">
                <PhoneIcon />
                Falar com especialista
              </a>
            </div>
            <p className="sl-cta__note">
              Resposta em até 1 dia útil · Atendimento humano · Brasil inteiro
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
