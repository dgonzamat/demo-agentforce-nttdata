"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Building2,
  Phone,
  ShoppingBag,
  Plane,
  HardHat,
  Zap,
  ArrowRight,
  Layers,
  Cpu,
} from "lucide-react"
import { asset } from "@/lib/asset"

type Category = "all" | "financieros" | "servicios" | "industriales"

interface Industry {
  id: string
  name: string
  description: string
  href: string
  icon: typeof Shield
  category: Exclude<Category, "all">
  gradient: string
  iconBg: string
  iconColor: string
  isNew?: boolean
}

const industries: Industry[] = [
  {
    id: "seguros",
    name: "Seguros",
    description: "Cotización, emisión y gestión de pólizas con IA generativa.",
    href: "/seguros/demo",
    icon: Shield,
    category: "financieros",
    gradient: "from-blue-500 to-blue-700",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "banca",
    name: "Banca",
    description: "Onboarding biométrico, créditos y servicios financieros.",
    href: "/banking/demo",
    icon: Building2,
    category: "financieros",
    gradient: "from-indigo-500 to-indigo-700",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    id: "telecom",
    name: "Telecomunicaciones",
    description: "Atención al cliente, soporte técnico y gestión de planes.",
    href: "/telecom/demo",
    icon: Phone,
    category: "servicios",
    gradient: "from-violet-500 to-purple-700",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    isNew: true,
  },
  {
    id: "retail",
    name: "Retail",
    description: "Asistencia en ventas, negociación B2B y gestión de inventario.",
    href: "/retail/demo",
    icon: ShoppingBag,
    category: "servicios",
    gradient: "from-pink-500 to-rose-700",
    iconBg: "bg-pink-50",
    iconColor: "text-pink-600",
  },
  {
    id: "airline",
    name: "Aerolíneas",
    description: "Reservas, gestión de cambios y experiencia del pasajero.",
    href: "/airline/demo",
    icon: Plane,
    category: "industriales",
    gradient: "from-cyan-500 to-sky-700",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    id: "mineria",
    name: "Minería",
    description: "Gestión de contratistas y cumplimiento normativo.",
    href: "/mineria/demo",
    icon: HardHat,
    category: "industriales",
    gradient: "from-amber-500 to-orange-700",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-700",
  },
  {
    id: "servicios-basicos",
    name: "Servicios Básicos",
    description: "Atención al cliente, lectura de consumo y facturación.",
    href: "/servicios-basicos/demo",
    icon: Zap,
    category: "servicios",
    gradient: "from-emerald-500 to-teal-700",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
]

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "financieros", label: "Financieros" },
  { id: "servicios", label: "Servicios" },
  { id: "industriales", label: "Industriales" },
]

export default function HomePage() {
  const [filter, setFilter] = useState<Category>("all")

  const visible = filter === "all" ? industries : industries.filter((i) => i.category === filter)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="border-b bg-white sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-7" />
            <span className="text-slate-300">|</span>
            <span className="text-lg font-semibold tracking-tight">AgentForce</span>
          </div>
          <Link href="/modules">
            <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
              <Layers className="h-4 w-4 mr-2" />
              Catálogo de módulos
            </Button>
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.25),transparent_50%)]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-6 md:gap-10 mb-10">
              <img
                src={asset("/ntt-data-logo.png")}
                alt="NTT DATA"
                className="h-10 md:h-14 brightness-0 invert"
              />
              <div className="h-10 md:h-14 w-px bg-white/30" />
              <SalesforceMark className="h-10 md:h-14" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
              Casos de Uso de{" "}
              <span className="bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Agentforce
              </span>
              <br />
              por Industria
            </h1>
            <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl leading-relaxed">
              Conversaciones reales con un agente de IA en 7 sectores. Verificación biométrica, firma digital y procesos
              end-to-end ─ adaptados al mercado chileno.
            </p>
            <div className="flex flex-wrap gap-6 mt-10 text-sm">
              <Stat value="7" label="Industrias" />
              <Divider />
              <Stat value="28+" label="Módulos" />
              <Divider />
              <Stat value="100%" label="Cumplimiento normativo" />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Selecciona una industria</h2>
            <p className="text-slate-600 mt-1">Cada demo simula una conversación end-to-end con el agente.</p>
          </div>
          <div className="inline-flex rounded-lg bg-white border shadow-sm p-1 self-start md:self-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  filter === c.id ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((industry, idx) => (
            <IndustryCard key={industry.id} industry={industry} index={idx} />
          ))}
        </motion.div>
      </main>

      <footer className="border-t bg-white mt-12">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-3">
            <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-5 opacity-70" />
            <span>© {new Date().getFullYear()} NTT DATA Chile. Soluciones AgentForce.</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Construido para el mercado chileno</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold">{value}</div>
      <div className="text-blue-200/80 text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  )
}

function Divider() {
  return <div className="w-px h-12 bg-white/20 self-center" />
}

function SalesforceMark({ className, light = true }: { className?: string; light?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <svg viewBox="0 0 256 180" className="h-full w-auto shrink-0" aria-hidden>
        <path
          fill="#00A1E0"
          d="M106.4 36.1c8.1-8.4 19.4-13.6 31.9-13.6 16.6 0 31.1 9.2 38.8 23 6.7-3 14.1-4.7 21.9-4.7 30.1 0 54.6 24.7 54.6 55.2 0 30.5-24.4 55.2-54.6 55.2-3.7 0-7.3-.4-10.7-1.1-6.8 12.1-19.7 20.3-34.6 20.3-6.2 0-12.1-1.4-17.4-4-6.9 16.2-23 27.6-41.7 27.6-19.5 0-36.2-12.4-42.5-29.8-2.7.6-5.6.9-8.5.9-22.4 0-40.6-18.4-40.6-41.1 0-15.2 8.2-28.5 20.5-35.6-2.5-5.8-3.9-12.2-3.9-18.9 0-26.4 21.4-47.7 47.8-47.7 15.5 0 29.3 7.4 38 18.8z"
        />
      </svg>
      <span
        className={`text-[1.6em] font-semibold tracking-tight leading-none ${light ? "text-white" : "text-slate-900"}`}
        style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif" }}
      >
        salesforce
      </span>
    </div>
  )
}

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const Icon = industry.icon
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
    >
      <Link href={industry.href} className="group block h-full">
        <div className="h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          <div className={`h-1 bg-gradient-to-r ${industry.gradient}`} />
          <div className="p-6 flex flex-col h-[calc(100%-0.25rem)]">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-lg ${industry.iconBg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${industry.iconColor}`} />
              </div>
              {industry.isNew && (
                <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-1 rounded-full">
                  Nuevo
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">{industry.name}</h3>
            <p className="text-sm text-slate-600 leading-relaxed flex-grow mb-5">{industry.description}</p>
            <div className="flex items-center text-sm font-medium text-slate-700 group-hover:text-slate-900 group-hover:gap-2 gap-1 transition-all">
              Ver demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
