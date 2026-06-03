import { useEffect, useState } from 'react'

export function useRoute() {
  const [route, setRoute] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  )

  useEffect(() => {
    const onChange = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', onChange)
    window.addEventListener('dw:navigate', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('dw:navigate', onChange)
    }
  }, [])

  return route
}

export function navigate(path) {
  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('dw:navigate'))
  window.scrollTo(0, 0)
}

export function handleNavClick(e, path) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
  e.preventDefault()
  navigate(path)
}
