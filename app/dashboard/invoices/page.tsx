'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Check, Edit, PlusIcon, Share, Trash, Trash2 } from 'lucide-react'
import { mockInvoices } from '@/constants'
import { Invoice } from '@/types'
import Actions from './_components/actions'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ShareInvoiceModel from '../_components/share-invoice-model'
import { formatCurrency, formatDate } from '@/lib/utils'

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'unpaid':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    case 'sent':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    default:
      return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200'
  }
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [showShareModal, setShowShareModal] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  const router = useRouter()
  const handleMarkAsPaid = (invoiceId: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, status: 'paid' } : inv
      )
    )
  }

  const handleDelete = (invoiceId: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      setInvoices((prev) => prev.filter((inv) => inv.id !== invoiceId))
    }
  }

  return (
    <div className="p-4 sm:p-6 space-y-8">
      {/* Page Header */}
      <div className="sm:flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Invoices
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Manage all your invoices and track payments
          </p>
        </div>
        <Button href="/dashboard/create-invoice">
          <PlusIcon />
          <span>Create Invoice</span>
        </Button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-zinc-800 rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary  border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-zinc-50  relative dark:hover:bg-zinc-900"
                >
                  <td
                    onClick={() =>
                      router.push(`/dashboard/invoices/${invoice.id}`)
                    }
                    className="px-6 py-4 cursor-pointer whitespace-nowrap text-sm font-medium  text-zinc-900 dark:text-white"
                  >
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                    {invoice.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        invoice.status
                      )}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900 dark:text-white">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className=" whitespace-nowrap relative z-30 text-sm font-medium space-x-2 flex items-center gap-2">
                    <Actions
                      handleDelete={handleDelete}
                      handleMarkAsPaid={handleMarkAsPaid}
                      invoice={invoice}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {invoices.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-zinc-900 dark:text-white">
              No invoices
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Get started by creating your first invoice.
            </p>
            <div className="mt-6">
              <Link
                href="/dashboard/create-invoice"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Create Invoice
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
