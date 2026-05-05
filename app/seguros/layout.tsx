import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Seguros",
  description: "Demostración de AgentForce para empresas de seguros",
}

export default function SegurosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
