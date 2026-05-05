"use client"

import { Zap, Check, X, TrendingDown, TrendingUp } from "lucide-react"

interface TarifaData {
  current: string
  options: {
    name: string
    description: string
    basePrice: number | string
    suitable: boolean
  }[]
  savings: {
    bt1: number
    bt2: number
    bt3: number
  }
}

interface TarifaPanelProps {
  data: TarifaData
}

export function TarifaPanel({ data }: TarifaPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-amber-400 mb-2 max-w-[90%]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <Zap className="h-5 w-5 mr-2 text-amber-600" />
          Comparativa de Tarifas Eléctricas
        </h3>
        <div className="text-sm text-blue-600">Reguladas por CNE</div>
      </div>

      <div className="space-y-4">
        {/* Tarifa actual */}
        <div className="bg-amber-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Su tarifa actual</p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">{data.current}</p>
            <p className="text-sm font-medium">Residencial Simple</p>
          </div>
        </div>

        {/* Tabla comparativa */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Tarifa</th>
                <th className="text-left py-2">Descripción</th>
                <th className="text-left py-2">Precio Base</th>
                <th className="text-left py-2">Recomendada</th>
                <th className="text-left py-2">Ahorro Est.</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-blue-50">
                <td className="py-2 font-medium">BT-1</td>
                <td className="py-2">Residencial Simple</td>
                <td className="py-2">$139,5/kWh</td>
                <td className="py-2">
                  <div className="flex items-center">
                    <Check className="h-4 w-4 text-green-600 mr-1" />
                    <span>Actual</span>
                  </div>
                </td>
                <td className="py-2">
                  <span className="text-gray-500">-</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">BT-2</td>
                <td className="py-2">Potencia Contratada</td>
                <td className="py-2">$125,8/kWh</td>
                <td className="py-2">
                  <X className="h-4 w-4 text-red-600" />
                </td>
                <td className="py-2">
                  <div className="flex items-center text-red-600">
                    <TrendingDown className="h-4 w-4 mr-1" />
                    <span>-$8.500</span>
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 font-medium">BT-3</td>
                <td className="py-2">Horaria Residencial</td>
                <td className="py-2">Variable</td>
                <td className="py-2">
                  <Check className="h-4 w-4 text-green-600" />
                </td>
                <td className="py-2">
                  <div className="flex items-center text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+$4.200</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Explicación de tarifas */}
        <div className="space-y-2 text-sm">
          <div className="p-2 border rounded-lg">
            <p className="font-medium">BT-1: Tarifa Residencial Simple</p>
            <p className="text-xs text-gray-600">
              Tarifa regulada estándar para hogares. Precio único por kWh consumido más cargo fijo mensual. Ideal para
              consumos regulares sin grandes variaciones horarias.
            </p>
          </div>
          <div className="p-2 border rounded-lg">
            <p className="font-medium">BT-2: Tarifa con Potencia Contratada</p>
            <p className="text-xs text-gray-600">
              Precio más bajo por kWh, pero incluye cargo adicional por potencia máxima contratada. Recomendada para
              consumos altos y constantes. No adecuada para su perfil actual.
            </p>
          </div>
          <div className="p-2 border rounded-lg bg-green-50">
            <p className="font-medium">BT-3: Tarifa Horaria Residencial</p>
            <p className="text-xs text-gray-600">
              Precios diferenciados según horario (punta/valle). Más económica en horarios de bajo consumo (noche) y más
              cara en horarios punta. Recomendada para su patrón de consumo.
            </p>
          </div>
        </div>

        {/* Nota legal */}
        <div className="text-xs text-gray-500 mt-2">
          <p>
            Tarifas reguladas según Decreto Tarifario vigente de la Comisión Nacional de Energía (CNE). Los ahorros
            estimados se calculan en base a su patrón de consumo actual y están sujetos a variaciones.
          </p>
        </div>
      </div>
    </div>
  )
}
