export type InvoiceStatus = "Deposit" | "Pending" | "Balance Due" | "Overdue" | "Paid";

export interface InvoiceLineItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string; // e.g. "INV-001"
  description: string; // e.g. "Plumbing Repair - Unit 4B Leak"
  property: string; // e.g. "Sunset Apartments"
  serviceProvider: string; // e.g. "John Smith Plumbing"
  totalAmount: number; // Total amount in $
  deposit: number; // Deposit amount in $
  totalDue: number; // Total due in $
  status: InvoiceStatus;
  startDate: string; // e.g. "Jul 7, 2026"
  issueDate?: string; // e.g. "Jun 22, 2026"
  dueDate?: string; // e.g. "July 20, 2026"
  finalInvoiceDate?: string; // e.g. "Aug 26, 2026"
  accountId?: string; // e.g. "#DQ8444"
  serviceRequestTitle?: string; // e.g. "Plumbing Repair - Unit 4B"
  invoiceNo?: string; // e.g. "FFSD2112"
  lineItems?: InvoiceLineItem[];
  subtotal?: number;
  tax?: number;
  discount?: number;
  depositAmountRequired?: number;
  finalBalanceDue?: number;
}
