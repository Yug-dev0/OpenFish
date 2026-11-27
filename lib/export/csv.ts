/**
 * OpenFish Fraud Triage CSV Exporter
 * Formatted for banking fraud desk ingestion.
 */

function escapeCsv(val: any): string {
  const str = String(val ?? '').replace(/"/g, '""');
  return `"${str}"`;
}

export function exportCasesToCsv(cases: any[]): string {
  const headers = ['Case ID', 'Target / URL', 'Verdict', 'Brand Impersonated', 'Extracted UPIs', 'Extracted Phones', 'Bank Accounts', 'Date Created'];
  const rows = cases.map(c => [
    escapeCsv(c.id),
    escapeCsv(c.target),
    escapeCsv(c.verdict),
    escapeCsv(c.impersonating || 'N/A'),
    escapeCsv((c.extracted?.upis || []).join(', ')),
    escapeCsv((c.extracted?.phones || []).join(', ')),
    escapeCsv((c.extracted?.accounts || []).join(', ')),
    escapeCsv(c.createdAt || new Date().toISOString()),
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
