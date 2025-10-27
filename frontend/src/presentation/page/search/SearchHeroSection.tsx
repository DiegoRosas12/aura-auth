import { ActionCard } from '@presentation/components/ActionCard'

interface SearchHeroSectionProps {
  heroBackground: string
  documentsIcon: string
  fileBundleIcon: string
  aiToolIcon: string
}

export const SearchHeroSection = ({
  heroBackground,
  documentsIcon,
  fileBundleIcon,
  aiToolIcon,
}: SearchHeroSectionProps) => {
  return (
    <div
      className="relative rounded-[4px] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.6) 100%), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingBottom: '32px',
      }}
    >
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
  )
}
