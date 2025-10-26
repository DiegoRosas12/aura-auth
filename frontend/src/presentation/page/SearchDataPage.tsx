import { useState, useEffect, useRef } from 'react'
import { MainLayout } from '../component/template/MainLayout'
import { Company } from '@domain/entity/Company'
import { companyRepository } from '@infrastructure/repository/CompanyRepository'
import { useCompanySearch } from '@application/hooks/useCompanySearch'
import { ActionCard } from '../component/molecule/ActionCard'

const plusIcon = 'http://localhost:3845/assets/730c6372c1a0244c8c3a33b4c229c38267e1e5c0.svg'
const heroBackground = 'http://localhost:3845/assets/f5a228e1337faff61e75ea74307586f380ea6814.png'
const documentsIcon = 'http://localhost:3845/assets/c1a868a62fcf4ab930b333c1eca88967385e4508.svg'
const fileBundleIcon = 'http://localhost:3845/assets/e3ad1e48ddfb4955851c7f971e03af16acdb805a.svg'
const aiToolIcon = 'http://localhost:3845/assets/0948bd5a7b488f0d37da3c027162de3154169c56.svg'
const stockGraphic = '/stock-graphic.svg'

/**
 * Search Data Page
 * Main page for searching company data
 */
export const SearchDataPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [savedCompanies, setSavedCompanies] = useState<string[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const { companies: searchResults, isLoading: isSearching, searchCompanies } = useCompanySearch()
  const searchTimeoutRef = useRef<number | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Load companies on mount
  useEffect(() => {
    loadCompanies()
  }, [])

  // Search companies when query changes (with debounce)
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.trim().length >= 2) {
      setShowDropdown(true)
      searchTimeoutRef.current = setTimeout(() => {
        searchCompanies(searchQuery)
      }, 300)
    } else {
      setShowDropdown(false)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, searchCompanies])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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

    // Add to saved companies if not already saved
    if (!savedCompanies.includes(company.name)) {
      setSavedCompanies([...savedCompanies, company.name])

      // Also add to the displayed companies list if not already there
      const companyExists = companies.some((c) => c.name === company.name)
      if (!companyExists) {
        setCompanies([...companies, company])
      }
    }
  }

  const handleAddCompany = (companyName: string) => {
    if (!savedCompanies.includes(companyName)) {
      setSavedCompanies([...savedCompanies, companyName])
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div
          className="relative rounded-[4px] overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            paddingBottom: '32px',
          }}
        >
          {/* Title */}
          <div className="pt-[32px] flex flex-col items-center gap-[8px]">
            <div className="flex gap-[16px] items-center justify-center h-[60px]">
              <p className="text-[#fcfcfc] text-[32px] font-bold">AURA</p>
            </div>
            <p className="text-white text-[24px] font-bold whitespace-nowrap">
              Augmented Universal Research Assistant
            </p>
            <p className="text-white text-[16px] text-center whitespace-nowrap [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
              Your in one single intuitive platform along side with your team.
            </p>
          </div>

          {/* Action Cards */}
          <div className="mt-[32px] flex justify-center gap-[32px]">
            <ActionCard icon={documentsIcon} label="Search Data" />
            <ActionCard icon={fileBundleIcon} label="Upload your Data" />
            <ActionCard
              icon={aiToolIcon}
              label="Try our AI Tool"
              iconClassName="w-full h-full transform rotate-180 scale-y-[-1]"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-between px-[12%] py-[110px]">
          {/* Left Side - Search and Companies */}
          <div className="flex flex-col gap-[16px] w-[498px]">
            {/* Title */}
            <div className="flex flex-col gap-[8px]">
              <p className="text-[#6869ac] text-[22px] font-bold whitespace-nowrap">
                5,000+ companies with data and insight for you
              </p>
              <div className="text-[#101723] text-[16px] [text-shadow:0px_4px_4px_rgba(0,0,0,0.25)]">
                <p className="mb-0">Find the company you are interested in.</p>
                <p>This will help us customize your experience.</p>
              </div>
            </div>

            {/* Search Input with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies..."
                className="border border-[#cfcfd4] rounded-[4px] px-[16px] py-[12px] w-full text-[16px] font-bold focus:outline-none focus:border-[#6869ac]"
              />

              {/* Dropdown Results */}
              {showDropdown && searchQuery.trim().length >= 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#cfcfd4] rounded-[4px] shadow-lg max-h-[200px] overflow-y-auto z-10">
                  {isSearching ? (
                    <div className="p-[8px] text-[#101723] text-[16px]">Searching...</div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-[8px] text-[#101723] text-[16px]">No companies found</div>
                  ) : (
                    searchResults.map((company, index) => (
                      <div
                        key={`${company.domain}-${index}`}
                        onClick={() => handleSelectCompany(company)}
                        className="p-[8px] hover:bg-[#e8e5f9] cursor-pointer flex items-center gap-[8px] text-[16px] text-[#101723]"
                      >
                        {company.logo && (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-[24px] h-[24px] rounded"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                        <div className="flex gap-[4px]">
                          <span className="font-bold">
                            {company.domain.split('.')[0].toUpperCase()}
                          </span>
                          <span className="font-normal">{company.name}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Companies List */}
            <div className="bg-[#f9f5fd] rounded-[4px] p-[16px] flex flex-col gap-[16px]">
              {isLoading ? (
                <div className="text-center py-8 text-[#6869ac]">Loading companies...</div>
              ) : companies.length === 0 ? (
                <div className="text-center py-8 text-[#6869ac]">No companies found</div>
              ) : (
                <>
                  {/* Render companies in rows of 2 */}
                  {Array.from({ length: Math.ceil(companies.length / 2) }).map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-[16px]">
                      {companies.slice(rowIndex * 2, rowIndex * 2 + 2).map((company, idx) => (
                        <CompanyTag
                          key={`${company.name}-${idx}`}
                          company={company}
                          onAdd={handleAddCompany}
                          isSaved={savedCompanies.includes(company.name)}
                        />
                      ))}
                    </div>
                  ))}

                  {/* Saved Count */}
                  <div className="flex items-center justify-between text-[#4e5159] text-[14px] font-bold">
                    <p>{savedCompanies.length} Companies saved</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="mx-auto p-4">
            <img src={stockGraphic} alt="Stock Graphic" className="w-full h-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

interface CompanyTagProps {
  company: Company
  onAdd: (name: string) => void
  isSaved: boolean
}

const CompanyTag = ({ company, onAdd, isSaved }: CompanyTagProps) => {
  const ticker = company.domain ? company.domain.split('.')[0].toUpperCase() : 'N/A'

  return (
    <div
      className={`border rounded-[4px] p-[8px] flex items-center gap-[8px] ${
        isSaved ? 'bg-[#e8e5f9] border-[#6869ac]' : 'bg-white border-[#cfcfd4]'
      }`}
    >
      {company.logo && (
        <img
          src={company.logo}
          alt={company.name}
          className="w-[24px] h-[24px] rounded"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      )}
      <div className="flex items-center gap-[4px] text-[16px] text-[#101723]">
        <span className="font-bold">{ticker}</span>
        <span>{company.name}</span>
      </div>
      <button
        onClick={() => !isSaved && onAdd(company.name)}
        disabled={isSaved}
        className={`w-[24px] h-[24px] flex items-center justify-center transition-opacity ${
          isSaved ? 'opacity-30 cursor-not-allowed' : 'hover:opacity-70 cursor-pointer'
        }`}
        title={isSaved ? 'Already saved' : 'Add company'}
      >
        <img src={plusIcon} alt="Add" className="w-[18px] h-[18px]" />
      </button>
    </div>
  )
}
