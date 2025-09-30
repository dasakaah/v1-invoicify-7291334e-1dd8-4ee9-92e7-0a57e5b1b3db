import { useRef, useState } from 'react';
import { InvoiceForm } from '@/components/InvoiceForm';
import { InvoicePreview } from '@/components/InvoicePreview';
import { Button } from '@/components/ui/button';
import { Download, Printer, RotateCcw, FileText } from 'lucide-react';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { Toaster, toast } from 'sonner';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { ThemeToggle } from '@/components/ThemeToggle';
export function HomePage() {
  const invoicePreviewRef = useRef<HTMLDivElement>(null);
  const resetStore = useInvoiceStore((state) => state.reset);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleDownloadPdf = async () => {
    if (!invoicePreviewRef.current) return;
    setIsProcessing(true);
    toast.loading('Generating PDF...', { id: 'pdf-toast' });
    try {
      const canvas = await html2canvas(invoicePreviewRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('invoice.pdf');
      toast.success('PDF downloaded successfully!', { id: 'pdf-toast' });
    } catch (error) {
      console.error('Failed to generate PDF', error);
      toast.error('Failed to generate PDF.', { id: 'pdf-toast' });
    } finally {
      setIsProcessing(false);
    }
  };
  const handlePrint = () => {
    window.print();
  };
  const handleReset = () => {
    resetStore();
    toast.success('Invoice form has been reset.');
  };
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-foreground font-sans">
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-foreground">Invoicify</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleDownloadPdf} disabled={isProcessing}>
                <Download className="mr-2 h-4 w-4" />
                {isProcessing ? 'Downloading...' : 'Download PDF'}
              </Button>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="destructive" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <ThemeToggle className="relative top-0 right-0" />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-24">
            <InvoiceForm />
          </div>
          <div className="bg-slate-200 dark:bg-slate-800 p-4 sm:p-6 lg:p-8 rounded-lg" id="invoice-preview-wrapper">
            <InvoicePreview ref={invoicePreviewRef} />
          </div>
        </div>
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}