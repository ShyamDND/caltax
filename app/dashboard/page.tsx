import { Button } from '@/components/ui/button'
import {
  BadgeCheck,
  Hourglass,
  MessageSquareIcon,
  WalletCards,
} from 'lucide-react'
import React from 'react'

type Props = {}

// Mock data - replace with real data from your API/database
const invoiceSummary = {
  totalInvoices: 127,
  totalAmount: 45678.9,
  paidAmount: 31245.67,
  unpaidAmount: 14433.23,
  overdueAmount: 5234.56,
  totalPaid: 89,
  totalUnpaid: 32,
  totalOverdue: 6,
}

const recentInvoices = [
  {
    id: 'INV-2024-001',
    client: 'ABC Corporation',
    amount: 2450.0,
    status: 'paid',
    dueDate: '2024-11-01',
    createdAt: '2024-10-15',
  },
  {
    id: 'INV-2024-002',
    client: 'XYZ Services Ltd',
    amount: 1890.5,
    status: 'unpaid',
    dueDate: '2024-11-15',
    createdAt: '2024-10-20',
  },
  {
    id: 'INV-2024-003',
    client: 'Tech Solutions Inc',
    amount: 3200.75,
    status: 'paid',
    dueDate: '2024-10-30',
    createdAt: '2024-10-10',
  },
  {
    id: 'INV-2024-004',
    client: 'Global Marketing',
    amount: 1575.25,
    status: 'overdue',
    dueDate: '2024-10-25',
    createdAt: '2024-10-05',
  },
  {
    id: 'INV-2024-005',
    client: 'Design Studio Pro',
    amount: 2850.0,
    status: 'unpaid',
    dueDate: '2024-11-20',
    createdAt: '2024-10-25',
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
    case 'unpaid':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    case 'overdue':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    default:
      return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200'
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Page({}: Props) {
  return (
    <div className="p-4   space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Overview of your invoices and financial summary
          </p>
        </div>

        <Button href="/dashboard/create-invoice">Create Invoice</Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border dark:bg-zinc-800 rounded-2xl  p-5">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-zinc-900 rounded-lg">
              <MessageSquareIcon />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Total Invoices
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {invoiceSummary.totalInvoices}
              </p>
            </div>
          </div>
        </div>

        <div className=" dark:bg-zinc-800 rounded-2xl border p-5">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-zinc-900 rounded-lg">
              <WalletCards />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Total Amount
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formatCurrency(invoiceSummary.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className=" dark:bg-zinc-800 rounded-2xl border p-5">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-zinc-900 rounded-lg">
              <BadgeCheck />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Paid Amount
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formatCurrency(invoiceSummary.paidAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl border p-5">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-zinc-900 rounded-lg">
              <Hourglass />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Unpaid Amount
              </p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formatCurrency(invoiceSummary.unpaidAmount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics Row */}

      {/* Recent Invoices Table */}
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
        Recent Invoices
      </h2>

      <div className="rounded-2xl w-full border overflow-y-auto overflow-hidden ">
        <table className="w-full  overflow-y-auto overflow-hidden ">
          <thead className="bg-secondary border-b ">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-300 uppercase tracking-wider">
                Invoice ID
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
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-800 divide-y divide-zinc-200 dark:divide-zinc-700">
            {recentInvoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-700"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 dark:text-white">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
