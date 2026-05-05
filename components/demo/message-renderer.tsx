import type { ReactNode } from "react"
import type { MessageType } from "@/hooks/use-conversation-player"

interface MessageRendererProps {
  message: MessageType
  avatars: Record<string, string>
  renderSignaturePanel?: () => ReactNode
  renderIdentityPanel?: () => ReactNode
  renderContractorPanel?: () => ReactNode
  renderConsumptionPanel?: () => ReactNode
  renderTarifaPanel?: () => ReactNode
}

export function MessageRenderer({
  message,
  avatars,
  renderSignaturePanel,
  renderIdentityPanel,
  renderContractorPanel,
  renderConsumptionPanel,
  renderTarifaPanel,
}: MessageRendererProps) {
  if (!message.visible) return null

  // Si está en modo "Razonando"
  if (message.reasoning) {
    return (
      <div className="flex items-start gap-2 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-blue-900 flex items-center justify-center">
          <img src={avatars.bot || "/placeholder.svg"} alt="AgentForce" className="w-full h-full object-cover" />
        </div>
        <div className="p-3 rounded-lg bg-white border border-gray-200 text-blue-800 font-medium flex items-center">
          <div className="animate-pulse mr-2">Razonando</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
          </div>
        </div>
      </div>
    )
  }

  const textContent = message.typing
    ? message.text.substring(0, Math.floor(message.text.length * 0.7)) + "▌"
    : message.text

  // Procesar el texto para manejar listas numeradas y viñetas
  const renderedText = textContent.split("\n").map((line, i) => {
    // Detectar listas numeradas (1. Item)
    if (/^\d+\.\s/.test(line)) {
      return (
        <li key={i} className="ml-5">
          {line}
        </li>
      )
    }
    // Detectar listas con guiones (- Item)
    if (/^-\s/.test(line)) {
      return (
        <li key={i} className="ml-5 list-disc">
          {line.substring(2)}
        </li>
      )
    }
    return (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {line}
      </p>
    )
  })

  // Verificar si este mensaje debe mostrar los diferentes paneles
  const shouldShowSignaturePanel = message.showSignaturePanel && !message.typing
  const shouldShowIdentityPanel = message.showIdentityPanel && !message.typing
  const shouldShowContractorPanel = message.showContractorPanel && !message.typing
  const shouldShowConsumptionPanel = message.showConsumptionPanel && !message.typing
  const shouldShowTarifaPanel = message.showTarifaPanel && !message.typing

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-start gap-2">
        {message.sender === "bot" ? (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-blue-900 flex items-center justify-center">
            <img src={avatars.bot || "/placeholder.svg"} alt="AgentForce" className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-amber-100">
            <img src={avatars.client || "/placeholder.svg"} alt="Cliente" className="w-full h-full object-cover" />
          </div>
        )}
        <div
          className={`p-3 rounded-lg max-w-[80%] ${
            message.sender === "client"
              ? "bg-blue-600 text-white ml-auto"
              : "bg-white border border-gray-200 text-black"
          }`}
        >
          {renderedText}
        </div>
      </div>

      {/* Mostrar los diferentes paneles debajo del mensaje correspondiente */}
      {shouldShowSignaturePanel && renderSignaturePanel && <div className="ml-12 mt-2">{renderSignaturePanel()}</div>}
      {shouldShowIdentityPanel && renderIdentityPanel && <div className="ml-12 mt-2">{renderIdentityPanel()}</div>}
      {shouldShowContractorPanel && renderContractorPanel && (
        <div className="ml-12 mt-2">{renderContractorPanel()}</div>
      )}
      {shouldShowConsumptionPanel && renderConsumptionPanel && (
        <div className="ml-12 mt-2">{renderConsumptionPanel()}</div>
      )}
      {shouldShowTarifaPanel && renderTarifaPanel && <div className="ml-12 mt-2">{renderTarifaPanel()}</div>}
    </div>
  )
}
