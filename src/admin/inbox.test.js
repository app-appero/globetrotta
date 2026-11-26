import assert from 'node:assert/strict'
import test from 'node:test'
import { isNewContactRequest, isPendingPublicFeedback, summarizeIncoming } from './inbox.js'

test('conta come nuova una richiesta senza stato o con stato new', () => {
  assert.equal(isNewContactRequest({ status: 'new' }), true)
  assert.equal(isNewContactRequest({}), true)
  assert.equal(isNewContactRequest({ status: 'read' }), false)
})

test('il feedback da notificare è solo quello pubblico ancora in attesa', () => {
  assert.equal(isPendingPublicFeedback({ status: 'pending', source: 'feedback-form' }), true)
  assert.equal(isPendingPublicFeedback({ status: 'pending', source: 'admin' }), false)
  assert.equal(isPendingPublicFeedback({ status: 'approved', source: 'feedback-form' }), false)
})

test('prepara il testo dell’avviso per richiesta e feedback', () => {
  assert.deepEqual(summarizeIncoming({ name: 'Ada', status: 'new' }, 'contactRequests'), {
    title: 'Nuova richiesta di lavoro',
    body: 'Ada ha inviato una richiesta dal sito.',
    href: '/admin/richieste',
  })
  assert.deepEqual(summarizeIncoming({
    clientName: 'Giulia',
    status: 'pending',
    source: 'feedback-form',
  }, 'testimonials'), {
    title: 'Nuovo feedback',
    body: 'Giulia ha lasciato un feedback da verificare.',
    href: '/admin/testimonianze',
  })
  assert.equal(summarizeIncoming({ status: 'read', name: 'Ada' }, 'contactRequests'), null)
})
