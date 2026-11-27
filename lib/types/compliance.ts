/**
 * Statutory Compliance & Forensic Verification Types
 */

export interface StatutoryFilingCertificate {
  certificateId: string;
  statutoryAct: 'Section 65B Indian Evidence Act 1872 / BSA 2023';
  jurisdiction: 'Republic of India';
  certifiedAtUtc: string;
  examinerName: string;
  examinerDesignation: string;
  digitalFootprintSha256: string;
}
