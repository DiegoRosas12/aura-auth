import { Company, CompanySearchCriteria } from '../entity/Company'

export interface CompanyRepository {
  getAllCompanies(): Promise<Company[]>

  searchCompanies(criteria: CompanySearchCriteria): Promise<Company[]>

  getCompanyByTicker(ticker: string): Promise<Company | null>
}
