import { Company } from '@/domain/dto/Company'

interface CompanyTagProps {
  company: Company
  onAdd: (name: string) => void
  isSaved: boolean
  plusIcon: string
}

export const CompanyTag = ({ company, onAdd, isSaved, plusIcon }: CompanyTagProps) => {
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
