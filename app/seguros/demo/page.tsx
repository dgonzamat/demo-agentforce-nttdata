"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
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
  Minimize,
  Shield,
  Umbrella,
  Heart,
  ChevronLeft,
  Download,
  Gauge,
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

  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" ref={containerRef}>
      {/* Header */}
      {!fullscreen && (
        <header className="bg-white border-b sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/90">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/" className="text-slate-500 hover:text-slate-900 flex items-center gap-1 text-sm shrink-0">
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Inicio</span>
              </Link>
              <div className="h-6 w-px bg-slate-200" />
              <img src={asset("/ntt-data-logo.png")} alt="NTT DATA" className="h-6 shrink-0" />
              <span className="text-slate-300 hidden md:inline">|</span>
              <div className="hidden md:flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-md bg-blue-50 flex items-center justify-center shrink-0">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <span className="font-medium truncate">Seguros · Contratación</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SpeedControl currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} className="hidden lg:flex" />
              <Button
                variant={playing ? "destructive" : "default"}
                size="sm"
                onClick={togglePlay}
                className="flex items-center"
              >
                {playing ? <Pause className="mr-1.5 h-4 w-4" /> : <Play className="mr-1.5 h-4 w-4" />}
                <span className="hidden sm:inline">
                  {playing ? "Pausar" : progress === 100 ? "Reiniciar" : "Reproducir"}
                </span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset} className="hidden sm:flex">
                <RefreshCw className="mr-1.5 h-4 w-4" />
                Reiniciar
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullscreen} className="hidden md:flex">
                <Maximize className="mr-1.5 h-4 w-4" />
                Pantalla completa
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadDemo(containerRef)}
                className="hidden lg:flex text-slate-600"
                title="Descargar para LinkedIn"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-1 bg-slate-100">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>
      )}

      <div className={`flex-1 ${fullscreen ? "bg-black p-0" : "py-6 md:py-8"}`}>
        <div
          className={
            fullscreen
              ? "flex flex-col h-full justify-center items-center px-4 max-w-5xl mx-auto w-full"
              : "container mx-auto px-4"
          }
        >
          {fullscreen && (
            <div className="w-full mb-4">
              <ProcessRoadmap stages={processStages} currentStage={currentProcessStage} />
            </div>
          )}

          <div
            className={
              fullscreen
                ? "w-full max-w-2xl"
                : "grid grid-cols-1 lg:grid-cols-12 gap-6"
            }
          >
            {/* Left: vertical timeline (desktop only) */}
            {!fullscreen && (
              <aside className="lg:col-span-3 order-2 lg:order-1">
                <div className="bg-white rounded-xl border shadow-sm p-5 sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                      <BarChart className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900">Etapas del proceso</h3>
                  </div>
                  <ol className="space-y-1">
                    {processStages.map((stage) => {
                      const Icon = stage.icon
                      const isDone = currentProcessStage > stage.id
                      const isActive = currentProcessStage === stage.id
                      return (
                        <li key={stage.id} className="relative">
                          <div
                            className={`flex items-start gap-3 p-2 rounded-lg transition-colors ${
                              isActive ? "bg-blue-50" : ""
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                isDone
                                  ? "bg-blue-600 text-white"
                                  : isActive
                                  ? "bg-white border-2 border-blue-600 text-blue-600"
                                  : "bg-slate-100 text-slate-400"
                              }`}
                            >
                              {isDone ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                            </div>
                            <div className="min-w-0 pt-1">
                              <div
                                className={`text-sm leading-tight ${
                                  isActive
                                    ? "font-semibold text-slate-900"
                                    : isDone
                                    ? "text-slate-700"
                                    : "text-slate-500"
                                }`}
                              >
                                {stage.name}
                              </div>
                            </div>
                          </div>
                          {stage.id < processStages.length && (
                            <div className="absolute left-[1.6rem] top-9 h-3 w-px bg-slate-200" />
                          )}
                        </li>
                      )
                    })}
                  </ol>
                </div>
              </aside>
            )}

            {/* Center: phone-frame chat */}
            <div
              className={
                fullscreen ? "w-full" : "lg:col-span-6 order-1 lg:order-2"
              }
            >
              {!fullscreen && (
                <div className="lg:hidden mb-4">
                  <ProcessRoadmap stages={processStages} currentStage={currentProcessStage} />
                </div>
              )}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden mx-auto border-[10px] border-slate-900 relative max-w-md">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 bg-slate-900 rounded-b-2xl z-10" />

                <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-4 pt-7">
                  <div className="flex items-center">
                    <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 bg-white mr-3 flex items-center justify-center ring-2 ring-blue-300/40">
                      <img
                        src={avatars.bot || asset("/placeholder.svg")}
                        alt="AgentForce"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold leading-tight">AgentForce</h2>
                      <p className="text-xs text-blue-100 truncate">Contratación de Seguros</p>
                    </div>
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-blue-200/80 bg-white/10 rounded-full px-2 py-1">
                      En vivo
                    </span>
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
                    <div className="w-1/3 h-1 bg-slate-300 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: info panel (desktop only) */}
            {!fullscreen && (
              <aside className="lg:col-span-3 order-3">
                <div className="bg-white rounded-xl border shadow-sm overflow-hidden sticky top-24">
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-700" />
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-500">Industria</div>
                        <div className="font-semibold text-slate-900 leading-tight">Seguros</div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      Demo end-to-end del proceso de contratación: identificación biométrica, recomendación
                      personalizada por IA, comparación de coberturas y firma digital.
                    </p>
                    <div className="border-t pt-4 space-y-3">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Etapa actual</div>
                        <div className="text-sm font-medium text-slate-900">{currentStageName}</div>
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Progreso</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-700 tabular-nums">
                            {Math.round(progress)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Gauge className="h-3.5 w-3.5" />
                        <span>Velocidad {playbackSpeed}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            )}
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

      {/* Mobile-only floating speed control */}
      {!fullscreen && !autoPlay && (
        <div className="fixed bottom-4 right-4 z-20 lg:hidden">
          <SpeedControl currentSpeed={playbackSpeed} onSpeedChange={handleSpeedChange} className="shadow-lg" />
        </div>
      )}
    </div>
  )
}
