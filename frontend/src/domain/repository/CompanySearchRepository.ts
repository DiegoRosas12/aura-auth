import { Company } from '../entity/Company'

export interface CompanySearchRepository {
  searchCompanies(query: string): Promise<Company[]>
}
