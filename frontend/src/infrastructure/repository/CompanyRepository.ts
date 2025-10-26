import { CompanyRepository as CompanyRepositoryInterface } from '@domain/repository/CompanyRepository'
import { Company, CompanySearchCriteria } from '@domain/entity/Company'

/**
 * Company Repository Implementation
 * Handles company catalog data access
 * Currently uses in-memory data, can be extended to use API calls
 */
export class CompanyRepositoryImpl implements CompanyRepositoryInterface {
  private companies: Company[] = [
    { name: 'Amazon', domain: 'amazon.com' },
    { name: 'Microsoft', domain: 'microsoft.com' },
    { name: 'Elastic', domain: 'elastic.co' },
    { name: 'Unity Software', domain: 'unity.com' },
    { name: 'Carvana Co', domain: 'carvana.com' },
    { name: 'EPAM Systems', domain: 'epam.com' },
    { name: 'Warner Bros', domain: 'warnerbros.com' },
  ]

  async getAllCompanies(): Promise<Company[]> {
    // Simulate async operation
    return Promise.resolve([...this.companies])
  }

  async searchCompanies(criteria: CompanySearchCriteria): Promise<Company[]> {
    let results = [...this.companies]

    // Filter by query if provided
    if (criteria.query && criteria.query.trim() !== '') {
      const query = criteria.query.toLowerCase()
      results = results.filter(
        (company) =>
          company.domain.toLowerCase().includes(query) ||
          company.name.toLowerCase().includes(query)
      )
    }

    // Apply limit if provided
    if (criteria.limit && criteria.limit > 0) {
      results = results.slice(0, criteria.limit)
    }

    return Promise.resolve(results)
  }

  async getCompanyByTicker(domain: string): Promise<Company | null> {
    const company = this.companies.find(
      (c) => c.domain.toLowerCase() === domain.toLowerCase()
    )
    return Promise.resolve(company || null)
  }
}

// Singleton instance
export const companyRepository = new CompanyRepositoryImpl()
