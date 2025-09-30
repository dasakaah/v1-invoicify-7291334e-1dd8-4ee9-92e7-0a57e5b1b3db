import React, { forwardRef, useMemo } from 'react';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { format, parseISO, isValid } from 'date-fns';
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};
const formatDateSafe = (dateString: string) => {
  if (!dateString) return '';
  const date = parseISO(dateString);
  if (isValid(date)) {
    return format(date, 'MMM dd, yyyy');
  }
  // Fallback for invalid or empty date strings to prevent crashes
  return '';
};
export const InvoicePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const sender = useInvoiceStore((state) => state.sender);
  const recipient = useInvoiceStore((state) => state.recipient);
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
  const invoiceDate = useInvoiceStore((state) => state.invoiceDate);
  const dueDate = useInvoiceStore((state) => state.dueDate);
  const items = useInvoiceStore((state) => state.items);
  const taxRate = useInvoiceStore((state) => state.taxRate);
  const notes = useInvoiceStore((state) => state.notes);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  }, [items]);

  const taxAmount = useMemo(() => {
    return subtotal * (taxRate / 100);
  }, [subtotal, taxRate]);

  const total = useMemo(() => {
    return subtotal + taxAmount;
  }, [subtotal, taxAmount]);
  return (
    <div ref={ref} className="bg-white text-slate-900 p-8 md:p-12 shadow-2xl rounded-lg w-full max-w-4xl mx-auto font-sans">
      <header className="flex justify-between items-start pb-8 border-b border-slate-200">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">{sender.name}</h1>
          <p className="text-slate-500 whitespace-pre-wrap">{sender.address}</p>
          <p className="text-slate-500">{sender.email}</p>
        </div>
        <div className="text-right">
          <h2 className="text-3xl font-semibold text-slate-500 uppercase tracking-wider">Invoice</h2>
          <p className="text-slate-500 mt-1"># {invoiceNumber}</p>
        </div>
      </header>
      <section className="grid grid-cols-2 gap-8 my-8">
        <div>
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Bill To</h3>
          <p className="font-bold text-slate-700">{recipient.name}</p>
          <p className="text-slate-500 whitespace-pre-wrap">{recipient.address}</p>
          <p className="text-slate-500">{recipient.email}</p>
        </div>
        <div className="text-right">
          <div className="mb-2">
            <p className="text-sm font-semibold text-slate-500">Invoice Date</p>
            <p className="font-medium text-slate-700">{formatDateSafe(invoiceDate)}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Due Date</p>
            <p className="font-medium text-slate-700">{formatDateSafe(dueDate)}</p>
          </div>
        </div>
      </section>
      <section>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-100 text-slate-600 text-sm uppercase">
              <th className="p-3 font-semibold">Description</th>
              <th className="p-3 font-semibold text-center w-24">Qty</th>
              <th className="p-3 font-semibold text-right w-32">Unit Price</th>
              <th className="p-3 font-semibold text-right w-40">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="p-3">{item.description}</td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right">{formatCurrency(item.price)}</td>
                <td className="p-3 text-right font-medium">{formatCurrency(item.quantity * item.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="flex justify-end mt-8">
        <div className="w-full max-w-xs space-y-2 text-slate-600">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p className="font-medium text-slate-800">{formatCurrency(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax ({taxRate}%)</p>
            <p className="font-medium text-slate-800">{formatCurrency(taxAmount)}</p>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200">
            <p className="font-bold text-slate-800">Total</p>
            <p className="font-bold text-slate-800">{formatCurrency(total)}</p>
          </div>
        </div>
      </section>
      {notes && (
        <footer className="mt-12 pt-8 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-500 mb-2">Notes</h4>
          <p className="text-slate-500 text-sm whitespace-pre-wrap">{notes}</p>
        </footer>
      )}
    </div>
  );
});
InvoicePreview.displayName = 'InvoicePreview';