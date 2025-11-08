'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Invoice } from '@/types'
import {
  CheckIcon,
  EditIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ShareInvoiceModel from '../../_components/share-invoice-model'

type Props = {
  invoice: Invoice
  handleMarkAsPaid: (invoiceId: string) => void
  handleDelete: (invoiceId: string) => void
}

export default function Actions({
  invoice,
  handleDelete,
  handleMarkAsPaid,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let body = document.querySelector('body')
    if (body) {
      body.style.overflow = isOpen ? 'hidden' : 'auto'
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className=" relative cursor-pointer px-6 py-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className=" z-20 w-[200px] right-12  bgrid grid-cols-1 gap-2    rounded-xl">
          {invoice.status !== 'paid' && (
            <DropdownMenuItem
              onClick={() => handleMarkAsPaid(invoice.id)}
              title="Mark as Paid"
            >
              <CheckIcon />
              <span>Mark as paid</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link
              href={`/dashboard/invoices/${invoice.id}/edit`}
              className="flex items-center gap-2 rounded-lg"
              title="Edit Invoice"
            >
              <EditIcon />
              <span>Edit Invoice</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem title="Share Invoice" asChild>
            <ShareInvoiceModel selectedInvoice={invoice} />
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(invoice.id)}
            title="Delete Invoice"
            variant="destructive"
          >
            <Trash2Icon />
            <span>Delete Invoice</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
