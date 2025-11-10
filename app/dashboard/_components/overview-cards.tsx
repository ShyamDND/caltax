import { formatCurrency } from '@/lib/utils'
import {
  BadgeCheckIcon,
  HourglassIcon,
  MessageSquareIcon,
  WalletCardsIcon,
} from 'lucide-react'

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

export default async function OverviewCards() {
  return (
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
            <WalletCardsIcon />
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
            <BadgeCheckIcon />
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
            <HourglassIcon />
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
  )
}
