import { Company, CompanySearchCriteria } from '../dto/Company'

export interface CompanyRepository {
  getAllCompanies(): Promise<Company[]>

  searchCompanies(criteria: CompanySearchCriteria): Promise<Company[]>

  getCompanyByTicker(ticker: string): Promise<Company | null>
}
