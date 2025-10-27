import { CompanySearchRepository as CompanySearchRepositoryInterface } from '@domain/repository/CompanySearchRepository'
import { Company } from '@domain/entity/Company'
import axios from 'axios'

interface ClearbitCompanyDto {
  name: string
  domain: string
  logo?: string
}

export class CompanySearchRepositoryImpl implements CompanySearchRepositoryInterface {
  private readonly CLEARBIT_API_URL = 'https://autocomplete.clearbit.com/v1/companies/suggest'

  async searchCompanies(query: string): Promise<Company[]> {
    if (!query || query.trim().length === 0) {
      return []
    }

    try {
      const response = await axios.get<ClearbitCompanyDto[]>(this.CLEARBIT_API_URL, {
        params: { query: query.trim() },
      })

      return response.data.map((dto) => ({
        name: dto.name,
        domain: dto.domain,
        logo: dto.logo,
      }))
    } catch (error) {
      console.error('Error searching companies:', error)
      return []
    }
  }
}

export const companySearchRepository = new CompanySearchRepositoryImpl()
