/** @type {import('../../types/project.js').ProjectMetadata} */
const oracleTennis = {
  id: 'oracle-tennis',
  slug: 'oracle-tennis',
  title: 'Oracle Tennis',
  subtitle: 'Piattaforma che raccoglie e analizza dati sportivi, trasformandoli in analisi e previsioni.',
  shortDescription:
    'Piattaforma che raccoglie e analizza dati sportivi trasformandoli in analisi e previsioni attraverso modelli di Machine Learning.',
  description:
    'Oracle Tennis è una piattaforma che raccoglie dati storici e statistiche sul tennis professionistico e li trasforma in analisi comprensibili e previsioni sui risultati, attraverso modelli di Machine Learning addestrati su dati reali.',
  category: ['Full Stack', 'AI', 'Machine Learning'],
  year: '2024',
  status: 'In produzione',
  role: 'Full-Stack & AI Developer',
  featured: true,
  coverImage: '/projects/oracle-tennis/cover.svg',
  gallery: [
    { src: '/projects/oracle-tennis/dashboard.svg', alt: 'Dashboard con statistiche match e giocatori' },
    { src: '/projects/oracle-tennis/predictions.svg', alt: 'Vista previsioni generate dal modello ML' },
  ],
  problem:
    'Chi segue il tennis a livello statistico si trova con dati sparsi su fonti diverse, difficili da confrontare e da trasformare in informazioni utili per capire l\'andamento di un match o di un giocatore.',
  context:
    'Nasce dall\'unione di due interessi: lo sviluppo full-stack e l\'applicazione pratica del Machine Learning a un dominio con grandi quantità di dati storici disponibili.',
  solution:
    'Un sistema che raccoglie i dati, li organizza in un formato coerente e li espone attraverso una dashboard chiara, affiancando ai dati storici un modello predittivo che stima le probabilità di un risultato sulla base delle statistiche disponibili.',
  myRole:
    'Ho progettato e sviluppato l\'intera piattaforma: raccolta ed elaborazione dei dati, backend con le API, addestramento e integrazione del modello di Machine Learning, interfaccia frontend per la consultazione.',
  keyFeatures: [
    'Dashboard con statistiche su giocatori e match',
    'Modello di Machine Learning per la stima delle probabilità di risultato',
    'Storico dati organizzato e consultabile',
    'Interfaccia pensata per una lettura rapida delle informazioni',
  ],
  businessValue: [
    'Trasforma dati grezzi e dispersi in informazioni leggibili e utilizzabili',
    'Dimostra un caso concreto di applicazione del Machine Learning a un dominio di dati reali',
    'Architettura pensata per essere estesa ad altri sport o altre tipologie di analisi',
  ],
  architecture:
    'Backend Python con FastAPI per l\'esposizione dei dati e delle previsioni, pipeline dedicata alla raccolta e pulizia dei dati, modello di Machine Learning addestrato con Scikit-learn, database PostgreSQL per la persistenza, frontend React per la consultazione.',
  challenges: [
    'Normalizzare dati storici provenienti da fonti eterogenee in un formato coerente',
    'Selezionare le feature più significative per il modello predittivo',
    'Progettare una pipeline di aggiornamento dati sostenibile nel tempo',
  ],
  results: [
    'Piattaforma funzionante end-to-end, dalla raccolta dati alla visualizzazione delle previsioni',
    'Modello di Machine Learning integrato e utilizzato in produzione',
    'Base tecnica riutilizzabile per estendere l\'analisi ad altri sport',
  ],
  technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Scikit-learn'],
  skills: ['Full-Stack development', 'Machine Learning', 'Progettazione API', 'Data engineering'],
  githubUrl: '',
  liveUrl: '',
  demoVideoUrl: '',
  seoTitle: 'Oracle Tennis — Case study | GlobeTrotta',
  seoDescription:
    'Come ho progettato e sviluppato una piattaforma che trasforma dati sportivi in analisi e previsioni attraverso modelli di Machine Learning.',
}

export default oracleTennis
