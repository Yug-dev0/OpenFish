/**
 * OpenFish Case Evidence JSON Exporter
 */

export function exportCaseToJson(caseRecord: any, pretty = true): string {
  const envelope = {
    schemaVersion: 'openfish-forensics-v1',
    exportedAt: new Date().toISOString(),
    generator: 'OpenFish Autonomous Cyber Intelligence Platform',
    case: {
      id: caseRecord.id,
      target: caseRecord.target,
      verdict: caseRecord.verdict,
      impersonating: caseRecord.impersonating,
      extracted: caseRecord.extracted,
      events: caseRecord.events || [],
      chainOfCustody: caseRecord.chainOfCustody,
    },
  };
  return JSON.stringify(envelope, null, pretty ? 2 : 0);
}
