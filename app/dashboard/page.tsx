"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"
import {
  Search,
  Star,
  Plus,
  HelpCircle,
  Settings,
  Bell,
  Bot,
  Calendar,
  Filter,
  RefreshCw,
  Home,
  LayoutDashboard,
  Zap,
  Users,
  Tag,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Clock,
  AlertTriangle,
  Target,
  Smile,
  CheckCircle2,
  Shield,
  ChevronRight,
  Menu,
  X,
} from "lucide-react"
import { asset } from "@/lib/asset"

const trendData = [
  { day: "May 6", completadas: 880, revision: 60, fallidas: 25, enCurso: 380 },
  { day: "May 7", completadas: 820, revision: 70, fallidas: 30, enCurso: 410 },
  { day: "May 8", completadas: 940, revision: 80, fallidas: 28, enCurso: 450 },
  { day: "May 9", completadas: 870, revision: 90, fallidas: 32, enCurso: 470 },
  { day: "May 10", completadas: 760, revision: 75, fallidas: 22, enCurso: 360 },
  { day: "May 11", completadas: 690, revision: 65, fallidas: 18, enCurso: 320 },
  { day: "May 12", completadas: 730, revision: 70, fallidas: 24, enCurso: 380 },
  { day: "May 13", completadas: 940, revision: 95, fallidas: 35, enCurso: 510 },
  { day: "May 14", completadas: 1020, revision: 110, fallidas: 38, enCurso: 540 },
  { day: "May 15", completadas: 980, revision: 100, fallidas: 30, enCurso: 500 },
  { day: "May 16", completadas: 920, revision: 90, fallidas: 28, enCurso: 470 },
  { day: "May 17", completadas: 800, revision: 75, fallidas: 22, enCurso: 380 },
  { day: "May 18", completadas: 720, revision: 65, fallidas: 18, enCurso: 340 },
  { day: "May 19", completadas: 770, revision: 80, fallidas: 26, enCurso: 410 },
  { day: "May 20", completadas: 1080, revision: 105, fallidas: 38, enCurso: 560 },
  { day: "May 21", completadas: 1010, revision: 115, fallidas: 42, enCurso: 590 },
  { day: "May 22", completadas: 970, revision: 95, fallidas: 32, enCurso: 530 },
  { day: "May 23", completadas: 940, revision: 90, fallidas: 30, enCurso: 510 },
  { day: "May 24", completadas: 820, revision: 80, fallidas: 24, enCurso: 420 },
  { day: "May 25", completadas: 750, revision: 70, fallidas: 20, enCurso: 380 },
  { day: "May 26", completadas: 800, revision: 85, fallidas: 28, enCurso: 440 },
  { day: "May 27", completadas: 1100, revision: 120, fallidas: 42, enCurso: 600 },
  { day: "May 28", completadas: 1040, revision: 110, fallidas: 38, enCurso: 580 },
  { day: "May 29", completadas: 1010, revision: 105, fallidas: 36, enCurso: 560 },
  { day: "May 30", completadas: 970, revision: 100, fallidas: 32, enCurso: 540 },
  { day: "May 31", completadas: 880, revision: 90, fallidas: 28, enCurso: 480 },
  { day: "Jun 1", completadas: 800, revision: 80, fallidas: 24, enCurso: 420 },
  { day: "Jun 2", completadas: 880, revision: 95, fallidas: 30, enCurso: 510 },
]

const sparkUp = [4, 6, 5, 8, 7, 10, 9, 12, 11, 14, 13, 16].map((v, i) => ({ x: i, v }))
const sparkUp2 = [10, 11, 10, 12, 11, 13, 12, 14, 13, 15, 14, 16].map((v, i) => ({ x: i, v }))
const sparkUp3 = [9, 10, 9, 11, 10, 12, 11, 13, 12, 14, 13, 15].map((v, i) => ({ x: i, v }))
const sparkFlat = [5, 6, 5, 6, 5, 7, 6, 7, 6, 7, 6, 7].map((v, i) => ({ x: i, v }))
const sparkDown = [10, 9, 11, 8, 9, 7, 8, 6, 7, 5, 6, 4].map((v, i) => ({ x: i, v }))

const stateData = [
  { name: "Completadas", value: 10234, color: "#22c55e" },
  { name: "Requieren Revisión", value: 856, color: "#eab308" },
  { name: "Fallidas", value: 357, color: "#ef4444" },
  { name: "En Curso", value: 1011, color: "#3b82f6" },
]

