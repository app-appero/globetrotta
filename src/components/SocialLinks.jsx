import { useContentBlock } from '../hooks/usePublicContent.jsx'
import { normalizeExternalUrl } from '../utils/externalUrl.js'

const ICONS = {
  linkedin: (
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3ZM20.44 20h-3.37v-5.98c0-1.43-.03-3.26-1.99-3.26-1.99 0-2.3 1.55-2.3 3.15V20H9.4V8.5h3.24v1.57h.05c.45-.85 1.56-1.75 3.21-1.75 3.43 0 4.06 2.26 4.06 5.2V20Z" />
  ),
  github: (
    <path d="M12 2.5a9.9 9.9 0 0 0-3.13 19.3c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.68-.1-.26-.45-1.29.1-2.68 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.4.2 2.42.1 2.68.64.7 1.03 1.59 1.03 2.68 0 3.84-2.35 4.68-4.58 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A9.9 9.9 0 0 0 12 2.5Z" />
  ),
  mail: (
    <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2.2V18h16V7.2l-7.4 5.55a1 1 0 0 1-1.2 0L4 7.2Zm.6-.7 7.4 5.55L19.4 6.5H4.6Z" />
  ),
  upwork: <text x="4" y="16" fontSize="12" fontWeight="700">Up</text>,
  freelancer: <text x="3" y="16" fontSize="11" fontWeight="700">Fr</text>,
  fiverr: <text x="3" y="16" fontSize="11" fontWeight="700">Fi</text>,
  instagram: (
    <path d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9a4.75 4.75 0 0 1-4.75 4.75h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Zm0 2A2.75 2.75 0 0 0 4.75 7.5v9a2.75 2.75 0 0 0 2.75 2.75h9a2.75 2.75 0 0 0 2.75-2.75v-9a2.75 2.75 0 0 0-2.75-2.75h-9Zm4.5 2.25a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Z" />
  ),
  tiktok: (
    <path d="M14.25 3h2.2c.25 1.63 1.2 2.76 2.8 3.35v2.2a8.1 8.1 0 0 1-2.78-.88v5.2a5.13 5.13 0 1 1-4.43-5.08v2.25a2.9 2.9 0 1 0 2.2 2.83V3Z" />
  ),
}

export default function SocialLinks({ className = '' }) {
  const { data: site } = useContentBlock('site')
  const links = [
    { label: 'LinkedIn', href: normalizeExternalUrl(site.linkedinUrl), icon: 'linkedin' },
    { label: 'GitHub', href: normalizeExternalUrl(site.githubUrl), icon: 'github' },
    { label: 'Upwork', href: normalizeExternalUrl(site.upworkUrl), icon: 'upwork' },
    { label: 'Freelancer', href: normalizeExternalUrl(site.freelancerUrl), icon: 'freelancer' },
    { label: 'Fiverr', href: normalizeExternalUrl(site.fiverrUrl), icon: 'fiverr' },
    { label: 'Instagram', href: normalizeExternalUrl(site.instagramUrl), icon: 'instagram' },
    { label: 'TikTok', href: normalizeExternalUrl(site.tiktokUrl), icon: 'tiktok' },
    { label: 'Email', href: site.email ? `mailto:${site.email}` : '', icon: 'mail' },
  ].filter((link) => link.href)
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={link.label}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-ink-800/15 text-ink-700 transition-colors duration-200 ease-smooth hover:border-accent-500 hover:text-accent-600"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              {ICONS[link.icon]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
