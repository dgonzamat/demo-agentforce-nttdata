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

export default function RetailDemo() {
  // Definir avatares para la conversación
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    retail: asset("/retail-icon.png"),
  }

  // Definición de las etapas del proceso de negociación B2B
  const processStages = [
    { id: 1, name: "Preparación", icon: Briefcase, color: "blue" },
    { id: 2, name: "Análisis de Datos", icon: BarChart2, color: "indigo" },
    { id: 3, name: "Listado de Productos", icon: ShoppingCart, color: "purple" },
    { id: 4, name: "Estructura de Precios", icon: DollarSign, color: "pink" },
    { id: 5, name: "Descuentos por Volumen", icon: Percent, color: "orange" },
    { id: 6, name: "Planificación Promocional", icon: Calendar, color: "yellow" },
    { id: 7, name: "Términos de Pago", icon: FileText, color: "green" },
    { id: 8, name: "Integración de Sistemas", icon: TrendingUp, color: "teal" },
    { id: 9, name: "Acuerdo Final", icon: CheckCircle, color: "emerald" },
  ]

  // Conversación simplificada de negociación B2B entre cadena de supermercados y fabricante de alimentos
  const retailConversation = [
    {
      sender: "bot",
      text: "Bienvenido a NegociaB2B. Soy AgentForce, especialista en facilitar negociaciones comerciales entre supermercados y fabricantes. ¿En qué puedo ayudarle?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Soy el gerente comercial de SuperMercado Chile y necesitamos optimizar nuestra negociación con Alimentos Nacionales para la próxima temporada.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Para ofrecerle una solución adecuada, primero necesito verificar su identidad como representante autorizado.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias. ¿Cuáles son sus principales prioridades en esta negociación?",
      requiresIdentity: true,
      stage: 1,
    },
    {
      sender: "client",
      text: "Mejorar márgenes en lácteos y congelados, optimizar términos de pago, y reducir quiebres de stock durante promociones.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "¿Podría compartir información sobre volumen actual de compra, categorías principales y márgenes actuales?",
      stage: 2,
    },
    {
      sender: "client",
      text: "Compramos $1.200 millones mensuales. Categorías: lácteos (45%), congelados (30%) y conservas (25%). Margen promedio: 18%. Pago a 60 días.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Basado en análisis de mercado chileno, identifico estas oportunidades:\n- Margen actual (18%) por debajo del benchmark (22%)\n- Términos de pago mejorables\n- Alta tasa de quiebre en promociones (25%)",
      stage: 2,
    },
    {
      sender: "client",
      text: "Sí, ese diagnóstico refleja bien nuestra situación actual.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Recomiendo nuestra Plataforma de Negociación B2B que incluye:\n1. Optimización de listado de productos\n2. Modelado de precios y márgenes\n3. Estructura de descuentos por volumen\n4. Planificación promocional colaborativa\n5. Optimización de términos de pago",
      stage: 3,
    },
    {
      sender: "client",
      text: "Me interesa la optimización del listado de productos y la estructura de descuentos por volumen.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "Nuestra optimización de listado incluye:\n- Análisis de rentabilidad por metro cuadrado\n- Recomendaciones de productos a mantener o eliminar\n- Distribución óptima por formato de tienda\n\nEn implementaciones similares, hemos logrado incrementos de margen del 3-5%.",
      stage: 3,
    },
    {
      sender: "client",
      text: "¿Y cómo funciona la estructura de precios?",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Nuestro modelado de precios incluye:\n- Análisis de elasticidad por categoría\n- Benchmarking competitivo\n- Simulador de escenarios\n- Recomendaciones de precios óptimos\n\nEsta herramienta ha permitido mejorar márgenes entre 2-4 puntos porcentuales.",
      stage: 4,
    },
    {
      sender: "client",
      text: "¿Cómo funciona la estructura de descuentos por volumen?",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Nuestra estructura de descuentos incluye:\n- Modelado personalizado de escalas\n- Descuentos diferenciados por categoría\n- Bonificaciones por cumplimiento anual\n- Simulador de impacto financiero\n\nEsto ha generado ahorros del 3-7% en costo de mercadería.",
      stage: 5,
    },
    {
      sender: "client",
      text: "¿Cómo funciona la planificación promocional para evitar quiebres de stock?",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Nuestra planificación promocional incluye:\n- Calendario promocional integrado\n- Modelado predictivo de impacto\n- Planificación de abastecimiento\n- Monitoreo en tiempo real\n\nEsto ha reducido quiebres durante promociones del 25% al 5%.",
      stage: 6,
    },
    {
      sender: "client",
      text: "¿Qué opciones ofrecen para optimizar términos de pago?",
      stage: 7,
    },
    {
      sender: "bot",
      text: "Nuestra optimización de términos de pago incluye:\n- Análisis de impacto financiero\n- Estructuras flexibles de pago\n- Instrumentos financieros alternativos\n- Incentivos por cumplimiento\n\nEsto ha optimizado capital de trabajo en un 15-20%.",
      stage: 7,
    },
    {
      sender: "client",
      text: "¿Cómo se integraría con nuestros sistemas?",
      stage: 8,
    },
    {
      sender: "bot",
      text: "Nuestra integración incluye:\n- Conectividad con sistemas ERP\n- Automatización de procesos comerciales\n- Plataforma colaborativa\n- Analítica avanzada\n\nLa implementación requiere 6-8 semanas, con enfoque por fases.",
      stage: 8,
    },
    {
      sender: "client",
      text: "¿Cuál sería el costo y tiempo de implementación?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Para su operación:\n- Implementación: 2.800 UF\n- Licencia mensual: 180 UF\n- Tiempo: 10 semanas\n\nROI proyectado:\n- Mejora en márgenes: +3-4 puntos\n- Reducción de quiebres: del 25% al 5%\n- Optimización capital de trabajo: 15-20%\n- Payback: 4-6 meses",
      stage: 9,
    },
    {
      sender: "client",
      text: "Me gustaría recibir una propuesta detallada.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Para preparar la propuesta, necesitaríamos verificar su identidad nuevamente para la firma de un acuerdo de confidencialidad.",
      showIdentityPanel: true,
      stage: 9,
    },
    {
      sender: "bot",
      text: "Gracias. Ahora necesitamos que firme digitalmente el acuerdo de confidencialidad.",
      showSignaturePanel: true,
      stage: 9,
    },
    {
      sender: "client",
      text: "He firmado el acuerdo.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Perfecto. Prepararemos una propuesta detallada en 5 días hábiles. Mediremos y mejoraremos estos KPIs:\n- Margen comercial: del 18% al 21-22%\n- Quiebres en promociones: del 25% al 5%\n- Rotación de inventario: mejora del 15-20%\n- Efectividad promocional: incremento del 35%",
      awaitSignature: true,
      stage: 9,
    },
    {
      sender: "client",
      text: "¿Han implementado esta solución con otras cadenas en Chile?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Sí, hemos implementado con éxito en varias cadenas chilenas, incluyendo una de las tres principales del país, con resultados como:\n- Mejora de margen: +3.8 puntos\n- Reducción de quiebres: del 22% al 4.5%\n- Optimización de capital de trabajo: 18%\n\nPodemos organizar una visita para que conozcan su experiencia.",
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

  const { messages, playing, autoPlay, progress, stepTimer, messagesEndRef, togglePlay, reset } = useConversationPlayer(
    {
      initialMessages: retailConversation,
      onStageChange: handleStageChange,
      stepDuration: 6,
    },
  )

  // Función para reiniciar todo
  const handleReset = () => {
    reset()
    resetIdentity()
    resetSignature()
  }

  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <ConsoleShell
      industryConsole="Retail Service Console"
      customerName="Sofia Martínez"
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
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">Sofia Martínez</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Customer ID" value="CUST-00987654" />
              <FieldRow label="Loyalty Tier" value="Platinum" />
              <FieldRow label="Cliente desde" value="May 04, 2021" />
              <FieldRow label="Tienda" value="Polanco" />
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
              {['Summary', 'Orders', 'Returns', 'Loyalty'].map((t, i) => (
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
              <Row label="Lifetime Spend" value="$18.450.000" />
              <Row label="Total Orders" value="24" />
              <Row label="Average Order Value" value="$768.000" />
              <Row label="Returns" value="2" />
              <Row label="Loyalty Points" value="3,250 pts" />
              <Row label="Loyalty Tier" value={<span className="bg-violet-100 text-violet-700 text-xs font-medium px-2 py-0.5 rounded">Platinum</span>} />
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
                <ShoppingBag className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Order Summary"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">Delivered</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="Order Number" value="ORD-00078456" />
              <FieldRow label="Order Date" value="May 10, 2025" />
              <FieldRow label="Total" value="$1.299.000" />
              <FieldRow label="Producto" value="Zapatillas Urban Move" />
              <FieldRow label="Talla" value="24,5 MX" />
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
                title="Ofrecer cambio de talla"
                description="El cliente ha mostrado interés en cambiar el tamaño del producto."
                cta="Enviar recomendación"
              />
              <NextAction
                title="Promover membresía Plus"
                description="Sofía podría disfrutar envíos gratis y devoluciones extendidas."
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
      <ChatPanel assistantTitle="Agentforce Retail Assistant">
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