const agents = [
  { name: "Agentforce Service Agent", actions: 5312, success: 78.1 },
  { name: "Agentforce Sales Agent", actions: 3421, success: 76.3 },
  { name: "Agentforce Banking Agent", actions: 2156, success: 81.7 },
  { name: "Agentforce Claims Agent", actions: 1103, success: 71.5 },
  { name: "Agentforce Onboarding Agent", actions: 466, success: 79.2 },
]

const temas = [
  { name: "Consultas de Cuenta", actions: 3245 },
  { name: "Problemas de Producto", actions: 2476 },
  { name: "Transacciones", actions: 1987 },
  { name: "Actualización de Datos", actions: 1342 },
  { name: "Gestión de Casos", actions: 1021 },
]

const recent = [
  { id: "ACT-00012459", agent: "Service Agent", tema: "Consultas de Cuenta", estado: "Completada", resultado: "Exitosa", tiempo: "2m 15s", fecha: "Jun 2, 2025 10:24 AM" },
  { id: "ACT-00012458", agent: "Banking Agent", tema: "Transacciones", estado: "Completada", resultado: "Exitosa", tiempo: "1m 45s", fecha: "Jun 2, 2025 10:21 AM" },
  { id: "ACT-00012457", agent: "Sales Agent", tema: "Problemas de Producto", estado: "Requiere Revisión", resultado: "Parcial", tiempo: "4m 32s", fecha: "Jun 2, 2025 10:18 AM" },
  { id: "ACT-00012456", agent: "Service Agent", tema: "Consultas de Cuenta", estado: "Fallida", resultado: "Fallida", tiempo: "1m 05s", fecha: "Jun 2, 2025 10:15 AM" },
  { id: "ACT-00012455", agent: "Claims Agent", tema: "Gestión de Casos", estado: "Completada", resultado: "Exitosa", tiempo: "6m 12s", fecha: "Jun 2, 2025 10:12 AM" },
]

