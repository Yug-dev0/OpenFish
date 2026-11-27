/**
 * OpenFish Store & State Types
 */

export interface CaseFilterOptions {
  searchQuery?: string;
  verdictFilter?: 'ALL' | 'SCAMS' | 'ACTIVE' | 'LEGIT';
  brandFilter?: string;
}

export interface CaseStoreStats {
  totalCases: number;
  confirmedScams: number;
  clearedLegitimate: number;
  totalUpisExtracted: number;
  totalPhonesExtracted: number;
}
