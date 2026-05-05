import type React from "react"
// Tipos para el módulo de cotización de seguros

export interface ClientData {
  name: string
  age: number
  email: string
  phone: string
  rut: string
}

export interface InsurancePlan {
  id: string
  name: string
  coverage: string
  price: number
  recommended: boolean
  features: string[]
}

export interface ModuleStep {
  title: string
  description: string
}

export type InsuranceType = "auto" | "home" | "life"

export interface ProcessStage {
  id: number
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}
