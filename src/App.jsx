import { useState, useEffect } from 'react'
import SplashScreen from './components/SplashScreen'
import Header from './components/Header'
import Hero from './components/Hero'
import AppShowcase from './components/AppShowcase'
import Integration from './components/Integration'
import Products from './components/Products'
import CRM from './components/CRM'
import Analytics from './components/Analytics'
import SmartScanner from './components/SmartScanner'
import Franchise from './components/Franchise'
import Footer from './components/Footer'
import ContactBar from './components/ContactBar'
import SouLoja from './components/SouLoja'
import SouLaboratorio from './components/SouLaboratorio'
import { useRoute } from './router'

export default function App() {
  const [splashDone, setSplashDone] = useState(false)
  const route = useRoute()

  useEffect(() => {
    const titles = {
      '/sou-loja': 'Sou Loja — Dataweb Tecnologia',
      '/sou-laboratorio': 'Dataweb para Laboratórios Ópticos | Gestão, Produção e Indicadores',
    }
    const descriptions = {
      '/sou-laboratorio': 'Soluções Dataweb para laboratórios ópticos: gestão de pedidos, produção, CRM, BI, aplicativos e integração com óticas em um ecossistema completo.',
    }
    document.title = titles[route] || 'Dataweb Tecnologia — Universo Óptico'
    const meta = document.querySelector('meta[name="description"]')
    if (meta && descriptions[route]) meta.setAttribute('content', descriptions[route])
  }, [route])

  const showSplash = !splashDone && route === '/'

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setSplashDone(true)
            window.dispatchEvent(new Event('dw:splash-done'))
          }}
        />
      )}

      <div
        className="app-content"
        style={{
          opacity: showSplash ? 0 : 1,
          transition: !showSplash ? 'opacity 0.4s ease 0.1s' : 'none',
        }}
      >
        <Header />
        <main>
          {route === '/sou-loja' ? (
            <SouLoja />
          ) : route === '/sou-laboratorio' ? (
            <SouLaboratorio />
          ) : (
            <>
              <Hero />
              <AppShowcase />
              <Integration />
              <Products />
              <CRM />
              <Analytics />
              <SmartScanner />
              <Franchise />
            </>
          )}
        </main>
        <Footer />
        <ContactBar />
      </div>
    </>
  )
}
