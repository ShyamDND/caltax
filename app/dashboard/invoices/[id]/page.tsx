'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Mock data - replace with real data from your API
const mockInvoices = {
	'INV-2024-001': {
		id: 'INV-2024-001',
		client: 'ABC Corporation',
		clientEmail: 'billing@abccorp.com',
		clientAddress: {
			street: '123 Business St',
			city: 'New York',
			state: 'NY',
			zipCode: '10001',
		},
		issueDate: '2024-10-15',
		dueDate: '2024-11-01',
		status: 'paid',
		paidDate: '2024-10-20',
		notes: 'Thank you for your business. Payment received via bank transfer.',
		terms: 'Payment is due within 30 days of invoice date.',
		lineItems: [
			{
				description: 'Web Development Services',
				quantity: 40,
				rate: 75.0,
				amount: 3000.0,
			},
			{
				description: 'UI/UX Design Consultation',
				quantity: 10,
				rate: 125.0,
				amount: 1250.0,
			},
		],
		taxRate: 8.25,
		discount: 0,
	},
	'INV-2024-002': {
		id: 'INV-2024-002',
		client: 'XYZ Services Ltd',
		clientEmail: 'accounts@xyzservices.com',
		clientAddress: {
			street: '456 Commerce Ave',
			city: 'Los Angeles',
			state: 'CA',
			zipCode: '90210',
		},
		issueDate: '2024-10-20',
		dueDate: '2024-11-15',
		status: 'unpaid',
		notes: 'Please process payment at your earliest convenience.',
		terms: 'Payment is due within 30 days of invoice date. Late payments may incur additional fees.',
		lineItems: [
			{
				description: 'Digital Marketing Campaign',
				quantity: 1,
				rate: 2500.0,
				amount: 2500.0,
			},
			{
				description: 'Social Media Management',
				quantity: 2,
				rate: 800.0,
				amount: 1600.0,
			},
		],
		taxRate: 0,
		discount: 100.0,
	},
	'INV-2024-003': {
		id: 'INV-2024-003',
		client: 'Tech Solutions Inc',
		clientEmail: 'finance@techsolutions.com',
		clientAddress: {
			street: '789 Innovation Blvd',
			city: 'Austin',
			state: 'TX',
			zipCode: '73301',
		},
		issueDate: '2024-10-10',
		dueDate: '2024-10-30',
		status: 'paid',
		paidDate: '2024-10-25',
		notes: 'Payment received. Thank you for choosing our services.',
		terms: 'Payment is due within 30 days of invoice date.',
		lineItems: [
			{
				description: 'Software Development',
				quantity: 80,
				rate: 95.0,
				amount: 7600.0,
			},
			{
				description: 'Quality Assurance',
				quantity: 20,
				rate: 85.0,
				amount: 1700.0,
			},
		],
		taxRate: 6.75,
		discount: 250.0,
	},
};

type LineItem = {
	description: string;
	quantity: number;
	rate: number;
	amount: number;
};

type Invoice = {
	id: string;
	client: string;
	clientEmail: string;
	clientAddress: {
		street: string;
		city: string;
		state: string;
		zipCode: string;
	};
	issueDate: string;
	dueDate: string;
	status: string;
	paidDate?: string;
	notes: string;
	terms: string;
	lineItems: LineItem[];
	taxRate: number;
	discount: number;
};

const getStatusColor = (status: string) => {
	switch (status) {
		case 'paid':
			return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
		case 'unpaid':
			return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
		case 'overdue':
			return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
		default:
			return 'bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200';
	}
};

const formatCurrency = (amount: number) => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
};

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

