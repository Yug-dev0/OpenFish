/**
 * OpenFish Markdown Dossier Exporter
 * Generates police and cyber cell investigation briefs.
 */

export function exportCaseToMarkdown(c: any): string {
  const upis = (c.extracted?.upis || []).map((u: string) => `- \`${u}\``).join('\n') || '- None identified';
  const phones = (c.extracted?.phones || []).map((p: string) => `- \`${p}\``).join('\n') || '- None identified';

  return `# OPENFISH CYBER FORENSIC DOSSIER
**Incident Reference:** \`#${c.id}\`  
**Generated On:** ${new Date().toUTCString()}  
**Verdict:** **${c.verdict?.toUpperCase() || 'SUSPICIOUS'}**  

---

## 1. Target Overview
- **Suspect Entity:** \`${c.target}\`
- **Impersonated Institution:** ${c.impersonating || 'Unspecified Entity'}

## 2. Unmasked Financial Rails
### Extracted UPI Virtual Payment Addresses (VPAs):
${upis}

### Extracted Smishing / WhatsApp Phone Numbers:
${phones}

---

## 3. Statutory Notice (Section 65B Indian Evidence Act)
This digital evidence dossier was automatically retrieved, rendered, and sealed by the OpenFish autonomous honeypot browser runtime. Cryptographic chain of custody guarantees tamper-evident provenance.
`;
}
