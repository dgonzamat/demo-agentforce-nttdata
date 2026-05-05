"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  FileText,
  Shield,
  Zap,
  BarChart,
  Users,
  Building,
  Globe,
  Search,
  ChevronRight,
  CreditCard,
  FileCheck,
  Clock,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Filter,
  ArrowUpRight,
  Star,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

// Define the module type
interface Module {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
  duration: string
  featured?: boolean
  new?: boolean
}

// Define the sector type
interface Sector {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  modules: Module[]
}

export default function ModulesPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Define all sectors and their modules
  const sectors: Sector[] = [
    {
      id: "seguros",
      name: "Seguros",
      description: "Soluciones para la industria de seguros con verificación biométrica y firma digital",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-blue-600",
      modules: [
        {
          id: "cotizacion",
          title: "Cotización Personalizada",
          description:
            "Proceso de cotización de seguros con recomendaciones personalizadas basadas en perfil de riesgo",
          icon: <BarChart className="h-5 w-5 text-blue-600" />,
          benefits: [
            "Reducción de 65% en tiempo de cotización",
            "Aumento de 40% en tasa de conversión",
            "Personalización basada en 20+ variables",
          ],
          duration: "5 minutos",
          featured: true,
        },
        {
          id: "verificacion",
          title: "Verificación Biométrica",
          description:
            "Sistema de verificación de identidad mediante reconocimiento facial y validación con Registro Civil",
          icon: <Users className="h-5 w-5 text-blue-600" />,
          benefits: ["Cumplimiento normativo CMF", "Reducción de fraude en 85%", "Experiencia fluida sin fricción"],
          duration: "3 minutos",
          new: true,
        },
        {
          id: "siniestros",
          title: "Gestión de Siniestros",
          description: "Proceso completo de declaración, evaluación y resolución de siniestros",
          icon: <FileCheck className="h-5 w-5 text-blue-600" />,
          benefits: [
            "Reducción de 70% en tiempo de resolución",
            "Aumento de 45% en satisfacción del cliente",
            "Trazabilidad completa del proceso",
          ],
          duration: "8 minutos",
        },
        {
          id: "firma-digital",
          title: "Firma Electrónica Avanzada",
          description: "Sistema de firma digital con validez legal conforme a la Ley 19.799",
          icon: <FileText className="h-5 w-5 text-blue-600" />,
          benefits: [
            "Validez legal completa",
            "Integración con múltiples documentos",
            "Reducción de 90% en tiempo de contratación",
          ],
          duration: "4 minutos",
        },
      ],
    },
    {
      id: "banca",
      name: "Banca",
      description: "Soluciones para la industria bancaria con foco en portabilidad financiera y onboarding digital",
      icon: <Building className="h-5 w-5" />,
      color: "bg-green-600",
      modules: [
        {
          id: "portabilidad",
          title: "Portabilidad Financiera",
          description: "Proceso completo de portabilidad financiera según Ley 21.236",
          icon: <CreditCard className="h-5 w-5 text-green-600" />,
          benefits: [
            "Cumplimiento 100% Ley 21.236",
            "Reducción de 80% en tiempo de trámite",
            "Experiencia omnicanal integrada",
          ],
          duration: "7 minutos",
          featured: true,
        },
        {
          id: "onboarding",
          title: "Onboarding Digital",
          description: "Proceso de apertura de cuenta y verificación de identidad 100% digital",
          icon: <Users className="h-5 w-5 text-green-600" />,
          benefits: ["Reducción de abandono en 60%", "Cumplimiento normativo CMF", "Experiencia en menos de 5 minutos"],
          duration: "5 minutos",
          new: true,
        },
        {
          id: "evaluacion-credito",
          title: "Evaluación Crediticia",
          description: "Sistema de evaluación crediticia automatizada con múltiples fuentes de datos",
          icon: <BarChart className="h-5 w-5 text-green-600" />,
          benefits: [
            "Reducción de 75% en tiempo de evaluación",
            "Aumento de 30% en aprobaciones",
            "Reducción de riesgo crediticio",
          ],
          duration: "6 minutos",
        },
        {
          id: "banca-digital",
          title: "Banca Digital Omnicanal",
          description: "Plataforma integrada para gestión financiera personal y empresarial",
          icon: <Globe className="h-5 w-5 text-green-600" />,
          benefits: [
            "Aumento de 50% en transacciones digitales",
            "Reducción de 40% en costos operativos",
            "Satisfacción de cliente superior a 90%",
          ],
          duration: "8 minutos",
        },
      ],
    },
    // Mantenemos los demás sectores igual que antes...
    {
      id: "telecomunicaciones",
      name: "Telecomunicaciones",
      description:
        "Soluciones B2B para empresas de telecomunicaciones con foco en diseño técnico y gestión de contratos",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-purple-600",
      modules: [
        {
          id: "diseno-tecnico",
          title: "Diseño Técnico Personalizado",
          description: "Sistema de diseño de soluciones técnicas personalizadas para clientes empresariales",
          icon: <Lightbulb className="h-5 w-5 text-purple-600" />,
          benefits: [
            "Reducción de 60% en tiempo de diseño",
            "Aumento de 35% en precisión técnica",
            "Optimización de costos de implementación",
          ],
          duration: "9 minutos",
          featured: true,
        },
        {
          id: "gestion-contratos",
          title: "Gestión de Contratos y SLAs",
          description: "Plataforma de gestión de contratos empresariales y acuerdos de nivel de servicio",
          icon: <FileText className="h-5 w-5 text-purple-600" />,
          benefits: [
            "Cumplimiento normativo SUBTEL",
            "Reducción de 70% en disputas contractuales",
            "Trazabilidad completa de acuerdos",
          ],
          duration: "6 minutos",
        },
        {
          id: "soporte-tecnico",
          title: "Soporte Técnico Inteligente",
          description: "Sistema multicanal de soporte técnico con diagnóstico predictivo",
          icon: <Search className="h-5 w-5 text-purple-600" />,
          benefits: [
            "Reducción de 50% en tiempo de resolución",
            "Aumento de 40% en resolución en primer contacto",
            "Satisfacción de cliente superior a 85%",
          ],
          duration: "5 minutos",
          new: true,
        },
        {
          id: "analisis-red",
          title: "Análisis Predictivo de Red",
          description: "Sistema de análisis predictivo para optimización y mantenimiento de redes",
          icon: <BarChart className="h-5 w-5 text-purple-600" />,
          benefits: [
            "Reducción de 65% en incidentes de red",
            "Optimización de 30% en costos de mantenimiento",
            "Aumento de 25% en vida útil de equipos",
          ],
          duration: "7 minutos",
        },
      ],
    },
    {
      id: "retail",
      name: "Retail",
      description: "Plataforma de negociación B2B entre cadenas de supermercados y fabricantes",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-amber-600",
      modules: [
        {
          id: "negociacion-b2b",
          title: "Negociación B2B Optimizada",
          description: "Plataforma de negociación entre retailers y proveedores con análisis de mercado",
          icon: <Building className="h-5 w-5 text-amber-600" />,
          benefits: [
            "Mejora de 4.5% en márgenes comerciales",
            "Reducción de 60% en tiempo de negociación",
            "Optimización de términos comerciales",
          ],
          duration: "8 minutos",
          featured: true,
        },
        {
          id: "analisis-rentabilidad",
          title: "Análisis de Rentabilidad",
          description: "Sistema de análisis de rentabilidad por categoría, producto y metro cuadrado",
          icon: <BarChart className="h-5 w-5 text-amber-600" />,
          benefits: [
            "Aumento de 25% en rentabilidad por m²",
            "Optimización de mix de productos",
            "Identificación de oportunidades de crecimiento",
          ],
          duration: "6 minutos",
        },
        {
          id: "planificacion-promocional",
          title: "Planificación Promocional",
          description: "Sistema colaborativo para diseño y ejecución de campañas promocionales",
          icon: <Calendar className="h-5 w-5 text-amber-600" />,
          benefits: [
            "Reducción de 80% en quiebres de stock",
            "Aumento de 35% en efectividad promocional",
            "Optimización de inversión promocional",
          ],
          duration: "7 minutos",
          new: true,
        },
        {
          id: "optimizacion-inventario",
          title: "Optimización de Inventario",
          description: "Sistema predictivo para gestión óptima de inventario y cadena de suministro",
          icon: <Clock className="h-5 w-5 text-amber-600" />,
          benefits: [
            "Reducción de 30% en capital inmovilizado",
            "Mejora de 45% en rotación de inventario",
            "Reducción de 70% en pérdidas por obsolescencia",
          ],
          duration: "5 minutos",
        },
      ],
    },
    {
      id: "mineria",
      name: "Minería",
      description: "Sistema de gestión de contratistas y proveedores para la industria minera",
      icon: <Building className="h-5 w-5" />,
      color: "bg-gray-700",
      modules: [
        {
          id: "gestion-contratistas",
          title: "Gestión de Contratistas",
          description: "Sistema integral de gestión de contratistas con verificación documental",
          icon: <Users className="h-5 w-5 text-gray-700" />,
          benefits: [
            "Cumplimiento 100% DS 132",
            "Reducción de 85% en incidentes de seguridad",
            "Trazabilidad completa de documentación",
          ],
          duration: "9 minutos",
          featured: true,
        },
        {
          id: "cumplimiento-normativo",
          title: "Cumplimiento Normativo",
          description: "Sistema automatizado de verificación de cumplimiento normativo minero",
          icon: <Shield className="h-5 w-5 text-gray-700" />,
          benefits: [
            "Actualización automática ante cambios regulatorios",
            "Reducción de 90% en multas por incumplimiento",
            "Reportes automáticos para fiscalización",
          ],
          duration: "6 minutos",
        },
        {
          id: "evaluacion-proveedores",
          title: "Evaluación de Proveedores",
          description: "Sistema de evaluación de desempeño de proveedores y contratistas",
          icon: <BarChart className="h-5 w-5 text-gray-700" />,
          benefits: [
            "Mejora de 40% en calidad de servicio",
            "Reducción de 50% en incidentes operacionales",
            "Optimización de 25% en costos de contratación",
          ],
          duration: "7 minutos",
        },
        {
          id: "seguridad-operacional",
          title: "Seguridad Operacional",
          description: "Sistema predictivo de seguridad operacional con análisis de riesgos",
          icon: <AlertTriangle className="h-5 w-5 text-gray-700" />,
          benefits: [
            "Reducción de 75% en accidentes laborales",
            "Identificación temprana de riesgos",
            "Cultura preventiva de seguridad",
          ],
          duration: "8 minutos",
          new: true,
        },
      ],
    },
    {
      id: "servicios-basicos",
      name: "Servicios Básicos",
      description: "Gestión de servicios de electricidad y agua regulados por la CNE y SISS",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-blue-500",
      modules: [
        {
          id: "atencion-reclamos",
          title: "Atención de Reclamos",
          description: "Sistema de gestión de reclamos con trazabilidad regulatoria",
          icon: <AlertTriangle className="h-5 w-5 text-blue-500" />,
          benefits: [
            "Cumplimiento 100% normativa SEC/SISS",
            "Reducción de 65% en tiempo de resolución",
            "Aumento de 40% en satisfacción del cliente",
          ],
          duration: "6 minutos",
          featured: true,
        },
        {
          id: "analisis-consumo",
          title: "Análisis de Consumo",
          description: "Sistema de análisis de consumo con recomendaciones personalizadas",
          icon: <BarChart className="h-5 w-5 text-blue-500" />,
          benefits: [
            "Reducción de 20% en consumo promedio",
            "Detección temprana de anomalías",
            "Optimización de tarifas para clientes",
          ],
          duration: "5 minutos",
        },
        {
          id: "visitas-tecnicas",
          title: "Gestión de Visitas Técnicas",
          description: "Sistema de programación y seguimiento de visitas técnicas",
          icon: <Clock className="h-5 w-5 text-blue-500" />,
          benefits: [
            "Reducción de 50% en visitas fallidas",
            "Optimización de rutas y tiempos",
            "Aumento de 35% en resolución en primera visita",
          ],
          duration: "7 minutos",
          new: true,
        },
        {
          id: "facturacion-electronica",
          title: "Facturación Electrónica",
          description: "Sistema de facturación electrónica con análisis de consumo",
          icon: <FileText className="h-5 w-5 text-blue-500" />,
          benefits: [
            "Cumplimiento normativo SII",
            "Reducción de 90% en errores de facturación",
            "Experiencia digital integrada",
          ],
          duration: "4 minutos",
        },
      ],
    },
    {
      id: "aerolineas",
      name: "Aerolíneas",
      description: "Sistema de reserva y gestión de vuelos con integración Sabre",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-sky-600",
      modules: [
        {
          id: "reserva-vuelos",
          title: "Reserva de Vuelos",
          description: "Sistema de reserva de vuelos con integración Sabre y múltiples canales",
          icon: <Search className="h-5 w-5 text-sky-600" />,
          benefits: [
            "Aumento de 45% en conversión de reservas",
            "Reducción de 60% en tiempo de reserva",
            "Experiencia omnicanal integrada",
          ],
          duration: "6 minutos",
          featured: true,
        },
        {
          id: "gestion-cambios",
          title: "Gestión de Cambios",
          description: "Sistema de gestión de cambios y cancelaciones conforme a normativa aérea",
          icon: <Clock className="h-5 w-5 text-sky-600" />,
          benefits: [
            "Cumplimiento normativo JAC",
            "Autogestión en 85% de los casos",
            "Reducción de 70% en costos de atención",
          ],
          duration: "5 minutos",
        },
        {
          id: "experiencia-viaje",
          title: "Experiencia de Viaje",
          description: "Sistema de gestión de experiencia de viaje personalizada",
          icon: <Users className="h-5 w-5 text-sky-600" />,
          benefits: [
            "Aumento de 30% en NPS",
            "Incremento de 25% en venta de servicios adicionales",
            "Personalización basada en historial y preferencias",
          ],
          duration: "7 minutos",
          new: true,
        },
        {
          id: "optimizacion-rutas",
          title: "Optimización de Rutas",
          description: "Sistema de análisis y optimización de rutas y frecuencias",
          icon: <BarChart className="h-5 w-5 text-sky-600" />,
          benefits: [
            "Mejora de 15% en factor de ocupación",
            "Reducción de 10% en costos operativos",
            "Optimización de flota y tripulaciones",
          ],
          duration: "8 minutos",
        },
      ],
    },
  ]

  // Filter modules based on search term
  const filteredSectors = sectors
    .map((sector) => ({
      ...sector,
      modules: sector.modules.filter(
        (module) =>
          module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          module.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((sector) => sector.modules.length > 0)

  // Get featured modules across all sectors
  const featuredModules = sectors.flatMap((sector) =>
    sector.modules
      .filter((module) => module.featured)
      .map((module) => ({
        ...module,
        sector: sector.id,
        sectorName: sector.name,
        sectorColor: sector.color,
      })),
  )

  // Get new modules across all sectors
  const newModules = sectors.flatMap((sector) =>
    sector.modules
      .filter((module) => module.new)
      .map((module) => ({
        ...module,
        sector: sector.id,
        sectorName: sector.name,
        sectorColor: sector.color,
      })),
  )

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4 min-h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando módulos de demostración...</p>
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
        className="mb-8"
      >
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Módulos de Demostración</h2>
        <p className="text-gray-600 max-w-3xl">
          Explore nuestros módulos de demostración interactivos para cada sector industrial. Cada módulo está diseñado
          para mostrar funcionalidades específicas y beneficios clave de nuestras soluciones.
        </p>
      </motion.div>

      {/* Search and filter bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar módulos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-500 hidden sm:inline">Filtrar por:</span>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Destacados
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
            Nuevos
          </Badge>
        </div>
      </div>

      {/* Featured modules section */}
      {searchTerm === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Módulos Destacados
            </h3>
            <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1">
              Ver todos <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModules.map((module, index) => (
              <motion.div
                key={`${module.sector}-${module.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card
                  className="overflow-hidden h-full border-t-4"
                  style={{ borderTopColor: `var(--${module.sectorColor.split("-")[1]}-600)` }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={module.sectorColor.replace("bg-", "bg-opacity-10 text-") + " border-0"}>
                        {module.sectorName}
                      </Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Destacado
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-lg mt-2">
                      {module.icon}
                      {module.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500 font-medium">Beneficios clave:</p>
                      <ul className="space-y-1">
                        {module.benefits.slice(0, 2).map((benefit, index) => (
                          <li key={index} className="text-sm flex items-start gap-1">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-2">
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {module.duration}
                    </div>
                    <Link href={`/modules/${module.sector}/${module.id}`}>
                      <Button size="sm" className="flex items-center gap-1 group">
                        Ver demo
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* New modules section */}
      {searchTerm === "" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Badge className="bg-green-500 text-white">Nuevo</Badge>
              Módulos Recién Añadidos
            </h3>
            <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1">
              Ver todos <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {newModules.slice(0, 4).map((module, index) => (
              <motion.div
                key={`${module.sector}-${module.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge className={module.sectorColor.replace("bg-", "bg-opacity-10 text-") + " border-0"}>
                        {module.sectorName}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        Nuevo
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 text-base mt-2">
                      {module.icon}
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 line-clamp-2">{module.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-2">
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {module.duration}
                    </div>
                    <Link href={`/modules/${module.sector}/${module.id}`}>
                      <Button size="sm" variant="ghost" className="flex items-center gap-1 group text-blue-600">
                        Ver demo
                        <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* All sectors and modules section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
        <Tabs defaultValue={filteredSectors[0]?.id} className="w-full" onValueChange={setSelectedSector}>
          <TabsList className="flex flex-wrap justify-start mb-6 bg-transparent p-0 h-auto gap-2">
            {filteredSectors.map((sector) => (
              <motion.div key={sector.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <TabsTrigger
                  value={sector.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all data-[state=active]:border-transparent data-[state=active]:text-white data-[state=active]:${sector.color}`}
                >
                  <div className={`p-1 rounded-full ${sector.color} text-white`}>{sector.icon}</div>
                  <span>{sector.name}</span>
                  <Badge className="ml-1 bg-gray-200 text-gray-700">{sector.modules.length}</Badge>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>

          {filteredSectors.map((sector) => (
            <TabsContent key={sector.id} value={sector.id} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-sm mb-6"
              >
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                  <div className={`${sector.color} p-1 rounded-full text-white`}>{sector.icon}</div>
                  {sector.name}
                </h3>
                <p className="text-gray-600">{sector.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sector.modules.map((module, index) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Card
                      className="overflow-hidden h-full hover:shadow-md transition-all border-t-2"
                      style={{ borderTopColor: `var(--${sector.color.split("-")[1]}-600)` }}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          {module.featured && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Destacado
                            </Badge>
                          )}
                          {module.new && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Nuevo
                            </Badge>
                          )}
                          {!module.featured && !module.new && <div></div>}
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration}
                          </div>
                        </div>
                        <CardTitle className="flex items-center gap-2 text-lg mt-2">
                          {module.icon}
                          {module.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500 font-medium">Beneficios clave:</p>
                          <ul className="space-y-1">
                            {module.benefits.map((benefit, index) => (
                              <li key={index} className="text-sm flex items-start gap-1">
                                <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end items-center pt-2">
                        <Link href={`/modules/${sector.id}/${module.id}`}>
                          <Button size="sm" className="flex items-center gap-1 group">
                            Ver demo
                            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </div>
  )
}
