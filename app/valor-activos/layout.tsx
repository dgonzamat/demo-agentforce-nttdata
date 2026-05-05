import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Valor de Activos Digitales NTT DATA",
  description: "Infografía sobre el valor de los activos digitales desarrollados por NTT DATA para el mercado chileno",
}

export default function ValorActivosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
