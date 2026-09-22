/**
 * Dati di contatto e social del sito, centralizzati in un unico punto.
 * I canali non configurati devono restare vuoti: la UI non li renderizza.
 */
export const SITE_URL = 'https://globetrotta.com'

const site = {
  name: 'GlobeTrotta',
  author: 'Rosario Trotta',
  role: 'Full-Stack & AI Developer',
  url: SITE_URL,
  assets: {
    profilePhoto: '',
    ogImage: '',
  },
  copyrightYear: '2026',
  email: 'hello@globetrotta.com',
  linkedinUrl: 'https://www.linkedin.com/in/rosario-michele-trotta',
  githubUrl: 'https://github.com/rosariotrotta',
  upworkUrl: '',
  freelancerUrl: '',
  fiverrUrl: '',
  instagramUrl: '',
  tiktokUrl: '',
  theme: 'light',
  whatsappNumber: '',
  whatsappMessage: '',
}

export default site
