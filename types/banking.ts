import type React from "react"

// Tipos para el módulo de banca y portabilidad financiera

export interface BankClientData {
  name: string
  rut: string
  email: string
  phone: string
  currentBank: string
}

export interface FinancialProduct {
  id: string
  type: FinancialProductType
  institution: string
  number: string
  balance: number
  rate: number
  monthlyPayment: number
  term: number // Meses restantes
  startDate: string
}

export type FinancialProductType = "mortgage" | "consumer" | "credit-card" | "checking" | "savings"

export interface BankOffer {
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

export interface PortabilityStatus {
  id: string
  currentStage: string
  stages: ProcessStage[]
  startDate: string
  estimatedCompletionDate: string
}

export interface ProcessStage {
  id: number
  name: string
  status: "completed" | "current" | "pending"
  completionDate?: string
  icon: React.ComponentType<{ className?: string }>
}
