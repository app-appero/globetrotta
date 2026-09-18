/**
 * Progetto placeholder: sostituiscilo con un case study reale seguendo
 * la stessa struttura, oppure lascialo come esempio del modello dati.
 * @type {import('../../types/project.js').ProjectMetadata}
 */
const docPilot = {
  id: 'doc-pilot',
  slug: 'doc-pilot',
  title: 'DocPilot',
  subtitle: 'Assistente AI che legge documenti in ingresso e ne estrae automaticamente i dati principali.',
  shortDescription:
    'Strumento che utilizza un modello linguistico per leggere documenti (fatture, moduli, richieste) ed estrarne automaticamente i dati principali.',
  description:
    'DocPilot è uno strumento pensato per attività che ricevono ogni giorno documenti da leggere e trascrivere manualmente (fatture, moduli, richieste dei clienti). Un modello linguistico legge i documenti in ingresso ed estrae automaticamente le informazioni rilevanti, pronte per essere verificate e utilizzate.',
  category: ['AI', 'Automation'],
  year: '2025',
  status: 'Concept',
  role: 'AI Developer',
  featured: true,
  coverImage: '/projects/doc-pilot/cover.svg',
  gallery: [{ src: '/projects/doc-pilot/extraction.svg', alt: 'Vista estrazione dati da un documento' }],
  problem:
    'Molte attività dedicano tempo ogni giorno a leggere e trascrivere a mano informazioni da documenti in ingresso: fatture, moduli, richieste. Un\'attività ripetitiva, soggetta a errori e che sottrae tempo ad attività più importanti.',
  context:
    'Progetto esplorativo nato per capire dove un modello linguistico può realmente semplificare un\'attività manuale ricorrente, senza introdurre complessità inutile.',
  solution:
    'Un flusso in cui il documento viene caricato, letto da un modello linguistico e trasformato in dati strutturati (campi, importi, date, informazioni chiave), pronti per essere verificati rapidamente da una persona prima dell\'uso.',
  myRole:
    'Ho progettato il flusso di estrazione, integrato il modello linguistico per la lettura dei documenti e costruito l\'interfaccia di verifica dei dati estratti.',
  keyFeatures: [
    'Caricamento documenti (PDF, immagini)',
    'Estrazione automatica dei campi principali tramite modello linguistico',
    'Interfaccia di verifica rapida dei dati estratti prima dell\'utilizzo',
    'Flusso pensato per essere collegato a strumenti esistenti (gestionali, fogli di calcolo)',
  ],
  businessValue: [
    'Riduce il tempo dedicato alla trascrizione manuale di documenti ricorrenti',
    'Diminuisce il rischio di errori di trascrizione',
    'Applicazione concreta e mirata dell\'AI a un\'attività ripetitiva reale',
  ],
  architecture:
    'Pipeline di elaborazione documenti con integrazione a un modello linguistico (LLM) per l\'estrazione dei dati, interfaccia React per il caricamento dei documenti e la verifica dei risultati.',
  challenges: [
    'Strutturare i prompt per ottenere estrazioni affidabili su documenti con formati diversi',
    'Progettare un\'interfaccia di verifica che renda immediato correggere eventuali errori del modello',
  ],
  results: [
    'Flusso end-to-end funzionante dal caricamento del documento all\'estrazione dei dati',
    'Base tecnica pensata per essere collegata a strumenti già in uso da un\'attività',
  ],
  technologies: ['Python', 'LLM APIs', 'React'],
  skills: ['Integrazione LLM', 'Automazione di processi', 'Progettazione di flussi AI-assisted'],
  githubUrl: '',
  liveUrl: '',
  demoVideoUrl: '',
  seoTitle: 'DocPilot — Case study | GlobeTrotta',
  seoDescription:
    'Come ho progettato un assistente AI per estrarre automaticamente dati da documenti in ingresso, riducendo il lavoro manuale ripetitivo.',
}

export default docPilot
