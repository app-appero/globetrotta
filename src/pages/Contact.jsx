import Seo from '../components/Seo.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import site from '../data/site.js'
import contact from '../data/contact.js'

export default function Contact() {
  const channels = [
    {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      description: contact.channelDescriptions.email,
    },
    {
      label: 'LinkedIn',
      value: 'in/rosario-trotta',
      href: site.linkedinUrl,
      description: contact.channelDescriptions.linkedin,
    },
    {
      label: 'WhatsApp',
      value: 'Scrivimi un messaggio',
      href: site.whatsappUrl,
      description: contact.channelDescriptions.whatsapp,
    },
  ]

  return (
    <>
      <Seo
        title="Contatti"
        description="Raccontami la tua idea o il problema che vuoi risolvere: scrivimi via email, LinkedIn o WhatsApp."
        path="/contatti"
      />

      <section className="py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Contatti" title={contact.title} description={contact.description} />

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
                className="flex flex-col rounded-2xl border border-ink-800/10 bg-paper-50 p-6 shadow-card transition-shadow duration-200 ease-smooth hover:shadow-card-hover sm:p-7"
              >
                <span className="text-fluid-sm font-semibold uppercase tracking-[0.08em] text-accent-600">
                  {channel.label}
                </span>
                <span className="mt-2 text-fluid-lg font-semibold text-ink-950">{channel.value}</span>
                <span className="mt-2 text-fluid-sm text-ink-600">{channel.description}</span>
              </a>
            ))}
          </div>

          <div className="mt-14 max-w-prose rounded-2xl bg-paper-100 p-6 sm:p-8">
            <h2 className="text-fluid-lg font-semibold text-ink-950">{contact.noteTitle}</h2>
            <p className="mt-3 text-fluid-base text-ink-600">{contact.noteBody}</p>
          </div>
        </div>
      </section>
    </>
  )
}
