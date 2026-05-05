import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Portabilidad Financiera",
  description: "Demostración de AgentForce para portabilidad financiera bancaria",
}

export default function BankingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
