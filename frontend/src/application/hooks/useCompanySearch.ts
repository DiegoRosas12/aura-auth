import { useState, useCallback } from 'react'
import { Company } from '@/domain/dto/Company'
import { SearchCompaniesUseCase } from '../use-cases/company/SearchCompaniesUseCase'
import { companySearchRepository } from '@infrastructure/repository/CompanySearchRepository'

const searchCompaniesUseCase = new SearchCompaniesUseCase(companySearchRepository)

export const useCompanySearch = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchCompanies = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setCompanies([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const results = await searchCompaniesUseCase.execute(query)
      setCompanies(results)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search companies'
      setError(errorMessage)
      setCompanies([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearResults = useCallback(() => {
    setCompanies([])
    setError(null)
  }, [])

  return {
    companies,
    isLoading,
    error,
    searchCompanies,
    clearResults,
  }
}
