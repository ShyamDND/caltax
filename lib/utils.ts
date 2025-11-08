import { Invoice } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function generateEmailTemplate(invoice: Invoice) {
  const subject = `Invoice ${invoice.id} from CALTAX`
  const body = `Dear ${invoice.client},

I hope this email finds you well. I'm writing to follow up on Invoice ${
    invoice.id
  } for $${invoice.amount.toFixed(2)}.

Invoice Details:
- Invoice Number: ${invoice.id}
- Amount Due: $${invoice.amount.toFixed(2)}
- Due Date: ${formatDate(invoice.dueDate)}
- Issue Date: ${formatDate(invoice.createdAt)}

Please find the attached invoice for your reference. If you have any questions or need to discuss payment terms, feel free to contact me.

Thank you for your business!

Best regards,
CALTAX Team
billing@caltax.com
(555) 123-4567`

  return { subject, body }
}

export function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  // You could add a toast notification here
  toast.success('Copied')
}
