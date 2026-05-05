"use client"

import { CardFooter } from "@/components/ui/card"

import { CardDescription } from "@/components/ui/card"

import { CardTitle } from "@/components/ui/card"

import { CardHeader } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useState, useEffect, type ReactNode, useRef } from "react"
import Link from "next/link"
import {
  ChevronLeft,
  Play,
  Pause,
  RefreshCw,
  Download,
  CheckCircle,
  Clock,
  Maximize,
  Minimize,
  Info,
  ArrowRight,
  ChevronRight,
  Share2,
  Bookmark,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface ModuleStep {
  title: string
  description: string
  content?: ReactNode
}

interface ModuleTemplateProps {
  title: string
  description: string
  sector: string
  moduleId: string
  steps: ModuleStep[]
  duration: string
  demoContent: ReactNode
  onStepChange?: (step: number) => void
  benefits?: string[]
  technicalDetails?: string[]
  implementationSteps?: string[]
}

export function ModuleTemplate({
  title,
  description,
  sector,
  moduleId,
  steps,
  duration,
  demoContent,
  onStepChange,
  benefits = [],
  technicalDetails = [],
  implementationSteps = [],
}: ModuleTemplateProps) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [activeTab, setActiveTab] = useState("demo")
  const [isLoading, setIsLoading] = useState(true)
  const [showHelp, setShowHelp] = useState(false)
  const demoContainerRef = useRef<HTMLDivElement>(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
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
    if (onStepChange) {
      onStepChange(1)
    }
  }

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (demoContainerRef.current) {
      if (!document.fullscreenElement) {
        demoContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
      } else {
        document.exitFullscreen()
      }
    }
    setFullscreen(!fullscreen)
  }

  // Update fullscreen state based on document state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  // Simulate progress when playing
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (playing) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.5
          if (newProgress >= 100) {
            setPlaying(false)
            return 100
          }

          // Update step based on progress
          const stepSize = 100 / steps.length
          const newStep = Math.min(steps.length, Math.floor(newProgress / stepSize) + 1)

          if (newStep !== currentStep) {
            setCurrentStep(newStep)
            if (onStepChange) {
              onStepChange(newStep)
            }
          }

          return newProgress
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [playing, steps.length, currentStep, onStepChange])

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando módulo de demostración...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/modules`}>
              <Badge variant="outline" className="hover:bg-gray-100 cursor-pointer flex items-center gap-1">
                <ChevronLeft className="h-3 w-3" />
                <span>Módulos</span>
              </Badge>
            </Link>
            <Badge variant="outline" className="hover:bg-gray-100 cursor-pointer">
              {sector.charAt(0).toUpperCase() + sector.slice(1)}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mb-1">{title}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={playing ? "destructive" : "default"}
                  size="sm"
                  onClick={togglePlay}
                  className="flex items-center gap-1"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  <span>{playing ? "Pausar" : "Reproducir"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{playing ? "Pausar demostración" : "Iniciar demostración"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleReset} className="flex items-center gap-1">
                  <RefreshCw className="h-4 w-4" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reiniciar demostración</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={toggleFullscreen} className="flex items-center gap-1">
                  {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                  <span className="hidden sm:inline">{fullscreen ? "Salir" : "Pantalla completa"}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{fullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Compartir</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Compartir este módulo</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Bookmark className="h-4 w-4" />
                  <span className="hidden sm:inline">Guardar</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Guardar para ver más tarde</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHelp(!showHelp)}
                  className="flex items-center gap-1"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ayuda</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 overflow-hidden"
          >
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Cómo usar esta demostración</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Utilice los controles de reproducción para iniciar, pausar o reiniciar la demostración</li>
                  <li>• Observe el progreso a través de las diferentes etapas en el panel izquierdo</li>
                  <li>• Explore las pestañas para ver beneficios, detalles técnicos y pasos de implementación</li>
                  <li>• Active el modo pantalla completa para una mejor visualización</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left sidebar - Steps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Badge className="bg-blue-600">
                {currentStep}/{steps.length}
              </Badge>
              Etapas del proceso
            </h2>
            <div className="space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className={`p-3 rounded-lg border transition-all ${
                    currentStep > index + 1
                      ? "bg-green-50 border-green-200"
                      : currentStep === index + 1
                        ? "bg-blue-50 border-blue-200 shadow-sm"
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
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progreso total</span>
                <span className="text-sm font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex items-center text-sm text-gray-500 mt-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>Duración estimada: {duration}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content - Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="border-b">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start border-b-0 rounded-none p-0 h-auto">
                  <TabsTrigger
                    value="demo"
                    className="flex items-center gap-1 px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                  >
                    <Play className="h-4 w-4" />
                    Demostración
                  </TabsTrigger>
                  <TabsTrigger
                    value="benefits"
                    className="flex items-center gap-1 px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Beneficios
                  </TabsTrigger>
                  <TabsTrigger
                    value="technical"
                    className="flex items-center gap-1 px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                  >
                    <Info className="h-4 w-4" />
                    Detalles técnicos
                  </TabsTrigger>
                  <TabsTrigger
                    value="implementation"
                    className="flex items-center gap-1 px-4 py-3 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:shadow-none rounded-none"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Implementación
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="p-4">
              <TabsContent value="demo" className="m-0">
                <div
                  ref={demoContainerRef}
                  className={`aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4 ${fullscreen ? "fixed inset-0 z-50 p-4 bg-black flex items-center justify-center" : ""}`}
                >
                  {/* This would be the actual demo content */}
                  <div className={`h-full ${fullscreen ? "max-w-5xl mx-auto" : ""}`}>{demoContent}</div>

                  {fullscreen && (
                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg p-2 flex gap-2">
                      <Button
                        variant={playing ? "destructive" : "default"}
                        size="sm"
                        onClick={togglePlay}
                        className="h-8 w-8 p-0"
                      >
                        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        className="h-8 w-8 p-0 bg-white bg-opacity-20"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleFullscreen}
                        className="h-8 w-8 p-0 bg-white bg-opacity-20"
                      >
                        <Minimize className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {!fullscreen && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Badge variant="outline" className="mr-2">
                        Paso {currentStep} de {steps.length}
                      </Badge>
                      <span className="text-sm font-medium">{steps[currentStep - 1]?.title}</span>
                    </div>
                    <Button size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>Descargar presentación</span>
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="benefits" className="m-0 animate-in fade-in-50">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Beneficios clave
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="bg-green-50 p-4 rounded-lg border border-green-100"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <p>{benefit}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="technical" className="m-0 animate-in fade-in-50">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600" />
                    Detalles técnicos
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <p className="text-sm text-blue-800 mb-2">
                      Este módulo utiliza tecnología de vanguardia para garantizar un rendimiento óptimo y una
                      integración perfecta con sus sistemas existentes.
                    </p>
                  </div>
                  <div className="space-y-3">
                    {technicalDetails.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <p>{detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="implementation" className="m-0 animate-in fade-in-50">
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                    Proceso de implementación
                  </h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-6">
                      {implementationSteps.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.15 * index }}
                          className="relative pl-10"
                        >
                          <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="bg-white p-4 rounded-lg border shadow-sm">
                            <p>{step}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>

          {/* Related modules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Módulos relacionados</h3>
              <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Verificación Biométrica</CardTitle>
                  <CardDescription className="line-clamp-2">
                    Sistema de verificación de identidad mediante reconocimiento facial
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  <Badge variant="outline">3 min</Badge>
                  <Button size="sm" variant="ghost" className="text-blue-600">
                    Ver demo
                  </Button>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Firma Electrónica</CardTitle>
                  <CardDescription className="line-clamp-2">
                    Sistema de firma digital con validez legal conforme a la Ley 19.799
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  <Badge variant="outline">4 min</Badge>
                  <Button size="sm" variant="ghost" className="text-blue-600">
                    Ver demo
                  </Button>
                </CardFooter>
              </Card>
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Gestión de Siniestros</CardTitle>
                  <CardDescription className="line-clamp-2">
                    Proceso completo de declaración, evaluación y resolución de siniestros
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-2 flex justify-between">
                  <Badge variant="outline">8 min</Badge>
                  <Button size="sm" variant="ghost" className="text-blue-600">
                    Ver demo
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
