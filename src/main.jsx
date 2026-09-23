import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App.jsx'
import { STATIC_PRERENDERED_PATHS } from './data/staticRoutes.js'
import './styles/index.css'

/**
 * Causa di React error #418/#423 su /progetti/:slug (e su qualunque altro
 * percorso non prerenderizzato): il rewrite "**" di Firebase Hosting
 * (firebase.json) serve sempre l'HTML statico dell'ultima pagina
 * prerenderizzata disponibile per QUALSIASI percorso — anche per uno aperto
 * direttamente, aggiornato o condiviso che non corrisponde a nessun file
 * realmente generato in build. Quel documento porta comunque il marcatore
 * data-server-rendered="true" (impostato per la pagina che è stata
 * davvero prerenderizzata), quindi vite-react-ssg lo scambia per "questo
 * percorso ha un prerender valido" e chiama hydrateRoot: React prova a
 * riconciliare un albero (es. la Home) completamente diverso da quello che
 * sta per montare (es. ProjectDetail), fallisce con gli errori #418/#423 e
 * infine ripiega comunque su un render client pulito — da cui "la pagina
 * viene visualizzata correttamente" ma con gli errori in console.
 *
 * Il prerendering va mantenuto per le pagine statiche (SEO): qui
 * verifichiamo solo che il percorso corrente sia uno di quelli davvero
 * generati in build. In caso contrario rimuoviamo il marcatore prima che
 * vite-react-ssg lo controlli, così sceglie da subito un mount client
 * pulito (createRoot) invece di tentare un'hydration destinata a fallire.
 */
if (typeof window !== 'undefined' && !STATIC_PRERENDERED_PATHS.includes(window.location.pathname)) {
  document.querySelector('[data-server-rendered="true"]')?.removeAttribute('data-server-rendered')
}

export const createRoot = ViteReactSSG({
  routes,
  basename: import.meta.env.BASE_URL,
})
