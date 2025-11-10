import { mockInvoices } from '@/constants'

export type Invoice = (typeof mockInvoices)[0]

interface TInoice {
  id: string
  invoiceNumber: string // COMPANYNAME-2025-0001
  clientName: string
  clientEmail?: string
  clientPhone?: string
  status: 'paid' | 'pending' | 'overdue'
  amount: number
  issueDate: Date
  dueDate: Date
  paidDate: Date
  taxRate?: number
  clientId: string // relationWithClients
}

interface TClientProfile {
  id: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    zip: string
    state: string
    country: string
    number?: string
  }
}

interface TMyCompany {
  name: string
  address: {
    street: string
    city: string
    zip: string
    state: string
    country: string
    number?: string
  }
  phone: string
  email: string
  website: string
  taxNumber: string
  taxRate: number
  currency: string
  timezone: string
}

// VELTO SOFTWARE PRIVATE LIMITED
// Shyam Mandir, Mandawara,
// Kuchaman City, 341508
// Rajasthan, India
// +91 8907896780
