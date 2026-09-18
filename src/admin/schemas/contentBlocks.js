/**
 * Schema dei blocchi di contenuto editabili da /admin/contenuti/:blockId.
 * L'id di ogni blocco corrisponde sia al documento Firestore (content/{id})
 * sia al file dati rigenerato da scripts/sync-content.mjs (src/data/{id}.js).
 * "solutions" e "process" sono salvati come { items: [...] } su Firestore ma
 * il file dati pubblicato resta un array (per non toccare i componenti che
 * già li consumano) — vedi unwrap in scripts/sync-content.mjs.
 */
export const CONTENT_BLOCKS = [
  {
    id: 'site',
    label: 'Sito & contatti',
    fields: [
      { key: 'name', label: 'Nome brand', type: 'text' },
      { key: 'author', label: 'Autore', type: 'text' },
      { key: 'role', label: 'Ruolo', type: 'text' },
      { key: 'url', label: 'URL del sito', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
      { key: 'whatsappUrl', label: 'WhatsApp URL', type: 'text' },
    ],
  },
  {
    id: 'hero',
    label: 'Hero (homepage)',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'headline', label: 'Headline', type: 'textarea' },
      { key: 'subheadline', label: 'Sottotitolo', type: 'textarea' },
      { key: 'ctaPrimaryLabel', label: 'CTA primaria', type: 'text' },
      { key: 'ctaSecondaryLabel', label: 'CTA secondaria', type: 'text' },
      { key: 'microCopy', label: 'Micro-copy', type: 'text' },
    ],
  },
  {
    id: 'problems',
    label: 'Sezione problemi',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      {
        key: 'items',
        label: 'Domande e risposte',
        type: 'objectList',
        itemFields: [
          { key: 'question', label: 'Domanda', type: 'text' },
          { key: 'answer', label: 'Risposta', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'newBusiness',
    label: 'Nuove attività',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'paragraphs', label: 'Paragrafi', type: 'stringList' },
      { key: 'ctaLabel', label: 'Etichetta CTA', type: 'text' },
      {
        key: 'paths',
        label: 'Percorsi',
        type: 'objectList',
        itemFields: [
          { key: 'title', label: 'Titolo', type: 'text' },
          { key: 'description', label: 'Descrizione', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'mvpApproach',
    label: 'Approccio MVP',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      {
        key: 'principles',
        label: 'Principi',
        type: 'objectList',
        itemFields: [
          { key: 'title', label: 'Titolo', type: 'text' },
          { key: 'description', label: 'Descrizione', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Soluzioni',
    fields: [
      {
        key: 'items',
        label: 'Soluzioni proposte',
        type: 'objectList',
        itemFields: [
          { key: 'id', label: 'ID interno (slug)', type: 'text' },
          { key: 'title', label: 'Titolo', type: 'text' },
          { key: 'description', label: 'Descrizione', type: 'textarea' },
          { key: 'examples', label: 'Esempi', type: 'stringList' },
        ],
      },
    ],
  },
  {
    id: 'process',
    label: 'Processo / Come lavoro',
    fields: [
      {
        key: 'items',
        label: 'Fasi del processo',
        type: 'objectList',
        itemFields: [
          { key: 'number', label: 'Numero (es. 01)', type: 'text' },
          { key: 'title', label: 'Titolo', type: 'text' },
          { key: 'description', label: 'Descrizione', type: 'textarea' },
        ],
      },
    ],
  },
  {
    id: 'techStack',
    label: 'Tech stack',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'text' },
      { key: 'note', label: 'Nota finale', type: 'textarea' },
      {
        key: 'groups',
        label: 'Gruppi di tecnologie',
        type: 'objectList',
        itemFields: [
          { key: 'title', label: 'Titolo gruppo', type: 'text' },
          { key: 'items', label: 'Tecnologie', type: 'stringList' },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'Chi sono',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'name', label: 'Nome', type: 'text' },
      { key: 'role', label: 'Ruolo', type: 'text' },
      { key: 'photo', label: 'Foto', type: 'image', uploadPath: 'about' },
      { key: 'paragraphs', label: 'Paragrafi biografia', type: 'stringList' },
      { key: 'cvNote', label: 'Nota CV', type: 'text' },
      { key: 'ctaTitle', label: 'Titolo CTA finale pagina', type: 'text' },
      { key: 'ctaDescription', label: 'Descrizione CTA finale pagina', type: 'textarea' },
    ],
  },
  {
    id: 'finalCta',
    label: 'CTA finale (homepage)',
    fields: [
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      { key: 'primaryLabel', label: 'Etichetta CTA primaria', type: 'text' },
      { key: 'secondaryLabel', label: 'Etichetta CTA secondaria', type: 'text' },
    ],
  },
  {
    id: 'contact',
    label: 'Contatti',
    fields: [
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'description', label: 'Descrizione', type: 'textarea' },
      {
        key: 'channelDescriptions',
        label: 'Descrizioni canali',
        type: 'object',
        itemFields: [
          { key: 'email', label: 'Descrizione Email', type: 'text' },
          { key: 'linkedin', label: 'Descrizione LinkedIn', type: 'text' },
          { key: 'whatsapp', label: 'Descrizione WhatsApp', type: 'text' },
        ],
      },
      { key: 'noteTitle', label: 'Titolo box "Cosa scrivermi"', type: 'text' },
      { key: 'noteBody', label: 'Testo box "Cosa scrivermi"', type: 'textarea' },
    ],
  },
]
