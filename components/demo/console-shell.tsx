"use client"

import { createContext, useContext, type ReactNode } from "react"
import Link from "next/link"
import {
  Search,
  Star,
  Plus,
  HelpCircle,
  Settings,
  Bell,
  ChevronDown,
  X,
  Grid3x3,
  Activity,
  History,
  StickyNote,
  Layers,
  Circle,
  ChevronLeft,
  Play,
  Pause,
  RefreshCw,
  Maximize,
  Minimize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFullscreen } from "@/hooks/use-fullscreen"
import { asset } from "@/lib/asset"

interface ConsoleShellProps {
  industryConsole: string
  customerName: string
  leftPanel: ReactNode
  rightPanel: ReactNode
  children: ReactNode
  playing?: boolean
  progress?: number
  onTogglePlay?: () => void
  onReset?: () => void
}

interface CustomerContextValue {
  name: string
  initials: string
}

const CustomerContext = createContext<CustomerContextValue | null>(null)

export function useCustomer(): CustomerContextValue | null {
  return useContext(CustomerContext)
}

function deriveInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return "?"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function ConsoleShell({
  industryConsole,
  customerName,
  leftPanel,
  rightPanel,
  children,
  playing,
  progress = 0,
  onTogglePlay,
  onReset,
}: ConsoleShellProps) {
  const { fullscreen, containerRef, toggleFullscreen } = useFullscreen()
  const customer: CustomerContextValue = { name: customerName, initials: deriveInitials(customerName) }
  return (
    <CustomerContext.Provider value={customer}>
    <div
      ref={containerRef}
      className="flex flex-col min-h-screen lg:h-screen lg:overflow-hidden bg-slate-100"
    >
      {/* Top dark navy bar - Salesforce + NTT DATA + Agentforce */}
      <div className="bg-[#0d2147] text-white flex items-center px-3 sm:px-4 h-14 shrink-0 gap-2">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 shrink-0 min-w-0">
          {/* Salesforce-style cloud mark */}
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00a1e0] flex items-center justify-center text-xs font-bold tracking-tighter shrink-0">
            sf
          </div>
          <ChevronLeft className="hidden sm:block h-3 w-3 text-blue-300/60 rotate-180 shrink-0" />
          <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-5 sm:h-6 brightness-0 invert shrink-0" />
          <span className="hidden sm:inline text-blue-200/40">|</span>
          <span className="hidden sm:inline font-medium truncate">Agentforce</span>
        </Link>

        <div className="hidden md:block flex-1 max-w-2xl mx-auto px-4">
          <div className="bg-white/10 hover:bg-white/15 transition rounded-md flex items-center px-3 h-9 text-sm text-blue-100/80">
            <Search className="h-4 w-4 mr-2" />
            <span>Search Salesforce</span>
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
          <div className="w-7 h-7 sm:w-8 sm:h-8 ml-1 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 text-xs font-medium shrink-0">
            👤
          </div>
        </div>
      </div>

      {/* Tab bar - mobile shows only customer + console label */}
      <div className="bg-white border-b flex items-center pl-2 pr-3 sm:pr-4 h-12 shrink-0 overflow-x-auto scrollbar-hide">
        <button className="hidden sm:flex w-10 h-10 items-center justify-center text-slate-500 hover:bg-slate-100 rounded-md transition shrink-0">
          <Grid3x3 className="h-4 w-4" />
        </button>
        <span className="hidden lg:contents">
          <Tab label="Service Console" active={false} />
          <Tab label="Customer 360" active={false} hasChevron />
        </span>
        <Tab label={customerName} active hasClose />
        <div className="ml-auto flex items-center gap-1 text-xs sm:text-sm text-slate-700 shrink-0 pl-2">
          <span className="truncate max-w-[140px] sm:max-w-none">{industryConsole}</span>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
        </div>
      </div>

      {/* Thin blue accent line under tabs */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 shrink-0" />

      {/* Optional: floating progress indicator */}
      {progress > 0 && progress < 100 && (
        <div className="h-0.5 bg-slate-100 shrink-0">
          <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Main body — 3-col by default, single column when fullscreen-focused */}
      <div
        className={`flex-1 lg:overflow-hidden grid gap-4 p-4 max-w-[1600px] w-full mx-auto ${
          fullscreen
            ? "grid-cols-1"
            : "grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)_320px]"
        }`}
      >
        {!fullscreen && (
          <aside className="space-y-4 order-2 lg:order-1 min-w-0 lg:overflow-y-auto lg:pr-1">
            {leftPanel}
          </aside>
        )}
        <main className="order-1 lg:order-2 min-w-0 lg:overflow-hidden">{children}</main>
        {!fullscreen && (
          <aside className="space-y-4 order-3 min-w-0 lg:overflow-y-auto lg:pr-1">{rightPanel}</aside>
        )}
      </div>

      {/* Bottom utility bar */}
      <div className="bg-white border-t flex items-center px-3 sm:px-4 h-10 sm:h-9 shrink-0 text-xs text-slate-600 gap-3 sm:gap-5 sticky bottom-0">
        <div className="flex items-center gap-2 shrink-0">
          <Circle className="h-2.5 w-2.5 fill-emerald-500 text-emerald-500" />
          <span className="hidden sm:inline">Omni-Channel</span>
        </div>
        <div className="hidden md:flex items-center gap-5">
          <UtilityItem icon={Activity} label="Macros" />
          <UtilityItem icon={History} label="History" />
        </div>
        <div className="hidden lg:flex items-center gap-5">
          <UtilityItem icon={StickyNote} label="Notes" />
          <UtilityItem icon={Layers} label="Recent Items" />
        </div>

        {/* Demo controls anchored right */}
        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {onTogglePlay && (
            <Button
              size="sm"
              variant={playing ? "destructive" : "default"}
              onClick={onTogglePlay}
              className="h-7 text-xs px-2 sm:px-3"
            >
              {playing ? <Pause className="h-3 w-3 sm:mr-1" /> : <Play className="h-3 w-3 sm:mr-1" />}
              <span className="hidden sm:inline">
                {playing ? "Pausar" : progress === 100 ? "Reiniciar" : "Reproducir"}
              </span>
            </Button>
          )}
          {onReset && (
            <Button size="sm" variant="outline" onClick={onReset} className="h-7 text-xs px-2 sm:px-3">
              <RefreshCw className="h-3 w-3 sm:mr-1" />
              <span className="hidden sm:inline">Reiniciar</span>
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={toggleFullscreen}
            className="h-7 text-xs px-2 sm:px-3"
            title={fullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {fullscreen ? <Minimize className="h-3 w-3 sm:mr-1" /> : <Maximize className="h-3 w-3 sm:mr-1" />}
            <span className="hidden md:inline">{fullscreen ? "Salir" : "Pantalla completa"}</span>
          </Button>
        </div>
      </div>
    </div>
    </CustomerContext.Provider>
  )
}

function Tab({
  label,
  active,
  hasChevron,
  hasClose,
}: {
  label: string
  active?: boolean
  hasChevron?: boolean
  hasClose?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-2 px-4 h-10 text-sm border-r border-slate-200 ${
        active ? "border-b-2 border-b-blue-500 text-slate-900 font-medium" : "text-slate-600"
      }`}
    >
      <span>{label}</span>
      {hasChevron && <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
      {hasClose && <X className="h-3.5 w-3.5 text-slate-400 hover:text-slate-700 cursor-pointer" />}
    </div>
  )
}

function UtilityItem({ icon: Icon, label }: { icon: typeof Activity; label: string }) {
  return (
    <div className="flex items-center gap-1.5 hover:text-slate-900 cursor-pointer">
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </div>
  )
}

interface ConsoleCardProps {
  icon?: ReactNode
  title: string
  badge?: ReactNode
  accentColor?: string
  children: ReactNode
}

export function ConsoleCard({ icon, title, badge, accentColor, children }: ConsoleCardProps) {
  return (
    <div className="bg-white rounded-md border shadow-sm overflow-hidden">
      {accentColor && <div className={`h-0.5 ${accentColor}`} />}
      <div className="px-4 py-3 border-b flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-slate-900 text-sm">{title}</h3>
        {badge && <div className="ml-auto">{badge}</div>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  )
}

export function FieldRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="text-sm">
      <div className="text-slate-500 text-xs">{label}</div>
      <div className="text-slate-900 mt-0.5">{value}</div>
    </div>
  )
}
