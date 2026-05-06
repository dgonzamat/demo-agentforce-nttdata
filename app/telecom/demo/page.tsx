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

export default function TelecomDemo() {
  // Definir avatares para la conversación
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    telecom: asset("/telecom-icon.png"),
  }

  // Definición de las etapas del proceso de venta B2B de telecomunicaciones
  const processStages = [
    { id: 1, name: "Evaluación Inicial", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Análisis de Necesidades", icon: Building, color: "indigo" },
    { id: 3, name: "Diseño de Solución", icon: Network, color: "purple" },
    { id: 4, name: "Verificación Regulatoria", icon: Lock, color: "pink" },
    { id: 5, name: "Propuesta Comercial", icon: FileText, color: "orange" },
    { id: 6, name: "Negociación", icon: BarChart, color: "yellow" },
    { id: 7, name: "Contratación", icon: FileSignature, color: "green" },
    { id: 8, name: "Plan de Implementación", icon: Server, color: "teal" },
    { id: 9, name: "Activación de Servicios", icon: Check, color: "emerald" },
  ]

  // Conversación de venta B2B de telecomunicaciones en Chile
  const telecomConversation = [
    {
      sender: "bot",
      text: "Bienvenido a TelecomTech. Soy AgentForce, especialista en soluciones empresariales de telecomunicaciones. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Somos una empresa con 5 sucursales en Chile y necesitamos mejorar nuestra conectividad y comunicaciones unificadas.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias por su interés. Para ofrecerle una solución adecuada, primero necesito verificar su identidad como representante autorizado de la empresa.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias por la verificación. Para entender mejor sus necesidades, ¿podría indicarme el tamaño aproximado de su empresa en términos de empleados y el sector en el que operan?",
      requiresIdentity: true,
      stage: 2,
    },
    {
      sender: "client",
      text: "Somos una empresa de servicios financieros con aproximadamente 250 empleados distribuidos en nuestras 5 sucursales en Santiago, Valparaíso, Concepción, Antofagasta y Puerto Montt.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Entendido. ¿Cuáles son los principales desafíos que enfrentan actualmente con sus telecomunicaciones?",
      stage: 2,
    },
    {
      sender: "client",
      text: "Tenemos problemas de conectividad entre sucursales, necesitamos mejorar la seguridad de nuestras comunicaciones y queremos implementar un sistema de comunicaciones unificadas que cumpla con las regulaciones del sector financiero en Chile.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Basado en sus necesidades, recomiendo estas soluciones:\n\n1. Red MPLS dedicada para conectar todas sus sucursales\n2. Solución de comunicaciones unificadas en la nube\n3. Sistema de seguridad perimetral gestionado\n4. Enlace de Internet dedicado con respaldo\n\n¿Desea que profundice en alguna de estas soluciones?",
      stage: 3,
    },
    {
      sender: "client",
      text: "Me interesa conocer más sobre la red MPLS y las comunicaciones unificadas.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "Red MPLS dedicada:\n- Conexión privada entre todas sus sucursales\n- Ancho de banda garantizado de 100 Mbps simétricos\n- QoS para priorizar tráfico crítico\n- SLA de 99.8% de disponibilidad\n- Monitoreo 24/7\n\nComunicaciones unificadas:\n- Telefonía IP integrada con Microsoft Teams\n- Videoconferencia HD\n- Contact center para atención a clientes\n- Grabación de llamadas conforme a normativa CMF\n- Mensajería instantánea corporativa cifrada",
      stage: 3,
    },
    {
      sender: "client",
      text: "Suena bien. ¿Estas soluciones cumplen con las regulaciones chilenas para el sector financiero?",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Sí, nuestras soluciones cumplen con todas las regulaciones aplicables:\n\n1. Ley 19.628 sobre Protección de Datos Personales\n2. Normativa Subtel para servicios de telecomunicaciones\n3. Circular CMF para entidades financieras\n4. Ley 20.009 de fraude financiero\n5. Estándares de cifrado aprobados por el CSIRT de Gobierno\n\nAdicionalmente, ofrecemos:\n- Almacenamiento de datos en territorio chileno\n- Cifrado de extremo a extremo\n- Auditoría de comunicaciones\n- Respaldo de grabaciones por 5 años",
      stage: 4,
    },
    {
      sender: "client",
      text: "Perfecto. ¿Podrían presentarnos una propuesta comercial?",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Con gusto. Nuestra propuesta comercial incluye:\n\nRed MPLS:\n- Implementación: UF 180\n- Mensualidad: UF 85\n\nComunicaciones unificadas:\n- Implementación: UF 120\n- Mensualidad: UF 3,5 por usuario (250 usuarios)\n\nSeguridad perimetral:\n- Implementación: UF 90\n- Mensualidad: UF 45\n\nInternet dedicado:\n- Implementación: UF 60\n- Mensualidad: UF 35\n\nTotal implementación: UF 450\nTotal mensual: UF 1.045\n\n¿Desea revisar algún aspecto específico de la propuesta?",
      stage: 5,
    },
    {
      sender: "client",
      text: "El costo mensual es algo elevado. ¿Hay opciones para optimizar el presupuesto?",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Entiendo su preocupación por el presupuesto. Podemos optimizar la propuesta de estas formas:\n\n1. Plan escalonado de implementación en 3 fases\n2. Reducción inicial de ancho de banda MPLS a 50 Mbps (UF 65 mensual)\n3. Comunicaciones unificadas básicas (UF 2,8 por usuario)\n4. Contrato a 36 meses con descuento del 15%\n\nCon estos ajustes, el total mensual sería aproximadamente UF 850, con posibilidad de escalar según sus necesidades futuras. ¿Le parece adecuado?",
      stage: 6,
    },
    {
      sender: "client",
      text: "Esa propuesta se ajusta mejor a nuestro presupuesto. Estamos interesados en proceder.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Excelente. Para formalizar la contratación, necesitamos verificar nuevamente su identidad como representante legal o apoderado de la empresa.",
      showIdentityPanel: true,
      stage: 7,
    },
    {
      sender: "bot",
      text: "Gracias. Ahora necesitamos que firme digitalmente el contrato de servicios de telecomunicaciones conforme a la Ley 19.799 de Firma Electrónica.",
      showSignaturePanel: true,
      stage: 7,
    },
    {
      sender: "client",
      text: "He firmado el contrato.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "Contrato recibido correctamente. Procederemos con la implementación según el siguiente cronograma:\n\nFase 1 (30 días):\n- Instalación de enlaces principales\n- Configuración de red MPLS básica\n- Implementación de comunicaciones unificadas en oficina central\n\nFase 2 (60 días):\n- Extensión a sucursales restantes\n- Configuración de seguridad perimetral\n- Integración con sistemas existentes\n\nFase 3 (90 días):\n- Optimización y ajustes finales\n- Capacitación a usuarios\n- Entrega de documentación técnica\n\n¿Está de acuerdo con este plan de implementación?",
      awaitSignature: true,
      stage: 8,
    },
    {
      sender: "client",
      text: "Sí, el cronograma parece adecuado. ¿Quién será nuestro contacto durante la implementación?",
      stage: 8,
    },
    {
      sender: "bot",
      text: "Se le asignará un Gerente de Proyecto dedicado y un Ingeniero de Implementación. Además, tendrá acceso a nuestro portal de clientes donde podrá:\n\n- Seguir el avance del proyecto en tiempo real\n- Reportar incidencias\n- Acceder a documentación técnica\n- Visualizar métricas de servicio\n- Gestionar tickets de soporte\n\nToda la información de contacto será enviada a su correo corporativo en las próximas 24 horas.",
      stage: 8,
    },
    {
      sender: "client",
      text: "Perfecto. ¿Cuándo comenzaría la activación de los servicios?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "La activación de servicios comenzará en 5 días hábiles con la instalación del enlace principal en su oficina central de Santiago. Posteriormente, se realizará la activación en las demás sucursales según el cronograma acordado.\n\nCada activación incluirá:\n- Pruebas de conectividad\n- Verificación de cumplimiento regulatorio\n- Capacitación básica a usuarios clave\n- Entrega de credenciales de acceso\n\nAl finalizar cada fase, se realizará una reunión de entrega formal con acta de conformidad.",
      stage: 9,
    },
    {
      sender: "client",
      text: "Excelente. Estamos listos para comenzar.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Gracias por confiar en TelecomTech para sus soluciones empresariales. Hemos registrado su contratación y recibirá toda la documentación por correo electrónico. Su ejecutivo de cuenta se pondrá en contacto con usted en las próximas 24 horas para coordinar el inicio de la implementación.",
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
      initialMessages: telecomConversation,
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
      industryConsole="Telecom Service Console"
      customerName="Juan Pérez"
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
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">Juan Pérez</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Customer ID" value="CUST-19283746" />
              <FieldRow label="Plan" value="Móvil 80GB" />
              <FieldRow label="Cliente desde" value="Aug 03, 2021" />
              <FieldRow label="Tier" value="Plata" />
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
              {['Summary', 'Líneas', 'Servicios', 'Related'].map((t, i) => (
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
              <Row label="ARPU" value="$28.500 / mes" />
              <Row label="Líneas activas" value="3" />
              <Row label="Antigüedad" value="4 años" />
              <Row label="Plan actual" value="Móvil 80GB" />
              <Row label="Datos consumidos (mes)" value="62 GB / 80 GB" />
              <Row label="NPS" value={<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Promotor</span>} />
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
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Caso en curso"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">Abierto</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="Caso #" value="CASE-00457821" />
              <FieldRow label="Tipo" value="Soporte técnico" />
              <FieldRow label="Categoría" value="Conectividad" />
              <FieldRow label="Prioridad" value="Alta" />
              <FieldRow label="SLA restante" value="3h 22m" />
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
                title="Upgrade a Plan Ilimitado"
                description="Cliente consume 78% del plan. Upgrade evita roaming y aumenta CLTV."
                cta="Enviar propuesta"
              />
              <NextAction
                title="Bundle con Internet Hogar"
                description="Cobertura confirmada en domicilio. Descuento cruzado del 20%."
                cta="Ver bundle"
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
      <ChatPanel assistantTitle="Agentforce Telecom Assistant">
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
