import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Gestión de Contratistas Mineros",
  description:
    "Demostración de AgentForce para la gestión de contratistas y proveedores en la industria minera chilena",
}

export default function MineriaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
