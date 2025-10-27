import { Company } from '@/domain/dto/Company'

interface SearchResultItemProps {
  company: Company
  onClick: (company: Company) => void
}

export const SearchResultItem = ({ company, onClick }: SearchResultItemProps) => {
  const ticker = company.domain ? company.domain.split('.')[0].toUpperCase() : 'N/A'

  return (
    <div
      onClick={() => onClick(company)}
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
        <span className="font-bold">{ticker}</span>
        <span className="font-normal">{company.name}</span>
      </div>
    </div>
  )
}
