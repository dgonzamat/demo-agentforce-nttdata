"use client"

import { useState } from "react"
import {
  Check,
  Building,
  Building2,
  User,
  Briefcase,
  Activity,
  Sparkles,
  ChevronRight,
  Phone,
  ShoppingBag,
  Plane,
  HardHat,
  Zap,
  CreditCard,
  TrendingUp,
  Star,
  HelpCircle,
  FileText,
  FileCheck,
  FileSignature,
  CheckCircle,
  BarChart,
  Heart,
  Shield,
  Umbrella,
  Wifi,
  Database,
  Headphones,
  Tag,
  Truck,
  ClipboardList,
  Calendar,
  PlaneTakeoff,
  PlaneLanding,
  MapPin,
  Compass,
  Settings,
  AlertTriangle,
  Hammer,
  Lightbulb,
  Droplet,
  Receipt,
  Gauge,
  Lock,
  Network,
  Server,
  DollarSign,
  Percent,
  ShoppingCart,
  Search,
  Edit,
  Bell,
  ClipboardCheck,
  Users,
  Clock,
  BarChart2,
  PlaneIcon as Airplane,
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

export default function BankingPortabilityDemo() {
  // Actualizar la definición de avatares para la conversación
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    bank: asset("/abstract-financial-growth.png"),
  }

  // Definición de las etapas del proceso de portabilidad financiera
  const processStages = [
    { id: 1, name: "Información y Evaluación", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Certificado de Liquidación", icon: FileText, color: "indigo" },
    { id: 3, name: "Solicitud de Portabilidad", icon: FileCheck, color: "purple" },
    { id: 4, name: "Evaluación y Oferta", icon: BarChart, color: "pink" },
    { id: 5, name: "Aceptación de Oferta", icon: CheckCircle, color: "green" },
    { id: 6, name: "Firma de Contrato", icon: FileSignature, color: "orange" },
    { id: 7, name: "Seguimiento de Cierre", icon: Building, color: "teal" },
    { id: 8, name: "Portabilidad Completada", icon: Check, color: "emerald" },
    { id: 9, name: "Soporte Post-Portabilidad", icon: HelpCircle, color: "cyan" },
  ]

  // Conversación simplificada y más eficiente de portabilidad financiera
  const portabilityConversation = [
    {
      sender: "bot",
      text: "Bienvenido a BancoTech. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Quiero trasladar mi crédito hipotecario a este banco.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Entendido. Para proceder con la portabilidad, primero necesito verificar su identidad.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias. ¿Con qué banco tiene actualmente su crédito hipotecario?",
      requiresIdentity: true,
      stage: 1,
    },
    {
      sender: "client",
      text: "Con Banco X.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Beneficios al portar su crédito:\n- Reducción de tasa: hasta 1.2%\n- Ahorro mensual: hasta $120.000\n- Seguro de cesantía incluido\n\n¿Procedemos con la solicitud?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Sí, adelante.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Solicitaré un Certificado de Liquidación a Banco X. Este documento es necesario para analizar las condiciones de su crédito actual. ¿Autoriza esta gestión?",
      stage: 2,
    },
    {
      sender: "client",
      text: "Autorizado.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Solicitud enviada. Recibiremos respuesta en máximo 3 días hábiles.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Hemos recibido el certificado. Detalles de su crédito actual:\n- Saldo: $65.432.100\n- Tasa: 4.5%\n- Plazo restante: 18 años\n- Cuota mensual: $452.300\n\n¿Es correcta esta información?",
      stage: 3,
    },
    {
      sender: "client",
      text: "Sí, es correcta.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Iniciando evaluación de portabilidad. Tendremos una oferta en 5 días hábiles. ¿Desea aportar documentación adicional para mejorar su evaluación?",
      stage: 4,
    },
    {
      sender: "client",
      text: "No, prefiero esperar la evaluación inicial.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Oferta de portabilidad financiera:\n- Tasa: 3.2% (ahorro de 1.3%)\n- Cuota: $375.800 (ahorro mensual de $76.500)\n- Sin comisiones de prepago\n- Seguro de desempleo gratuito\n\n¿Acepta esta oferta?",
      stage: 5,
    },
    {
      sender: "client",
      text: "Sí, me interesa aceptar.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Para confirmar, necesitamos verificar su identidad nuevamente.",
      showIdentityPanel: true,
      stage: 5,
    },
    {
      sender: "bot",
      text: "Ahora procederemos con la firma digital del contrato de portabilidad.",
      showSignaturePanel: true,
      stage: 6,
    },
    {
      sender: "client",
      text: "Listo, he firmado.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Gracias. Su solicitud de portabilidad está en proceso. Gestionaremos el cierre con Banco X en 10-15 días hábiles sin que usted deba realizar trámites adicionales.",
      awaitSignature: true,
      stage: 7,
    },
    {
      sender: "client",
      text: "¿Debo hacer algo más?",
      stage: 7,
    },
    {
      sender: "bot",
      text: "No es necesario. Nosotros realizamos todas las gestiones. Le mantendremos informado del avance vía correo electrónico.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "¡Portabilidad completada exitosamente! Detalles de su nuevo crédito:\n- Número: CH-2023-78945\n- Primera cuota: 05/06/2023\n- Valor: $375.800\n- Pago: cargo automático en su cuenta",
      stage: 8,
    },
    {
      sender: "client",
      text: "¿Cómo configuro las notificaciones de pago?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Puede configurar notificaciones en nuestra app o sitio web. ¿Prefiere notificaciones por email, SMS o push?",
      stage: 9,
    },
    {
      sender: "client",
      text: "Email y push, por favor.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Configurado. Recibirá notificaciones 5 días antes de cada vencimiento. Un ejecutivo le contactará en 30 días para verificar su satisfacción. ¿Necesita algo más?",
      stage: 9,
    },
    {
      sender: "client",
      text: "No, gracias por la asistencia.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Gracias por elegir BancoTech para su portabilidad financiera. Estamos a su disposición en el 600 123 4567 o a través de nuestra app.",
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
    initialMessages: portabilityConversation,
    onStageChange: handleStageChange,
    stepDuration: 6,
  })

  // Función para reiniciar todo
  const handleReset = () => {
    reset()
    resetIdentity()
    resetSignature()
  }

  const handleSpeedChange = (speed: number) => {
    changePlaybackSpeed(speed)
  }

  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <ConsoleShell
      industryConsole="Banking Service Console"
      customerName="María González"
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
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">María González</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Customer ID" value="CUST-88473291" />
              <FieldRow label="Segment" value="Premium" />
              <FieldRow label="Cliente desde" value="May 12, 2020" />
              <FieldRow label="Relationship Mgr" value="Laura Pérez" />
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
              {['Summary', 'Accounts', 'Loans', 'Related'].map((t, i) => (
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
              <Row label="Lifetime Value" value="Gold" />
              <Row label="Relationship Value" value="$245.750.000" />
              <Row label="Productos activos" value="7" />
              <Row label="Antigüedad" value="5 años" />
              <Row label="Crédito vigente" value="Hipotecario" />
              <Row label="Risk Score" value={<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Low</span>} />
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
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Portabilidad financiera"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">En proceso</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="Banco origen" value="BancoTech" />
              <FieldRow label="Banco destino" value="NTT Bank" />
              <FieldRow label="Producto" value="Crédito Hipotecario" />
              <FieldRow label="Saldo actual" value="$45.200.000" />
              <FieldRow label="Ahorro proyectado" value="$3.800.000" />
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
                title="Ofrecer Cuenta Vista Premium"
                description="El cliente califica para zero comisión y mejor tasa preferencial al portarse."
                cta="Enviar oferta"
              />
              <NextAction
                title="Bundle con Tarjeta de Crédito"
                description="Aprobado pre-evaluado. Combo aumenta engagement y NPS."
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
      <ChatPanel assistantTitle="Agentforce Banking Assistant">
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
