import { logger } from 'firebase-functions'
import { defineSecret } from 'firebase-functions/params'
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import nodemailer from 'nodemailer'
import { buildMail, isMailConfigured, readMailConfig } from './mailConfig.js'
import { buildContactNotification, buildFeedbackNotification } from './notifyMessages.js'

const smtpPass = defineSecret('SMTP_PASS')

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

const region = 'europe-west8'

export const mailContactRequest = onDocumentCreated({
  document: 'contactRequests/{requestId}',
  region,
  secrets: [smtpPass],
}, (event) => {
  return deliver(buildContactNotification(event.data?.data(), readMailConfig().siteUrl))
})

export const mailFeedback = onDocumentCreated({
  document: 'testimonials/{testimonialId}',
  region,
  secrets: [smtpPass],
}, (event) => {
  return deliver(buildFeedbackNotification(event.data?.data(), readMailConfig().siteUrl))
})
