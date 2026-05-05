"use client"

import { useState, useCallback } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  Check,
  FileText,
  HelpCircle,
  BarChart,
  FileSignature,
  CheckCircle,
  Maximize,
  Shield,
  Umbrella,
  Heart,
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
import { SpeedControl } from "@/components/demo/speed-control"
import { downloadDemo } from "@/utils/download-demo"

export default function SegurosDemo() {
  // Definir avatares para la conversación
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    insurance: "/abstract-financial-growth.png",
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

  // Función para manejar cambios de velocidad
  const handleSpeedChange = useCallback(
    (speed: number) => {
      console.log("SegurosDemo: Cambiando velocidad a:", speed)
      // Validar que la velocidad es un número válido
      if (typeof speed === "number" && !isNaN(speed) && speed > 0) {
        changePlaybackSpeed(speed)
      } else {
        console.error("Velocidad inválida:", speed)
      }
    },
    [changePlaybackSpeed],
  )

  // Indicador de velocidad para depuración
  const speedIndicator = (
    <div className="fixed top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full z-50">
      Velocidad: {playbackSpeed}x
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f8]" ref={containerRef}>
      {/* Indicador de velocidad para depuración */}
      {speedIndicator}

      {/* Header - Solo visible cuando no está en pantalla completa */}
      {!fullscreen && (
        <header className="bg-white border-b py-2 px-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <div className="bg-blue-900 px-2 py-1 rounded">
              <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-6 md:h-8 mr-4 filter brightness-0 invert" />
            </div>
          </div>
          <div className="flex space-x-2 md:space-x-4">
            <SpeedControl currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} className="hidden sm:flex" />
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
        {/* Barra de progreso - Solo visible cuando no está en pantalla completa */}
        {!fullscreen && (
          <div className="max-w-5xl mx-auto mb-4 bg-white rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <div className={`max-w-6xl mx-auto ${fullscreen ? "flex flex-col h-full justify-center items-center" : ""}`}>
          {/* Roadmap de etapas (versión compacta) - Siempre visible */}
          <div className={`${fullscreen ? "w-full max-w-4xl mb-4" : ""}`}>
            <ProcessRoadmap stages={processStages} currentStage={currentProcessStage} />
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-7 gap-4 ${fullscreen ? "w-full max-w-4xl" : ""}`}>
            {/* Espacio lateral */}
            {!fullscreen && <div className="md:col-span-1">{/* Contenido opcional */}</div>}

            {/* Chat principal (ahora más grande) */}
            <div className={`${fullscreen ? "md:col-span-7" : "md:col-span-5"}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 border-8 border-gray-800 rounded-3xl relative">
                {/* Notch de celular */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-6 bg-gray-800 rounded-b-lg z-10"></div>

                {/* Rediseño del header para que el título esté más abajo */}
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
                      <p className="text-xs md:text-sm text-blue-100">Proceso de Contratación de Seguros</p>
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

                  {/* Barra inferior de control de celular */}
                  <div className="h-6 mt-2 flex justify-center">
                    <div className="w-1/3 h-1 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Espacio lateral */}
            {!fullscreen && <div className="md:col-span-1">{/* Contenido opcional */}</div>}
          </div>
        </div>
      </div>

      {/* Controles mínimos en pantalla completa */}
      <MinimalControls
        playing={playing}
        togglePlay={togglePlay}
        toggleFullscreen={toggleFullscreen}
        visible={fullscreen && showMinimalControls}
        playbackSpeed={playbackSpeed}
        onSpeedChange={handleSpeedChange}
      />

      {/* Temporizador flotante - Solo visible cuando no está en pantalla completa */}
      {autoPlay && !fullscreen && <StepTimer seconds={stepTimer} />}

      {/* Botones flotantes - Solo visibles cuando no está en pantalla completa */}
      {!fullscreen && !autoPlay && (
        <>
          {/* Botón de pantalla completa */}
          <div className="fixed bottom-4 left-4 z-20">
            <Button
              variant="default"
              onClick={toggleFullscreen}
              className="rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            >
              <Maximize className="h-5 w-5" />
            </Button>
          </div>

          {/* Control de velocidad flotante para móviles */}
          <div className="fixed bottom-4 left-20 z-20 sm:hidden">
            <SpeedControl currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} className="shadow-lg" />
          </div>

          {/* Botón de descarga */}
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
