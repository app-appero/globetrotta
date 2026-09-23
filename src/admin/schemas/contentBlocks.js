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
      { key: 'copyrightYear', label: 'Anno copyright', type: 'text' },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'text' },
      { key: 'githubUrl', label: 'GitHub URL', type: 'text' },
      { key: 'upworkUrl', label: 'Upwork URL', type: 'text' },
      { key: 'freelancerUrl', label: 'Freelancer URL', type: 'text' },
      { key: 'fiverrUrl', label: 'Fiverr URL', type: 'text' },
      { key: 'instagramUrl', label: 'Instagram URL', type: 'text' },
      { key: 'tiktokUrl', label: 'TikTok URL', type: 'text' },
      {
        key: 'theme',
        label: 'Tema del sito',
        type: 'radio',
        options: [
          { value: 'light', label: 'Chiaro' },
          { value: 'dark', label: 'Scuro' },
        ],
      },
      { key: 'whatsappNumber', label: 'Numero WhatsApp internazionale', type: 'text' },
      { key: 'whatsappMessage', label: 'Messaggio WhatsApp iniziale', type: 'text' },
      {
        key: 'assets',
        label: 'Asset del sito',
        type: 'object',
        itemFields: [
          { key: 'profilePhoto', label: 'Foto personale', type: 'image', uploadPath: 'about' },
          { key: 'ogImage', label: 'Immagine Open Graph 1200x630', type: 'image', uploadPath: 'og' },
        ],
      },
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
          { key: 'audience', label: 'Per chi è', type: 'textarea' },
          { key: 'problem', label: 'Problema tipico', type: 'textarea' },
          { key: 'description', label: 'Descrizione', type: 'textarea' },
          { key: 'examples', label: 'Esempi', type: 'stringList' },
          { key: 'deliverables', label: 'Cosa si può consegnare', type: 'stringList' },
          { key: 'howStart', label: 'Come si parte', type: 'textarea' },
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
    label: 'Tecnologie',
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
      { key: 'approachTitle', label: 'Titolo approccio', type: 'text' },
      { key: 'approach', label: 'Approccio di lavoro', type: 'textarea' },
      { key: 'focusTitle', label: 'Titolo ambiti', type: 'text' },
      { key: 'focusAreas', label: 'Problemi affrontati', type: 'stringList' },
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
      { key: 'formTitle', label: 'Titolo form', type: 'text' },
      { key: 'formDescription', label: 'Descrizione form', type: 'textarea' },
      { key: 'formUnavailableMessage', label: 'Messaggio form non configurato', type: 'textarea' },
      { key: 'noteTitle', label: 'Titolo box "Cosa scrivermi"', type: 'text' },
      { key: 'noteBody', label: 'Testo box "Cosa scrivermi"', type: 'textarea' },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    fields: [
      { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
      { key: 'title', label: 'Titolo', type: 'text' },
      { key: 'intro', label: 'Introduzione', type: 'textarea' },
      { key: 'seoDescription', label: 'Meta description', type: 'textarea' },
      { key: 'updatedAt', label: 'Data ultimo aggiornamento', type: 'text' },
      {
        key: 'sections',
        label: 'Sezioni della Privacy Policy',
        type: 'objectList',
        itemFields: [
          { key: 'title', label: 'Titolo sezione', type: 'text' },
          { key: 'paragraphs', label: 'Paragrafi', type: 'stringList' },
        ],
      },
    ],
  },
]
