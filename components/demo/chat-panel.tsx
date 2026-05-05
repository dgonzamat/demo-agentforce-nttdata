"use client"

import type { ReactNode } from "react"
import { Bot, Info, MoreHorizontal, Send, Sparkles } from "lucide-react"

interface ChatPanelProps {
  assistantTitle: string
  beta?: boolean
  children: ReactNode
  inputPlaceholder?: string
  disclaimer?: string
}

export function ChatPanel({
  assistantTitle,
  beta = true,
  children,
  inputPlaceholder = "Escribe tu mensaje...",
  disclaimer = "Agentforce puede cometer errores. Verifica la información importante.",
}: ChatPanelProps) {
  return (
    <div className="bg-white rounded-md border shadow-sm flex flex-col h-[calc(100vh-180px)] min-h-[600px] overflow-hidden">
      {/* Chat header */}
      <header className="px-5 py-3 border-b flex items-center gap-3 shrink-0">
        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
          {assistantTitle}
          {beta && (
            <span className="text-[10px] uppercase tracking-wider bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
              Beta
            </span>
          )}
        </h2>
        <button className="ml-auto w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-500">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </header>

      {/* Info banner */}
      <div className="px-5 py-2.5 bg-blue-50/50 border-b flex items-center gap-2 text-sm text-slate-700 shrink-0">
        <Info className="h-4 w-4 text-blue-600 shrink-0" />
        <span>This conversation is being handled by Agentforce.</span>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-5 py-6 bg-slate-50/30">{children}</div>

      {/* Input area */}
      <div className="px-5 py-3 border-t bg-white shrink-0">
        <div className="flex items-center gap-2 bg-slate-50 border rounded-md px-3 py-2">
          <input
            type="text"
            placeholder={inputPlaceholder}
            disabled
            className="flex-1 bg-transparent outline-none text-sm placeholder-slate-400"
          />
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-slate-400">
          <Sparkles className="h-3 w-3" />
          <span>{disclaimer}</span>
        </div>
      </div>
    </div>
  )
}

interface QuickRepliesProps {
  options: string[]
}

export function QuickReplies({ options }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 mt-3 ml-12">
      {options.map((opt) => (
        <button
          key={opt}
          className="px-3.5 py-1.5 border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-md text-sm font-medium transition"
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
