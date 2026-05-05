"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  Download,
  Briefcase,
  UserCheck,
  TrendingUp,
  Zap,
  Shield,
  Lightbulb,
  Clock,
  BarChart,
  Users,
  Globe,
  Settings,
  CheckCircle,
} from "lucide-react"

export default function InfographicPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const industryBenefits = [
    {
      industry: "Seguros",
      benefit1: "Automatización de cotizaciones personalizadas",
      benefit2: "Verificación de identidad y firma digital integrada",
      benefit3: "Asistencia 24/7 para consultas y siniestros",
    },
    {
      industry: "Banca",
      benefit1: "Gestión integral de portabilidad financiera",
      benefit2: "Evaluación crediticia con cumplimiento normativo",
      benefit3: "Onboarding digital completo y seguro",
    },
    {
      industry: "Telecomunicaciones",
      benefit1: "Soluciones B2B con diseño técnico personalizado",
      benefit2: "Gestión de contratos y SLAs empresariales",
      benefit3: "Soporte técnico inteligente multicanal",
    },
    {
      industry: "Retail",
      benefit1: "Negociación B2B optimizada entre proveedores",
      benefit2: "Análisis de rentabilidad por categoría y producto",
      benefit3: "Planificación promocional colaborativa",
    },
    {
      industry: "Aerolíneas",
      benefit1: "Reservas y gestión de cambios simplificada",
      benefit2: "Cumplimiento normativo de transporte aéreo",
      benefit3: "Experiencia de viaje personalizada",
    },
    {
      industry: "Minería",
      benefit1: "Gestión de contratistas con verificación documental",
      benefit2: "Cumplimiento de normativas de seguridad minera",
      benefit3: "Evaluación de desempeño de proveedores",
    },
    {
      industry: "Servicios Básicos",
      benefit1: "Atención de reclamos con trazabilidad regulatoria",
      benefit2: "Análisis de consumo y recomendaciones personalizadas",
      benefit3: "Gestión de visitas técnicas y seguimiento",
    },
  ]

  const caseStudies = [
    {
      title: "Transformación Minera",
      description:
        "Implementación de sistema integral de gestión de contratistas que eliminó las brechas documentales y redujo significativamente los incidentes de seguridad, asegurando cumplimiento normativo continuo.",
      keyBenefit: "Excelencia Operativa",
      color: "from-amber-500 to-amber-700",
    },
    {
      title: "Revolución Bancaria",
      description:
        "Plataforma de portabilidad financiera que transformó la experiencia del cliente, simplificando trámites complejos y eliminando la necesidad de visitas presenciales, con total cumplimiento de la Ley 21.236.",
      keyBenefit: "Experiencia Superior",
      color: "from-blue-600 to-blue-800",
    },
    {
      title: "Innovación en Seguros",
      description:
        "Asistente virtual especializado que guía a los clientes a través del proceso completo de cotización, contratación y gestión de pólizas, con verificación biométrica y firma digital integrada.",
      keyBenefit: "Conversión Mejorada",
      color: "from-green-600 to-green-800",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b py-3 px-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              <span>Volver</span>
            </Button>
          </Link>
          <div className="bg-blue-900 px-2 py-1 rounded mr-4">
            <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-6 md:h-8 filter brightness-0 invert" />
          </div>
        </div>
        <div>
          <Button className="flex items-center gap-1" size="sm">
            <Download className="h-4 w-4" />
            <span>Descargar Infografía</span>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">AgentForce: Transformando Industrias</h1>
              <p className="text-xl md:text-2xl mb-6">
                Soluciones desarrolladas por NTT DATA específicamente para la industria chilena, potenciando la atención
                al cliente, optimizando procesos y maximizando el valor empresarial
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Clock className="h-8 w-8" />
                  </div>
                  <p className="font-semibold">Eficiencia Operativa</p>
                  <p className="text-sm">Optimización de tiempos de atención</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <BarChart className="h-8 w-8" />
                  </div>
                  <p className="font-semibold">Reducción de Costos</p>
                  <p className="text-sm">Optimización de recursos empresariales</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Users className="h-8 w-8" />
                  </div>
                  <p className="font-semibold">Satisfacción del Cliente</p>
                  <p className="text-sm">Experiencias personalizadas y fluidas</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <p className="font-semibold">Retorno de Inversión</p>
                  <p className="text-sm">Valor comercial demostrable</p>
                </div>
              </div>
            </div>
          </div>

          {/* NTT DATA Chilean Focus - New Section */}
          <div className="bg-blue-50 p-6 md:p-8 border-b border-blue-100">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/4 flex justify-center">
                <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-16 md:h-20" />
              </div>
              <div className="md:w-3/4">
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-blue-900">
                  Soluciones Desarrolladas para Chile
                </h2>
                <p className="text-gray-700">
                  AgentForce representa una suite de activos digitales desarrollados por NTT DATA específicamente para
                  el mercado chileno, con pleno cumplimiento de la normativa local y adaptados a las necesidades
                  particulares de las industrias del país. Cada solución incorpora el profundo conocimiento sectorial de
                  NTT DATA en el mercado chileno.
                </p>
              </div>
            </div>
          </div>

          {/* Core Objectives Section */}
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Objetivos Fundamentales</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="border rounded-xl p-6 text-center hover:shadow-md transition-shadow flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Experiencia Excepcional</h3>
                  <p className="text-gray-600">
                    Transformar la interacción con clientes mediante asistentes inteligentes con capacidades humanas
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center hover:shadow-md transition-shadow flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Eficiencia Operativa</h3>
                  <p className="text-gray-600">
                    Automatizar procesos complejos mientras se mantiene la personalización y cumplimiento normativo
                  </p>
                </div>

                <div className="border rounded-xl p-6 text-center hover:shadow-md transition-shadow flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Crecimiento Sostenible</h3>
                  <p className="text-gray-600">
                    Generar valor comercial medible a través de mayor conversión, retención y eficiencia
                  </p>
                </div>
              </div>
            </div>

            {/* Case Studies Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Casos de Éxito Desarrollados por NTT DATA
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudies.map((study, index) => (
                  <div key={index} className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className={`bg-gradient-to-r ${study.color} p-4 text-white`}>
                      <h3 className="text-xl font-semibold">{study.title}</h3>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-bold">{study.keyBenefit}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-gray-700">{study.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Impact Section */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Impacto en Industrias Chilenas</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-blue-900 text-white">
                    <tr>
                      <th className="py-3 px-4 text-left">Industria</th>
                      <th className="py-3 px-4 text-left">Beneficios Clave</th>
                    </tr>
                  </thead>
                  <tbody>
                    {industryBenefits.map((industry, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="py-3 px-4 font-medium">{industry.industry}</td>
                        <td className="py-3 px-4">
                          <ul className="space-y-1">
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                              <span>{industry.benefit1}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                              <span>{industry.benefit2}</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                              <span>{industry.benefit3}</span>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Capabilities Section - New */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Capacidades Transformadoras</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cumplimiento Normativo Chileno</h3>
                  <p className="text-sm text-gray-600">
                    Integración de regulaciones específicas del marco legal chileno, asegurando operaciones conformes
                    con la CMF, SERNAC, SEC y otras entidades reguladoras nacionales.
                  </p>
                </div>

                <div className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Automatización Inteligente</h3>
                  <p className="text-sm text-gray-600">
                    Procesos complejos simplificados mediante IA avanzada, manteniendo la personalización y el toque
                    humano.
                  </p>
                </div>

                <div className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Globe className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Integración Empresarial</h3>
                  <p className="text-sm text-gray-600">
                    Conexión fluida con sistemas existentes, permitiendo una implementación sin interrupciones y
                    maximizando inversiones previas.
                  </p>
                </div>

                <div className="border rounded-xl p-5 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Adaptabilidad Sectorial</h3>
                  <p className="text-sm text-gray-600">
                    Personalización específica para cada industria, abordando desafíos únicos y aprovechando
                    oportunidades sectoriales.
                  </p>
                </div>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="max-w-4xl mx-auto mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">La Propuesta de Valor de AgentForce</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Beneficios Comerciales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Incremento significativo en tasas de conversión y ventas</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Optimización sustancial de costos operativos y de atención</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Mejora notable en satisfacción y retención de clientes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Escalabilidad empresarial sin incremento proporcional de costos</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-800">Ventajas Técnicas</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Integración perfecta con sistemas empresariales existentes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Arquitectura de seguridad avanzada con cumplimiento normativo</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Personalización profunda adaptada a cada sector industrial</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Implementación ágil con mínima curva de aprendizaje organizacional</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Transformation Journey - New */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">El Viaje de Transformación</h2>

              <div className="relative">
                {/* Journey Path */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -translate-y-1/2 z-0"></div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Settings className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Evaluación</h3>
                    <p className="text-sm text-gray-600">
                      Análisis profundo de necesidades y oportunidades específicas de su organización
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Diseño</h3>
                    <p className="text-sm text-gray-600">
                      Creación de solución personalizada alineada con objetivos comerciales y técnicos
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <Zap className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Implementación</h3>
                    <p className="text-sm text-gray-600">
                      Despliegue ágil con integración perfecta a sistemas existentes
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Evolución</h3>
                    <p className="text-sm text-gray-600">
                      Mejora continua basada en análisis de desempeño y nuevas oportunidades
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Transforme su Negocio en Chile con AgentForce</h2>
              <p className="text-lg mb-8">
                Únase a las empresas líderes chilenas que están revolucionando su interacción con clientes y optimizando
                sus operaciones con soluciones de NTT DATA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Solicitar Demo Personalizada
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-800">
                  Explorar Más Casos de Éxito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        © 2023 NTT DATA Chile. Todos los derechos reservados. Soluciones desarrolladas específicamente para el mercado
        chileno.
      </footer>
    </div>
  )
}
