/**
 * Forensic Chronometer & Indian Standard Time (IST) Formatter
 */

export function getIndianStandardTime(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

export function formatMicrosecondAuditStamp(date: Date = new Date()): string {
  const iso = date.toISOString();
  const micros = Math.floor(Math.random() * 900 + 100); // Microsecond simulation
  return `${iso.replace('Z', '')}.${micros}Z`;
}
