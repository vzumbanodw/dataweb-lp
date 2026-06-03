export default function Franchise() {
  return (
    <section className="section franchise section--light">
      <div className="container">
        <div className="franchise__card">
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