const navItems: { icon: typeof Home; label: string; active?: boolean; children?: string[] }[] = [
  { icon: Home, label: "Inicio" },
  { icon: LayoutDashboard, label: "Panel de Control", active: true },
  {
    icon: Zap,
    label: "Acciones",
    children: ["Todas las Acciones", "En Curso", "Completadas", "Fallidas", "Requieren Revisión"],
  },
  { icon: Users, label: "Agentes" },
  { icon: Tag, label: "Temas" },
  { icon: TrendingUp, label: "Rendimiento" },
  { icon: Sparkles, label: "Insights" },
  { icon: Settings, label: "Configuración" },
]

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Panel de Control")
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Top bar */}
      <div className="bg-[#0d2147] text-white flex items-center px-3 sm:px-4 h-14 shrink-0 gap-2">
        <button
          onClick={() => setNavOpen(true)}
          className="lg:hidden w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-md transition shrink-0"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          <img src={asset("/salesforce-logo.svg")} alt="Salesforce" className="h-7 sm:h-8 shrink-0" />
          <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-5 sm:h-6 brightness-0 invert shrink-0" />
          <span className="hidden sm:inline text-blue-200/40 text-xl">|</span>
          <span className="hidden sm:inline font-medium text-base sm:text-lg truncate">Agentforce</span>
        </Link>
        <div className="hidden md:block flex-1 max-w-2xl mx-auto px-4">
          <div className="bg-white/10 hover:bg-white/15 transition rounded-md flex items-center px-3 h-9 text-sm text-blue-100/80">
            <Search className="h-4 w-4 mr-2" />
            <span>Buscar en Salesforce</span>
          </div>
        </div>
        <div className="flex-1 md:hidden" />
        <div className="flex items-center gap-1 shrink-0">
          <button className="md:hidden w-9 h-9 flex items-center justify-center hover:bg-white/10 rounded-md transition">
            <Search className="h-4 w-4" />
          </button>
          {[Star, Plus, HelpCircle, Settings, Bell].map((Icon, i) => (
            <button
              key={i}
              className={`${i < 2 ? "hidden xl:flex" : i < 3 ? "hidden lg:flex" : "hidden sm:flex"} w-9 h-9 items-center justify-center hover:bg-white/10 rounded-md transition`}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <div className="w-8 h-8 sm:w-9 sm:h-9 ml-1 rounded-md bg-blue-500 flex items-center justify-center ring-2 ring-blue-300/40 shrink-0">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Mobile drawer overlay */}
        {navOpen && (
          <div
            onClick={() => setNavOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/40 z-40"
            aria-hidden
          />
        )}
        {/* Sidebar — drawer on mobile, fixed on desktop */}
        <aside
          className={`bg-white border-r flex flex-col shrink-0 transition-transform fixed lg:static inset-y-0 left-0 z-50 lg:z-0 w-64 lg:w-56 ${
            navOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="lg:hidden flex items-center justify-between px-5 h-14 border-b">
            <span className="font-semibold text-slate-900">Menú</span>
            <button onClick={() => setNavOpen(false)} className="w-8 h-8 flex items-center justify-center text-slate-500">
              <X className="h-4 w-4" />
            </button>
          </div>
          <nav className="flex-1 py-4 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.label === activeNav
              return (
                <div key={item.label}>
                  <button
                    onClick={() => {
                      setActiveNav(item.label)
                      setNavOpen(false)
                    }}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition relative ${
                      isActive
                        ? "text-blue-700 font-semibold bg-blue-50/60"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {isActive && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600" />}
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.children && <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
                  </button>
                  {item.children && isActive && (
                    <div className="pb-2">
                      {item.children.map((child) => (
                        <button
                          key={child}
                          className="w-full text-left pl-12 pr-4 py-1.5 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          {child}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
          <div className="p-5 border-t">
            <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-5 mb-1" />
            <p className="text-[10px] text-slate-500 leading-tight">Trusted Global Innovator</p>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Title bar */}
          <div className="bg-[#0a1d40] text-white px-4 sm:px-6 py-4 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center ring-2 ring-blue-300/40 shrink-0">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight truncate">Agentforce Action Tracker</h1>
                <p className="text-xs sm:text-sm text-blue-100/80 hidden sm:block">
                  Monitorea, gestiona y optimiza las acciones de tus agentes.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button className="bg-white/10 hover:bg-white/15 transition rounded-md flex items-center gap-2 px-3 h-9 text-xs sm:text-sm">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">May 6 - Jun 2, 2025</span>
                <span className="sm:hidden">May - Jun</span>
              </button>
              <button className="bg-white text-slate-800 rounded-md flex items-center gap-2 px-3 h-9 text-xs sm:text-sm font-medium">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </button>
              <button className="bg-white text-slate-800 rounded-md flex items-center justify-center w-9 h-9">
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <Kpi label="Acciones Totales" value="12,458" delta="+18.6% vs. período anterior" sparkData={sparkUp} sparkColor="#3b82f6" deltaColor="text-blue-600" />
              <Kpi label="Completadas" value="10,234" delta="82.2% del total" sparkData={sparkUp2} sparkColor="#22c55e" deltaColor="text-emerald-600" />
              <Kpi label="Exitosas" value="9,245" delta="74.2% del total" sparkData={sparkUp3} sparkColor="#22c55e" deltaColor="text-emerald-600" />
              <Kpi label="Requieren Revisión" value="856" delta="6.9% del total" sparkData={sparkFlat} sparkColor="#eab308" deltaColor="text-amber-600" />
              <Kpi label="Fallidas" value="357" delta="2.9% del total" sparkData={sparkDown} sparkColor="#ef4444" deltaColor="text-rose-600" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Donut */}
              <Card className="lg:col-span-3">
                <CardTitle>Acciones por Estado</CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-36 h-36 relative shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={stateData} dataKey="value" innerRadius={45} outerRadius={66} strokeWidth={2} stroke="#fff">
                          {stateData.map((s) => (
                            <Cell key={s.name} fill={s.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="text-xl font-bold text-slate-900">12,458</div>
                      <div className="text-xs text-slate-500">Total</div>
                    </div>
                  </div>
                  <ul className="flex-1 space-y-2 text-xs min-w-0">
                    {stateData.map((s) => (
                      <li key={s.name}>
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                          <span className="text-slate-700 truncate">{s.name}</span>
                        </div>
                        <div className="text-slate-900 font-semibold ml-4.5 pl-1">
                          {s.value.toLocaleString()}{" "}
                          <span className="font-normal text-slate-500">
                            ({((s.value / 12458) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Trend */}
              <Card className="lg:col-span-6">
                <CardTitle>Tendencia de Acciones</CardTitle>
                <div className="h-56 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ top: 10, right: 5, left: -15, bottom: 0 }}>
                      <CartesianGrid stroke="#e2e8f0" strokeDasharray="2 2" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} interval={6} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} tickLine={false} axisLine={false} />
                      <Tooltip />
                      <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" />
                      <Line type="monotone" dataKey="completadas" stroke="#22c55e" strokeWidth={2} dot={false} name="Completadas" />
                      <Line type="monotone" dataKey="revision" stroke="#eab308" strokeWidth={2} dot={false} name="Requieren Revisión" />
                      <Line type="monotone" dataKey="fallidas" stroke="#ef4444" strokeWidth={2} dot={false} name="Fallidas" />
                      <Line type="monotone" dataKey="enCurso" stroke="#3b82f6" strokeWidth={2} dot={false} name="En Curso" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Agents */}
              <Card className="lg:col-span-3">
                <CardTitle>Acciones por Agente</CardTitle>
                <div className="mt-3">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-3 text-[10px] uppercase tracking-wider text-slate-500 border-b pb-2">
                    <span>Agente</span>
                    <span className="text-right">Acciones</span>
                    <span className="text-right">Éxito (%)</span>
                  </div>
                  <ul className="divide-y">
                    {agents.map((a) => (
                      <li key={a.name} className="grid grid-cols-[1fr_auto_auto] gap-3 items-center py-2.5 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center shrink-0">
                            <Bot className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <span className="text-slate-700 truncate">{a.name}</span>
                        </div>
                        <span className="text-slate-900 font-medium text-right tabular-nums">{a.actions.toLocaleString()}</span>
                        <div className="flex items-center gap-2 justify-end min-w-[70px]">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${a.success}%` }} />
                          </div>
                          <span className="text-slate-700 tabular-nums">{a.success.toFixed(1)}%</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium">
                    Ver todos los agentes
                  </button>
                </div>
              </Card>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Temas */}
              <Card className="lg:col-span-3">
                <CardTitle>Acciones por Tema (Top 5)</CardTitle>
                <div className="mt-3 space-y-3">
                  {temas.map((t) => {
                    const max = Math.max(...temas.map((x) => x.actions))
                    const pct = (t.actions / max) * 100
                    return (
                      <div key={t.name} className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-slate-700">{t.name}</span>
                          <span className="font-medium text-slate-900 tabular-nums">{t.actions.toLocaleString()}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <button className="mt-4 text-xs text-blue-600 hover:text-blue-700 font-medium">
                  Ver todos los temas
                </button>
                <div className="mt-5 pt-4 border-t flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-slate-500">Time to Completion (Promedio)</div>
                    <div className="text-2xl font-bold text-slate-900 tabular-nums leading-tight">3m 42s</div>
                    <div className="text-xs text-emerald-600">▼ -12.4% vs. período anterior</div>
                  </div>
                  <div className="w-20 h-10 shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkDown}>
                        <Area dataKey="v" stroke="#22c55e" strokeWidth={2} fill="#22c55e" fillOpacity={0.15} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

              {/* Recent actions table */}
              <Card className="lg:col-span-6">
                <CardTitle>Acciones Recientes</CardTitle>
                <div className="overflow-x-auto -mx-5 mt-2">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-wider text-slate-500 border-b">
                        <th className="text-left font-medium px-5 py-2">Acción</th>
                        <th className="text-left font-medium px-2 py-2">Agente</th>
                        <th className="text-left font-medium px-2 py-2">Tema</th>
                        <th className="text-left font-medium px-2 py-2">Estado</th>
                        <th className="text-left font-medium px-2 py-2">Resultado</th>
                        <th className="text-left font-medium px-2 py-2">Tiempo</th>
                        <th className="text-left font-medium px-5 py-2">Fecha/Hora</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {recent.map((r) => (
                        <tr key={r.id} className="hover:bg-slate-50 transition">
                          <td className="px-5 py-3 font-mono text-slate-600">{r.id}</td>
                          <td className="px-2 py-3 text-slate-700">{r.agent}</td>
                          <td className="px-2 py-3 text-slate-700">{r.tema}</td>
                          <td className="px-2 py-3">
                            <StatePill state={r.estado} />
                          </td>
                          <td className="px-2 py-3">
                            <ResultPill result={r.resultado} />
                          </td>
                          <td className="px-2 py-3 text-slate-700 tabular-nums">{r.tiempo}</td>
                          <td className="px-5 py-3 text-slate-500">{r.fecha}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="text-center pt-3">
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Ver todas las acciones</button>
                </div>
              </Card>

              {/* Performance + Alerts */}
              <div className="lg:col-span-3 space-y-4">
                <Card>
                  <CardTitle>Rendimiento del Agente (Promedio)</CardTitle>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <Metric icon={Target} label="Precisión" value="89.3%" delta="+4.1%" color="blue" />
                    <Metric icon={Smile} label="Satisfacción" value="4.6/5" delta="+0.3" color="amber" />
                    <Metric icon={CheckCircle2} label="Resolución" value="78.6%" delta="+3.8%" color="emerald" />
                    <Metric icon={Shield} label="Adherencia" value="92.1%" delta="+2.6%" color="violet" />
                  </div>
                </Card>

                <Card>
                  <CardTitle>Alertas y Recomendaciones</CardTitle>
                  <ul className="mt-3 space-y-3">
                    <Alert
                      icon={AlertTriangle}
                      tone="amber"
                      title="23 acciones requieren revisión"
                      description="Requieren atención del equipo."
                      cta="Revisar"
                    />
                    <Alert
                      icon={AlertTriangle}
                      tone="rose"
                      title="Aumento de fallos en 'Transacciones'"
                      description="+15% vs. período anterior."
                      cta="Ver análisis"
                    />
                    <Alert
                      icon={Sparkles}
                      tone="blue"
                      title="Oportunidad de optimización"
                      description="Mejorar flujo en 'Problemas de Producto'."
                      cta="Ver recomendación"
                    />
                  </ul>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-3">
                    Ver todas las alertas
                  </button>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t px-6 py-3 flex items-center justify-between text-xs text-slate-500">
        <div>© 2025 NTT DATA · Salesforce · Agentforce</div>
        <div>Última actualización: Jun 2, 2025 10:30 AM</div>
      </footer>
    </div>
  )
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-md border shadow-sm p-5 ${className}`}>{children}</div>
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-slate-900">{children}</h2>
}

interface KpiProps {
  label: string
  value: string
  delta: string
  sparkData: { x: number; v: number }[]
  sparkColor: string
  deltaColor: string
}

function Kpi({ label, value, delta, sparkData, sparkColor, deltaColor }: KpiProps) {
  return (
    <Card>
      <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">{label}</div>
      <div className="flex items-end justify-between gap-2 mt-1">
        <div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums leading-none">{value}</div>
          <div className={`text-xs mt-2 ${deltaColor}`}>{delta}</div>
        </div>
        <div className="w-20 h-12 shrink-0 -mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkData}>
              <Area dataKey="v" stroke={sparkColor} strokeWidth={2} fill={sparkColor} fillOpacity={0.15} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

function StatePill({ state }: { state: string }) {
  const styles: Record<string, string> = {
    Completada: "bg-emerald-100 text-emerald-700",
    "Requiere Revisión": "bg-amber-100 text-amber-700",
    Fallida: "bg-rose-100 text-rose-700",
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${styles[state] || "bg-slate-100 text-slate-700"}`}>
      {state}
    </span>
  )
}

function ResultPill({ result }: { result: string }) {
  const styles: Record<string, string> = {
    Exitosa: "bg-emerald-100 text-emerald-700",
    Parcial: "bg-amber-100 text-amber-700",
    Fallida: "bg-rose-100 text-rose-700",
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${styles[result] || "bg-slate-100 text-slate-700"}`}>
      {result}
    </span>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  delta,
  color,
}: {
  icon: typeof Target
  label: string
  value: string
  delta: string
  color: "blue" | "amber" | "emerald" | "violet"
}) {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
  }
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-6 h-6 rounded-md flex items-center justify-center ${tones[color]}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs text-slate-500">{label}</span>
      </div>
      <div className="text-xl font-bold text-slate-900 tabular-nums leading-none">{value}</div>
      <div className="text-xs text-emerald-600 mt-1">{delta}</div>
    </div>
  )
}

function Alert({
  icon: Icon,
  tone,
  title,
  description,
  cta,
}: {
  icon: typeof AlertTriangle
  tone: "amber" | "rose" | "blue"
  title: string
  description: string
  cta: string
}) {
  const tones: Record<string, string> = {
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
  }
  return (
    <li className="flex items-start gap-3 text-xs">
      <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${tones[tone]}`}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-900 leading-tight">{title}</div>
        <div className="text-slate-600 mt-0.5">{description}</div>
        <button className="text-blue-600 hover:text-blue-700 font-medium mt-1 flex items-center gap-0.5">
          {cta}
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </li>
  )
}
