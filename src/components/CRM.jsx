import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/CRM.css'

gsap.registerPlugin(ScrollTrigger)

const crmSectionContent = {
  eyebrow: 'CRM para o mercado óptico',
  title: 'Transforme relacionamento em crescimento para sua ótica ou laboratório.',
  description:
    'Organize clientes, acompanhe oportunidades, registre históricos e mantenha sua equipe sempre próxima do próximo passo comercial.',
  supportingText:
    'O CRM da Dataweb conecta atendimento, vendas, pós-venda e relacionamento em uma visão única, ajudando sua operação a vender melhor, atender com mais contexto e acompanhar cada oportunidade com mais clareza.',
  primaryCta: 'Conhecer CRM Dataweb',
  secondaryCta: 'Falar com especialista',
  benefits: [
    {
      icon: 'history',
      title: 'Histórico centralizado',
      description:
        'Registros de atendimentos, contatos, compras, preferências e interações em um só lugar.',
    },
    {
      icon: 'pipeline',
      title: 'Oportunidades no radar',
      description:
        'Negociações, retornos, etapas comerciais e próximos passos acompanhados com mais controle.',
    },
    {
      icon: 'message',
      title: 'Relacionamento mais próximo',
      description:
        'Uma rotina de contato mais organizada para manter clientes ativos e bem acompanhados.',
    },
    {
      icon: 'calendar',
      title: 'Pós-venda estruturado',
      description:
        'Retornos, ajustes, recompra, satisfação e novas oportunidades depois da venda.',
    },
    {
      icon: 'team',
      title: 'Equipe alinhada',
      description:
        'Vendedores, gestores e atendimento trabalhando com as mesmas informações.',
    },
    {
      icon: 'integration',
      title: 'Integração com o ecossistema',
      description:
        'Dados comerciais conectados ao ERP, BI, aplicativos e demais ferramentas da Dataweb.',
    },
  ],
}

function BenefitIcon({ name }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
  }

  switch (name) {
    case 'history':
      return (
        <svg {...props}>
          <path d="M4 5.5h10.5A3.5 3.5 0 0118 9v10.5H7.5A3.5 3.5 0 014 16V5.5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8 9h6M8 13h5M8 17h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 9h2a2 2 0 012 2v6.5a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      )
    case 'pipeline':
      return (
        <svg {...props}>
          <path d="M4 5h16M7 12h10M10 19h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="7" cy="5" r="2.2" fill="currentColor" opacity="0.32" />
          <circle cx="17" cy="12" r="2.2" fill="currentColor" opacity="0.32" />
          <circle cx="12" cy="19" r="2.2" fill="currentColor" opacity="0.32" />
        </svg>
      )
    case 'message':
      return (
        <svg {...props}>
          <path d="M5 5h14v10.5H9l-4 3V5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8.5 9h7M8.5 12h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...props}>
          <rect x="4" y="5" width="16" height="15" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 3.5V7M16 3.5V7M4 10h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M8 14h3M8 17h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )
    case 'team':
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
          <path d="M4 20c0-3.4 2.2-5.4 5-5.4s5 2 5 5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M15.5 6.2a2.6 2.6 0 010 5M17.2 15c1.6.8 2.8 2.3 2.8 4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" opacity="0.55" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <rect x="4" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <rect x="13" y="4" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <rect x="8.5" y="14" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M11 8h2M12 11v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
        </svg>
      )
  }
}

export default function CRM() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const benefitRefs = useRef([])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined

    const ctx = gsap.context(() => {
      const introItems = contentRef.current?.querySelectorAll(
        '.crm__tag, .crm__title, .crm__lead, .crm__support, .crm__actions'
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      })

      tl.fromTo(
        introItems,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.08, ease: 'power3.out', clearProps: 'transform' }
      )
        .fromTo(
          benefitRefs.current,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.055, ease: 'power3.out', clearProps: 'transform' },
          '-=0.24'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="crm" id="crm" ref={sectionRef} aria-labelledby="crm-title">
      <div className="crm__bg" aria-hidden="true">
        <span className="crm__wash crm__wash--a" />
        <span className="crm__wash crm__wash--b" />
        <span className="crm__beam crm__beam--a" />
        <span className="crm__beam crm__beam--b" />
        <span className="crm__noise" />
      </div>

      <div className="container">
        <div className="crm__layout">
          <div className="crm__content" ref={contentRef}>
            <span className="crm__tag">
              <span className="crm__tag-dot" aria-hidden="true" />
              {crmSectionContent.eyebrow}
            </span>

            <h2 className="crm__title" id="crm-title">
              {crmSectionContent.title}
            </h2>

            <p className="crm__lead">{crmSectionContent.description}</p>
            <p className="crm__support">{crmSectionContent.supportingText}</p>

            <div className="crm__actions" aria-label="Ações sobre o CRM Dataweb">
              <a href="#contact" className="btn btn--primary crm__cta-primary">
                {crmSectionContent.primaryCta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="crm__cta-secondary">
                {crmSectionContent.secondaryCta}
              </a>
            </div>

            <div className="crm__benefits" aria-label="Benefícios do CRM Dataweb">
              {crmSectionContent.benefits.map((benefit, index) => (
                <article
                  className="crm__benefit"
                  key={benefit.title}
                  ref={(el) => (benefitRefs.current[index] = el)}
                >
                  <div className="crm__benefit-icon">
                    <BenefitIcon name={benefit.icon} />
                  </div>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
