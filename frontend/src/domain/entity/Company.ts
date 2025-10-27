export interface Company {
  name: string
  domain: string
  logo?: string
}

export interface CompanySearchCriteria {
  query?: string
  limit?: number
}
