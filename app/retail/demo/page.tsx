"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  Maximize,
  ShoppingCart,
  BarChart2,
  TrendingUp,
  DollarSign,
  Calendar,
  Percent,
  FileText,
  Briefcase,
  CheckCircle,
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

export default function RetailDemo() {
  // Definir avatares para la conversación
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    retail: "/retail-icon.png",
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

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f8]" ref={containerRef}>
      {/* Header - Solo visible cuando no está en pantalla completa */}
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
                      <p className="text-xs md:text-sm text-blue-100">Plataforma de Negociación B2B</p>
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
