import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import { PublicContentProvider } from '../hooks/usePublicContent.jsx'

// HelmetProvider non va renderizzato qui: vite-react-ssg avvolge già l'intera
// app nel proprio HelmetProvider durante il prerendering per estrarre l'head
// generato da <Helmet> (vedi src/components/Seo.jsx). Un secondo provider
// annidato qui sovrascriverebbe il contesto e i meta tag non verrebbero più
// scritti nell'HTML statico.
export default function MainLayout() {
  return (
    <PublicContentProvider>
      <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink-950 focus:px-4 focus:py-2 focus:text-paper-50"
      >
        Vai al contenuto
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      </div>
    </PublicContentProvider>
  )
}
