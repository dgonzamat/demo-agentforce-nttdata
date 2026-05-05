"use client"

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
import {
  User,
  Building,
  CreditCard,
  CheckCircle,
  Clock,
  ChevronRight,
  Star,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  FileText,
  Download,
  Percent,
  Landmark,
  ArrowLeft,
  Banknote,
  ChevronsUpDown,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"

// Tipos para el módulo de portabilidad financiera
interface ClientData {
  name: string
  rut: string
  email: string
  phone: string
  currentBank: string
}

interface ProductData {
  type: string
  institution: string
  number: string
  balance: number
  rate: number
  monthlyPayment: number
  term: number
}

interface BankOffer {
  id: string
  name: string
  interestRate: number
  cae: number
  monthlyPayment: number
  totalInterest: number
  term: number
  recommended: boolean
  features: string[]
}

interface ModuleStep {
  title: string
  description: string
}

export default function PortabilidadFinancieraPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [clientData, setClientData] = useState<ClientData>({
    name: "María González",
    rut: "15.678.901-2",
    email: "maria.gonzalez@ejemplo.cl",
    phone: "+56 9 8765 4321",
    currentBank: "Banco Tradicional",
  })

  const [productData, setProductData] = useState<ProductData>({
    type: "Crédito Hipotecario",
    institution: "Banco Tradicional",
    number: "HIP-2019-45678",
    balance: 98500000,
    rate: 4.8,
    monthlyPayment: 580000,
    term: 228, // Meses restantes
  })

  const [bankOffers, setBankOffers] = useState<BankOffer[]>([])
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null)
  const [verificationComplete, setVerificationComplete] = useState(false)
  const [signatureComplete, setSignatureComplete] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [showSavings, setShowSavings] = useState(false)
  const [activeTab, setActiveTab] = useState("offers")

  // Generar ofertas basadas en el paso
  useEffect(() => {
    if (currentStep === 2) {
      generateOffers()
    }
  }, [currentStep])

  // Función para generar ofertas de bancos
  const generateOffers = () => {
    const newOffers: BankOffer[] = [
      {
        id: "banco1",
        name: "BancoTech",
        interestRate: 3.75,
        cae: 4.1,
        monthlyPayment: 520000,
        totalInterest: calculateTotalInterest(3.75, 240),
        term: 240,
        recommended: true,
        features: [
          "Tasa preferencial por portabilidad",
          "Seguro de desgravamen incluido",
          "Condiciones flexibles de pago",
          "Sin comisión de prepago",
        ],
      },
      {
        id: "banco2",
        name: "Banco Digital",
        interestRate: 3.9,
        cae: 4.25,
        monthlyPayment: 530000,
        totalInterest: calculateTotalInterest(3.9, 240),
        term: 240,
        recommended: false,
        features: [
          "Trámite 100% digital",
          "Respuesta en 24 horas",
          "Descuentos en comercios asociados",
          "App exclusiva para clientes",
        ],
      },
      {
        id: "banco3",
        name: "Banco Innovador",
        interestRate: 4.0,
        cae: 4.35,
        monthlyPayment: 542000,
        totalInterest: calculateTotalInterest(4.0, 240),
        term: 240,
        recommended: false,
        features: [
          "Periodo de gracia de 3 meses",
          "Flexibilidad para cambiar fecha de pago",
          "Beneficios en cuentas corrientes",
          "Acceso a tarjetas premium",
        ],
      },
    ]

    setBankOffers(newOffers)
    setSelectedOffer("banco1")
  }

  // Calcular interés total (simplificado)
  const calculateTotalInterest = (rate: number, term: number) => {
    const monthlyRate = rate / 100 / 12
    const totalPayment = (productData.balance * monthlyRate * term) / (1 - Math.pow(1 + monthlyRate, -term))
    return totalPayment * term - productData.balance
  }

  // Definir los pasos del módulo
  const moduleSteps: ModuleStep[] = [
    {
      title: "Análisis de Productos Actuales",
      description: "Identificación y análisis de productos financieros para portabilidad",
    },
    {
      title: "Comparación de Ofertas",
      description: "Presentación de ofertas disponibles en el mercado con análisis de ahorro",
    },
    {
      title: "Solicitud de Portabilidad",
      description: "Gestión del certificado de liquidación y solicitud formal",
    },
    {
      title: "Firma y Activación",
      description: "Firma de documentos y activación del nuevo producto financiero",
    },
  ]

  // Manejar cambio de paso
  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  // Manejar verificación
  const handleVerification = () => {
    // Simular proceso de verificación
    setTimeout(() => {
      setVerificationComplete(true)
    }, 1500)
  }

  // Manejar firma
  const handleSignature = () => {
    // Simular proceso de firma
    setTimeout(() => {
      setSignatureComplete(true)
    }, 1500)
  }

  // Función para formatear dinero en CLP
  const formatCLP = (amount: number) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
    }).format(amount)
  }

  // Calcular ahorro mensual entre la oferta seleccionada y el producto actual
  const calculateMonthlySavings = () => {
    if (!selectedOffer) return 0
    const selectedBankOffer = bankOffers.find((offer) => offer.id === selectedOffer)
    if (!selectedBankOffer) return 0
    return productData.monthlyPayment - selectedBankOffer.monthlyPayment
  }

  // Calcular ahorro total en intereses entre la oferta seleccionada y el producto actual
  const calculateTotalSavings = () => {
    if (!selectedOffer) return 0
    const selectedBankOffer = bankOffers.find((offer) => offer.id === selectedOffer)
    if (!selectedBankOffer) return 0

    const currentTotalInterest = calculateTotalInterest(productData.rate, productData.term)
    return currentTotalInterest - selectedBankOffer.totalInterest
  }

  // Renderizar el contenido de demostración basado en el paso actual
  const renderDemoContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="h-full flex flex-col">
            <GradientHeader title="Portabilidad Financiera" subtitle="Análisis de productos financieros actuales" />
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
                    description="Información personal y productos financieros activos"
                    iconBgColor="bg-green-100"
                    iconTextColor="text-green-600"
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
                    <Label htmlFor="currentBank">Banco actual</Label>
                    <Input id="currentBank" value={clientData.currentBank} readOnly className="bg-gray-50" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6"
                >
                  <SectionHeader
                    icon={<CreditCard className="h-6 w-6" />}
                    title="Producto para Portabilidad"
                    description="Detalles del producto financiero seleccionado para el proceso"
                    iconBgColor="bg-green-100"
                    iconTextColor="text-green-600"
                  />

                  <Card className="mt-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center justify-between">
                        <span>{productData.type}</span>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                          {productData.institution}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">N° de Producto</p>
                          <p className="font-medium">{productData.number}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Saldo</p>
                          <p className="font-medium">{formatCLP(productData.balance)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tasa de Interés</p>
                          <p className="font-medium">{productData.rate}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Cuota Mensual</p>
                          <p className="font-medium">{formatCLP(productData.monthlyPayment)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Plazo Restante</p>
                          <p className="font-medium">
                            {productData.term} meses ({Math.round(productData.term / 12)} años)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Certificado de Liquidación</p>
                      <p className="text-xs text-gray-500">Requerido para continuar con la portabilidad</p>
                    </div>
                  </div>
                  <div>
                    {verificationComplete ? (
                      <Badge className="bg-green-500">Solicitado</Badge>
                    ) : (
                      <Button size="sm" onClick={handleVerification}>
                        Solicitar certificado
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
                    Buscar ofertas
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
            <GradientHeader title="Comparación de Ofertas" subtitle="Análisis de opciones disponibles en el mercado" />
            <div className="flex-1 p-6 overflow-auto bg-white">
              <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <SectionHeader
                      icon={<Building className="h-6 w-6" />}
                      title="Ofertas Disponibles"
                      description="Comparación de instituciones financieras"
                      iconBgColor="bg-green-100"
                      iconTextColor="text-green-600"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCompareMode(!compareMode)}
                      className="flex items-center gap-1"
                    >
                      <ChevronsUpDown className="h-4 w-4" />
                      {compareMode ? "Vista individual" : "Comparar ofertas"}
                    </Button>
                  </motion.div>
                </div>

                {!compareMode ? (
                  // Vista de tarjetas individuales
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    {bankOffers.map((offer, index) => (
                      <BankOfferCard
                        key={offer.id}
                        offer={offer}
                        isSelected={selectedOffer === offer.id}
                        onSelect={() => setSelectedOffer(offer.id)}
                        animationDelay={0.2 + index * 0.1}
                      />
                    ))}
                  </motion.div>
                ) : (
                  // Vista de tabla comparativa
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6"
                  >
                    <Card>
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b">
                                <th className="text-left p-3 font-medium text-gray-600">Institución</th>
                                <th className="text-center p-3 font-medium text-gray-600">Tasa de interés</th>
                                <th className="text-center p-3 font-medium text-gray-600">CAE</th>
                                <th className="text-center p-3 font-medium text-gray-600">Cuota mensual</th>
                                <th className="text-center p-3 font-medium text-gray-600">Plazo</th>
                                <th className="text-center p-3 font-medium text-gray-600">Seleccionar</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/* Fila de banco actual */}
                              <tr className="border-b bg-gray-100">
                                <td className="p-3 font-medium">
                                  {productData.institution}
                                  <div className="text-xs text-gray-500">(Actual)</div>
                                </td>
                                <td className="p-3 text-center">{productData.rate}%</td>
                                <td className="p-3 text-center">-</td>
                                <td className="p-3 text-center">{formatCLP(productData.monthlyPayment)}</td>
                                <td className="p-3 text-center">{productData.term} meses</td>
                                <td className="p-3 text-center">-</td>
                              </tr>

                              {/* Filas de ofertas */}
                              {bankOffers.map((offer) => (
                                <tr
                                  key={offer.id}
                                  className={`border-b ${selectedOffer === offer.id ? "bg-green-50" : ""}`}
                                >
                                  <td className="p-3 font-medium flex items-center">
                                    {offer.name}
                                    {offer.recommended && (
                                      <Badge className="ml-2 bg-blue-100 text-blue-700 border-0">Recomendado</Badge>
                                    )}
                                  </td>
                                  <td className="p-3 text-center font-medium text-green-600">{offer.interestRate}%</td>
                                  <td className="p-3 text-center">{offer.cae}%</td>
                                  <td className="p-3 text-center">{formatCLP(offer.monthlyPayment)}</td>
                                  <td className="p-3 text-center">{offer.term} meses</td>
                                  <td className="p-3 text-center">
                                    <Button
                                      size="sm"
                                      variant={selectedOffer === offer.id ? "default" : "outline"}
                                      onClick={() => setSelectedOffer(offer.id)}
                                    >
                                      {selectedOffer === offer.id ? "Seleccionado" : "Seleccionar"}
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Sección de ahorro */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6"
                >
                  <Card className="border-green-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <Percent className="h-5 w-5 text-green-600 mr-2" />
                        Análisis de Ahorro Potencial
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="bg-green-50 p-4 rounded-lg border border-green-100"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-green-800">Ahorro Mensual</p>
                            <Badge className="bg-green-500">{formatCLP(calculateMonthlySavings())}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Diferencia entre su cuota actual y la cuota con la nueva institución.
                          </p>
                          <div className="flex justify-between text-sm text-gray-700 mb-1">
                            <span>Cuota actual</span>
                            <span className="font-medium">{formatCLP(productData.monthlyPayment)}</span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span>Nueva cuota</span>
                            <span className="font-medium text-green-700">
                              {formatCLP(bankOffers.find((o) => o.id === selectedOffer)?.monthlyPayment || 0)}
                            </span>
                          </div>

                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-green-700 border-green-200 hover:bg-green-100"
                              onClick={() => setShowSavings(!showSavings)}
                            >
                              {showSavings ? "Ocultar detalles" : "Ver detalles de ahorro"}
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="bg-blue-50 p-4 rounded-lg border border-blue-100"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-blue-800">Ahorro Total en Intereses</p>
                            <Badge className="bg-blue-500">{formatCLP(calculateTotalSavings())}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            Diferencia total en intereses pagados durante la vida del crédito.
                          </p>
                          <div className="flex justify-between text-sm text-gray-700 mb-1">
                            <span>Intereses actuales</span>
                            <span className="font-medium">
                              {formatCLP(calculateTotalInterest(productData.rate, productData.term))}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-700 mb-2">
                            <span>Nuevos intereses</span>
                            <span className="font-medium text-blue-700">
                              {formatCLP(bankOffers.find((o) => o.id === selectedOffer)?.totalInterest || 0)}
                            </span>
                          </div>

                          <div className="mt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full text-blue-700 border-blue-200 hover:bg-blue-100"
                            >
                              Simular otros escenarios
                            </Button>
                          </div>
                        </motion.div>
                      </div>

                      {showSavings && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 p-4 bg-gray-50 rounded-lg border"
                        >
                          <h4 className="font-medium mb-3">¿En qué podría invertir su ahorro mensual?</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-white p-3 rounded-lg border shadow-sm text-center">
                              <div className="w-10 h-10 bg-amber-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <Landmark className="h-5 w-5 text-amber-600" />
                              </div>
                              <p className="font-medium">Fondo de inversión</p>
                              <p className="text-sm text-gray-500">
                                {formatCLP(calculateMonthlySavings() * 12 * 1.08)} en 1 año
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border shadow-sm text-center">
                              <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <Building className="h-5 w-5 text-purple-600" />
                              </div>
                              <p className="font-medium">Depósito a plazo</p>
                              <p className="text-sm text-gray-500">
                                {formatCLP(calculateMonthlySavings() * 12 * 1.055)} en 1 año
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded-lg border shadow-sm text-center">
                              <div className="w-10 h-10 bg-teal-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                                <Banknote className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="font-medium">Cuenta de ahorro</p>
                              <p className="text-sm text-gray-500">
                                {formatCLP(calculateMonthlySavings() * 12 * 1.035)} en 1 año
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6"
                >
                  <div className="flex items-start gap-2">
                    <ThumbsUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-blue-800">¿Por qué recomendamos BancoTech?</p>
                      <p className="text-sm text-gray-600">
                        Basado en su perfil financiero y en las condiciones de su crédito actual, BancoTech ofrece la
                        tasa más conveniente del mercado y beneficios adicionales como seguro de desgravamen sin costo y
                        flexibilidad en las condiciones de pago, lo que se traduce en un ahorro significativo a largo
                        plazo.
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
                  <Button disabled={!selectedOffer} className="flex items-center gap-1 group">
                    Continuar con portabilidad
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
              title="Solicitud de Portabilidad"
              subtitle="Gestión del certificado de liquidación y solicitud formal"
            />
            <div className="flex-1 p-6 overflow-auto bg-white">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <SectionHeader
                    icon={<FileText className="h-6 w-6" />}
                    title="Certificado de Liquidación"
                    description="Estado del certificado solicitado a su institución actual"
                    iconBgColor="bg-green-100"
                    iconTextColor="text-green-600"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white border rounded-lg p-6 mb-6"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Certificado de Liquidación</h4>
                        <p className="text-sm text-gray-500">Emitido por {productData.institution}</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500">Recibido</Badge>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h5 className="text-sm font-medium mb-2">Detalles del Certificado</h5>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-500">N° de Certificado</p>
                        <p className="font-medium">CERT-2023-45678</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fecha de Emisión</p>
                        <p className="font-medium">15/04/2023</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fecha de Vigencia</p>
                        <p className="font-medium">15/07/2023</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Monto Total Adeudado</p>
                        <p className="font-medium">{formatCLP(productData.balance)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Descargar certificado
                    </Button>

                    <p className="text-gray-500">
                      <Info className="h-4 w-4 inline mr-1 text-blue-500" />
                      Válido por 30 días desde su emisión
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <SectionHeader
                    icon={<Building className="h-6 w-6" />}
                    title="Solicitud a Nueva Institución"
                    description="Inicio del proceso formal de portabilidad financiera"
                    iconBgColor="bg-green-100"
                    iconTextColor="text-green-600"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white border rounded-lg p-6 mb-6"
                >
                  <h4 className="font-medium mb-4">
                    Solicitud a {bankOffers.find((o) => o.id === selectedOffer)?.name || "Institución Seleccionada"}
                  </h4>

                  <div className="space-y-4 mb-4">
                    <div>
                      <Label htmlFor="authorization" className="mb-1 block">
                        Autorización para Gestionar Portabilidad
                      </Label>
                      <div className="flex items-center">
                        <Switch id="authorization" checked={true} />
                        <Label htmlFor="authorization" className="ml-2">
                          Autorizo a {bankOffers.find((o) => o.id === selectedOffer)?.name} para gestionar mi
                          portabilidad financiera
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="conditions" className="mb-1 block">
                        Condiciones de la Nueva Oferta
                      </Label>
                      <div className="flex items-center">
                        <Switch id="conditions" checked={true} />
                        <Label htmlFor="conditions" className="ml-2">
                          Acepto las condiciones de la oferta de portabilidad
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="products" className="mb-1 block">
                        Productos a Portar
                      </Label>
                      <div className="flex items-center">
                        <Switch id="products" checked={true} />
                        <Label htmlFor="products" className="ml-2">
                          {productData.type} - {productData.number}
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-gray-700">
                        <p className="font-medium text-blue-800 mb-1">Proceso sin costo</p>
                        <p>
                          De acuerdo a la Ley 21.236 de Portabilidad Financiera, este proceso no tiene costo para usted.
                          La nueva institución se encargará de gestionar el proceso completo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Button variant="outline" className="flex items-center gap-1">
                      <ArrowLeft className="h-4 w-4" />
                      Volver a ofertas
                    </Button>

                    <Button onClick={handleSignature} className="flex items-center gap-1">
                      Enviar solicitud
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="h-full flex flex-col">
            <GradientHeader title="Firma y Activación" subtitle="Finalización del proceso de portabilidad financiera" />
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
                        title="Firma Digital de Documentos"
                        description="Complete el proceso con firma electrónica avanzada"
                        iconBgColor="bg-green-100"
                        iconTextColor="text-green-600"
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
                          <Building className="h-5 w-5 text-green-600 mr-2" />
                          <h5 className="font-medium">Contrato de Portabilidad Financiera</h5>
                        </div>
                        <Badge variant="outline">PDF</Badge>
                      </div>

                      <div className="aspect-[4/3] bg-white border rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <FileText className="h-8 w-8 text-green-600" />
                          </div>
                          <h6 className="font-medium mb-2">Documentos de Portabilidad</h6>
                          <p className="text-sm text-gray-500 mb-4">
                            Documentos legales para formalizar el proceso de portabilidad
                          </p>
                          <Button size="sm" variant="outline">
                            Ver documentos
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Switch id="terms" checked />
                          <Label htmlFor="terms" className="ml-2">
                            He leído y acepto los términos y condiciones
                          </Label>
                        </div>

                        <div className="flex items-center">
                          <Switch id="privacy" checked />
                          <Label htmlFor="privacy" className="ml-2">
                            Acepto la política de privacidad
                          </Label>
                        </div>

                        <div className="flex items-center">
                          <Switch id="digital-signature" checked />
                          <Label htmlFor="digital-signature" className="ml-2">
                            Acepto firmar digitalmente conforme a la Ley 19.799
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
                    <h3 className="text-2xl font-bold mb-2">¡Portabilidad Financiera Iniciada!</h3>
                    <p className="text-gray-600 mb-6">Su solicitud de portabilidad ha sido procesada exitosamente</p>

                    <Card className="mb-6 text-left">
                      <CardHeader>
                        <CardTitle className="text-lg">Resumen del Proceso</CardTitle>
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
                              <p className="text-sm text-gray-500">Producto a portar</p>
                              <p className="font-medium">
                                {productData.type} - {productData.number}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Institución original</p>
                              <p className="font-medium">{productData.institution}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Nueva institución</p>
                              <p className="font-medium">{bankOffers.find((o) => o.id === selectedOffer)?.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Nueva tasa</p>
                              <p className="font-medium">
                                {bankOffers.find((o) => o.id === selectedOffer)?.interestRate}%
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">N° de Solicitud</p>
                              <p className="font-medium">PORT-2023-78945</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Estado</p>
                              <Badge className="bg-blue-500">En proceso</Badge>
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <FeatureItem text="Certificado de liquidación gestionado" />
                            <FeatureItem text="Firma electrónica avanzada registrada" />
                            <FeatureItem text="Documentación enviada a su correo electrónico" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="offers">Oferta</TabsTrigger>
                        <TabsTrigger value="status">Estado</TabsTrigger>
                        <TabsTrigger value="support">Soporte</TabsTrigger>
                      </TabsList>
                      <TabsContent value="offers" className="p-4 border rounded-lg mt-2">
                        <p className="text-sm">
                          Su oferta de portabilidad ha sido registrada y está en proceso. Puede descargar una copia de
                          los documentos firmados para su registro.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Descargar documentos
                        </Button>
                      </TabsContent>
                      <TabsContent value="status" className="p-4 border rounded-lg mt-2">
                        <p className="text-sm mb-3">
                          Puede seguir el estado de su portabilidad financiera en tiempo real:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Solicitud iniciada</p>
                              <p className="text-xs text-gray-500">15/04/2023 - 10:35</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                              <CheckCircle className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">Documentos firmados</p>
                              <p className="text-xs text-gray-500">15/04/2023 - 10:40</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">En proceso con institución original</p>
                              <p className="text-xs text-gray-500">En curso</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                              <Clock className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-500">Portabilidad completada</p>
                              <p className="text-xs text-gray-500">Pendiente</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="support" className="p-4 border rounded-lg mt-2">
                        <p className="text-sm">
                          Si tiene consultas sobre su proceso de portabilidad, puede contactar a su ejecutivo asignado o
                          a través de nuestros canales de atención al cliente.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Contactar ejecutivo
                          </Button>
                          <Button variant="outline" size="sm">
                            Centro de ayuda
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="flex justify-center gap-4 mt-6">
                      <Button variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Descargar comprobante
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

  // Definir beneficios, detalles técnicos y pasos de implementación
  const benefits = [
    "Cumplimiento 100% con la Ley 21.236 de Portabilidad Financiera",
    "Reducción de 80% en tiempo de trámite comparado con procesos tradicionales",
    "Ahorro promedio del 15% en tasas de interés y condiciones financieras",
    "Experiencia 100% digital sin necesidad de visitar sucursales",
    "Gestión completa del proceso por la nueva institución financiera",
    "Análisis comparativo de ofertas para maximizar el ahorro",
  ]

  const technicalDetails = [
    "Integración con API del Servicio de Impuestos Internos para validación de identidad",
    "Conexión a sistema interbancario para gestión de certificados de liquidación",
    "Firma electrónica avanzada con validez legal conforme a la Ley 19.799",
    "Algoritmos de análisis financiero para recomendación personalizada de ofertas",
    "Arquitectura basada en microservicios con alta disponibilidad",
    "Sistema de notificaciones en tiempo real sobre el estado del proceso",
  ]

  const implementationSteps = [
    "Análisis de los procesos actuales de portabilidad financiera",
    "Configuración del módulo según normativa vigente y reglas de negocio",
    "Integración con sistemas core bancarios y APIs de instituciones financieras",
    "Configuración de motor de recomendaciones y comparador de ofertas",
    "Implementación de sistema de seguimiento de estado de portabilidad",
    "Capacitación de usuarios y puesta en producción",
    "Monitoreo y optimización continua del proceso",
  ]

  return (
    <ModuleTemplate
      title="Portabilidad Financiera"
      description="Proceso completo de portabilidad financiera conforme a la Ley 21.236"
      sector="banca"
      moduleId="portabilidad"
      steps={moduleSteps}
      duration="7 minutos"
      demoContent={renderDemoContent()}
      onStepChange={handleStepChange}
      benefits={benefits}
      technicalDetails={technicalDetails}
      implementationSteps={implementationSteps}
    />
  )
}

// Componentes auxiliares
interface BankOfferCardProps {
  offer: BankOffer
  isSelected: boolean
  onSelect: () => void
  animationDelay: number
}

function BankOfferCard({ offer, isSelected, onSelect, animationDelay }: BankOfferCardProps) {
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
          isSelected ? "ring-2 ring-green-500 shadow-md" : "hover:shadow-md transition-shadow"
        } ${offer.recommended ? "border-t-4 border-t-green-500" : ""}`}
      >
        {offer.recommended && (
          <div className="bg-green-500 text-white text-center py-1 text-sm font-medium flex items-center justify-center gap-1">
            <Star className="h-3 w-3" />
            Recomendado
          </div>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">{offer.name}</CardTitle>
          <div className="text-2xl font-bold text-green-700">
            {offer.interestRate}%<span className="text-sm font-normal text-gray-500 ml-1">Tasa</span>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-500">CAE</span>
            <span className="font-medium">{offer.cae}%</span>
          </div>

          <div className="flex justify-between items-center mb-4 text-sm">
            <span className="text-gray-500">Cuota mensual</span>
            <span className="font-medium">
              {new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(offer.monthlyPayment)}
            </span>
          </div>

          <div className="space-y-2 mb-2">
            {offer.features.map((feature, i) => (
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
