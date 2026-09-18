/**
 * Progetto placeholder: sostituiscilo con un case study reale seguendo
 * la stessa struttura, oppure lascialo come esempio del modello dati.
 * @type {import('../../types/project.js').ProjectMetadata}
 */
const studioFlow = {
  id: 'studio-flow',
  slug: 'studio-flow',
  title: 'StudioFlow',
  subtitle: 'Gestionale su misura per studi professionali che centralizza clienti, appuntamenti e documenti.',
  shortDescription:
    'Gestionale su misura pensato per studi professionali, per sostituire fogli di calcolo e strumenti separati con un unico spazio di lavoro.',
  description:
    'StudioFlow è un gestionale pensato per piccoli studi professionali che gestiscono clienti, appuntamenti e documenti attraverso strumenti separati o fogli di calcolo, con l\'obiettivo di centralizzare le informazioni in un unico posto.',
  category: ['Full Stack', 'SaaS'],
  year: '2024',
  status: 'MVP',
  role: 'Full-Stack Developer',
  featured: true,
  coverImage: '/projects/studio-flow/cover.svg',
  gallery: [
    { src: '/projects/studio-flow/dashboard.svg', alt: 'Dashboard clienti e appuntamenti' },
    { src: '/projects/studio-flow/clients.svg', alt: 'Anagrafica clienti con documenti collegati' },
  ],
  problem:
    'Molti studi professionali gestiscono clienti, appuntamenti e documenti con strumenti scollegati tra loro (fogli di calcolo, email, agende cartacee), perdendo tempo e rischiando errori nel passaggio di informazioni.',
  context:
    'Progetto nato per esplorare un caso concreto e ricorrente tra professionisti e piccoli studi: la necessità di un gestionale semplice, senza le complessità inutili di un software enterprise.',
  solution:
    'Un\'applicazione web che centralizza anagrafica clienti, appuntamenti e documenti collegati, con una dashboard che mostra in un colpo d\'occhio le attività del giorno e dei prossimi giorni.',
  myRole:
    'Ho progettato il modello dati, sviluppato l\'interfaccia e le funzionalità principali dell\'applicazione, dalla gestione clienti al calendario appuntamenti.',
  keyFeatures: [
    'Anagrafica clienti con documenti collegati',
    'Calendario appuntamenti con vista giornaliera e settimanale',
    'Archiviazione documenti per cliente',
    'Dashboard riepilogativa delle attività',
  ],
  businessValue: [
    'Riduce il tempo dedicato alla ricerca di informazioni sparse su più strumenti',
    'Centralizza dati clienti, appuntamenti e documenti in un unico ambiente',
    'Base pensata per crescere aggiungendo funzionalità specifiche per il tipo di studio',
  ],
  architecture:
    'Frontend React con gestione dello stato lato client, backend con API REST per la gestione di clienti, appuntamenti e documenti, database relazionale per la persistenza dei dati.',
  challenges: [
    'Progettare un modello dati flessibile per tipologie di studio diverse',
    'Costruire un calendario appuntamenti chiaro e semplice da usare',
  ],
  results: [
    'Prima versione funzionante con gestione clienti, appuntamenti e documenti',
    'Struttura pensata per essere personalizzata in base al tipo di attività',
  ],
  technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL'],
  skills: ['Full-Stack development', 'Progettazione database', 'UX per strumenti gestionali'],
  githubUrl: '',
  liveUrl: '',
  demoVideoUrl: '',
  seoTitle: 'StudioFlow — Case study | GlobeTrotta',
  seoDescription:
    'Come ho progettato un gestionale su misura per centralizzare clienti, appuntamenti e documenti di uno studio professionale.',
}

export default studioFlow
