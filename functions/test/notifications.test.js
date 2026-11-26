import assert from 'node:assert/strict'
import test from 'node:test'
import { buildMail, isMailConfigured, readMailConfig } from '../mailConfig.js'
import { buildContactNotification, buildFeedbackNotification } from '../notifyMessages.js'

const siteUrl = 'https://globetrotta.com'

test('la richiesta di lavoro diventa un’email con risposta diretta al mittente', () => {
  const notification = buildContactNotification({
    name: 'Ada\nLovelace',
    email: 'ada@example.com',
    company: 'Analytical',
    need: 'ai',
    description: 'Vorrei automatizzare un processo.',
  }, siteUrl)

  assert.equal(notification.kind, 'contact')
  assert.equal(notification.subject, 'Nuova richiesta di lavoro da Ada Lovelace')
  assert.equal(notification.replyTo, 'ada@example.com')
  assert.match(notification.text, /Esigenza: AI applicata a un processo/)
  assert.match(notification.text, /Azienda: Analytical/)
  assert.match(notification.text, /https:\/\/globetrotta\.com\/admin\/richieste/)
})

test('un’email non valida non finisce in reply-to', () => {
  const notification = buildContactNotification({
    name: 'Mario',
    email: 'non-è-una-email',
    need: 'other',
    description: 'Ciao',
  }, siteUrl)

  assert.equal(notification.replyTo, undefined)
})

test('il feedback pubblico in attesa genera la notifica', () => {
  const notification = buildFeedbackNotification({
    source: 'feedback-form',
    status: 'pending',
    clientName: 'Giulia',
    companyName: 'Studio N',
    projectName: 'Portale',
    rating: 5,
    testimonialText: 'Lavoro chiaro e utile.',
  }, siteUrl)

  assert.equal(notification.subject, 'Nuovo feedback da Giulia')
  assert.match(notification.text, /Valutazione: 5\/5/)
  assert.match(notification.text, /https:\/\/globetrotta\.com\/admin\/testimonianze/)
})

test('una testimonianza creata dall’admin non genera email', () => {
  assert.equal(buildFeedbackNotification({
    source: 'admin',
    status: 'pending',
    clientName: 'Giulia',
    testimonialText: 'Bozza interna',
  }, siteUrl), null)
})

test('un feedback già approvato non genera email', () => {
  assert.equal(buildFeedbackNotification({
    source: 'feedback-form',
    status: 'approved',
    clientName: 'Giulia',
    testimonialText: 'Già pubblicato',
  }, siteUrl), null)
})

test('senza variabili usa Gmail e la casella admin, ma non risulta pronta senza password', () => {
  const config = readMailConfig({})
  assert.equal(config.host, 'smtp.gmail.com')
  assert.equal(config.port, 465)
  assert.equal(config.user, 'trottarosario@gmail.com')
  assert.equal(config.to, 'trottarosario@gmail.com')
  assert.equal(config.siteUrl, 'https://globetrotta.com')
  assert.equal(isMailConfigured(config), false)
})

test('la configurazione SMTP è completa solo con host, credenziali e indirizzi validi', () => {
  assert.equal(isMailConfigured(readMailConfig({ SMTP_PASS: '' })), false)
  const config = readMailConfig({
    SMTP_HOST: 'smtp.gmail.com',
    SMTP_PORT: '587',
    SMTP_USER: 'owner@gmail.com',
    SMTP_PASS: 'abcd efgh ijkl mnop',
    SMTP_FROM: 'GlobeTrotta <owner@gmail.com>',
    NOTIFY_TO: 'owner@gmail.com',
  })
  assert.equal(config.port, 587)
  assert.equal(config.pass, 'abcdefghijklmnop')
  assert.equal(config.from, 'GlobeTrotta <owner@gmail.com>')
  assert.equal(isMailConfigured(config), true)
  assert.deepEqual(buildMail({
    subject: 'Oggetto',
    text: 'Corpo',
    replyTo: 'ada@example.com',
  }, config), {
    from: 'GlobeTrotta <owner@gmail.com>',
    to: 'owner@gmail.com',
    subject: 'Oggetto',
    text: 'Corpo',
    replyTo: 'ada@example.com',
  })
})
