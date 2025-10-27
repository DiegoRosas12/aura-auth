interface ActionCardProps {
  icon: string
  label: string
  iconClassName?: string
  onClick?: () => void
}

export const ActionCard = ({ icon, label, iconClassName, onClick }: ActionCardProps) => {
  const handleClick = onClick ? { onClick } : {}
  const cursorClass = onClick ? 'cursor-pointer' : ''

  return (
    <div
      {...handleClick}
      className={`bg-white border border-[#cfcfd4] rounded-[4px] p-[16px] w-[180px] flex flex-col items-center gap-[8px] hover:border-[#6869ac] transition-colors ${cursorClass}`}
    >
      <div className="w-[120px] h-[120px] flex items-center justify-center">
        <img src={icon} alt={label} className={iconClassName || 'w-full h-full'} />
      </div>
      <p className="text-[#3e4551] text-[18px] font-bold">{label}</p>
    </div>
  )
}
