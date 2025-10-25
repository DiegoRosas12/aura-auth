import { useState } from 'react'
import { MainLayout } from '../components/templates/MainLayout'

const plusIcon = 'http://localhost:3845/assets/730c6372c1a0244c8c3a33b4c229c38267e1e5c0.svg'
const heroBackground = 'http://localhost:3845/assets/f5a228e1337faff61e75ea74307586f380ea6814.png'
const documentsIcon = 'http://localhost:3845/assets/c1a868a62fcf4ab930b333c1eca88967385e4508.svg'
const fileBundleIcon = 'http://localhost:3845/assets/e3ad1e48ddfb4955851c7f971e03af16acdb805a.svg'
const aiToolIcon = 'http://localhost:3845/assets/0948bd5a7b488f0d37da3c027162de3154169c56.svg'
const stockGraphic = 'http://localhost:3845/assets/c928a48bc6540a5c88a94ff02b47ca086cbf1d4f.svg'

interface Company {
  ticker: string
  name: string
}

const companies: Company[] = [
  { ticker: 'AMZN', name: 'Amazon' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'MSFT', name: 'Microsoft' },
  { ticker: 'ESTC', name: 'Elastic' },
  { ticker: 'U', name: 'Unity Software' },
  { ticker: 'CVNA', name: 'Carvana Co' },
  { ticker: 'EPAM', name: 'EPAM Systems' },
  { ticker: 'WBD', name: 'Warner Bros' },
]

/**
 * Search Data Page
 * Main page for searching company data
 */
export const SearchDataPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [savedCompanies, setSavedCompanies] = useState<string[]>([])

  const handleAddCompany = (ticker: string) => {
    if (!savedCompanies.includes(ticker)) {
      setSavedCompanies([...savedCompanies, ticker])
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
            height: '397px'
          }}
        >
          {/* Title */}
          <div className="absolute left-1/2 top-[32px] transform -translate-x-1/2 flex flex-col items-center gap-[8px]">
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

          {/* Action Buttons */}
          <div className="absolute left-1/2 top-[185px] transform -translate-x-1/2 flex gap-[32px]">
            <div className="bg-white border border-[#cfcfd4] rounded-[4px] p-[16px] w-[180px] flex flex-col items-center gap-[8px]">
              <div className="w-[120px] h-[120px]">
                <img src={documentsIcon} alt="Documents" className="w-full h-full" />
              </div>
              <p className="text-[#3e4551] text-[18px] font-bold">Search Data</p>
            </div>
            <div className="bg-white border border-[#cfcfd4] rounded-[4px] p-[16px] w-[180px] flex flex-col items-center gap-[8px]">
              <div className="w-[120px] h-[120px]">
                <img src={fileBundleIcon} alt="File Bundle" className="w-full h-full" />
              </div>
              <p className="text-[#3e4551] text-[18px] font-bold">Upload your Data</p>
            </div>
            <div className="bg-white border border-[#cfcfd4] rounded-[4px] p-[16px] w-[180px] flex flex-col items-center gap-[8px]">
              <div className="w-[120px] h-[120px] flex items-center justify-center">
                <img src={aiToolIcon} alt="AI Tool" className="w-full h-full transform rotate-180 scale-y-[-1]" />
              </div>
              <p className="text-[#3e4551] text-[18px] font-bold">Try our AI Tool</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex justify-between px-[233px] py-[110px]">
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

            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies..."
              className="border border-[#cfcfd4] rounded-[4px] px-[16px] py-[12px] w-full text-[16px] text-[#a2a3a8] focus:outline-none focus:border-[#6869ac]"
            />

            {/* Companies List */}
            <div className="bg-[#f9f5fd] rounded-[4px] p-[16px] flex flex-col gap-[16px]">
              {/* Row 1 */}
              <div className="flex gap-[16px]">
                <CompanyTag company={companies[0]} onAdd={handleAddCompany} />
                <CompanyTag company={companies[1]} onAdd={handleAddCompany} />
              </div>
              {/* Row 2 */}
              <div className="flex gap-[16px]">
                <CompanyTag company={companies[2]} onAdd={handleAddCompany} />
                <CompanyTag company={companies[3]} onAdd={handleAddCompany} />
              </div>
              {/* Row 3 */}
              <div className="flex gap-[16px]">
                <CompanyTag company={companies[4]} onAdd={handleAddCompany} />
                <CompanyTag company={companies[5]} onAdd={handleAddCompany} />
              </div>
              {/* Row 4 */}
              <div className="flex gap-[16px]">
                <CompanyTag company={companies[6]} onAdd={handleAddCompany} />
                <CompanyTag company={companies[7]} onAdd={handleAddCompany} />
              </div>

              {/* Saved Count */}
              <div className="flex items-center justify-between text-[#4e5159] text-[14px] font-bold">
                <p>{savedCompanies.length} Companies saved</p>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="w-[400px] h-[400px]">
            <img src={stockGraphic} alt="Stock Graphic" className="w-full h-full" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

interface CompanyTagProps {
  company: Company
  onAdd: (ticker: string) => void
}

const CompanyTag = ({ company, onAdd }: CompanyTagProps) => {
  return (
    <div className="bg-white border border-[#cfcfd4] rounded-[4px] p-[8px] flex items-center gap-[8px]">
      <div className="flex items-center gap-[4px] text-[16px] text-[#101723]">
        <span className="font-bold">{company.ticker}</span>
        <span>{company.name}</span>
      </div>
      <button
        onClick={() => onAdd(company.ticker)}
        className="w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        <img src={plusIcon} alt="Add" className="w-[18px] h-[18px]" />
      </button>
    </div>
  )
}
