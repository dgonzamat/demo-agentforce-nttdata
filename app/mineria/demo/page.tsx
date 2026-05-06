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
import { ContractorCompliancePanel } from "@/components/demo/contractor-compliance-panel"
import { MessageRenderer } from "@/components/demo/message-renderer"
import { ConsoleShell, ConsoleCard, FieldRow } from "@/components/demo/console-shell"
import { ChatPanel } from "@/components/demo/chat-panel"
import { asset } from "@/lib/asset"

export default function MineriaDemo() {
  // Define avatars for the conversation
  const avatars = {
    bot: asset("/avatar-agentforce.png"),
    client: asset("/avatar-user.png"),
    mining: asset("/mining-icon.png"),
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

  const currentStageName = processStages.find((s) => s.id === currentProcessStage)?.name || ""

  return (
    <ConsoleShell
      industryConsole="Mining Service Console"
      customerName="Andes Servicios SpA"
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
            <div className="text-base font-semibold text-slate-900 -mt-2 mb-3">Andes Servicios SpA</div>
            <div className="grid grid-cols-2 gap-3">
              <FieldRow label="RUT" value="76.543.210-K" />
              <FieldRow label="Tipo" value="Contratista" />
              <FieldRow label="Vigente desde" value="Jul 18, 2020" />
              <FieldRow label="Faena asignada" value="Los Pelambres" />
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
              {['Summary', 'Compliance', 'Personal', 'Related'].map((t, i) => (
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
              <Row label="Trabajadores activos" value="147" />
              <Row label="Tasa de cumplimiento" value="96%" />
              <Row label="Auditorías últ. año" value="4" />
              <Row label="Incidentes (12m)" value="0" />
              <Row label="Cert. seguridad" value="Vigente" />
              <Row label="Risk Score" value={<span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-2 py-0.5 rounded">Low</span>} />
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
                <HardHat className="h-4 w-4 text-blue-600" />
              </div>
            }
            title="Verificación normativa"
            badge={
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded">En proceso</span>
            }
          >
            <div className="space-y-3">
              <FieldRow label="Documento principal" value="Plan de Seguridad" />
              <FieldRow label="Norma aplicada" value="DS-132 Minería" />
              <FieldRow label="Vencimiento" value="Dec 31, 2025" />
              <FieldRow label="Inspector" value="Marco Bravo" />
              <FieldRow label="Faena" value="Los Pelambres" />
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
                title="Renovar curso de altura física"
                description="12 trabajadores con vencimiento próximo. Programar capacitación."
                cta="Agendar"
              />
              <NextAction
                title="Auditoría documental anticipada"
                description="Adelantar revisión reduce riesgo de hallazgos en auditoría externa."
                cta="Programar auditoría"
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
      <ChatPanel assistantTitle="Agentforce Mining Assistant">
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
                renderContractorPanel={
                  msg.showContractorPanel && !msg.typing
                    ? () => (
                        <ContractorCompliancePanel
                          complianceComplete={complianceComplete}
                          completeCompliance={completeCompliance}
                          contractorVerified={contractorVerified}
                          startContractorVerification={startContractorVerification}
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
