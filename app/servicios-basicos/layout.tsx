import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Servicios Básicos Regulados",
  description: "Demostración de AgentForce para la gestión de servicios básicos regulados por la CNE y SISS en Chile",
}

export default function ServiciosBasicosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
