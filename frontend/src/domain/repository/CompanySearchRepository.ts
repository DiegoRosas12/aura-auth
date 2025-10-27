import { Company } from '../dto/Company'

export interface CompanySearchRepository {
  searchCompanies(query: string): Promise<Company[]>
}
