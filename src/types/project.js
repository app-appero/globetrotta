/**
 * @typedef {Object} ProjectMetadata
 * @property {string} id - Identificativo univoco interno.
 * @property {string} slug - Slug URL, usato in /progetti/:slug. Deve essere unico e in kebab-case.
 * @property {string} title - Nome del progetto.
 * @property {string} subtitle - Frase breve che descrive cosa fa il progetto (non lo stack).
 * @property {string} shortDescription - Descrizione breve per card e meta description.
 * @property {string} description - Descrizione estesa per l'overview del case study.
 * @property {string[]} category - Categorie usate per i filtri (es. "Full Stack", "AI", "Machine Learning", "SaaS", "Automation").
 * @property {string} year - Anno di realizzazione o ultimo aggiornamento.
 * @property {'In produzione'|'Concept'|'MVP'|'Completato'} status - Stato del progetto.
 * @property {string} role - Ruolo ricoperto (es. "Full-Stack & AI Developer").
 * @property {boolean} featured - Se true, compare tra i progetti in evidenza in home.
 * @property {string} coverImage - Percorso immagine cover, es. /projects/slug/cover.webp.
 * @property {{src: string, alt: string, caption?: string}[]} [gallery] - Galleria immagini opzionale.
 * @property {string} problem - Il problema affrontato.
 * @property {string} [context] - Perché è nato il progetto.
 * @property {string} solution - Come è stato risolto il problema.
 * @property {string} myRole - Cosa ha realizzato in prima persona.
 * @property {string[]} keyFeatures - Funzionalità principali.
 * @property {string[]} businessValue - Valore generato/generabile (nessun numero inventato).
 * @property {string} [architecture] - Descrizione dell'architettura tecnica.
 * @property {string[]} [challenges] - Problemi interessanti affrontati.
 * @property {string[]} results - Cosa è stato concretamente realizzato (fatti, non metriche inventate).
 * @property {string[]} technologies - Tecnologie principali (mostrate come dettaglio, non come argomento centrale).
 * @property {string[]} [skills] - Competenze dimostrate dal progetto.
 * @property {string} [githubUrl] - Link opzionale al repository.
 * @property {string} [liveUrl] - Link opzionale alla demo live.
 * @property {string} [demoVideoUrl] - Link opzionale a un video demo (YouTube/Vimeo) o file locale.
 * @property {string} seoTitle - Title dedicato per SEO/social share.
 * @property {string} seoDescription - Description dedicata per SEO/social share.
 */

export {}
