'use client'

import React, { useState } from 'react'
import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'

type InvoiceItem = {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

type InvoiceForm = {
  invoiceNumber: string
  clientName: string
  clientEmail: string
  clientAddress: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  issueDate: string
  dueDate: string
  invoiceItems: InvoiceItem[]
  notes: string
  terms: string
  taxRate: number
  discount: number
}

const initialForm: InvoiceForm = {
  invoiceNumber: `INV-${new Date().getFullYear()}-${String(
    Math.floor(Math.random() * 1000)
  ).padStart(3, '0')}`,
  clientName: '',
  clientEmail: '',
  clientAddress: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  },
  issueDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  invoiceItems: [
    {
      id: '1',
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    },
  ],
  notes: '',
  terms:
    'Payment is due within 30 days of invoice date. Late payments may incur additional fees.',
  taxRate: 0,
  discount: 0,
}

export default function CreateInvoicePage() {
  const [form, setForm] = useState<InvoiceForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: any, section?: string) => {
    if (section) {
      setForm((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof typeof prev] as Record<string, any>),
          [field]: value,
        },
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleInvoiceItemChange = (id: string, field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      invoiceItems: prev.invoiceItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }
          if (field === 'quantity' || field === 'rate') {
            updatedItem.amount = updatedItem.quantity * updatedItem.rate
          }
          return updatedItem
        }
        return item
      }),
    }))
  }

  const addInvoiceItem = () => {
    const newItem: InvoiceItem = {
      id: String(Date.now()),
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
    }
    setForm((prev) => ({
      ...prev,
      invoiceItems: [...prev.invoiceItems, newItem],
    }))
  }

  const removeLineItem = (id: string) => {
    setForm((prev) => ({
      ...prev,
      invoiceItems: prev.invoiceItems.filter((item) => item.id !== id),
    }))
  }

  const calculateSubtotal = () => {
    return form.invoiceItems.reduce((sum, item) => sum + item.amount, 0)
  }

  let arr = [2, 3, 5, 5]

  const calculateTax = () => {
    return (calculateSubtotal() * form.taxRate) / 100
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - form.discount
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Here you would save to your backend
    console.log('Invoice created:', form)

    setIsSubmitting(false)
    // Redirect to invoices page or show success message
    toast.success('Invoice created successfully!')
  }

  return (
    <div className="p-4  max-w-4xl space-y-4">
      {/* Page Header */}
      <div className="sm:flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Create Invoice
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Generate a professional invoice for your client
          </p>
        </div>
        <Button
          href="/dashboard/invoices"
          className="bg-zinc-800 px-4 py-2 rounded-lg mt-4 sm:mt-0 block w-max"
        >
          ← Back to Invoices
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-secondary rounded-2xl p-6 border"
      >
        {/* Invoice Details */}
        <div className="bg-">
          <p className=" mb-1 text-zinc-900 dark:text-white ">
            Invoice Details
          </p>
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Invoice Number
                </label>
                <input
                  type="text"
                  value={form.invoiceNumber}
                  onChange={(e) =>
                    handleInputChange('invoiceNumber', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none 
								 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={form.issueDate}
                  onChange={(e) =>
                    handleInputChange('issueDate', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2  focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={form.taxRate}
                  onChange={(e) =>
                    handleInputChange(
                      'taxRate',
                      parseFloat(e.target.value) || ''
                    )
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div>
          <p className=" text-zinc-900 dark:text-white mb-2">
            Client Information
          </p>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) =>
                    handleInputChange('clientName', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) =>
                    handleInputChange('clientEmail', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                  placeholder="client@example.com"
                />
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">
                Billing Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={form.clientAddress.street}
                    onChange={(e) =>
                      handleInputChange(
                        'street',
                        e.target.value,
                        'clientAddress'
                      )
                    }
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                    placeholder="123 Business St"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={form.clientAddress.city}
                    onChange={(e) =>
                      handleInputChange('city', e.target.value, 'clientAddress')
                    }
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={form.clientAddress.state}
                    onChange={(e) =>
                      handleInputChange(
                        'state',
                        e.target.value,
                        'clientAddress'
                      )
                    }
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={form.clientAddress.zipCode}
                    onChange={(e) =>
                      handleInputChange(
                        'zipCode',
                        e.target.value,
                        'clientAddress'
                      )
                    }
                    className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                    placeholder="12345"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Invoice Items
            </h2>
            <Button type="button" onClick={addInvoiceItem}>
              + Add Item
            </Button>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
            <div className="space-y-4">
              {form.invoiceItems.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 items-end"
                >
                  <div className="col-span-12 md:col-span-5">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        handleInvoiceItemChange(
                          item.id,
                          'description',
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                      placeholder="Item description"
                      required
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Qty
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleInvoiceItemChange(
                          item.id,
                          'quantity',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Rate
                    </label>
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        handleInvoiceItemChange(
                          item.id,
                          'rate',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-700 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Amount
                    </label>
                    <input
                      type="text"
                      value={formatCurrency(item.amount)}
                      readOnly
                      className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-600 border border-zinc-300 dark:border-zinc-600 rounded-md dark:text-white"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-1">
                    {form.invoiceItems.length > 1 && (
                      <Button
                        variant={'destructive'}
                        type="button"
                        onClick={() => removeLineItem(item.id)}
                      >
                        <Trash2Icon />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6">
          <div className="max-w-md ml-auto space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-600 dark:text-zinc-400">
                Subtotal:
              </span>
              <span className="font-medium">
                {formatCurrency(calculateSubtotal())}
              </span>
            </div>
            {form.taxRate > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Tax ({form.taxRate}%):
                </span>
                <span className="font-medium">
                  {formatCurrency(calculateTax())}
                </span>
              </div>
            )}
            {form.discount > 0 && (
              <div className="flex justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Discount:
                </span>
                <span className="font-medium text-green-600">
                  -{formatCurrency(form.discount)}
                </span>
              </div>
            )}
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>{formatCurrency(calculateTotal())}</span>
            </div>
          </div>
        </div>

        {/* Notes and Terms */}

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button href="/dashboard/invoices" variant={'secondary'}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Invoice...' : 'Create Invoice'}
          </Button>
        </div>
      </form>
    </div>
  )
}
