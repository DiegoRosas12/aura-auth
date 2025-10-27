import { useState, useEffect } from 'react'
import { MainLayout } from '../components/MainLayout'
import { Company } from '@domain/entity/Company'
import { companyRepository } from '@infrastructure/repository/CompanyRepository'
import { useCompanySearch } from '@application/hooks/useCompanySearch'
import { SearchHeroSection } from './search/SearchHeroSection'
import { CompanySearchInput } from './search/CompanySearchInput'
import { CompanyListPanel } from './search/CompanyListPanel'

const plusIcon = '/plus-icon.svg'
const heroBackground = '/hero-background.png'
const documentsIcon = '/search-data.svg'
const fileBundleIcon = '/upload-data.svg'
const aiToolIcon = '/ai-tool.svg'
const stockGraphic = '/stock-graphic.svg'

export const SearchDataPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [savedCompanies, setSavedCompanies] = useState<string[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { companies: searchResults, isLoading: isSearching, searchCompanies } = useCompanySearch()

  useEffect(() => {
    loadCompanies()
  }, [])

  useEffect(() => {
    let timeoutId: number | null = null

    if (searchQuery.trim().length >= 2) {
      setShowDropdown(true)
      timeoutId = setTimeout(() => {
        searchCompanies(searchQuery)
      }, 300) as unknown as number
    } else {
      setShowDropdown(false)
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [searchQuery, searchCompanies])

  const loadCompanies = async () => {
    setIsLoading(true)
    try {
      const data = await companyRepository.getAllCompanies()
      setCompanies(data)
    } catch (error) {
      console.error('Failed to load companies:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectCompany = (company: Company) => {
    setSearchQuery('')
    setShowDropdown(false)

    if (!savedCompanies.includes(company.name)) {
      setSavedCompanies([...savedCompanies, company.name])

      const companyExists = companies.some((c) => c.name === company.name)
      if (!companyExists) {
        setCompanies([...companies, company])
      }
    }
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
  }

  const handleCloseDropdown = () => {
    setShowDropdown(false)
  }

  const handleAddCompany = (companyName: string) => {
    if (!savedCompanies.includes(companyName)) {
      setSavedCompanies([...savedCompanies, companyName])
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <SearchHeroSection
          heroBackground={heroBackground}
          documentsIcon={documentsIcon}
          fileBundleIcon={fileBundleIcon}
          aiToolIcon={aiToolIcon}
        />

        <div className="flex justify-between px-[12%] py-[110px]">
          <div className="flex flex-col gap-[16px] w-[498px]">
            <div className="flex flex-col gap-[8px]">
              <p className="text-[#6869ac] text-[22px] font-bold whitespace-nowrap">
                5,000+ companies with data and insight for you
              </p>
              <div className="text-[#101723] text-[16px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                <p className="mb-0">Find the company you are interested in.</p>
                <p>This will help us customize your experience.</p>
              </div>
            </div>

            <CompanySearchInput
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              searchResults={searchResults}
              isSearching={isSearching}
              showDropdown={showDropdown}
              onSelectCompany={handleSelectCompany}
              onCloseDropdown={handleCloseDropdown}
            />

            <CompanyListPanel
              companies={companies}
              savedCompanies={savedCompanies}
              isLoading={isLoading}
              plusIcon={plusIcon}
              onAddCompany={handleAddCompany}
            />
          </div>

          <div className="mx-auto p-4">
            <img src={stockGraphic} alt="Stock Graphic" className="w-full h-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
