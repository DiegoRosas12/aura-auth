import { CompanySearchRepository } from '@domain/repository/CompanySearchRepository'
import { Company } from '@domain/entity/Company'

export class SearchCompaniesUseCase {
  constructor(private companySearchRepository: CompanySearchRepository) {}

  async execute(query: string): Promise<Company[]> {
    if (!query || query.trim().length < 2) {
      return []
    }

    return await this.companySearchRepository.searchCompanies(query)
  }
}
