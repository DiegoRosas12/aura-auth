import { Company, CompanySearchCriteria } from '../entity/Company'

/**
 * Company Repository Interface
 * Defines contract for company data access
 */
export interface CompanyRepository {
  /**
   * Get all companies from the catalog
   */
  getAllCompanies(): Promise<Company[]>

  /**
   * Search companies by criteria
   */
  searchCompanies(criteria: CompanySearchCriteria): Promise<Company[]>

  /**
   * Get a company by ticker symbol
   */
  getCompanyByTicker(ticker: string): Promise<Company | null>
}
