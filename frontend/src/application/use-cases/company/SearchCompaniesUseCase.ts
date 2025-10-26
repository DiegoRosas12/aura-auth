import { CompanySearchRepository } from '@domain/repository/CompanySearchRepository'
import { Company } from '@domain/entity/Company'

/**
 * Search Companies Use Case
 * Handles company search business logic
 */
export class SearchCompaniesUseCase {
  constructor(private companySearchRepository: CompanySearchRepository) {}

  async execute(query: string): Promise<Company[]> {
    // Validate input
    if (!query || query.trim().length < 2) {
      return []
    }

    // Search companies
    return await this.companySearchRepository.searchCompanies(query)
  }
}
