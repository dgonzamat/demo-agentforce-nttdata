"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  Check,
  FileText,
  HelpCircle,
  PlaneIcon as Airplane,
  Search,
  CreditCard,
  FileSignature,
  Maximize,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useConversationPlayer } from "@/hooks/use-conversation-player"
import { useIdentityVerification } from "@/hooks/use-identity-verification"
import { useDigitalSignature } from "@/hooks/use-digital-signature"
import { useFullscreen } from "@/hooks/use-fullscreen"
import { ProcessRoadmap } from "@/components/demo/process-roadmap"
import { IdentityPanel } from "@/components/demo/identity-panel"
import { SignaturePanel } from "@/components/demo/signature-panel"
import { StepTimer } from "@/components/demo/step-timer"
import { MinimalControls } from "@/components/demo/minimal-controls"
import { MessageRenderer } from "@/components/demo/message-renderer"
import { downloadDemo } from "@/utils/download-demo"

export default function AirlineDemo() {
  // Define avatars for the conversation
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    airline: "/airline-icon.png",
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

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f8]" ref={containerRef}>
      {/* Header - Only visible when not in fullscreen */}
      {!fullscreen && (
        <header className="bg-white border-b py-2 px-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <div className="bg-blue-900 px-2 py-1 rounded">
              <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-6 md:h-8 mr-4 filter brightness-0 invert" />
            </div>
          </div>
          <div className="flex space-x-2 md:space-x-4">
            <Button
              variant={playing ? "destructive" : "default"}
              onClick={togglePlay}
              className="flex items-center text-xs md:text-sm"
            >
              {playing ? (
                <Pause className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              ) : (
                <Play className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              )}
              {playing ? "Pausar" : progress === 100 ? "Reiniciar" : "Reproducir"}
            </Button>
            <Button variant="outline" onClick={handleReset} className="flex items-center text-xs md:text-sm">
              <RefreshCw className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              Reiniciar
            </Button>
            <Button variant="outline" onClick={toggleFullscreen} className="flex items-center text-xs md:text-sm">
              <Maximize className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Pantalla Completa</span>
            </Button>
            <Button
              variant="default"
              onClick={() => downloadDemo(containerRef)}
              className="flex items-center text-xs md:text-sm bg-green-600 hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span className="hidden sm:inline">Descargar para LinkedIn</span>
              <span className="sm:hidden">Descargar</span>
            </Button>
          </div>
        </header>
      )}

      <div className={`flex-1 py-4 px-3 md:py-6 md:px-4 relative ${fullscreen ? "bg-black" : ""}`}>
        {/* Progress bar - Only visible when not in fullscreen */}
        {!fullscreen && (
          <div className="max-w-5xl mx-auto mb-4 bg-white rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className={`max-w-6xl mx-auto ${fullscreen ? "flex flex-col h-full justify-center items-center" : ""}`}>
          {/* Process roadmap - Always visible */}
          <div className={`${fullscreen ? "w-full max-w-4xl mb-4" : ""}`}>
            <ProcessRoadmap stages={processStages} currentStage={currentProcessStage} />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-7 gap-4 ${fullscreen ? "w-full max-w-4xl" : ""}`}>
            {/* Side space */}
            {!fullscreen && <div className="md:col-span-1">{/* Optional content */}</div>}

            {/* Main chat */}
            <div className={`${fullscreen ? "md:col-span-7" : "md:col-span-5"}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border-8 border-gray-800 rounded-3xl relative">
                {/* Mobile notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-gray-800 rounded-b-lg z-10"></div>

                {/* Header redesign */}
                <div className="bg-blue-900 text-white p-3 md:p-4">
                  <div className="flex justify-end mb-4">
                    <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-6 md:h-8 filter brightness-0 invert" />
                  </div>

                  <div className="flex items-center mt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-white mr-3 flex items-center justify-center">
                      <img
                        src={avatars.bot || "/placeholder.svg"}
                        alt="AgentForce"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold">AgentForce</h2>
                      <p className="text-xs md:text-sm text-blue-100">Reserva de Vuelos</p>
                    </div>
                  </div>
                </div>

                <div className="p-3 md:p-4">
                  <div className="bg-gray-50 rounded-lg p-3 md:p-4 h-[400px] md:h-[500px] lg:h-[600px] overflow-y-auto">
                    <div className="space-y-2">
                      {messages.map(
                        (msg, index) =>
                          msg.visible && (
                            <div key={index}>
                              <MessageRenderer
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
                            </div>
                          ),
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Mobile control bar */}
                  <div className="h-6 mt-2 flex justify-center">
                    <div className="w-1/3 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side space */}
            {!fullscreen && <div className="md:col-span-1">{/* Optional content */}</div>}
          </div>
        </div>
      </div>

      {/* Minimal controls in fullscreen */}
      <MinimalControls
        playing={playing}
        togglePlay={togglePlay}
        toggleFullscreen={toggleFullscreen}
        visible={fullscreen && showMinimalControls}
      />

      {/* Floating timer */}
      {autoPlay && !fullscreen && <StepTimer seconds={stepTimer} />}

      {/* Floating buttons */}
      {!fullscreen && !autoPlay && (
        <>
          {/* Fullscreen button */}
          <div className="fixed bottom-4 left-4 z-20">
            <Button
              variant="default"
              onClick={toggleFullscreen}
              className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>

          {/* Download button */}
          <div className="fixed bottom-4 right-4 z-20">
            <Button
              variant="default"
              onClick={() => downloadDemo(containerRef)}
              className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg bg-green-600 hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
