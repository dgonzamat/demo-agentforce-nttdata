"use client"

import { useState, useCallback } from "react"
import {
  Check,
  FileText,
  HelpCircle,
  BarChart,
  FileSignature,
  CheckCircle,
  Shield,
  Umbrella,
  Heart,
  User,
  Briefcase,
  Activity,
  Sparkles,
  ChevronRight,
} from "lucide-react"
import { useConversationPlayer } from "@/hooks/use-conversation-player"
import { useIdentityVerification } from "@/hooks/use-identity-verification"
import { useDigitalSignature } from "@/hooks/use-digital-signature"
import { useFullscreen } from "@/hooks/use-fullscreen"
import { IdentityPanel } from "@/components/demo/identity-panel"
import { SignaturePanel } from "@/components/demo/signature-panel"
import { MessageRenderer } from "@/components/demo/message-renderer"
import { ConsoleShell, ConsoleCard, FieldRow } from "@/components/demo/console-shell"
import { ChatPanel } from "@/components/demo/chat-panel"
import { asset } from "@/lib/asset"

export default function SegurosDemo() {
  // Definir avatares para la conversación
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    insurance: asset("/abstract-financial-growth.png"),
  }

  // Definición de las etapas del proceso de seguros
  const processStages = [
    { id: 1, name: "Bienvenida y Evaluación", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Identificación de Necesidades", icon: Shield, color: "indigo" },
    { id: 3, name: "Presentación de Opciones", icon: Umbrella, color: "purple" },
    { id: 4, name: "Comparación de Coberturas", icon: BarChart, color: "pink" },
    { id: 5, name: "Personalización", icon: CheckCircle, color: "green" },
    { id: 6, name: "Cotización Final", icon: FileText, color: "orange" },
    { id: 7, name: "Contratación", icon: FileSignature, color: "teal" },
    { id: 8, name: "Emisión de Póliza", icon: Check, color: "emerald" },
    { id: 9, name: "Servicio Post-Venta", icon: Heart, color: "cyan" },
  ]

  // Optimizar la conversación de seguros para mantener consistencia con la bancaria

  // Conversación simplificada y más eficiente de seguros
  const insuranceConversation = [
    {
      sender: "bot",
      text: "Bienvenido a SeguroTech. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Necesito un seguro para mi auto nuevo.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Excelente. Para ofrecerle las mejores opciones, primero necesito verificar su identidad.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias. ¿Podría indicarme la marca, modelo y año de su vehículo?",
      requiresIdentity: true,
      stage: 2,
    },
    {
      sender: "client",
      text: "Toyota Corolla 2023.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "¿Cuál es su principal prioridad al contratar un seguro para su vehículo?",
      stage: 2,
    },
    {
      sender: "client",
      text: "Cobertura en caso de accidente y protección contra robo.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Basado en sus necesidades, le recomiendo estas opciones:\n\n1. Plan Básico: Responsabilidad civil y daños a terceros\n2. Plan Estándar: Básico + robo y daños parciales\n3. Plan Premium: Cobertura total con asistencia 24/7\n\n¿Cuál le interesa?",
      stage: 3,
    },
    {
      sender: "client",
      text: "El Plan Estándar.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "Plan Estándar incluye:\n- Responsabilidad civil: hasta $100M\n- Daños a terceros: cobertura completa\n- Robo: 100% valor comercial\n- Daños parciales: deducible UF 3\n- Asistencia: 3 eventos/año\n\nValor: $35.000 mensuales",
      stage: 4,
    },
    {
      sender: "client",
      text: "¿Qué incluye el Plan Premium que no tenga el Estándar?",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Diferencias Premium vs Estándar:\n- Responsabilidad civil: $300M vs $100M\n- Deducible: UF 1 vs UF 3\n- Asistencia: ilimitada vs 3 eventos\n- Auto reemplazo: 7 días vs no incluido\n- Valor: $48.000 vs $35.000 mensuales",
      stage: 4,
    },
    {
      sender: "client",
      text: "Me quedo con el Estándar. ¿Puedo personalizarlo?",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Personalizaciones disponibles:\n- Aumentar RC a $200M (+$5.000)\n- Auto reemplazo por 3 días (+$3.500)\n- Reducir deducible a UF 2 (+$2.800)\n\n¿Desea agregar alguna?",
      stage: 5,
    },
    {
      sender: "client",
      text: "Agregaré el auto de reemplazo y reducir el deducible.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Plan Estándar personalizado:\n- RC: $100M\n- Daños a terceros: completa\n- Robo: 100% valor comercial\n- Deducible: UF 2\n- Asistencia: 3 eventos/año\n- Auto reemplazo: 3 días\n\nTotal: $41.300/mes\n\n¿Confirma contratación?",
      stage: 6,
    },
    {
      sender: "client",
      text: "Sí, confirmo.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Para continuar con la contratación, necesitamos verificar su identidad nuevamente.",
      showIdentityPanel: true,
      stage: 7,
    },
    {
      sender: "bot",
      text: "Gracias. Ahora debe firmar digitalmente el contrato de seguro.",
      showSignaturePanel: true,
      stage: 7,
    },
    {
      sender: "client",
      text: "Listo, he firmado.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "¡Contratación exitosa! Su póliza será emitida en las próximas 24 horas y enviada a su email.",
      awaitSignature: true,
      stage: 8,
    },
    {
      sender: "client",
      text: "¿Cuándo inicia la cobertura?",
      stage: 8,
    },
    {
      sender: "bot",
      text: "Su cobertura inicia mañana a las 12:00 hrs. Detalles:\n- Número póliza: AUTO-2023-45678\n- Vigencia: 1 año (renovación automática)\n- Pago: Cargo mensual en tarjeta\n- Primera cuota: 05/06/2023",
      stage: 8,
    },
    {
      sender: "client",
      text: "¿Cómo reporto un siniestro?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Para reportar siniestros:\n1. Llame al 600 123 4567 (24/7)\n2. Use nuestra app móvil\n3. Visite www.segurotech.com/siniestros\n\nTome fotos del incidente y tenga a mano su número de póliza.",
      stage: 9,
    },
    {
      sender: "client",
      text: "Perfecto, gracias.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Gracias por elegir SeguroTech. Recibirá toda la documentación por email. Estamos a su disposición para cualquier consulta adicional.",
      stage: 9,
    },
  ]

  // Usar los hooks personalizados
  const [currentProcessStage, setCurrentProcessStage] = useState(1)
  const { fullscreen, showMinimalControls, containerRef, toggleFullscreen } = useFullscreen()
  const {
    identityVerified,
    faceScanComplete,
    faceDetected,
    scanProgress,
    startFaceScan,
    completeIdentity,
    resetIdentity,
  } = useIdentityVerification()
  const { signatureComplete, completeSignature, resetSignature } = useDigitalSignature()

  const handleStageChange = (stage: number) => {
    setCurrentProcessStage(stage)
  }

  const {
    messages,
    playing,
    autoPlay,
    progress,
    stepTimer,
    messagesEndRef,
    playbackSpeed,
    togglePlay,
    reset,
    changePlaybackSpeed,
  } = useConversationPlayer({
    initialMessages: insuranceConversation,
    onStageChange: handleStageChange,
    stepDuration: 6,
  })

  // Función para reiniciar todo
  const handleReset = () => {
    reset()
    resetIdentity()
    resetSignature()
  }

  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <ConsoleShell
      industryConsole="Insurance Service Console"
      customerName="Carolina Soto"
      playing={playing}
      progress={progress}
      onTogglePlay={togglePlay}
      onReset={handleReset}
      leftPanel={
        <>
          <ConsoleCard
            icon={
              <div className="w-9 h-9 rounded-md bg-slate-100 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-500" />
              </div>
            }
            title="Customer"
          >
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">Carolina Soto</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Customer ID" value="CUST-78429103" />
              <FieldRow label="Segment" value="Gold" />
              <FieldRow label="Policyholder Since" value="Mar 15, 2019" />
              <FieldRow label="Relationship Manager" value="Jorge Ramírez" />
            </div>
          </ConsoleCard>

          <ConsoleCard
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Customer 360"
          >
            <div className="-mx-4 -mt-4 px-4 border-b flex gap-4 text-xs">
              {["Summary", "Policies", "Claims", "Related"].map((t, i) => (
                <button
                  key={t}
                  className={`py-2 -mb-px ${
                    i === 0
                      ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="space-y-3 pt-4">
              <Row label="Total Policies" value="4" />
              <Row label="Total Coverage" value="$1.250.000.000" />
              <Row label="Total Premium (Annual)" value="$2.450.000" />
              <Row label="Active Claims" value="0" />
              <Row label="Loyalty Level" value="Gold" />
              <Row
                label="Risk Score"
                value={
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">
                    Low
                  </span>
                }
              />
            </div>
          </ConsoleCard>

          <ConsoleCard title="Etapas del proceso">
            <ol className="space-y-0.5 -mx-1">
              {processStages.map((stage) => {
                const Icon = stage.icon
                const isDone = currentProcessStage > stage.id
                const isActive = currentProcessStage === stage.id
                return (
                  <li key={stage.id} className="relative">
                    <div
                      className={`flex items-center gap-2.5 p-1.5 rounded transition-colors ${
                        isActive ? "bg-blue-50" : ""
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                          isDone
                            ? "bg-blue-600 text-white"
                            : isActive
                            ? "bg-white border-2 border-blue-600 text-blue-600"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {isDone ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
                      </div>
                      <span
                        className={`text-xs leading-tight ${
                          isActive
                            ? "font-semibold text-slate-900"
                            : isDone
                            ? "text-slate-700"
                            : "text-slate-500"
                        }`}
                      >
                        {stage.name}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </ConsoleCard>
        </>
      }
      rightPanel={
        <>
          <ConsoleCard
            icon={
              <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Cotización en curso"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">En proceso</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="Vehículo" value="Toyota Corolla 2023" />
              <FieldRow label="Plan recomendado" value="Estándar Personalizado" />
              <FieldRow label="Cobertura" value="RC + Robo + Daños" />
              <FieldRow label="Prima estimada" value="$41.300 / mes" />
            </div>
          </ConsoleCard>

          <ConsoleCard
            icon={
              <div className="w-7 h-7 rounded-md bg-emerald-50 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-emerald-600" />
              </div>
            }
            title="Recommended Next Best Action"
          >
            <div className="space-y-3">
              <NextAction
                title="Ofrecer Asistencia 24/7"
                description="El cliente valora respuesta inmediata. Upgrade a Premium agrega asistencia ilimitada."
                cta="Enviar recomendación"
              />
              <NextAction
                title="Promover Auto de Reemplazo"
                description="Funcionalidad valorada en demos previas. Compatible con plan actual."
                cta="Ver beneficios"
              />
            </div>
          </ConsoleCard>

          <ConsoleCard
            icon={
              <div className="w-7 h-7 rounded-md bg-violet-50 flex items-center justify-center">
                <Activity className="h-4 w-4 text-violet-600" />
              </div>
            }
            title="Etapa actual"
          >
            <div className="space-y-3">
              <FieldRow label="Stage" value={currentStageName} />
              <div>
                <div className="text-slate-500 text-xs mb-1">Progreso</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-700 tabular-nums">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </ConsoleCard>
        </>
      }
    >
      <ChatPanel assistantTitle="Agentforce Insurance Assistant">
        {messages.map(
          (msg, index) =>
            msg.visible && (
              <MessageRenderer
                key={index}
                message={msg}
                avatars={avatars}
                renderSignaturePanel={
                  msg.showSignaturePanel && !msg.typing
                    ? () => (
                        <SignaturePanel
                          signatureComplete={signatureComplete}
                          completeSignature={completeSignature}
                        />
                      )
                    : undefined
                }
                renderIdentityPanel={
                  msg.showIdentityPanel && !msg.typing
                    ? () => (
                        <IdentityPanel
                          faceScanComplete={faceScanComplete}
                          scanProgress={scanProgress}
                          faceDetected={faceDetected}
                          startFaceScan={startFaceScan}
                          completeIdentity={completeIdentity}
                        />
                      )
                    : undefined
                }
              />
            ),
        )}
        <div ref={messagesEndRef} />
      </ChatPanel>
    </ConsoleShell>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-900 font-medium">{value}</span>
    </div>
  )
}

function NextAction({ title, description, cta }: { title: string; description: string; cta: string }) {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-start gap-2 mb-2">
        <div className="text-sm font-semibold text-blue-700 leading-tight">{title}</div>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed mb-2.5">{description}</p>
      <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
        {cta}
        <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  )
}
