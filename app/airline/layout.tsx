import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Demo AgentForce - Reserva de Vuelos",
  description:
    "Demostración de AgentForce para la venta de boletos aéreos conforme a la normativa chilena e integración con Sabre",
}

export default function AirlineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
