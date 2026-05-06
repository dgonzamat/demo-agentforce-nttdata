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

export default function AirlineDemo() {
  // Define avatars for the conversation
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    airline: asset("/airline-icon.png"),
  }

  // Define the stages of the airline ticket booking process
  const processStages = [
    { id: 1, name: "Consulta Inicial", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Búsqueda de Vuelos", icon: Search, color: "indigo" },
    { id: 3, name: "Opciones de Vuelo", icon: Airplane, color: "purple" },
    { id: 4, name: "Selección de Tarifas", icon: CreditCard, color: "pink" },
    { id: 5, name: "Datos del Pasajero", icon: FileText, color: "orange" },
    { id: 6, name: "Verificación", icon: Check, color: "yellow" },
    { id: 7, name: "Pago", icon: CreditCard, color: "green" },
    { id: 8, name: "Confirmación", icon: FileSignature, color: "teal" },
    { id: 9, name: "Post-Venta", icon: Edit, color: "emerald" },
  ]

  // Flight booking conversation that follows Chilean regulations and Sabre policies
  const airlineConversation = [
    {
      sender: "bot",
      text: "Bienvenido a ChileVuela. Soy AgentForce, su asistente para la compra de boletos aéreos. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Quiero comprar un pasaje ida y vuelta de Santiago a Calama para la próxima semana.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Con gusto le ayudaré con su solicitud. Para ofrecerle las mejores opciones y cumplir con la regulación chilena de transporte aéreo, necesito verificar su identidad.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias por la verificación. Para buscar vuelos entre Santiago y Calama, necesitaría conocer las fechas específicas de viaje. ¿Podría indicarme cuándo desea viajar?",
      requiresIdentity: true,
      stage: 2,
    },
    {
      sender: "client",
      text: "Quiero salir el lunes 15 de julio y regresar el viernes 19 de julio.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "¿Viajará solo o con acompañantes? Y ¿prefiere clase económica o business?",
      stage: 2,
    },
    {
      sender: "client",
      text: "Viajaré solo en clase económica.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Estoy consultando nuestra plataforma Sabre para encontrar las mejores opciones de vuelo para usted. Solo tomará un momento...",
      stage: 2,
    },
    {
      sender: "bot",
      text: "He encontrado los siguientes vuelos:\n\nIDA: Santiago (SCL) → Calama (CJC)\n\nOpción 1:\n- Vuelo AN342 - AndesAir\n- Salida: 15 Jul, 07:50 - Llegada: 15 Jul, 10:05\n- Duración: 2h 15m\n\nOpción 2:\n- Vuelo CS702 - CieloSur\n- Salida: 15 Jul, 12:30 - Llegada: 15 Jul, 14:40\n- Duración: 2h 10m\n\n¿Cuál opción prefiere para la ida?",
      stage: 3,
    },
    {
      sender: "client",
      text: "Prefiero la primera opción con AndesAir.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "Excelente. Ahora las opciones para su vuelo de regreso:\n\nREGRESO: Calama (CJC) → Santiago (SCL)\n\nOpción 1:\n- Vuelo AN343 - AndesAir\n- Salida: 19 Jul, 14:25 - Llegada: 19 Jul, 16:40\n- Duración: 2h 15m\n\nOpción 2:\n- Vuelo CS705 - CieloSur\n- Salida: 19 Jul, 19:10 - Llegada: 19 Jul, 21:25\n- Duración: 2h 15m\n\n¿Qué opción prefiere para el regreso?",
      stage: 3,
    },
    {
      sender: "client",
      text: "También prefiero AndesAir para el regreso.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "He seleccionado sus vuelos con AndesAir. Ahora, permítame mostrarle las tarifas disponibles:\n\n1. Light:\n- Incluye: Equipaje de mano 10kg\n- No incluye: Equipaje en bodega, selección de asiento\n- Precio: $119.900 + IVA\n\n2. Plus:\n- Incluye: Equipaje de mano 10kg, 1 maleta 23kg, selección de asiento\n- Cambios: Con cargo\n- Precio: $149.900 + IVA\n\n3. Top:\n- Incluye: Todo lo anterior + cambios sin costo\n- Precio: $189.900 + IVA\n\n¿Qué tarifa desea seleccionar?",
      stage: 4,
    },
    {
      sender: "client",
      text: "Me interesa la tarifa Plus, ya que llevaré equipaje.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Excelente elección. Ahora necesito los datos para el pasajero.\n\n¿Podría proporcionarme la siguiente información?\n- Nombres y apellidos completos\n- Fecha de nacimiento\n- Número de documento de identidad (RUT o Pasaporte)\n- Correo electrónico\n- Número de teléfono de contacto",
      stage: 5,
    },
    {
      sender: "client",
      text: "Mi nombre es Alejandro Morales Vega, nacido el 20/05/1985, RUT 15.456.789-K, correo alejandro.morales@ejemplo.cl y mi teléfono es +56 9 8765 4321.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Gracias por la información. Ahora verificaré la validez de su RUT conforme a la normativa chilena.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Su RUT ha sido validado correctamente. Ahora debo verificar la disponibilidad en tiempo real de los vuelos seleccionados a través de la API de Sabre... Solo tomará un momento.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Resumen de su reserva:\n\nPasajero: Alejandro Morales Vega\nRUT: 15.456.789-K\n\nVuelo ida: AN342 - 15 Jul, 07:50 (SCL → CJC)\nVuelo regreso: AN343 - 19 Jul, 14:25 (CJC → SCL)\nTarifa: Plus (incluye equipaje)\n\nDesglose de precios:\n- Tarifa base: $149.900\n- IVA (19%): $28.481\n- Tasas de embarque nacional: $10.508\n- Cargo por servicio: $4.900\n\nTotal: $193.789 CLP\n\n¿Confirma esta reserva?",
      stage: 6,
    },
    {
      sender: "client",
      text: "Sí, confirmo la reserva.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Para proceder con el pago, necesitamos volver a verificar su identidad conforme a la Circular 3.559 de la Comisión para el Mercado Financiero (CMF).",
      showIdentityPanel: true,
      stage: 7,
    },
    {
      sender: "bot",
      text: "Gracias. Por favor, indique su método de pago preferido:\n1. Tarjeta de crédito o débito (Webpay)\n2. Transferencia bancaria\n3. Pago en múltiples cuotas",
      stage: 7,
    },
    {
      sender: "client",
      text: "Pagaré con tarjeta de crédito en 3 cuotas.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "Perfecto. Para completar la compra con tarjeta de crédito en 3 cuotas sin interés, necesitará firmar electrónicamente los términos y condiciones conforme a la Ley 19.799 de Firma Electrónica.",
      showSignaturePanel: true,
      stage: 7,
    },
    {
      sender: "client",
      text: "He firmado los términos y condiciones.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "¡Excelente! Su pago ha sido procesado exitosamente y su reserva está confirmada. Conforme a la Ley 19.496 de Protección al Consumidor, tiene un período de retracto de 10 días desde la compra.\n\nSu código de reserva es: XYCL45\nLocalizador Sabre: SABKLM\n\nHe enviado su itinerario, boleto electrónico y factura electrónica a su correo registrado. La factura incluye el desglose de IVA según la normativa del SII.\n\n¿Hay algo más en lo que pueda ayudarle?",
      awaitSignature: true,
      stage: 8,
    },
    {
      sender: "client",
      text: "¿Cuáles son las condiciones de cambio o cancelación?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Las condiciones de cambio para su tarifa Plus son:\n\n- Cambios: Permitidos con una penalidad de $25.000 + diferencia tarifaria (si aplica)\n- Reembolsos: No reembolsable excepto por el período de retracto (10 días desde la compra, según Ley 19.496)\n- Período de retracto: Hasta el 25 de julio puede solicitar un reembolso completo, menos el cargo por servicio\n\nTambién puede realizar cambios en la plataforma de autogestión hasta 24 horas antes del vuelo. ¿Necesita asistencia con algún cambio ahora?",
      stage: 9,
    },
    {
      sender: "client",
      text: "No por ahora, solo quería conocer las condiciones. ¿Puedo hacer check-in online?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Sí, el check-in online estará disponible 48 horas antes de cada vuelo. Recibirá un recordatorio por email.\n\nEl check-in se puede realizar de las siguientes maneras:\n- En nuestro sitio web\n- A través de la app móvil\n- En los kioscos de autoservicio en el aeropuerto\n\nLe recomendamos hacer el check-in con anticipación para seleccionar su asiento sin costo adicional. ¿Hay algo más en lo que pueda ayudarle?",
      stage: 9,
    },
    {
      sender: "client",
      text: "No, eso es todo. Muchas gracias por la atención.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Gracias por elegir ChileVuela. Según la normativa de Protección de Datos Personales (Ley 19.628), sus datos serán tratados con confidencialidad y solo para fines de su viaje.\n\nSi necesita asistencia adicional, puede contactarnos al 600 123 4567 o a través de nuestro sitio web. Le deseamos un excelente viaje.",
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

  const handleStageChange = (stage: number) => {
    setCurrentProcessStage(stage)
  }

  const { messages, playing, autoPlay, progress, stepTimer, messagesEndRef, togglePlay, reset } = useConversationPlayer(
    {
      initialMessages: airlineConversation,
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
      industryConsole="Airline Service Console"
      customerName="Patricia Ruiz"
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
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">Patricia Ruiz</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="Customer ID" value="PAX-44521098" />
              <FieldRow label="FF Status" value="Diamante" />
              <FieldRow label="Cliente desde" value="Jan 14, 2018" />
              <FieldRow label="Hub preferido" value="SCL" />
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
              {['Summary', 'Reservas', 'Millas', 'Related'].map((t, i) => (
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
              <Row label="Vuelos último año" value="32" />
              <Row label="Millas acumuladas" value="184.500" />
              <Row label="Categoría" value="Diamante" />
              <Row label="Spend anual" value="$8.940.000" />
              <Row label="Tasa puntualidad llegada" value="94%" />
              <Row label="Status" value={<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Top Tier</span>} />
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
                <Plane className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Reserva activa"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">Confirmada</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="PNR" value="TRV-7H8K2L" />
              <FieldRow label="Ruta" value="SCL → MEX" />
              <FieldRow label="Fecha" value="May 22, 2025" />
              <FieldRow label="Clase" value="Business" />
              <FieldRow label="Asiento" value="3A" />
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
                title="Upgrade a First Class"
                description="Asientos disponibles. Cliente Diamante puede usar 30K millas."
                cta="Ofrecer upgrade"
              />
              <NextAction
                title="Lounge VIP en SCL"
                description="Beneficio activo. Recordar acceso prioritario antes del vuelo."
                cta="Notificar"
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
      <ChatPanel assistantTitle="Agentforce Airline Assistant">
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
