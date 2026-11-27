/**
 * OpenFish STIX 2.1 Cyber Threat Intelligence Exporter
 * Serializes case data for CERT-In, I4C, and MISP threat sharing.
 */

export function exportToStixBundle(caseRecord: any) {
  const bundleId = `bundle--${Math.random().toString(36).substring(2, 15)}`;
  const indicatorId = `indicator--${Math.random().toString(36).substring(2, 15)}`;

  return {
    type: 'bundle',
    id: bundleId,
    objects: [
      {
        type: 'indicator',
        spec_version: '2.1',
        id: indicatorId,
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
        name: `OpenFish Detection: ${caseRecord.target}`,
        description: `Automated detection of fraudulent infrastructure targeting ${caseRecord.impersonating || 'Financial Services'}.`,
        pattern_type: 'stix',
        pattern: `[url:value = '${caseRecord.target}']`,
        valid_from: new Date().toISOString(),
      },
    ],
  };
}
