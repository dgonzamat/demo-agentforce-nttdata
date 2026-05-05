import type { ReactNode } from "react"

interface SectionHeaderProps {
  icon: ReactNode
  title: string
  description?: string
  iconBgColor?: string
  iconTextColor?: string
}

export function SectionHeader({
  icon,
  title,
  description,
  iconBgColor = "bg-blue-100",
  iconTextColor = "text-blue-600",
}: SectionHeaderProps) {
  return (
    <div className="flex items-center mb-6">
      <div className={`w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center mr-4`}>
        <div className={`${iconTextColor}`}>{icon}</div>
      </div>
      <div>
        <h4 className="text-lg font-semibold">{title}</h4>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </div>
    </div>
  )
}
