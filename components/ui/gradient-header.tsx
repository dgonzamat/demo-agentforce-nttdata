interface GradientHeaderProps {
  title: string
  subtitle?: string
  fromColor?: string
  toColor?: string
  className?: string
}

export function GradientHeader({
  title,
  subtitle,
  fromColor = "from-blue-600",
  toColor = "to-blue-800",
  className = "",
}: GradientHeaderProps) {
  return (
    <div className={`bg-gradient-to-r ${fromColor} ${toColor} text-white p-4 ${className}`}>
      <h3 className="text-xl font-bold">{title}</h3>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
