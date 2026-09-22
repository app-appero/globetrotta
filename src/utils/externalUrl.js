export function normalizeExternalUrl(value) {
  if (!value) return ''
  const trimmed = value.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (/^(www\.)?linkedin\.com\//i.test(trimmed)) return `https://${trimmed}`
  if (/^(www\.)?github\.com\//i.test(trimmed)) return `https://${trimmed}`
  if (/^(www\.)?[a-z0-9-]+\.[a-z]{2,}(\/|$)/i.test(trimmed)) return `https://${trimmed}`
  return trimmed
}
