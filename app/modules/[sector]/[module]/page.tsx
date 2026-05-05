"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import {
  ChevronLeft,
  Play,
  Pause,
  RefreshCw,
  Download,
  CheckCircle,
  Clock,
  Info,
  ArrowRight,
  Maximize,
  Minimize,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const { sector, module } = params

  const [loading, setLoading] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("demo")

  // Simulate loading the module data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Handle play/pause
  const togglePlay = () => {
    setPlaying(!playing)
  }

  // Handle reset
  const handleReset = () => {
    setProgress(0)
    setCurrentStep(1)
    setPlaying(false)
  }

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            setPlaying(false)
            return 100
          }

          // Update step based on progress
          if (newProgress > 75) setCurrentStep(4)
          else if (newProgress > 50) setCurrentStep(3)
          else if (newProgress > 25) setCurrentStep(2)
          else setCurrentStep(1)

          return newProgress
        })
      }, 200)
    }

    return () => clearInterval(interval)
  }, [playing])

  // Get module data based on sector and module ID
  const getModuleData = () => {
    // This would normally fetch from an API or data store
    // For now, we'll return mock data based on the sector and module

    const moduleData = {
      title: `Demo de ${module}`,
      description: "Esta demostración interactiva muestra las capacidades clave de este módulo.",
      steps: [
        {
          title: "Inicio del proceso",
          description: "El usuario inicia el proceso y se verifica su identidad.",
        },
        {
          title: "Análisis de datos",
          description: "El sistema analiza los datos disponibles y genera recomendaciones.",
        },
        {
          title: "Presentación de opciones",
          description: "Se presentan opciones personalizadas al usuario basadas en el análisis.",
        },
        {
          title: "Confirmación y finalización",
          description: "El usuario confirma su selección y se completa el proceso.",
        },
      ],
      benefits: [
        "Reducción significativa de tiempos de proceso",
        "Mejora en la experiencia del usuario",
        "Cumplimiento normativo automatizado",
        "Optimización de costos operativos",
      ],
      technicalDetails: [
        "Integración con sistemas core mediante APIs RESTful",
        "Arquitectura basada en microservicios",
        "Procesamiento en tiempo real de transacciones",
        "Almacenamiento seguro de datos sensibles",
      ],
      implementationSteps: [
        "Análisis de requerimientos y procesos actuales",
        "Configuración y personalización del módulo",
        "Integración con sistemas existentes",
        "Capacitación de usuarios y puesta en producción",
      ],
    }

    return moduleData
  }

  const moduleData = getModuleData()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando módulo de demostración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">{moduleData.title}</h1>
          <p className="text-gray-600">{moduleData.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/modules">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Volver a módulos</span>
            </Button>
          </Link>
          <Button
            variant={playing ? "destructive" : "default"}
            size="sm"
            onClick={togglePlay}
            className="flex items-center gap-1"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{playing ? "Pausar" : "Reproducir"}</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            <span>Reiniciar</span>
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullscreen} className="flex items-center gap-1">
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            <span className="hidden sm:inline">{fullscreen ? "Salir" : "Pantalla completa"}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Steps */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-semibold mb-4">Etapas del proceso</h2>
            <div className="space-y-3">
              {moduleData.steps.map((step, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    currentStep > index + 1
                      ? "bg-green-50 border-green-200"
                      : currentStep === index + 1
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        currentStep > index + 1
                          ? "bg-green-500 text-white"
                          : currentStep === index + 1
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {currentStep > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <h3 className="font-medium">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main content - Demo */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start border-b-0 rounded-none">
                  <TabsTrigger value="demo" className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    Demostración
                  </TabsTrigger>
                  <TabsTrigger value="benefits" className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    Beneficios
                  </TabsTrigger>
                  <TabsTrigger value="technical" className="flex items-center gap-1">
                    <Info className="h-4 w-4" />
                    Detalles técnicos
                  </TabsTrigger>
                  <TabsTrigger value="implementation" className="flex items-center gap-1">
                    <ArrowRight className="h-4 w-4" />
                    Implementación
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-4">
              <TabsContent value="demo" className="m-0">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  {/* This would be the actual demo content */}
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Demostración interactiva</h3>
                    <p className="text-gray-600 mb-4">
                      {playing
                        ? `Reproduciendo demostración - Paso ${currentStep} de ${moduleData.steps.length}`
                        : "Presione reproducir para iniciar la demostración interactiva"}
                    </p>
                    {playing && (
                      <div className="max-w-md mx-auto">
                        <Progress value={progress} className="h-2 mb-2" />
                        <p className="text-sm text-gray-500">{Math.round(progress)}% completado</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Duración estimada: 5 minutos</span>
                  </div>
                  <Button size="sm" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Descargar presentación</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="benefits" className="m-0">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">Beneficios clave</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {moduleData.benefits.map((benefit, index) => (
                      <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p>{benefit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="m-0">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">Detalles técnicos</h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <p className="text-sm text-blue-800 mb-2">
                      Este módulo utiliza tecnología de vanguardia para garantizar un rendimiento óptimo y una
                      integración perfecta con sus sistemas existentes.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {moduleData.technicalDetails.map((detail, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p>{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="implementation" className="m-0">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4">Proceso de implementación</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-6">
                      {moduleData.implementationSteps.map((step, index) => (
                        <div key={index} className="relative pl-10">
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <p>{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
