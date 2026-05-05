import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Telecomunicaciones B2B",
  description: "Demostración de AgentForce para ventas B2B en el sector de telecomunicaciones en Chile",
}

export default function TelecomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
