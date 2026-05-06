import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { asset } from "@/lib/asset"

export const metadata: Metadata = {
  title: "Agentforce · Catálogo de módulos · NTT DATA",
  description: "Catálogo de módulos de Agentforce listos para producción por industria.",
}

export default function ModulesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="border-b bg-white sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-sm shrink-0">
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-6 sm:h-7 shrink-0" />
            <span className="hidden sm:inline text-slate-300">|</span>
            <img src={asset("/salesforce-logo.svg")} alt="Salesforce" className="hidden sm:block h-7 shrink-0" />
            <span className="hidden lg:inline text-slate-300">|</span>
            <span className="hidden lg:inline font-medium text-slate-700 truncate">Catálogo de módulos</span>
          </div>
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 px-2 sm:px-3">
              <BarChart3 className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Action Tracker</span>
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} NTT DATA Chile · Salesforce · Agentforce</div>
          <div>Soluciones diseñadas para el mercado chileno</div>
        </div>
      </footer>
    </div>
  )
}
