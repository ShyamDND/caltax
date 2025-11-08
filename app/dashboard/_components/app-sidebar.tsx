'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LayoutDashboard, Inbox, Plus, Settings } from 'lucide-react'

type Props = {}

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Invoices', href: '/dashboard/invoices', icon: Inbox },
  { name: 'Create Invoice', href: '/dashboard/create-invoice', icon: Plus },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function AppSidebar({}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-zinc-900 text-white p-2 rounded-lg shadow-lg hover:bg-zinc-700 
				transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-secondary dark:bg-zinc-900  transform transition-transform duration-300 
		   ease-in-out md:translate-x-0 md:static md:inset-0  ${
         isOpen ? 'translate-x-0' : '-translate-x-full'
       }
        `}
      >
        <div className="flex flex-col h-full">
          {/* Company name */}
          <div className="flex items-center  h-16 px-4 border-b dark:border-zinc-800 border-zinc-200">
            <h1 className="bg-linear-to-br dark:from-blue-300 relative dark:via-cyan-200  dark:to-blue-400 px-6 py-2 rounded-lg font-bold  cursor-pointer hover:opacity-90 text-2xl text-transparent bg-clip-text from-lime-400 via-lime-500 to-lime-500 ">
              CALTAX
            </h1>
          </div>
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveRoute(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                    ${
                      isActive
                        ? 'bg-lime-200  dark:bg-zinc-800 '
                        : 'text-gray-700 hover:bg-lime-100/50 dark:text-gray-300 dark:hover:bg-zinc-800'
                    }
                  `}
                >
                  <span className="mr-3 text-lg">{<item.icon />}</span>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