export default function InvoiceDetailsPage() {
	const params = useParams();
	const invoiceId = params.id as string;
	const invoice = mockInvoices[invoiceId as keyof typeof mockInvoices];

	const [isDownloading, setIsDownloading] = useState(false);

	if (!invoice) {
		return (
			<div className="p-6">
				<div className="text-center py-12">
					<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
						Invoice Not Found
					</h2>
					<p className="text-zinc-600 dark:text-zinc-400 mb-6">
						The invoice you're looking for doesn't exist.
					</p>
					<Link
						href="/dashboard/invoices"
						className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
					>
						Back to Invoices
					</Link>
				</div>
			</div>
		);
	}

	const calculateSubtotal = () => {
		return invoice.lineItems.reduce((sum, item) => sum + item.amount, 0);
	};

	const calculateTax = () => {
		return (calculateSubtotal() * invoice.taxRate) / 100;
	};

	const calculateTotal = () => {
		return calculateSubtotal() + calculateTax() - invoice.discount;
	};

	const handleDownload = async () => {
		setIsDownloading(true);
		// Simulate PDF generation/download
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsDownloading(false);
		alert('Invoice downloaded successfully!');
	};

	return (
		<div className="p-6 max-w-4xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
						Invoice {invoice.id}
					</h1>
					<p className="text-zinc-600 dark:text-zinc-400 mt-1">
						Invoice details and payment information
					</p>
				</div>
				<div className="flex items-center space-x-4">
					<span
						className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
							invoice.status
						)}`}
					>
						{invoice.status.charAt(0).toUpperCase() +
							invoice.status.slice(1)}
					</span>
					<button
						onClick={handleDownload}
						disabled={isDownloading}
						className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
					>
						{isDownloading ? (
							<>
								<svg
									className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								<span>Downloading...</span>
							</>
						) : (
							<>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								<span>Download PDF</span>
							</>
						)}
					</button>
					<Link
						href="/dashboard/invoices"
						className="px-4 py-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 font-medium"
					>
						← Back
					</Link>
				</div>
			</div>

			{/* Invoice Details */}
			<div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg overflow-hidden">
				{/* Invoice Header */}
				<div className="bg-zinc-50 dark:bg-zinc-700 px-8 py-6 border-b border-zinc-200 dark:border-zinc-600">
					<div className="flex justify-between items-start">
						<div>
							<h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
								CALTAX
							</h2>
							<div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
								<p>123 Business Street</p>
								<p>Business City, BC 12345</p>
								<p>contact@caltax.com</p>
								<p>(555) 123-4567</p>
							</div>
						</div>
						<div className="text-right">
							<h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
								INVOICE
							</h3>
							<div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
								<p>
									<span className="font-medium">
										Invoice #:
									</span>{' '}
									{invoice.id}
								</p>
								<p>
									<span className="font-medium">
										Issue Date:
									</span>{' '}
									{formatDate(invoice.issueDate)}
								</p>
								<p>
									<span className="font-medium">
										Due Date:
									</span>{' '}
									{formatDate(invoice.dueDate)}
								</p>
								{invoice.paidDate && (
									<p>
										<span className="font-medium">
											Paid Date:
										</span>{' '}
										{formatDate(invoice.paidDate)}
									</p>
								)}
							</div>
						</div>
					</div>
				</div>

				{/* Client Information */}
				<div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-600">
					<h4 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
						Bill To:
					</h4>
					<div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
						<p className="font-medium text-zinc-900 dark:text-white">
							{invoice.client}
						</p>
						<p>{invoice.clientAddress.street}</p>
						<p>
							{invoice.clientAddress.city},{' '}
							{invoice.clientAddress.state}{' '}
							{invoice.clientAddress.zipCode}
						</p>
						<p>{invoice.clientEmail}</p>
					</div>
				</div>

				{/* Line Items */}
				<div className="px-8 py-6">
					<table className="w-full">
						<thead>
							<tr className="border-b border-zinc-200 dark:border-zinc-600">
								<th className="text-left py-3 text-sm font-semibold text-zinc-900 dark:text-white">
									Description
								</th>
								<th className="text-right py-3 text-sm font-semibold text-zinc-900 dark:text-white">
									Qty
								</th>
								<th className="text-right py-3 text-sm font-semibold text-zinc-900 dark:text-white">
									Rate
								</th>
								<th className="text-right py-3 text-sm font-semibold text-zinc-900 dark:text-white">
									Amount
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-200 dark:divide-zinc-600">
							{invoice.lineItems.map((item, index) => (
								<tr key={index}>
									<td className="py-4 text-sm text-zinc-900 dark:text-white">
										{item.description}
									</td>
									<td className="py-4 text-sm text-zinc-900 dark:text-white text-right">
										{item.quantity}
									</td>
									<td className="py-4 text-sm text-zinc-900 dark:text-white text-right">
										{formatCurrency(item.rate)}
									</td>
									<td className="py-4 text-sm text-zinc-900 dark:text-white text-right">
										{formatCurrency(item.amount)}
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Totals */}
					<div className="mt-8 flex justify-end">
						<div className="w-64 space-y-2">
							<div className="flex justify-between text-sm">
								<span className="text-zinc-600 dark:text-zinc-400">
									Subtotal:
								</span>
								<span className="text-zinc-900 dark:text-white">
									{formatCurrency(calculateSubtotal())}
								</span>
							</div>
							{invoice.taxRate > 0 && (
								<div className="flex justify-between text-sm">
									<span className="text-zinc-600 dark:text-zinc-400">
										Tax ({invoice.taxRate}%):
									</span>
									<span className="text-zinc-900 dark:text-white">
										{formatCurrency(calculateTax())}
									</span>
								</div>
							)}
							{invoice.discount > 0 && (
								<div className="flex justify-between text-sm">
									<span className="text-zinc-600 dark:text-zinc-400">
										Discount:
									</span>
									<span className="text-green-600 dark:text-green-400">
										-{formatCurrency(invoice.discount)}
									</span>
								</div>
							)}
							<hr className="my-2 border-zinc-300 dark:border-zinc-600" />
							<div className="flex justify-between text-lg font-bold">
								<span className="text-zinc-900 dark:text-white">
									Total:
								</span>
								<span className="text-zinc-900 dark:text-white">
									{formatCurrency(calculateTotal())}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* Notes and Terms */}
				{(invoice.notes || invoice.terms) && (
					<div className="px-8 py-6 bg-zinc-50 dark:bg-zinc-700 border-t border-zinc-200 dark:border-zinc-600">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{invoice.notes && (
								<div>
									<h5 className="font-semibold text-zinc-900 dark:text-white mb-2">
										Notes:
									</h5>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										{invoice.notes}
									</p>
								</div>
							)}
							{invoice.terms && (
								<div>
									<h5 className="font-semibold text-zinc-900 dark:text-white mb-2">
										Terms & Conditions:
									</h5>
									<p className="text-sm text-zinc-600 dark:text-zinc-400">
										{invoice.terms}
									</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
