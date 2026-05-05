import type { ReactNode } from "react"
import { CheckCircle } from "lucide-react"

interface FeatureItemProps {
  text: string
  icon?: ReactNode
  className?: string
}

export function FeatureItem({
  text,
  icon = <CheckCircle className="h-5 w-5 text-green-600" />,
  className = "",
}: FeatureItemProps) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <p>{text}</p>
    </div>
  )
}
