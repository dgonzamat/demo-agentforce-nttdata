import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "AgentForce - Módulos de Demostración",
  description: "Módulos de demostración interactivos para diferentes sectores industriales",
}

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f8]">
      <header className="bg-white border-b py-3 px-4 flex items-center sticky top-0 z-10">
        <Link href="/" className="mr-4">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Button>
        </Link>
        <div className="bg-blue-900 px-2 py-1 rounded mr-4">
          <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-6 md:h-8 filter brightness-0 invert" />
        </div>
        <h1 className="text-lg font-semibold">Módulos de Demostración</h1>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        © 2023 NTT DATA Chile. Todos los derechos reservados. Soluciones desarrolladas específicamente para el mercado
        chileno.
      </footer>
    </div>
  )
}
