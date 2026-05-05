"use client"

import { useRef } from "react"
import { Shield, Briefcase, TrendingUp, Zap, CheckCircle, BarChart, Download, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SinglePageInfographic() {
  const infographicRef = useRef<HTMLDivElement>(null)

  // Function to download the infographic as JPG
  const downloadInfographic = async () => {
    if (!infographicRef.current) return

    try {
      // Dynamically import html2canvas only when needed
      const html2canvas = (await import("html2canvas")).default

      // Create a canvas from the infographic section
      const canvas = await html2canvas(infographicRef.current, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin images
        logging: false,
        backgroundColor: "#ffffff",
      })

      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9)

      // Create a download link
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = "AgentForce-Infographic.jpg"

      // Trigger download
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error generating infographic image:", error)
      alert("Hubo un problema al descargar la infografía. Por favor intente nuevamente.")
    }
  }

  return (
    <div className="p-4 md:p-8 flex flex-col items-center min-h-screen bg-gray-50">
      {/* Download button */}
      <div className="w-full max-w-[1200px] mb-4 flex justify-end">
        <Button onClick={downloadInfographic} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Descargar JPG
        </Button>
      </div>

      {/* Infographic with 16:9 aspect ratio */}
      <div
        ref={infographicRef}
        className="w-full max-w-[1200px] h-[675px] bg-white rounded-xl overflow-hidden shadow-lg"
        style={{ aspectRatio: "16/9" }}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-6 flex justify-between items-center h-[110px]">
          <div>
            <h1 className="text-3xl font-bold">AgentForce: Transformando Industrias</h1>
            <p className="text-lg">Soluciones desarrolladas por NTT DATA para el mercado chileno</p>
          </div>
          <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-16 filter brightness-0 invert" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-4 p-6 h-[565px]">
          {/* Left column - Core Objectives */}
          <div className="col-span-3 flex flex-col space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">
                Objetivos Fundamentales
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Eficiencia Operativa</h3>
                    <p className="text-xs text-gray-600">Automatización de procesos complejos</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Crecimiento Sostenible</h3>
                    <p className="text-xs text-gray-600">Valor comercial medible</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Experiencia Superior</h3>
                    <p className="text-xs text-gray-600">Interacción con capacidades humanas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">Capacidades Clave</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Automatización inteligente de procesos complejos</p>
                </div>
                <div className="flex items-start gap-2">
                  <Globe className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Integración perfecta con sistemas empresariales existentes</p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-sm">Cumplimiento normativo con regulaciones chilenas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middle column - Industries and Case Studies */}
          <div className="col-span-6 flex flex-col space-y-4">
            <div className="bg-gradient-to-b from-blue-50 to-white border border-blue-100 rounded-lg p-4 mb-2">
              <h2 className="text-xl font-bold text-center text-blue-900 mb-2">
                Soluciones Desarrolladas para el Mercado Chileno
              </h2>
              <p className="text-sm text-center text-gray-600">
                AgentForce representa una suite de activos digitales desarrollados específicamente para adaptarse a las
                necesidades y regulaciones del mercado chileno.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Seguros */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg p-4 flex flex-col">
                <h3 className="font-bold mb-2 border-b border-blue-400 pb-1">Seguros</h3>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Cotizaciones personalizadas automatizadas</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Verificación biométrica integrada</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Gestión digital de pólizas y siniestros</span>
                  </li>
                </ul>
                <div className="mt-2 text-right text-xs text-blue-100">Conforme a normativas SVS</div>
              </div>

              {/* Banca */}
              <div className="bg-gradient-to-br from-green-600 to-green-800 text-white rounded-lg p-4 flex flex-col">
                <h3 className="font-bold mb-2 border-b border-green-400 pb-1">Banca</h3>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Portabilidad financiera (Ley 21.236)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Onboarding digital completo</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Evaluación crediticia automatizada</span>
                  </li>
                </ul>
                <div className="mt-2 text-right text-xs text-green-100">Conforme a normativa CMF</div>
              </div>

              {/* Telecomunicaciones */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-lg p-4 flex flex-col">
                <h3 className="font-bold mb-2 border-b border-purple-400 pb-1">Telecomunicaciones</h3>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Soluciones B2B personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Gestión de contratos y SLAs</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Soporte técnico inteligente</span>
                  </li>
                </ul>
                <div className="mt-2 text-right text-xs text-purple-100">Conforme a normativa SUBTEL</div>
              </div>

              {/* Minería */}
              <div className="bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-lg p-4 flex flex-col">
                <h3 className="font-bold mb-2 border-b border-amber-400 pb-1">Minería</h3>
                <ul className="space-y-2 flex-1">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Gestión de contratistas con verificación</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Cumplimiento normativo minero (DS 132)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Evaluación de desempeño de proveedores</span>
                  </li>
                </ul>
                <div className="mt-2 text-right text-xs text-amber-100">Conforme a regulaciones mineras</div>
              </div>
            </div>
          </div>

          {/* Right column - Benefits and CTA */}
          <div className="col-span-3 flex flex-col space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg flex-1">
              <h2 className="text-lg font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2">Impacto Comercial</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Optimización de Costos</h3>
                    <p className="text-xs text-gray-600">Reducción significativa de gastos operativos</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center text-white">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Mayor Conversión</h3>
                    <p className="text-xs text-gray-600">Incremento en tasas de cierre de ventas</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-800">Satisfacción Cliente</h3>
                    <p className="text-xs text-gray-600">Experiencia de usuario mejorada</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-900 text-white p-4 rounded-lg flex-1 flex flex-col">
              <h2 className="text-lg font-bold mb-3 border-b border-blue-400 pb-2">Casos de Éxito</h2>
              <div className="space-y-3 flex-1">
                <div className="bg-white/10 backdrop-blur-sm rounded p-2">
                  <h3 className="font-bold text-sm">Transformación Minera</h3>
                  <p className="text-xs">Gestión integral de contratistas con cumplimiento normativo</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded p-2">
                  <h3 className="font-bold text-sm">Revolución Bancaria</h3>
                  <p className="text-xs">Plataforma de portabilidad financiera bajo Ley 21.236</p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded p-2">
                  <h3 className="font-bold text-sm">Innovación en Seguros</h3>
                  <p className="text-xs">Asistente virtual con verificación biométrica y firma digital</p>
                </div>
              </div>

              <div className="mt-auto text-center bg-white/20 p-2 rounded-lg">
                <h3 className="font-bold">Transforme su Negocio Hoy</h3>
                <p className="text-sm">Soluciones desarrolladas específicamente para Chile</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
