import type { ReactNode } from "react"
import { Bot } from "lucide-react"
import type { MessageType } from "@/hooks/use-conversation-player"

interface MessageRendererProps {
  message: MessageType
  avatars: Record<string, string>
  timestamp?: string
  renderSignaturePanel?: () => ReactNode
  renderIdentityPanel?: () => ReactNode
  renderContractorPanel?: () => ReactNode
  renderConsumptionPanel?: () => ReactNode
  renderTarifaPanel?: () => ReactNode
}

export function MessageRenderer({
  message,
  avatars,
  timestamp,
  renderSignaturePanel,
  renderIdentityPanel,
  renderContractorPanel,
  renderConsumptionPanel,
  renderTarifaPanel,
}: MessageRendererProps) {
  if (!message.visible) return null

  if (message.reasoning) {
    return (
      <div className="flex items-start gap-3 mb-5">
        <BotIcon />
        <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-200 px-4 py-3 text-blue-800 font-medium flex items-center shadow-sm">
          <span className="mr-2 text-slate-700">Razonando</span>
          <div className="flex space-x-1">
            <Dot delay={0} />
            <Dot delay={150} />
            <Dot delay={300} />
          </div>
        </div>
      </div>
    )
  }

  const textContent = message.typing
    ? message.text.substring(0, Math.floor(message.text.length * 0.7)) + "▌"
    : message.text

  const renderedText = textContent.split("\n").map((line, i) => {
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={i} className="ml-5 leading-relaxed">
          {line}
        </li>
      )
    }
    if (/^-\s/.test(line)) {
      return (
        <li key={i} className="ml-5 list-disc leading-relaxed">
          {line.substring(2)}
        </li>
      )
    }
    return (
      <p key={i} className={`leading-relaxed ${i > 0 ? "mt-2" : ""}`}>
        {line}
      </p>
    )
  })

  const shouldShowSignaturePanel = message.showSignaturePanel && !message.typing
  const shouldShowIdentityPanel = message.showIdentityPanel && !message.typing
  const shouldShowContractorPanel = message.showContractorPanel && !message.typing
  const shouldShowConsumptionPanel = message.showConsumptionPanel && !message.typing
  const shouldShowTarifaPanel = message.showTarifaPanel && !message.typing

  const isBot = message.sender === "bot"

  return (
    <div className="flex flex-col mb-5">
      {isBot ? (
        <div className="flex items-start gap-3 max-w-[88%]">
          <BotIcon />
          <div className="min-w-0">
            <div className="bg-white rounded-2xl rounded-tl-sm border border-slate-200 px-4 py-3 text-slate-800 shadow-sm">
              {renderedText}
            </div>
            {timestamp && <div className="text-xs text-slate-400 mt-1 ml-1">{timestamp}</div>}
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3 max-w-[88%] ml-auto">
          <div className="min-w-0 flex flex-col items-end">
            <div className="bg-blue-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">{renderedText}</div>
            {timestamp && <div className="text-xs text-slate-400 mt-1 mr-1">{timestamp}</div>}
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-white shadow-sm shrink-0 bg-amber-100">
            <img src={avatars.client || "/placeholder.svg"} alt="Cliente" className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {shouldShowSignaturePanel && renderSignaturePanel && <div className="ml-12 mt-3">{renderSignaturePanel()}</div>}
      {shouldShowIdentityPanel && renderIdentityPanel && <div className="ml-12 mt-3">{renderIdentityPanel()}</div>}
      {shouldShowContractorPanel && renderContractorPanel && (
        <div className="ml-12 mt-3">{renderContractorPanel()}</div>
      )}
      {shouldShowConsumptionPanel && renderConsumptionPanel && (
        <div className="ml-12 mt-3">{renderConsumptionPanel()}</div>
      )}
      {shouldShowTarifaPanel && renderTarifaPanel && <div className="ml-12 mt-3">{renderTarifaPanel()}</div>}
    </div>
  )
}

function BotIcon() {
  return (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 ring-2 ring-white shadow-sm flex items-center justify-center shrink-0">
      <Bot className="h-5 w-5 text-white" />
    </div>
  )
}

function Dot({ delay }: { delay: number }) {
  return (
    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
  )
}
