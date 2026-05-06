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
import { ConsumptionPanel } from "@/components/demo/consumption-panel"
import { TarifaPanel } from "@/components/demo/tarifa-panel"
import { MessageRenderer } from "@/components/demo/message-renderer"
import { ConsoleShell, ConsoleCard, FieldRow } from "@/components/demo/console-shell"
import { ChatPanel } from "@/components/demo/chat-panel"
import { asset } from "@/lib/asset"

export default function ServiciosBasicosDemo() {
  // Define avatars for the conversation
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    utility: asset("/utility-icon.png"),
  }

  // Define the stages of the utility service process
  const processStages = [
    { id: 1, name: "Consulta Inicial", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Verificación de Cliente", icon: FileText, color: "indigo" },
    { id: 3, name: "Análisis de Consumo", icon: BarChart2, color: "purple" },
    { id: 4, name: "Revisión Tarifaria", icon: Zap, color: "amber" },
    { id: 5, name: "Detección de Problemas", icon: AlertTriangle, color: "orange" },
    { id: 6, name: "Opciones de Solución", icon: CheckCircle, color: "green" },
    { id: 7, name: "Programación de Servicios", icon: Calendar, color: "teal" },
    { id: 8, name: "Confirmación", icon: Clock, color: "cyan" },
    { id: 9, name: "Seguimiento", icon: MapPin, color: "emerald" },
  ]

  // Utility services conversation
  const serviciosBasicosConversation = [
    {
      sender: "bot",
      text: "Bienvenido a EnergíaChile. Soy AgentForce, su asistente para consultas y gestiones relacionadas con sus servicios de electricidad y agua. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Hola, he notado que mi última boleta de electricidad tiene un cobro mucho más alto de lo normal. Quisiera revisar qué está pasando.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Lamento escuchar sobre ese incremento inesperado. Para ayudarle con su consulta sobre facturación eléctrica, primero necesito verificar su identidad conforme a los protocolos de seguridad y la Ley 19.628 sobre Protección de Datos Personales.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias por verificar su identidad. He identificado su cuenta de suministro eléctrico en la dirección Av. Las Condes 12345, Santiago. ¿Es esta la cuenta sobre la que desea consultar?",
      requiresIdentity: true,
      stage: 2,
    },
    {
      sender: "client",
      text: "Sí, es esa dirección.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Perfecto. Estoy analizando su historial de consumo y facturación de los últimos 12 meses para identificar cualquier anomalía. Esto tomará solo un momento...",
      stage: 2,
    },
    {
      sender: "bot",
      text: "He completado el análisis de su cuenta. Efectivamente, su última factura muestra un incremento significativo en el consumo. Aquí está el detalle:\n\n- Última factura (Junio 2023): 420 kWh - $58.600\n- Promedio últimos 6 meses: 280 kWh - $39.200\n- Incremento: 50% en consumo, 49.5% en monto\n\n¿Le gustaría ver un análisis detallado de su consumo?",
      stage: 3,
    },
    {
      sender: "client",
      text: "Sí, por favor muéstrame el detalle del consumo.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "Aquí tiene el análisis detallado de su consumo eléctrico:",
      showConsumptionPanel: true,
      stage: 3,
    },
    {
      sender: "client",
      text: "Veo que hay un aumento importante. ¿Podría explicarme cómo se calcula mi tarifa y si ha habido cambios recientes?",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Con gusto le explico sobre su tarifa eléctrica. Usted está en el plan BT-1 (Tarifa Residencial Regulada) establecida por la Comisión Nacional de Energía (CNE) según el Decreto Tarifario vigente.\n\nLa estructura de su tarifa incluye:\n\n1. Cargo fijo: $1.200 mensual\n2. Cargo por energía: $139,5 por kWh\n3. Cargo por potencia: Incluido en tarifa BT-1\n4. Impuestos: IVA 19%\n\n¿Desea ver una comparativa de su tarifa actual con otras opciones disponibles?",
      stage: 4,
    },
    {
      sender: "client",
      text: "Sí, me gustaría ver las opciones de tarifas disponibles.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Aquí tiene la comparativa de tarifas eléctricas disponibles según la normativa de la CNE:",
      showTarifaPanel: true,
      stage: 4,
    },
    {
      sender: "client",
      text: "Entiendo las tarifas, pero sigo sin comprender por qué mi consumo aumentó tanto este mes.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Basado en el análisis de su patrón de consumo y la información disponible, he identificado posibles causas para el incremento:\n\n1. Cambio estacional: Junio marca el inicio del invierno, lo que suele aumentar el uso de calefacción eléctrica\n2. Días facturados: Su último período tiene 33 días vs. 30 días del período anterior\n3. Posible fuga o consumo anómalo: El patrón muestra consumo constante incluso en horas de baja actividad\n\nAdicionalmente, no se registran cambios en el medidor ni recalificaciones tarifarias en el período analizado.\n\n¿Le gustaría que exploremos alguna de estas causas en particular?",
      stage: 5,
    },
    {
      sender: "client",
      text: "Me preocupa lo de una posible fuga. ¿Cómo podemos verificar si existe algún problema en mi instalación?",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Su preocupación es válida. Para verificar posibles fugas o consumos anómalos en su instalación eléctrica, podemos proceder de las siguientes maneras:\n\n1. Revisión remota avanzada: Análisis detallado hora por hora de su consumo para detectar patrones anómalos\n\n2. Inspección técnica domiciliaria: Un técnico certificado puede visitar su domicilio para realizar pruebas en su instalación\n\n3. Autodiagnóstico guiado: Le puedo proporcionar instrucciones para que usted mismo realice pruebas básicas de verificación\n\nTodas estas opciones están contempladas en la normativa técnica de la SEC (Superintendencia de Electricidad y Combustibles) y no tienen costo para usted según el Art. 126° del Reglamento de la Ley General de Servicios Eléctricos.\n\n¿Cuál de estas opciones prefiere?",
      stage: 6,
    },
    {
      sender: "client",
      text: "Prefiero la inspección técnica domiciliaria. ¿Cuándo podría realizarse?",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Excelente elección. La inspección técnica domiciliaria incluirá:\n\n- Revisión del medidor y acometida\n- Verificación de fugas en circuitos principales\n- Medición de consumo de electrodomésticos principales\n- Informe técnico detallado\n\nTenemos disponibilidad para programar esta visita en los siguientes horarios:\n\n- Mañana, 15 de julio: 9:00 - 12:00 hrs\n- Mañana, 15 de julio: 14:00 - 17:00 hrs\n- Pasado mañana, 16 de julio: 9:00 - 12:00 hrs\n\n¿Qué horario le acomoda mejor?",
      stage: 7,
    },
    {
      sender: "client",
      text: "Prefiero mañana en la mañana, de 9:00 a 12:00 hrs.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "Para confirmar la visita técnica, necesito su autorización formal conforme a la normativa de la SEC y la Ley de Protección al Consumidor. Esto garantiza su consentimiento para el ingreso del técnico a su domicilio.",
      showSignaturePanel: true,
      stage: 7,
    },
    {
      sender: "bot",
      text: "He programado la visita técnica para mañana, 15 de julio, entre las 9:00 y 12:00 hrs. Detalles de la visita:\n\n- Técnico asignado: Carlos Mendoza (ID: TCN-4589)\n- Duración estimada: 45-60 minutos\n- Requisitos: Presencia de un adulto responsable y acceso a todas las áreas con instalaciones eléctricas\n\nEl técnico se identificará con credencial oficial y uniforme de la empresa. Por seguridad, puede verificar su identidad llamando al 600 123 4567 antes de permitir el ingreso.\n\nAdicionalmente, mientras esperamos la visita técnica, he aplicado una suspensión temporal del proceso de cobranza de su última factura, conforme al Art. 62° del Reglamento de la Ley General de Servicios Eléctricos.\n\n¿Necesita alguna información adicional sobre la visita programada?",
      awaitSignature: true,
      stage: 8,
    },
    {
      sender: "client",
      text: "No, está todo claro. ¿Recibiré alguna notificación de confirmación?",
      stage: 8,
    },
    {
      sender: "bot",
      text: "Sí, recibirá las siguientes notificaciones:\n\n1. Confirmación inmediata: Ya enviada a su correo electrónico y SMS\n2. Recordatorio: Hoy a las 20:00 hrs\n3. Aviso de proximidad: Mañana, 30 minutos antes de la visita\n\nTodas incluyen los datos del técnico y un código QR para verificar su identidad.\n\nAdicionalmente, hemos creado un caso de seguimiento en nuestro sistema con el número #EC-2023-45678, que le permitirá:\n\n- Consultar el estado de su solicitud\n- Recibir el informe técnico digital\n- Presentar reclamos si fuera necesario\n\n¿Hay algo más en lo que pueda ayudarle respecto a este tema u otro servicio?",
      stage: 9,
    },
    {
      sender: "client",
      text: "No, eso es todo por ahora. Gracias por la ayuda.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Ha sido un placer atenderle. Recuerde que una vez realizada la inspección técnica, analizaremos los resultados y le contactaremos para informarle:\n\n1. Si se detectó alguna anomalía en su instalación\n2. Si procede algún ajuste en su facturación según la normativa vigente\n3. Recomendaciones para optimizar su consumo eléctrico\n\nTodo este proceso está regulado por la Norma Técnica de Calidad de Servicio para Sistemas de Distribución y la Ley N°21.081 de Protección al Consumidor.\n\nSi necesita cualquier otra asistencia, puede contactarnos a través de este mismo canal, nuestra app móvil o llamando al 600 123 4567. ¡Que tenga un excelente día!",
      stage: 9,
    },
  ]

  // Use custom hooks
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

  // Datos de consumo para el panel
  const [consumptionData] = useState({
    current: 420,
    previous: 280,
    history: [260, 270, 285, 290, 275, 300, 420],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    hourly: [
      { hour: "00:00", value: 0.8 },
      { hour: "04:00", value: 0.7 },
      { hour: "08:00", value: 1.5 },
      { hour: "12:00", value: 1.2 },
      { hour: "16:00", value: 1.3 },
      { hour: "20:00", value: 2.1 },
    ],
  })

  // Datos de tarifas para el panel
  const [tarifaData] = useState({
    current: "BT-1",
    options: [
      { name: "BT-1", description: "Residencial Simple", basePrice: 139.5, suitable: true },
      { name: "BT-2", description: "Potencia Contratada", basePrice: 125.8, suitable: false },
      { name: "BT-3", description: "Horaria Residencial", basePrice: "Variable", suitable: true },
    ],
    savings: {
      bt1: 0,
      bt2: -8500,
      bt3: 4200,
    },
  })

  const handleStageChange = (stage: number) => {
    setCurrentProcessStage(stage)
  }

  const { messages, playing, autoPlay, progress, stepTimer, messagesEndRef, togglePlay, reset } = useConversationPlayer(
    {
      initialMessages: serviciosBasicosConversation,
      onStageChange: handleStageChange,
      stepDuration: 6,
    },
  )

  // Function to reset everything
  const handleReset = () => {
    reset()
    resetIdentity()
    resetSignature()
  }

  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <ConsoleShell
      industryConsole="Utilities Service Console"
      customerName="Carmen López"
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
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">Carmen López</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Customer ID" value="CUST-44389017" />
              <FieldRow label="Servicio" value="Eléctrico Residencial" />
              <FieldRow label="Cliente desde" value="Mar 22, 2017" />
              <FieldRow label="Comuna" value="Las Condes" />
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
              {['Summary', 'Consumo', 'Facturas', 'Related'].map((t, i) => (
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
              <Row label="Tarifa actual" value="BT-1" />
              <Row label="Consumo promedio" value="245 kWh / mes" />
              <Row label="Última factura" value="$38.450" />
              <Row label="Pagos al día" value="Sí" />
              <Row label="Reclamos abiertos" value="0" />
              <Row label="Status" value={<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Activo</span>} />
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
                <Zap className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Caso de tarifa"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">Análisis</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="Caso #" value="UTIL-00892341" />
              <FieldRow label="Tipo" value="Cambio de tarifa" />
              <FieldRow label="Tarifa actual" value="BT-1" />
              <FieldRow label="Tarifa propuesta" value="BT-2 horaria" />
              <FieldRow label="Ahorro estimado" value="$5.200 / mes" />
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
                title="Activar lectura inteligente"
                description="Smart meter compatible. Permite tarifas horarias y reduce factura ~14%."
                cta="Iniciar instalación"
              />
              <NextAction
                title="Plan de eficiencia energética"
                description="Diagnóstico gratuito + recomendaciones personalizadas."
                cta="Agendar"
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
      <ChatPanel assistantTitle="Agentforce Utilities Assistant">
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
                renderConsumptionPanel={
                  msg.showConsumptionPanel && !msg.typing
                    ? () => <ConsumptionPanel onComplete={() => {}} />
                    : undefined
                }
                renderTarifaPanel={
                  msg.showTarifaPanel && !msg.typing
                    ? () => <TarifaPanel onComplete={() => {}} />
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
