"use client"

import { useState } from "react"
import {
  Play,
  Pause,
  RefreshCw,
  HelpCircle,
  Maximize,
  Shield,
  FileCheck,
  AlertTriangle,
  Users,
  ClipboardCheck,
  Calendar,
  BarChart2,
  Bell,
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
import { ContractorCompliancePanel } from "@/components/demo/contractor-compliance-panel"

export default function MineriaDemo() {
  // Define avatars for the conversation
  const avatars = {
    bot: "/avatar-agentforce.png",
    client: "/avatar-user.png",
    mining: "/mining-icon.png",
  }

  // Define the stages of the contractor management process
  const processStages = [
    { id: 1, name: "Consulta Inicial", icon: HelpCircle, color: "blue" },
    { id: 2, name: "Verificación de Contratista", icon: FileCheck, color: "indigo" },
    { id: 3, name: "Detección de Brechas", icon: AlertTriangle, color: "amber" },
    { id: 4, name: "Gestión de Acreditaciones", icon: Shield, color: "purple" },
    { id: 5, name: "Evaluación de Desempeño", icon: BarChart2, color: "pink" },
    { id: 6, name: "Gestión de Accesos", icon: Users, color: "orange" },
    { id: 7, name: "Reportes de Cumplimiento", icon: ClipboardCheck, color: "green" },
    { id: 8, name: "Notificaciones", icon: Bell, color: "teal" },
    { id: 9, name: "Cierre y Seguimiento", icon: Calendar, color: "emerald" },
  ]

  // Mining contractor management conversation
  const miningConversation = [
    {
      sender: "bot",
      text: "Bienvenido al Sistema de Gestión de Contratistas Mineros. Soy AgentForce, su asistente para la administración y verificación de empresas contratistas. ¿En qué puedo ayudarle hoy?",
      stage: 1,
    },
    {
      sender: "client",
      text: "Buenos días. Necesito verificar el estado de cumplimiento de Servicios Mineros del Norte SpA para su contrato de mantenimiento de chancadores en Planta 3.",
      stage: 1,
    },
    {
      sender: "bot",
      text: "Para ofrecerle información precisa sobre Servicios Mineros del Norte SpA y su contrato de mantenimiento, primero necesito verificar su identidad conforme a nuestros protocolos de seguridad.",
      showIdentityPanel: true,
      stage: 1,
    },
    {
      sender: "bot",
      text: "Gracias por la verificación. He identificado que usted es el administrador del contrato N° MIN-2023-456 con Servicios Mineros del Norte SpA. ¿Qué información específica necesita revisar?",
      requiresIdentity: true,
      stage: 1,
    },
    {
      sender: "client",
      text: "Necesito saber si están al día con toda su documentación para autorizar su ingreso a faena mañana.",
      stage: 2,
    },
    {
      sender: "bot",
      text: "Estoy analizando el estado actual de cumplimiento de Servicios Mineros del Norte SpA. Esto tomará solo un momento mientras consulto las bases de datos de cumplimiento laboral, previsional y de seguridad...",
      stage: 2,
    },
    {
      sender: "bot",
      text: "He completado la verificación del contratista. Aquí está el resumen de su estado de cumplimiento:\n\n- Contrato: MIN-2023-456 (Mantenimiento de Chancadores Planta 3)\n- Vigencia: 15/03/2023 al 14/03/2025\n- Estado general: Cumplimiento parcial (93%)\n- F30-1 (Certificado de Obligaciones Laborales): Vigente hasta 30/07/2023\n- Pago de cotizaciones previsionales: Verificado hasta junio 2023\n- Seguros de responsabilidad civil: Vigentes\n- Certificaciones técnicas: 45 de 48 vigentes\n\n¿Desea ver el detalle de los documentos pendientes?",
      showContractorPanel: true,
      stage: 2,
    },
    {
      sender: "client",
      text: "Sí, por favor muéstrame qué documentos están pendientes o próximos a vencer.",
      stage: 3,
    },
    {
      sender: "bot",
      text: "He identificado las siguientes brechas documentales que requieren atención:\n\n1. Documentos vencidos:\n   - Certificación de trabajo en altura para 3 trabajadores (vencidas hace 5 días)\n   - Póliza de seguro complementario de salud (vence mañana)\n\n2. Documentos próximos a vencer:\n   - F30-1 vence en 7 días\n   - Certificado de calibración de equipos críticos vence en 10 días\n\n3. Documentos pendientes:\n   - Actualización del procedimiento de bloqueo y etiquetado según nueva normativa DS 132 (requerido desde 01/06/2023)\n\n¿Desea que notifique automáticamente al contratista sobre estos documentos?",
      stage: 3,
    },
    {
      sender: "client",
      text: "Sí, envía la notificación y también quiero ver el historial de desempeño de este contratista antes de decidir si autorizo su ingreso con estas brechas.",
      stage: 4,
    },
    {
      sender: "bot",
      text: "He enviado una notificación automática al representante legal y al prevencionista de riesgos de Servicios Mineros del Norte SpA, solicitando la regularización de los documentos pendientes.\n\nLa notificación incluye:\n- Detalle de documentos vencidos y pendientes\n- Instrucciones para carga en plataforma\n- Plazo máximo de regularización (24 horas)\n- Consecuencias de no regularización (restricción de acceso)\n\n¿Desea establecer alguna excepción temporal mientras se completa la documentación?",
      stage: 4,
    },
    {
      sender: "client",
      text: "No por ahora. Primero muéstrame su historial de desempeño.",
      stage: 5,
    },
    {
      sender: "bot",
      text: "Analizando el historial de desempeño de Servicios Mineros del Norte SpA durante los últimos 12 meses:\n\nIndicadores de Seguridad:\n- Tasa de accidentabilidad: 0.8% (por debajo del benchmark de 1.2%)\n- Reportes de incidentes: 12 (todos con investigación cerrada)\n- Cumplimiento de charlas de seguridad: 98%\n\nIndicadores de Calidad:\n- Cumplimiento de SLAs: 95%\n- Rechazos de trabajos: 2 en 12 meses\n- Tiempo medio entre fallas post-mantenimiento: 1,850 horas (sobre objetivo de 1,500)\n\nIndicadores de Cumplimiento:\n- Puntualidad en entrega documental: 87%\n- Frecuencia de brechas documentales: 3 en 12 meses\n- Tiempo promedio de regularización: 1.5 días\n\n¿Desea ver la comparación con otros contratistas similares?",
      stage: 5,
    },
    {
      sender: "client",
      text: "No es necesario. Basado en esta información, ¿qué recomiendas respecto a su ingreso a faena mañana?",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Basado en el análisis integral, recomiendo:\n\n1. Autorizar el ingreso condicional por las siguientes razones:\n   - Las brechas documentales son menores y no críticas para la seguridad\n   - Su historial de desempeño es positivo, especialmente en seguridad\n   - Las certificaciones técnicas esenciales para el trabajo están vigentes\n\n2. Establecer las siguientes condiciones:\n   - Regularización de certificados de trabajo en altura en 48 horas\n   - Renovación de póliza de seguro antes de finalizar el día de hoy\n   - Supervisión adicional para los 3 trabajadores sin certificación vigente\n\n¿Desea proceder con esta recomendación?",
      stage: 6,
    },
    {
      sender: "client",
      text: "Estoy de acuerdo. Autoriza el ingreso condicional y genera el permiso temporal.",
      stage: 6,
    },
    {
      sender: "bot",
      text: "Para generar el permiso temporal, necesito su firma digital conforme a los protocolos de seguridad minera y trazabilidad de autorizaciones.",
      showSignaturePanel: true,
      stage: 7,
    },
    {
      sender: "bot",
      text: "He generado el permiso temporal de acceso con las siguientes características:\n\n- Válido para: 15/07/2023 al 17/07/2023 (48 horas)\n- Alcance: Mantenimiento programado de chancadores en Planta 3\n- Restricciones: Los 3 trabajadores sin certificación vigente solo pueden realizar trabajos a nivel de suelo\n- Requisito: Supervisión permanente por parte del Jefe de Mantenimiento de Planta\n\nAdicionalmente, he preparado un reporte de cumplimiento para auditoría interna que incluye:\n- Justificación de la excepción otorgada\n- Historial de desempeño que respalda la decisión\n- Plan de regularización con plazos definidos\n- Registro de notificaciones enviadas\n\n¿Desea recibir este reporte por correo electrónico?",
      awaitSignature: true,
      stage: 7,
    },
    {
      sender: "client",
      text: "Sí, envíamelo por correo y también al superintendente de planta.",
      stage: 8,
    },
    {
      sender: "bot",
      text: "He enviado el reporte de cumplimiento a su correo y al superintendente de planta. Adicionalmente, he configurado las siguientes notificaciones automáticas:\n\n1. Para el contratista:\n   - Confirmación de autorización condicional\n   - Recordatorio de documentos pendientes (diario hasta regularización)\n   - Alerta de vencimiento del permiso temporal (12 horas antes)\n\n2. Para el equipo interno:\n   - Notificación al guardia de acceso sobre restricciones específicas\n   - Alerta al departamento de prevención de riesgos\n   - Recordatorio de verificación de cumplimiento en 48 horas\n\n¿Hay algún destinatario adicional que deba incluir en estas notificaciones?",
      stage: 8,
    },
    {
      sender: "client",
      text: "Incluye también al jefe de turno de Planta 3.",
      stage: 8,
    },
    {
      sender: "bot",
      text: "He incluido al jefe de turno de Planta 3 en las notificaciones. Para asegurar un seguimiento adecuado, he programado:\n\n1. Verificación automática en 48 horas para confirmar regularización documental\n2. Recordatorio para evaluación post-servicio al finalizar el mantenimiento\n3. Actualización del historial de cumplimiento del contratista\n\n¿Desea programar una revisión adicional o establecer algún otro parámetro de seguimiento?",
      stage: 9,
    },
    {
      sender: "client",
      text: "No, con eso es suficiente. Gracias por la asistencia.",
      stage: 9,
    },
    {
      sender: "bot",
      text: "Ha sido un placer asistirle. El permiso temporal ha sido emitido y todas las notificaciones han sido enviadas. El sistema realizará seguimiento automático del caso.\n\nRecuerde que según el Reglamento de Seguridad Minera (DS 132), usted como administrador de contrato mantiene la responsabilidad de verificar el cumplimiento efectivo de las condiciones establecidas.\n\nSi necesita cualquier otra asistencia relacionada con este u otros contratistas, no dude en consultarme.",
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
  const [contractorCompliance, setContractorCompliance] = useState({
    overall: 93,
    documents: 90,
    safety: 95,
    quality: 94,
  })

  const handleStageChange = (stage: number) => {
    setCurrentProcessStage(stage)
  }

  const { messages, playing, autoPlay, progress, stepTimer, messagesEndRef, togglePlay, reset } = useConversationPlayer(
    {
      initialMessages: miningConversation,
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
                      <p className="text-xs md:text-sm text-blue-100">Gestión de Contratistas Mineros</p>
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
                                renderContractorPanel={
                                  msg.showContractorPanel && !msg.typing
                                    ? () => <ContractorCompliancePanel compliance={contractorCompliance} />
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
