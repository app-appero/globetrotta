import { logger } from 'firebase-functions'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import nodemailer from 'nodemailer'
import { buildMail, isMailConfigured, readMailConfig } from './mailConfig.js'
import { buildContactNotification, buildFeedbackNotification } from './notifyMessages.js'

async function deliver(notification) {
  if (!notification) return
  const config = readMailConfig()
  if (!isMailConfigured(config)) {
    logger.warn(`Notifica non inviata (${notification.kind}): SMTP non configurato.`)
    return
  }

  try {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    })
    await transport.sendMail(buildMail(notification, config))
    logger.info(`Notifica inviata (${notification.kind}).`)
  } catch (error) {
    logger.error(`Invio notifica fallito (${notification.kind}): ${error?.message || 'errore sconosciuto'}`)
  }
}

export const notifyContactRequest = onDocumentCreated('contactRequests/{requestId}', (event) => {
  return deliver(buildContactNotification(event.data?.data(), readMailConfig().siteUrl))
})

export const notifyFeedback = onDocumentCreated('testimonials/{testimonialId}', (event) => {
  return deliver(buildFeedbackNotification(event.data?.data(), readMailConfig().siteUrl))
})
