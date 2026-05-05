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
  Building,
  FileSignature,
  FileCheck,
  CheckCircle,
  Maximize,
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

export default function BankingPortabilityDemo() {
  // Actualizar la definición de avatares para la conversación
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    bank: "/abstract-financial-growth.png",
  }

  // Definición de las etapas del proceso de portabilidad financiera
  const processStages = [
    { id: 1, name: "Información y Evaluación", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Certificado de Liquidación", icon: FileText, color: "indigo" },
    { id: 3, name: "Solicitud de Portabilidad", icon: FileCheck, color: "purple" },
    { id: 4, name: "Evaluación y Oferta", icon: BarChart, color: "pink" },
    { id: 5, name: "Aceptación de Oferta", icon: CheckCircle, color: "green" },
    { id: 6, name: "Firma de Contrato", icon: FileSignature, color: "orange" },
    { id: 7, name: "Seguimiento de Cierre", icon: Building, color: "teal" },
    { id: 8, name: "Portabilidad Completada", icon: Check, color: "emerald" },
    { id: 9, name: "Soporte Post-Portabilidad", icon: HelpCircle, color: "cyan" },
  ]

  // Conversación simplificada y más eficiente de portabilidad financiera
  const portabilityConversation = [
    {
      sender: "bot",
      text: "Bienvenido a BancoTech. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Quiero trasladar mi crédito hipotecario a este banco.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Entendido. Para proceder con la portabilidad, primero necesito verificar su identidad.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias. ¿Con qué banco tiene actualmente su crédito hipotecario?",
      requiresIdentity: true,
      stage: 1,
    },
    {
      sender: "client",
      text: "Con Banco X.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Beneficios al portar su crédito:\n- Reducción de tasa: hasta 1.2%\n- Ahorro mensual: hasta $120.000\n- Seguro de cesantía incluido\n\n¿Procedemos con la solicitud?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Sí, adelante.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Solicitaré un Certificado de Liquidación a Banco X. Este documento es necesario para analizar las condiciones de su crédito actual. ¿Autoriza esta gestión?",
      stage: 2,
    },
    {
      sender: "client",
      text: "Autorizado.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Solicitud enviada. Recibiremos respuesta en máximo 3 días hábiles.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Hemos recibido el certificado. Detalles de su crédito actual:\n- Saldo: $65.432.100\n- Tasa: 4.5%\n- Plazo restante: 18 años\n- Cuota mensual: $452.300\n\n¿Es correcta esta información?",
      stage: 3,
    },
    {
      sender: "client",
      text: "Sí, es correcta.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Iniciando evaluación de portabilidad. Tendremos una oferta en 5 días hábiles. ¿Desea aportar documentación adicional para mejorar su evaluación?",
      stage: 4,
    },
    {
      sender: "client",
      text: "No, prefiero esperar la evaluación inicial.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "Oferta de portabilidad financiera:\n- Tasa: 3.2% (ahorro de 1.3%)\n- Cuota: $375.800 (ahorro mensual de $76.500)\n- Sin comisiones de prepago\n- Seguro de desempleo gratuito\n\n¿Acepta esta oferta?",
      stage: 5,
    },
    {
      sender: "client",
      text: "Sí, me interesa aceptar.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Para confirmar, necesitamos verificar su identidad nuevamente.",
      showIdentityPanel: true,
      stage: 5,
    },
    {
      sender: "bot",
      text: "Ahora procederemos con la firma digital del contrato de portabilidad.",
      showSignaturePanel: true,
      stage: 6,
    },
    {
      sender: "client",
      text: "Listo, he firmado.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Gracias. Su solicitud de portabilidad está en proceso. Gestionaremos el cierre con Banco X en 10-15 días hábiles sin que usted deba realizar trámites adicionales.",
      awaitSignature: true,
      stage: 7,
    },
    {
      sender: "client",
      text: "¿Debo hacer algo más?",
      stage: 7,
    },
    {
      sender: "bot",
      text: "No es necesario. Nosotros realizamos todas las gestiones. Le mantendremos informado del avance vía correo electrónico.",
      stage: 7,
    },
    {
      sender: "bot",
      text: "¡Portabilidad completada exitosamente! Detalles de su nuevo crédito:\n- Número: CH-2023-78945\n- Primera cuota: 05/06/2023\n- Valor: $375.800\n- Pago: cargo automático en su cuenta",
      stage: 8,
    },
    {
      sender: "client",
      text: "¿Cómo configuro las notificaciones de pago?",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Puede configurar notificaciones en nuestra app o sitio web. ¿Prefiere notificaciones por email, SMS o push?",
      stage: 9,
    },
    {
      sender: "client",
      text: "Email y push, por favor.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Configurado. Recibirá notificaciones 5 días antes de cada vencimiento. Un ejecutivo le contactará en 30 días para verificar su satisfacción. ¿Necesita algo más?",
      stage: 9,
    },
    {
      sender: "client",
      text: "No, gracias por la asistencia.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Gracias por elegir BancoTech para su portabilidad financiera. Estamos a su disposición en el 600 123 4567 o a través de nuestra app.",
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
      initialMessages: portabilityConversation,
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
                      <p className="text-xs md:text-sm text-blue-100">Proceso de Portabilidad Financiera</p>
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
