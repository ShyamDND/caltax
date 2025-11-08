import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { copyToClipboard, generateEmailTemplate } from '@/lib/utils'
import { Invoice } from '@/types'
import { ShareIcon } from 'lucide-react'
import React from 'react'

type Props = {
  selectedInvoice: Invoice
}

export default function ShareInvoiceModel({ selectedInvoice }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 px-2 py-1.5 hover:bg-secondary w-full rounded-sm">
        <ShareIcon className="size-4" />
        <span className="text-sm">Share Invoice</span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle />
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email Subject
            </label>
            <div className="flex">
              <input
                type="text"
                value={generateEmailTemplate(selectedInvoice).subject}
                readOnly
                className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-l-md bg-zinc-50 dark:bg-zinc-700"
              />
              <button
                onClick={() =>
                  copyToClipboard(
                    generateEmailTemplate(selectedInvoice).subject
                  )
                }
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-600 border border-l-0 border-zinc-300 dark:border-zinc-600 rounded-r-md hover:bg-zinc-200 dark:hover:bg-zinc-500"
              >
                Copy
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email Body
            </label>
            <div className="flex">
              <textarea
                value={generateEmailTemplate(selectedInvoice).body}
                readOnly
                rows={12}
                className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-l-md bg-zinc-50 dark:bg-zinc-700 font-mono text-sm"
              />
              <button
                onClick={() =>
                  copyToClipboard(generateEmailTemplate(selectedInvoice).body)
                }
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-600 border border-l-0 border-zinc-300 dark:border-zinc-600 rounded-r-md hover:bg-zinc-200 dark:hover:bg-zinc-500 self-start"
              >
                Copy
              </button>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Copy the subject and body above to send this invoice reminder
                  to {selectedInvoice.client}. Future versions will include
                  direct email integration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
