import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Pagina non trovata" description="La pagina che cerchi non esiste o è stata spostata." path="/404" />

      <section className="flex min-h-[60vh] items-center justify-center py-20">
        <div className="container-page text-center">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-fluid-3xl font-bold text-ink-950">Questa pagina non esiste.</h1>
          <p className="mt-4 text-fluid-base text-ink-600">
            Forse il link è sbagliato o la pagina è stata spostata.
          </p>
          <Link to="/" className="btn-primary mt-8 inline-flex">
            Torna alla home
          </Link>
        </div>
      </section>
    </>
  )
}
