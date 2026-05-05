"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  Check,
  FileText,
  HelpCircle,
  BarChart,
  FileSignature,
  Maximize,
  Server,
  Network,
  Lock,
  Building,
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

export default function TelecomDemo() {
  // Definir avatares para la conversación
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    telecom: "/telecom-icon.png",
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
                      <p className="text-xs md:text-sm text-blue-100">Soluciones B2B de Telecomunicaciones</p>
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
