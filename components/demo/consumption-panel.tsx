"use client"

import { BarChart2, Clock, AlertTriangle } from "lucide-react"

interface ConsumptionData {
  current: number
  previous: number
  history: number[]
  months: string[]
  hourly: { hour: string; value: number }[]
}

interface ConsumptionPanelProps {
  data: ConsumptionData
}

export function ConsumptionPanel({ data }: ConsumptionPanelProps) {
  // Calcular el porcentaje de incremento
  const percentageIncrease = Math.round(((data.current - data.previous) / data.previous) * 100)

  // Encontrar el valor máximo para escalar el gráfico
  const maxValue = Math.max(...data.history)

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-blue-600 mb-2 max-w-[90%]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
          Análisis de Consumo Eléctrico
        </h3>
        <div className="text-sm text-amber-600 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Incremento Significativo
        </div>
      </div>

      <div className="space-y-4">
        {/* Resumen de consumo actual */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Consumo actual</p>
              <p className="text-2xl font-bold">{data.current} kWh</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">vs. promedio anterior</p>
              <p className={`text-lg font-semibold ${percentageIncrease > 20 ? "text-red-600" : "text-green-600"}`}>
                +{percentageIncrease}%
              </p>
            </div>
          </div>
        </div>

        {/* Gráfico de barras de consumo mensual */}
        <div>
          <h4 className="text-sm font-medium mb-2">Histórico de consumo (kWh)</h4>
          <div className="flex items-end h-32 gap-1">
            {data.history.map((value, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`w-full rounded-t ${index === data.history.length - 1 ? "bg-blue-600" : "bg-blue-300"}`}
                  style={{ height: `${(value / maxValue) * 100}%` }}
                ></div>
                <span className="text-xs mt-1">{data.months[index].substring(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Patrón de consumo por hora */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-blue-600" />
            Patrón de consumo diario
          </h4>
          <div className="flex items-end h-20 gap-1">
            {data.hourly.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full rounded-t bg-green-400" style={{ height: `${(item.value / 3) * 100}%` }}></div>
                <span className="text-xs mt-1">{item.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Análisis y recomendaciones */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-semibold mb-2">Análisis</h4>
          <ul className="space-y-1 text-xs">
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-1 mr-2 flex-shrink-0"></div>
              <span>Consumo nocturno inusualmente alto (0.7-0.8 kWh) entre 00:00-08:00 hrs</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 mr-2 flex-shrink-0"></div>
              <span>Incremento de 50% respecto al promedio histórico</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 mr-2 flex-shrink-0"></div>
              <span>Patrón consistente con posible fuga eléctrica o equipo defectuoso</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
