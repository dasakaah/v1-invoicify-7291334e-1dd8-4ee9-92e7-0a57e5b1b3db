import React from 'react';
import { useInvoiceStore } from '@/hooks/useInvoiceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Trash2, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">{title}</h3>
    <div className="grid gap-4">{children}</div>
  </div>
);
const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="grid gap-2">
    <Label className="text-sm font-medium text-muted-foreground">{label}</Label>
    {children}
  </div>
);
export function InvoiceForm() {
  const sender = useInvoiceStore((state) => state.sender);
  const recipient = useInvoiceStore((state) => state.recipient);
  const invoiceNumber = useInvoiceStore((state) => state.invoiceNumber);
  const invoiceDate = useInvoiceStore((state) => state.invoiceDate);
  const dueDate = useInvoiceStore((state) => state.dueDate);
  const items = useInvoiceStore((state) => state.items);
  const notes = useInvoiceStore((state) => state.notes);
  const taxRate = useInvoiceStore((state) => state.taxRate);
  const updateNestedField = useInvoiceStore((state) => state.updateNestedField);
  const updateField = useInvoiceStore((state) => state.updateField);
  const updateItem = useInvoiceStore((state) => state.updateItem);
  const addItem = useInvoiceStore((state) => state.addItem);
  const removeItem = useInvoiceStore((state) => state.removeItem);

  return (
    <Card className="h-full overflow-y-auto shadow-lg border-border/50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground">Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 md:p-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Section title="From">
            <FormField label="Company Name">
              <Input
                value={sender.name}
                onChange={(e) => updateNestedField('sender', 'name', e.target.value)}
                placeholder="Your Company Inc."
              />
            </FormField>
            <FormField label="Address">
              <Textarea
                value={sender.address}
                onChange={(e) => updateNestedField('sender', 'address', e.target.value)}
                placeholder="123 Main St..."
                rows={3}
              />
            </FormField>
            <FormField label="Email">
              <Input
                type="email"
                value={sender.email}
                onChange={(e) => updateNestedField('sender', 'email', e.target.value)}
                placeholder="contact@yourcompany.com"
              />
            </FormField>
          </Section>
          <Section title="To">
            <FormField label="Client Name">
              <Input
                value={recipient.name}
                onChange={(e) => updateNestedField('recipient', 'name', e.target.value)}
                placeholder="Client Company LLC"
              />
            </FormField>
            <FormField label="Address">
              <Textarea
                value={recipient.address}
                onChange={(e) => updateNestedField('recipient', 'address', e.target.value)}
                placeholder="456 Oak Ave..."
                rows={3}
              />
            </FormField>
            <FormField label="Email">
              <Input
                type="email"
                value={recipient.email}
                onChange={(e) => updateNestedField('recipient', 'email', e.target.value)}
                placeholder="billing@clientcompany.com"
              />
            </FormField>
          </Section>
        </div>
        <Section title="Invoice Info">
          <div className="grid md:grid-cols-3 gap-4">
            <FormField label="Invoice Number">
              <Input
                value={invoiceNumber}
                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                placeholder="INV-001"
              />
            </FormField>
            <FormField label="Invoice Date">
              <Input
                type="date"
                value={invoiceDate}
                onChange={(e) => updateField('invoiceDate', e.target.value)}
              />
            </FormField>
            <FormField label="Due Date">
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
              />
            </FormField>
          </div>
        </Section>
        <Section title="Line Items">
          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                  className="grid grid-cols-[1fr_80px_120px_auto] gap-2 items-center p-2 rounded-md bg-muted/50"
                >
                  <Input
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    placeholder="Item description"
                    className="bg-background"
                  />
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                    placeholder="Qty"
                    className="text-center bg-background"
                    min="0"
                  />
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                    placeholder="Price"
                    className="text-right bg-background"
                    min="0"
                    step="0.01"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <Button type="button" variant="outline" onClick={addItem} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </Section>
        <div className="grid md:grid-cols-2 gap-8">
          <Section title="Notes">
            <FormField label="Additional Notes or Terms">
              <Textarea
                value={notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Payment terms, project details, etc."
                rows={4}
              />
            </FormField>
          </Section>
          <Section title="Tax">
            <FormField label="Tax Rate (%)">
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => updateField('taxRate', parseFloat(e.target.value) || 0)}
                placeholder="e.g., 8.5"
                min="0"
                step="0.01"
              />
            </FormField>
          </Section>
        </div>
      </CardContent>
    </Card>
  );
}