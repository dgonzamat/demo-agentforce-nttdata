"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ChevronLeft, ArrowRight, Check, Shield, Zap, Globe, BarChart } from "lucide-react"

export default function ValorActivosPage() {
  const infographicRef = useRef<HTMLDivElement>(null)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  // Handle window resize for responsiveness
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth)

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
      link.download = "NTT-DATA-Activos-Valor.jpg"

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm py-3 px-4 sm:py-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/" className="mr-3 sm:mr-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
              <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Volver</span>
            </Button>
          </Link>
          <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-6 sm:h-8" />
        </div>
        <Button
          onClick={downloadInfographic}
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden xs:inline">Descargar</span>
        </Button>
      </header>

      <main className="container mx-auto py-4 px-3 sm:py-6 md:py-8 sm:px-4">
        {/* Responsive infographic container */}
        <div className="max-w-[95vw] sm:max-w-[90vw] md:max-w-5xl mx-auto">
          {/* McKinsey-style slide */}
          <div
            ref={infographicRef}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 w-full"
            style={{
              aspectRatio: "16/9",
              maxHeight: "calc(100vh - 8rem)", // Prevent overflow on small heights
            }}
          >
            {/* Top bar - McKinsey style */}
            <div className="h-1 sm:h-2 bg-blue-700"></div>

            {/* Content area - Fully responsive */}
            <div className="p-3 sm:p-6 md:p-8 lg:p-12 flex flex-col h-full overflow-auto">
              {/* Title section */}
              <div className="mb-3 sm:mb-6 md:mb-10">
                <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 mb-1 sm:mb-2">
                  Activos digitales NTT DATA: Transformando la industria chilena
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-xl text-gray-600">
                  Soluciones desarrolladas específicamente para el mercado chileno
                </p>
              </div>

              {/* Main content grid - Responsive layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 flex-grow">
                {/* Left column */}
                <div className="flex flex-col justify-between">
                  {/* Value proposition */}
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-4">
                      Propuesta de valor
                    </h2>
                    <div className="space-y-2 sm:space-y-3 md:space-y-4">
                      <div className="flex items-center">
                        <div className="w-1 sm:w-2 h-6 sm:h-8 bg-blue-700 mr-2 sm:mr-4"></div>
                        <div className="flex items-center">
                          <Shield className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-700 mr-1 sm:mr-2" />
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                            Optimización radical de costos operativos
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 sm:w-2 h-6 sm:h-8 bg-blue-700 mr-2 sm:mr-4"></div>
                        <div className="flex items-center">
                          <Zap className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-700 mr-1 sm:mr-2" />
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                            Transformación de la experiencia del cliente
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-1 sm:w-2 h-6 sm:h-8 bg-blue-700 mr-2 sm:mr-4"></div>
                        <div className="flex items-center">
                          <BarChart className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-blue-700 mr-1 sm:mr-2" />
                          <p className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                            Retorno de inversión acelerado
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Key assets */}
                  <div>
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-4">
                      Activos estratégicos
                    </h2>
                    <div className="bg-blue-50 p-2 sm:p-4 md:p-6 rounded-lg border-l-2 sm:border-l-4 border-blue-700">
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm md:text-base font-semibold">AgentForce</span>
                          <span className="text-xs sm:text-sm text-blue-700">Asistentes virtuales avanzados</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm md:text-base font-semibold">DataInsight</span>
                          <span className="text-xs sm:text-sm text-blue-700">Analítica predictiva sectorial</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm md:text-base font-semibold">IntegrationHub</span>
                          <span className="text-xs sm:text-sm text-blue-700">APIs gubernamentales chilenas</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm md:text-base font-semibold">ComplianceShield</span>
                          <span className="text-xs sm:text-sm text-blue-700">Cumplimiento normativo local</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col justify-between mt-4 md:mt-0">
                  {/* Industry impact */}
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold text-blue-800 mb-2 sm:mb-4">
                      Impacto sectorial
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <div className="bg-blue-700 text-white p-2 sm:p-3 md:p-5 rounded-lg">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 flex items-center">
                          <Globe className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Banca y Seguros
                        </h3>
                        <ul className="text-xs space-y-1 sm:space-y-2">
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Portabilidad financiera con cumplimiento normativo integral</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Verificación biométrica de última generación</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-blue-600 text-white p-2 sm:p-3 md:p-5 rounded-lg">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 flex items-center">
                          <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Minería y Energía
                        </h3>
                        <ul className="text-xs space-y-1 sm:space-y-2">
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Gestión de contratistas con trazabilidad completa</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Cumplimiento normativo automatizado</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-blue-600 text-white p-2 sm:p-3 md:p-5 rounded-lg">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 flex items-center">
                          <BarChart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Retail
                        </h3>
                        <ul className="text-xs space-y-1 sm:space-y-2">
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Negociación B2B con inteligencia de mercado</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Planificación promocional predictiva</span>
                          </li>
                        </ul>
                      </div>
                      <div className="bg-blue-700 text-white p-2 sm:p-3 md:p-5 rounded-lg">
                        <h3 className="text-xs sm:text-sm md:text-base font-bold mb-1 sm:mb-2 flex items-center">
                          <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                          Telecomunicaciones
                        </h3>
                        <ul className="text-xs space-y-1 sm:space-y-2">
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Gestión de contratos con cumplimiento SUBTEL</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-2 w-2 sm:h-3 sm:w-3 mt-0.5 mr-1 flex-shrink-0" />
                            <span>Monitoreo avanzado de SLAs empresariales</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-3 sm:p-4 md:p-6 rounded-lg">
                    <h2 className="text-base sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 md:mb-3">
                      Transforme su negocio hoy
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">
                      Únase a las empresas líderes chilenas que están revolucionando su operación con soluciones de NTT
                      DATA
                    </p>
                    <div className="flex items-center text-sm sm:text-base md:text-lg font-semibold">
                      <span>Solicite una demo personalizada</span>
                      <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 pt-2 sm:pt-3 md:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-2 sm:mb-0">
                  <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-5 sm:h-6 md:h-8 mr-2 sm:mr-4" />
                  <span className="text-xs sm:text-sm text-gray-500">
                    © 2023 NTT DATA Chile. Todos los derechos reservados.
                  </span>
                </div>
                <div className="text-xs sm:text-sm md:text-base text-blue-700 font-semibold">
                  Desarrollado específicamente para Chile
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
