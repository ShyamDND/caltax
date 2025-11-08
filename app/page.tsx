import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Calculator,
  Shield,
  Zap,
  BarChart3,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            CALTAX
          </div>
          <div className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex space-x-3">
            <Button variant="secondary" size="sm">
              Login
            </Button>
            <Button size="sm" asChild>
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6">
            Simplify Your
            <span className="block bg-linear-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent">
              Invoice Management
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            Create professional invoices in minutes. Track payments, manage
            clients, and streamline your business finances. Built for the future
            with tax collection capabilities coming soon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Creating Invoices
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything You Need to Manage Invoices
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Powerful features designed for modern businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <FileText className="w-12 h-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Professional Invoices
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Create beautiful, branded invoices with customizable templates
                and automatic calculations.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <BarChart3 className="w-12 h-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Payment Tracking
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Monitor payment status, send reminders, and track overdue
                invoices with detailed analytics.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <Calculator className="w-12 h-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Tax Ready
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built with tax collection in mind. Easily add tax rates and
                prepare for future compliance features.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Secure & Reliable
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Your data is protected with enterprise-grade security. Automatic
                backups and secure access.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <Zap className="w-12 h-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Generate invoices in seconds with smart defaults and keyboard
                shortcuts for power users.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-8 rounded-xl">
              <CheckCircle className="w-12 h-12 text-lime-500 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Future-Proof
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Designed to grow with your business. Tax collection and advanced
                features coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How CALTAX Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Create Your Account
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Sign up and set up your company profile with all necessary
                details for professional invoices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Generate Invoices
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Use our intuitive interface to create professional invoices with
                automatic calculations and tax support.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                Track & Collect
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Monitor payments, send reminders, and manage your cash flow with
                comprehensive reporting tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-lime-50 dark:bg-lime-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to Transform Your Invoice Process?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Join thousands of businesses already using CALTAX to streamline
            their financial operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/dashboard">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">CALTAX</div>
              <p className="text-slate-400">
                The future of invoice management and tax collection.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 CALTAX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
