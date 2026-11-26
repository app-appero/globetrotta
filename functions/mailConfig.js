const DEFAULT_ENV = {
  SMTP_HOST: 'smtps.aruba.it',
  SMTP_PORT: '465',
  SMTP_USER: 'info@globetrotta.it',
  SMTP_FROM: 'info@globetrotta.it',
  NOTIFY_TO: 'info@globetrotta.it',
  SITE_URL: 'https://globetrotta.com',
}

function configuredValue(env, key) {
  const value = env?.[key]
  if (value == null || String(value).trim() === '') return DEFAULT_ENV[key] || ''
  return value
}

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
  const port = Number(configuredValue(env, 'SMTP_PORT'))
  const user = oneLine(configuredValue(env, 'SMTP_USER'), 320)
  const siteUrl = oneLine(configuredValue(env, 'SITE_URL'), 300).replace(/\/$/, '')
  return {
    host: oneLine(configuredValue(env, 'SMTP_HOST'), 200),
    port: Number.isInteger(port) && port > 0 ? port : 465,
    user,
    pass: String(env?.SMTP_PASS || '').replace(/\s+/g, ''),
    from: oneLine(configuredValue(env, 'SMTP_FROM'), 320) || user,
    to: oneLine(configuredValue(env, 'NOTIFY_TO'), 320),
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
