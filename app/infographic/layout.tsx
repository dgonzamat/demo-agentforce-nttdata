import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AgentForce - Infografía de Impacto Comercial",
  description:
    "Visualización del impacto comercial y los resultados cuantificables de AgentForce en diversas industrias",
}

export default function InfographicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
