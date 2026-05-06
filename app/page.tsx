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
  BarChart3,
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
          <div className="flex items-center gap-1">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 px-2 sm:px-3">
                <BarChart3 className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Action Tracker</span>
              </Button>
            </Link>
            <Link href="/modules">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 px-2 sm:px-3">
                <Layers className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Módulos</span>
              </Button>
            </Link>
          </div>
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
              <img
                src={asset("/salesforce-logo.svg")}
                alt="Salesforce"
                className="h-12 md:h-16"
              />
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
              <span className="text-white">Diseñamos, construimos y desplegamos agentes de IA con Agentforce</span>{" "}
              específicos para cada industria. De la cotización al post-venta, con identidad verificada y orquestación
              nativa Salesforce — adaptados a la regulación y el negocio chileno.
            </p>
            <div className="flex flex-wrap gap-6 mt-10 text-sm">
              <Stat value="7" label="Industrias verticalizadas" />
              <Divider />
              <Stat value="28+" label="Casos de uso construidos" />
              <Divider />
              <Stat value="6 sem" label="De diseño a producción" />
            </div>
          </motion.div>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Explora Agentforce por industria</h2>
            <p className="text-slate-600 mt-1">
              Cada demo recorre un proceso real end-to-end: identidad, conversación, decisión y cierre.
            </p>
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
