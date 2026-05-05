"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  HelpCircle,
  Maximize,
  Zap,
  FileText,
  BarChart2,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
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
import { ConsumptionPanel } from "@/components/demo/consumption-panel"
import { TarifaPanel } from "@/components/demo/tarifa-panel"

export default function ServiciosBasicosDemo() {
  // Define avatars for the conversation
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    utility: "/utility-icon.png",
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
                      <p className="text-xs md:text-sm text-blue-100">Servicios Básicos Regulados</p>
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
                                renderConsumptionPanel={
                                  msg.showConsumptionPanel && !msg.typing
                                    ? () => <ConsumptionPanel data={consumptionData} />
                                    : undefined
                                }
                                renderTarifaPanel={
                                  msg.showTarifaPanel && !msg.typing
                                    ? () => <TarifaPanel data={tarifaData} />
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
