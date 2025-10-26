import { Company } from '../entity/Company'

/**
 * Company Search Repository Interface
 * Defines contract for searching companies via external API
 */
export interface CompanySearchRepository {
  /**
   * Search companies by query string
   * @param query - Search term (company name)
   * @returns Promise with array of matching companies
   */
  searchCompanies(query: string): Promise<Company[]>
}
