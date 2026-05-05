"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Building2, Phone, ShoppingBag, Plane, HardHat, Zap, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-8 mr-4" />
          <span className="text-xl font-semibold">AgentForce</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Demos por Industria</h1>
          <p className="text-gray-600">Seleccione una industria para explorar la demo correspondiente</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-md bg-gray-100 p-1">
            <button className="px-4 py-2 rounded-md bg-white shadow-sm font-medium">Todos</button>
            <button className="px-4 py-2 rounded-md text-gray-700 font-medium">Financieros</button>
            <button className="px-4 py-2 rounded-md text-gray-700 font-medium">Servicios</button>
            <button className="px-4 py-2 rounded-md text-gray-700 font-medium">Industriales</button>
          </div>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Seguros */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Seguros</h2>
            </div>
            <p className="text-gray-600 mb-4 h-16">Cotización, emisión y gestión de pólizas con IA.</p>
            <Link href="/seguros/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Banca */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Banca</h2>
            </div>
            <p className="text-gray-600 mb-4 h-16">Onboarding, préstamos y servicios financieros.</p>
            <Link href="/banking/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Telecomunicaciones */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold mr-2">Telecomunicaciones</h2>
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Nuevo</span>
              </div>
            </div>
            <p className="text-gray-600 mb-4 h-16">Atención al cliente, soporte técnico y ventas.</p>
            <Link href="/telecom/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Retail */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <ShoppingBag className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Retail</h2>
            </div>
            <p className="text-gray-600 mb-4 h-16">Asistencia en ventas y gestión de inventario.</p>
            <Link href="/retail/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Aerolíneas */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <Plane className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Aerolíneas</h2>
            </div>
            <p className="text-gray-600 mb-4 h-16">Reservas, gestión de viajes y atención al pasajero.</p>
            <Link href="/airline/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Minería */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <HardHat className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Minería</h2>
            </div>
            <p className="text-gray-600 mb-4 h-16">Gestión de contratistas y cumplimiento normativo.</p>
            <Link href="/mineria/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Servicios Básicos */}
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <Zap className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold">Servicios Básicos</h2>
            </div>
            <p className="text-gray-600 mb-4 h-16">Atención al cliente y gestión de consumo.</p>
            <Link href="/servicios-basicos/demo" passHref>
              <Button variant="outline" className="w-full justify-between">
                Ver Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
