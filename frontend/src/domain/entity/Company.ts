/**
 * Company Entity
 * Represents a company in the catalog
 */
export interface Company {
  name: string
  domain: string
  logo?: string
}

/**
 * Search criteria for companies
 */
export interface CompanySearchCriteria {
  query?: string
  limit?: number
}
