import { Company } from '@domain/entity/Company'
import { CompanyTag } from '@presentation/components/CompanyTag'

interface CompanyListPanelProps {
  companies: Company[]
  savedCompanies: string[]
  isLoading: boolean
  plusIcon: string
  onAddCompany: (companyName: string) => void
}

export const CompanyListPanel = ({
  companies,
  savedCompanies,
  isLoading,
  plusIcon,
  onAddCompany,
}: CompanyListPanelProps) => {
  if (isLoading) {
    return (
      <div className="bg-[#f9f5fd] rounded-[4px] p-[16px]">
        <div className="text-center py-8 text-[#6869ac]">Loading companies...</div>
      </div>
    )
  }

  if (companies.length === 0) {
    return (
      <div className="bg-[#f9f5fd] rounded-[4px] p-[16px]">
        <div className="text-center py-8 text-[#6869ac]">No companies found</div>
      </div>
    )
  }

  return (
    <div className="bg-[#f9f5fd] rounded-[4px] p-[16px] flex flex-col gap-[16px]">
      {Array.from({ length: Math.ceil(companies.length / 2) }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-[16px]">
          {companies.slice(rowIndex * 2, rowIndex * 2 + 2).map((company, idx) => (
            <CompanyTag
              key={`${company.name}-${idx}`}
              company={company}
              onAdd={onAddCompany}
              isSaved={savedCompanies.includes(company.name)}
              plusIcon={plusIcon}
            />
          ))}
        </div>
      ))}

      <div className="flex items-center justify-between text-[#4e5159] text-[14px] font-bold">
        <p>{savedCompanies.length} Companies saved</p>
      </div>
    </div>
  )
}
