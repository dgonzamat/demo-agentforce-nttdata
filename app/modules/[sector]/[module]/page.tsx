import ModuleClient from "./module-client"

export function generateStaticParams() {
  const combos: { sector: string; module: string }[] = [
    { sector: "seguros", module: "cotizacion" },
    { sector: "seguros", module: "verificacion" },
    { sector: "seguros", module: "siniestros" },
    { sector: "seguros", module: "firma-digital" },
    { sector: "banca", module: "portabilidad" },
    { sector: "banca", module: "onboarding" },
    { sector: "banca", module: "evaluacion-credito" },
    { sector: "banca", module: "banca-digital" },
    { sector: "telecomunicaciones", module: "diseno-tecnico" },
    { sector: "telecomunicaciones", module: "gestion-contratos" },
    { sector: "telecomunicaciones", module: "soporte-tecnico" },
    { sector: "telecomunicaciones", module: "analisis-red" },
    { sector: "retail", module: "negociacion-b2b" },
    { sector: "retail", module: "analisis-rentabilidad" },
    { sector: "retail", module: "planificacion-promocional" },
    { sector: "retail", module: "optimizacion-inventario" },
    { sector: "mineria", module: "gestion-contratistas" },
    { sector: "mineria", module: "cumplimiento-normativo" },
    { sector: "mineria", module: "evaluacion-proveedores" },
    { sector: "mineria", module: "seguridad-operacional" },
    { sector: "servicios-basicos", module: "atencion-reclamos" },
    { sector: "servicios-basicos", module: "analisis-consumo" },
    { sector: "servicios-basicos", module: "visitas-tecnicas" },
    { sector: "servicios-basicos", module: "facturacion-electronica" },
    { sector: "aerolineas", module: "reserva-vuelos" },
    { sector: "aerolineas", module: "gestion-cambios" },
    { sector: "aerolineas", module: "experiencia-viaje" },
    { sector: "aerolineas", module: "optimizacion-rutas" },
  ]
  return combos
}

export const dynamicParams = false

export default async function Page({
  params,
}: {
  params: Promise<{ sector: string; module: string }>
}) {
  const { sector, module } = await params
  return <ModuleClient sector={sector} module={module} />
}
