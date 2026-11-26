const DEFAULT_NOTIFY_TO = 'trottarosario@gmail.com'
const DEFAULT_SITE_URL = 'https://globetrotta.com'

export function oneLine(value, max = 200) {
  return String(value ?? '')
    .replace(/[\u0000-\u001F\u007F]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export function isEmail(value) {
  const email = oneLine(value, 320)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function mailbox(value) {
  const text = oneLine(value, 320)
  const wrapped = text.match(/<([^>]+)>$/)
  return isEmail(wrapped ? wrapped[1] : text)
}

export function readMailConfig(env = process.env) {
  const port = Number(env.SMTP_PORT)
  const user = oneLine(env.SMTP_USER, 320)
  const siteUrl = oneLine(env.SITE_URL, 300).replace(/\/$/, '') || DEFAULT_SITE_URL
  return {
    host: oneLine(env.SMTP_HOST, 200),
    port: Number.isInteger(port) && port > 0 ? port : 465,
    user,
    pass: String(env.SMTP_PASS || '').replace(/\s+/g, ''),
    from: oneLine(env.SMTP_FROM, 320) || user,
    to: oneLine(env.NOTIFY_TO, 320) || DEFAULT_NOTIFY_TO,
    siteUrl,
  }
}

export function isMailConfigured(config) {
  return Boolean(config?.host && config?.user && config?.pass && isEmail(config?.to) && mailbox(config?.from || config?.user))
}

export function buildMail(notification, config) {
  const message = {
    from: config.from || config.user,
    to: config.to,
    subject: notification.subject,
    text: notification.text,
  }
  if (notification.replyTo) message.replyTo = notification.replyTo
  return message
}
