import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AgentForce - Infografía de Alto Impacto (16:9)",
  description: "Visualización concisa del impacto comercial de AgentForce en formato 16:9",
}

export default function InfographicWidescreenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
