import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Franchise() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      const items = cardRef.current?.querySelectorAll(
        '.section__tag, .franchise__title, .franchise__text, .btn'
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      })

      tl.fromTo(cardRef.current,
        { autoAlpha: 0, y: 36, scale: 0.985 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out', clearProps: 'transform' }
      )
        .fromTo(items,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.09, ease: 'power3.out', clearProps: 'transform' },
          '-=0.4'
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="section franchise section--light" id="parceiros" ref={sectionRef}>
      <div className="container">
        <div className="franchise__card" ref={cardRef}>
          <span className="section__tag">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1L10 4v4L6 11 2 8V4L6 1z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
            </svg>
            Redes e franquias
          </span>
          <h2 className="franchise__title">Cresça sem perder o controle</h2>
          <p className="franchise__text">
            Acompanhe várias unidades, compare resultados e padronize processos sem abrir mão
            da visão individual de cada loja.
          </p>
          <a href="#contact" className="btn btn--primary">
            Quero escalar minha rede
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
