"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ModuleTemplate } from "@/components/module-template"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionHeader } from "@/components/ui/section-header"
import { FeatureItem } from "@/components/ui/feature-item"
import { GradientHeader } from "@/components/ui/gradient-header"
import type { ClientData, InsurancePlan, ModuleStep, InsuranceType } from "@/types/insurance"
import {
  User,
  Car,
  Home,
  Shield,
  CheckCircle,
  AlertTriangle,
  BarChart,
  Clock,
  ChevronRight,
  Star,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  FileText,
  Download,
} from "lucide-react"
import { motion } from "framer-motion"

export default function CotizacionSeguroPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [clientData, setClientData] = useState<ClientData>({
    name: "Juan Pérez",
    age: 35,
    email: "juan.perez@ejemplo.cl",
    phone: "+56 9 1234 5678",
    rut: "12.345.678-9",
  })

  const [insuranceType, setInsuranceType] = useState<InsuranceType>("auto")
  const [riskScore, setRiskScore] = useState(65)
  const [recommendations, setRecommendations] = useState<InsurancePlan[]>([])
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [signatureComplete, setSignatureComplete] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("policy")

  // Generate recommendations based on step
  useEffect(() => {
    if (currentStep === 3) {
      generateRecommendations(insuranceType)
    }
  }, [currentStep, insuranceType])

  // Function to generate recommendations based on insurance type
  const generateRecommendations = (type: InsuranceType) => {
    let newRecommendations: InsurancePlan[] = []

    if (type === "auto") {
      newRecommendations = [
        {
          id: "basic",
          name: "Plan Básico",
          coverage: "Responsabilidad civil",
          price: 45000,
          recommended: false,
          features: ["Daños a terceros", "Asistencia en ruta básica"],
        },
        {
          id: "standard",
          name: "Plan Estándar",
          coverage: "Semi-completo",
          price: 75000,
          recommended: true,
          features: ["Daños a terceros", "Robo", "Daños parciales", "Asistencia en ruta 24/7"],
        },
        {
          id: "premium",
          name: "Plan Premium",
          coverage: "Todo riesgo",
          price: 120000,
          recommended: false,
          features: ["Cobertura completa", "Auto de reemplazo", "Asistencia premium", "Sin deducible"],
        },
      ]
    } else if (type === "home") {
      newRecommendations = [
        {
          id: "basic",
          name: "Plan Básico",
          coverage: "Incendio",
          price: 35000,
          recommended: false,
          features: ["Incendio", "Explosión", "Daños por agua básicos"],
        },
        {
          id: "standard",
          name: "Plan Estándar",
          coverage: "Multirriesgo",
          price: 65000,
          recommended: true,
          features: ["Incendio", "Robo", "Daños por agua", "Responsabilidad civil"],
        },
        {
          id: "premium",
          name: "Plan Premium",
          coverage: "Todo riesgo",
          price: 95000,
          recommended: false,
          features: ["Cobertura completa", "Asistencia hogar 24/7", "Daños accidentales", "Objetos de valor"],
        },
      ]
    } else {
      newRecommendations = [
        {
          id: "basic",
          name: "Plan Básico",
          coverage: "Accidentes",
          price: 25000,
          recommended: false,
          features: ["Muerte accidental", "Invalidez permanente"],
        },
        {
          id: "standard",
          name: "Plan Estándar",
          coverage: "Vida y ahorro",
          price: 55000,
          recommended: true,
          features: ["Cobertura por fallecimiento", "Ahorro", "Enfermedades graves básicas"],
        },
        {
          id: "premium",
          name: "Plan Premium",
          coverage: "Vida completo",
          price: 85000,
          recommended: false,
          features: ["Cobertura extendida", "Ahorro con rentabilidad", "Enfermedades graves", "Hospitalización"],
        },
      ]
    }

    setRecommendations(newRecommendations)
    setSelectedPlan("standard")
  }

  // Define the steps for the module
  const moduleSteps: ModuleStep[] = [
    {
      title: "Ingreso de datos",
      description: "Captura de información básica del cliente y verificación de identidad",
    },
    {
      title: "Análisis de riesgo",
      description: "Evaluación del perfil de riesgo y necesidades del cliente",
    },
    {
      title: "Recomendaciones",
      description: "Presentación de opciones personalizadas basadas en el análisis",
    },
    {
      title: "Contratación",
      description: "Selección de plan y proceso de contratación con firma digital",
    },
  ]

  // Handle step change
  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  // Handle verification
  const handleVerification = () => {
    // Simulate verification process
    setTimeout(() => {
      setVerificationComplete(true)
    }, 1500)
  }

  // Handle signature
  const handleSignature = () => {
    // Simulate signature process
    setTimeout(() => {
      setSignatureComplete(true)
    }, 1500)
  }

  // Render the demo content based on current step
  const renderDemoContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-full flex flex-col">
            <GradientHeader title="Cotización de Seguro" subtitle="Ingrese los datos del cliente para comenzar" />
            <div className="flex-1 p-6 overflow-auto bg-white">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SectionHeader
                    icon={<User className="h-6 w-6" />}
                    title="Datos del Cliente"
                    description="Información personal para cotización personalizada"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                >
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input id="name" value={clientData.name} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="rut">RUT</Label>
                    <Input id="rut" value={clientData.rut} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" value={clientData.email} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input id="phone" value={clientData.phone} readOnly className="bg-gray-50" />
                  </div>
                  <div>
                    <Label htmlFor="age">Edad</Label>
                    <Input id="age" value={clientData.age.toString()} readOnly className="bg-gray-50" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6"
                >
                  <Label htmlFor="insurance-type" className="mb-2 block">
                    Tipo de seguro
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InsuranceTypeCard
                      type="auto"
                      title="Automotriz"
                      description="Protección para su vehículo y responsabilidad civil"
                      icon={<Car className="h-4 w-4" />}
                      selected={insuranceType === "auto"}
                      onClick={() => setInsuranceType("auto")}
                    />
                    <InsuranceTypeCard
                      type="home"
                      title="Hogar"
                      description="Protección para su vivienda y contenido"
                      icon={<Home className="h-4 w-4" />}
                      selected={insuranceType === "home"}
                      onClick={() => setInsuranceType("home")}
                    />
                    <InsuranceTypeCard
                      type="life"
                      title="Vida"
                      description="Protección financiera para usted y su familia"
                      icon={<Shield className="h-4 w-4" />}
                      selected={insuranceType === "life"}
                      onClick={() => setInsuranceType("life")}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Verificación de identidad</p>
                      <p className="text-xs text-gray-500">Requerido para continuar</p>
                    </div>
                  </div>
                  <div>
                    {verificationComplete ? (
                      <Badge className="bg-green-500">Verificado</Badge>
                    ) : (
                      <Button size="sm" onClick={handleVerification}>
                        Verificar identidad
                      </Button>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex justify-end mt-6"
                >
                  <Button disabled={!verificationComplete} className="flex items-center gap-1 group">
                    Continuar
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="h-full flex flex-col">
            <GradientHeader
              title="Análisis de Riesgo"
              subtitle="Evaluación del perfil de riesgo y necesidades del cliente"
            />
            <div className="flex-1 p-6 overflow-auto bg-white">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SectionHeader
                    icon={<BarChart className="h-6 w-6" />}
                    title="Perfil de Riesgo"
                    description={`Análisis basado en ${
                      insuranceType === "auto"
                        ? "historial de conducción y características del vehículo"
                        : insuranceType === "home"
                          ? "ubicación, características de la propiedad y medidas de seguridad"
                          : "historial médico, estilo de vida y antecedentes familiares"
                    }`}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Badge
                          className={riskScore < 50 ? "bg-green-500" : riskScore < 75 ? "bg-amber-500" : "bg-red-500"}
                        >
                          {riskScore}/100
                        </Badge>
                        Evaluación de Riesgo
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Nivel de riesgo general</span>
                            <span className="text-sm font-medium">{riskScore}/100</span>
                          </div>
                          <div className="relative pt-1">
                            <div className="flex mb-2 items-center justify-between">
                              <div>
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                                  Bajo
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-200">
                                  Alto
                                </span>
                              </div>
                            </div>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${riskScore}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                  riskScore < 50 ? "bg-green-500" : riskScore < 75 ? "bg-amber-500" : "bg-red-500"
                                }`}
                              ></motion.div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <RiskFactorCard
                            icon={<Clock className="h-4 w-4 mr-2 text-blue-600" />}
                            title="Historial"
                            description={
                              insuranceType === "auto"
                                ? "Sin incidentes en los últimos 3 años"
                                : insuranceType === "home"
                                  ? "Sin reclamaciones previas"
                                  : "Sin condiciones preexistentes significativas"
                            }
                            animationDelay={0.3}
                          />

                          <RiskFactorCard
                            icon={<AlertTriangle className="h-4 w-4 mr-2 text-amber-600" />}
                            title="Factores de riesgo"
                            description={
                              insuranceType === "auto"
                                ? "Zona de alto tráfico, vehículo de alta gama"
                                : insuranceType === "home"
                                  ? "Zona con riesgo medio de inundación"
                                  : "Antecedentes familiares de enfermedades cardíacas"
                            }
                            animationDelay={0.4}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Necesidades Identificadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {insuranceType === "auto" ? (
                          <>
                            <FeatureItem text="Cobertura por daños a terceros" className="animate-fadeIn" />
                            <FeatureItem text="Protección contra robo" className="animate-fadeIn animation-delay-100" />
                            <FeatureItem
                              text="Asistencia en ruta 24/7"
                              className="animate-fadeIn animation-delay-200"
                            />
                          </>
                        ) : insuranceType === "home" ? (
                          <>
                            <FeatureItem
                              text="Protección contra incendios y daños por agua"
                              className="animate-fadeIn"
                            />
                            <FeatureItem text="Cobertura por robo" className="animate-fadeIn animation-delay-100" />
                            <FeatureItem text="Responsabilidad civil" className="animate-fadeIn animation-delay-200" />
                          </>
                        ) : (
                          <>
                            <FeatureItem text="Protección financiera para la familia" className="animate-fadeIn" />
                            <FeatureItem
                              text="Cobertura para enfermedades graves"
                              className="animate-fadeIn animation-delay-100"
                            />
                            <FeatureItem text="Componente de ahorro" className="animate-fadeIn animation-delay-200" />
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="flex justify-end"
                >
                  <Button className="flex items-center gap-1 group">
                    Generar recomendaciones
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="h-full flex flex-col">
            <GradientHeader
              title="Recomendaciones Personalizadas"
              subtitle="Opciones de seguro adaptadas a su perfil y necesidades"
            />
            <div className="flex-1 p-6 overflow-auto bg-white">
              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SectionHeader
                    icon={<Shield className="h-6 w-6" />}
                    title="Planes Recomendados"
                    description="Basados en su perfil de riesgo y necesidades identificadas"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {recommendations.map((plan, index) => (
                    <InsurancePlanCard
                      key={plan.id}
                      plan={plan}
                      isSelected={selectedPlan === plan.id}
                      onSelect={() => setSelectedPlan(plan.id)}
                      animationDelay={0.2 + index * 0.1}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6"
                >
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-800">¿Por qué recomendamos el Plan Estándar?</p>
                      <p className="text-sm text-gray-600">
                        Basado en su perfil de riesgo y necesidades identificadas, el Plan Estándar ofrece el mejor
                        equilibrio entre cobertura y costo. Incluye todas las protecciones esenciales que necesita sin
                        coberturas innecesarias que aumentarían el precio.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex justify-end"
                >
                  <Button disabled={!selectedPlan} className="flex items-center gap-1 group">
                    Continuar con{" "}
                    {selectedPlan === "basic"
                      ? "Plan Básico"
                      : selectedPlan === "standard"
                        ? "Plan Estándar"
                        : "Plan Premium"}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="h-full flex flex-col">
            <GradientHeader title="Contratación" subtitle="Finalización del proceso y firma digital" />
            <div className="flex-1 p-6 overflow-auto bg-white">
              <div className="max-w-2xl mx-auto">
                {!signatureComplete ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <SectionHeader
                        icon={<FileText className="h-6 w-6" />}
                        title="Firma Digital"
                        description="Complete el proceso con firma electrónica avanzada"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="bg-gray-50 border rounded-lg p-6 mb-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 text-blue-600 mr-2" />
                          <h5 className="font-medium">Contrato de Seguro</h5>
                        </div>
                        <Badge variant="outline">PDF</Badge>
                      </div>

                      <div className="aspect-[4/3] bg-white border rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileText className="h-8 w-8 text-blue-600" />
                          </div>
                          <h6 className="font-medium mb-2">Contrato de Seguro</h6>
                          <p className="text-sm text-gray-500 mb-4">
                            Documento legal que establece los términos y condiciones de su seguro
                          </p>
                          <Button size="sm" variant="outline">
                            Ver documento
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Switch id="terms" />
                          <Label htmlFor="terms" className="ml-2">
                            He leído y acepto los términos y condiciones
                          </Label>
                        </div>

                        <div className="flex items-center">
                          <Switch id="privacy" />
                          <Label htmlFor="privacy" className="ml-2">
                            Acepto la política de privacidad
                          </Label>
                        </div>

                        <div className="flex justify-center mt-4">
                          <Button onClick={handleSignature} className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            Firmar digitalmente
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">¡Proceso Completado!</h3>
                    <p className="text-gray-600 mb-6">Su seguro ha sido contratado exitosamente</p>

                    <Card className="mb-6 text-left">
                      <CardHeader>
                        <CardTitle className="text-lg">Resumen de la Contratación</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Cliente</p>
                              <p className="font-medium">{clientData.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">RUT</p>
                              <p className="font-medium">{clientData.rut}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Plan contratado</p>
                              <p className="font-medium">
                                {selectedPlan === "basic"
                                  ? "Plan Básico"
                                  : selectedPlan === "standard"
                                    ? "Plan Estándar"
                                    : "Plan Premium"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Prima mensual</p>
                              <p className="font-medium">
                                $
                                {recommendations.find((r) => r.id === selectedPlan)?.price.toLocaleString("es-CL") ||
                                  "75.000"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Fecha de inicio</p>
                              <p className="font-medium">01/05/2023</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Número de póliza</p>
                              <p className="font-medium">POL-2023-78945</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <FeatureItem text="Verificación de identidad completada" />
                            <FeatureItem text="Firma electrónica avanzada registrada" />
                            <FeatureItem text="Documentación enviada a su correo electrónico" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {signatureComplete && (
                      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="policy">Póliza</TabsTrigger>
                          <TabsTrigger value="payment">Pagos</TabsTrigger>
                          <TabsTrigger value="support">Soporte</TabsTrigger>
                        </TabsList>
                        <TabsContent value="policy" className="p-4 border rounded-lg mt-2">
                          <p className="text-sm">
                            Su póliza ha sido emitida y está disponible para descarga. También puede acceder a ella en
                            cualquier momento desde su cuenta en línea o la aplicación móvil.
                          </p>
                          <Button className="mt-4" variant="outline">
                            Descargar póliza
                          </Button>
                        </TabsContent>
                        <TabsContent value="payment" className="p-4 border rounded-lg mt-2">
                          <p className="text-sm">
                            Su primer pago será procesado el 05/05/2023. Los pagos subsiguientes se realizarán el mismo
                            día de cada mes mediante el método de pago seleccionado.
                          </p>
                          <Button className="mt-4" variant="outline">
                            Gestionar pagos
                          </Button>
                        </TabsContent>
                        <TabsContent value="support" className="p-4 border rounded-lg mt-2">
                          <p className="text-sm">
                            Para cualquier consulta o asistencia, puede contactarnos a través de nuestro centro de
                            atención al cliente 24/7 o mediante la aplicación móvil.
                          </p>
                          <Button className="mt-4" variant="outline">
                            Contactar soporte
                          </Button>
                        </TabsContent>
                      </Tabs>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Descargar póliza
                      </Button>
                      <Button className="flex items-center gap-1">
                        <ArrowRight className="h-4 w-4" />
                        Ir a mi cuenta
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return <div>Paso no disponible</div>
    }
  }

  // Define benefits, technical details, and implementation steps
  const benefits = [
    "Reducción de 65% en tiempo de cotización comparado con procesos tradicionales",
    "Aumento de 40% en tasa de conversión gracias a recomendaciones personalizadas",
    "Personalización basada en más de 20 variables de riesgo y preferencias",
    "Experiencia 100% digital sin necesidad de documentación física",
    "Cumplimiento normativo con la CMF y la Ley 19.799 de Firma Electrónica",
    "Emisión inmediata de póliza y documentación legal",
  ]

  const technicalDetails = [
    "Integración con sistemas core mediante APIs RESTful para acceso a datos en tiempo real",
    "Algoritmos de machine learning para evaluación de riesgo y personalización de ofertas",
    "Verificación biométrica con reconocimiento facial y validación con Registro Civil",
    "Firma electrónica avanzada con validez legal conforme a la Ley 19.799",
    "Arquitectura basada en microservicios para alta disponibilidad y escalabilidad",
    "Almacenamiento seguro de datos sensibles con encriptación de extremo a extremo",
  ]

  const implementationSteps = [
    "Análisis de requerimientos y procesos actuales de cotización y contratación",
    "Configuración y personalización del módulo según necesidades específicas",
    "Integración con sistemas existentes (core de seguros, CRM, etc.)",
    "Configuración de reglas de negocio y parámetros de evaluación de riesgo",
    "Pruebas de integración y validación de cumplimiento normativo",
    "Capacitación de usuarios y puesta en producción",
    "Monitoreo y optimización continua del proceso",
  ]

  return (
    <ModuleTemplate
      title="Cotización Personalizada de Seguros"
      description="Proceso de cotización con recomendaciones personalizadas basadas en perfil de riesgo"
      sector="seguros"
      moduleId="cotizacion"
      steps={moduleSteps}
      duration="5 minutos"
      demoContent={renderDemoContent()}
      onStepChange={handleStepChange}
      benefits={benefits}
      technicalDetails={technicalDetails}
      implementationSteps={implementationSteps}
    />
  )
}

// Componentes auxiliares
interface InsuranceTypeCardProps {
  type: InsuranceType
  title: string
  description: string
  icon: React.ReactNode
  selected: boolean
  onClick: () => void
}

function InsuranceTypeCard({ type, title, description, icon, selected, onClick }: InsuranceTypeCardProps) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${
        selected ? "border-blue-500 bg-blue-50 shadow-sm" : "hover:border-gray-300"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center mb-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
            selected ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  )
}

interface RiskFactorCardProps {
  icon: React.ReactNode
  title: string
  description: string
  animationDelay: number
}

function RiskFactorCard({ icon, title, description, animationDelay }: RiskFactorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="border rounded-lg p-3"
    >
      <div className="flex items-center mb-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  )
}

interface InsurancePlanCardProps {
  plan: InsurancePlan
  isSelected: boolean
  onSelect: () => void
  animationDelay: number
}

function InsurancePlanCard({ plan, isSelected, onSelect, animationDelay }: InsurancePlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className={`h-full overflow-hidden ${
          isSelected ? "ring-2 ring-blue-500 shadow-md" : "hover:shadow-md transition-shadow"
        } ${plan.recommended ? "border-t-4 border-t-blue-500" : ""}`}
      >
        {plan.recommended && (
          <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium flex items-center justify-center gap-1">
            <Star className="h-3 w-3" />
            Recomendado
          </div>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          <p className="text-sm text-gray-500">{plan.coverage}</p>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="text-2xl font-bold mb-4">
            ${plan.price.toLocaleString("es-CL")}
            <span className="text-sm font-normal text-gray-500">/mes</span>
          </div>

          <div className="space-y-2 mb-4">
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant={isSelected ? "default" : "outline"} onClick={onSelect}>
            {isSelected ? (
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Seleccionado
              </span>
            ) : (
              "Seleccionar"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
