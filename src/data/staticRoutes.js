// Percorsi pubblici realmente prerenderizzati da `vite-react-ssg build`
// (vedi l'output "Rendering Pages..." della build). `progetti/:slug` resta
// intenzionalmente dinamico — vedi il commento in src/App.jsx — quindi non
// compare in questo elenco.
//
// STATIC_PRERENDERED_PATHS serve a src/main.jsx per decidere se hydrateRoot
// è sicuro per il percorso corrente: include anche /testimonianze, pagina
// pronta ma non ancora promossa nel sitemap né nella navigazione (vedi
// src/pages/Testimonials.jsx) — non è comunque una pagina "dinamica" come
// le schede progetto, quindi va comunque prerenderizzata correttamente.
export const STATIC_PRERENDERED_PATHS = [
  '/', '/progetti', '/soluzioni', '/chi-sono', '/contatti', '/feedback', '/testimonianze', '/privacy',
]

// Sottoinsieme promosso in sitemap.xml (scripts/generate-sitemap.js):
// /testimonianze resta fuori finché i contenuti pubblicati non lo
// giustificano, come richiesto.
export const SITEMAP_PATHS = ['/', '/progetti', '/soluzioni', '/chi-sono', '/contatti', '/feedback', '/privacy']
