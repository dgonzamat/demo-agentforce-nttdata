import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Negociación B2B Retail",
  description:
    "Demostración de AgentForce para optimización de negociaciones comerciales entre cadenas de supermercados y fabricantes de alimentos en Chile",
}

export default function RetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
