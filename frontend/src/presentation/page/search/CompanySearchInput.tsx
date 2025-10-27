import { useEffect, useRef } from 'react'
import { Company } from '@domain/entity/Company'
import { SearchResultItem } from './SearchResultItem'

interface CompanySearchInputProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  searchResults: Company[]
  isSearching: boolean
  showDropdown: boolean
  onSelectCompany: (company: Company) => void
  onCloseDropdown: () => void
}

export const CompanySearchInput = ({
  searchQuery,
  onSearchChange,
  searchResults,
  isSearching,
  showDropdown,
  onSelectCompany,
  onCloseDropdown,
}: CompanySearchInputProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onCloseDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onCloseDropdown])

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search companies..."
        className="border border-[#cfcfd4] rounded-[4px] px-[16px] py-[12px] w-full text-[16px] font-bold focus:outline-none focus:border-[#6869ac]"
      />

      {showDropdown && searchQuery.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#cfcfd4] rounded-[4px] shadow-lg max-h-[200px] overflow-y-auto z-10">
          {isSearching ? (
            <div className="p-[8px] text-[#101723] text-[16px]">Searching...</div>
          ) : searchResults.length === 0 ? (
            <div className="p-[8px] text-[#101723] text-[16px]">No companies found</div>
          ) : (
            searchResults.map((company, index) => (
              <SearchResultItem
                key={`${company.domain}-${index}`}
                company={company}
                onClick={onSelectCompany}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
