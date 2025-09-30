import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { format } from 'date-fns';
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}
export interface InvoiceState {
  sender: {
    name: string;
    address: string;
    email: string;
  };
  recipient: {
    name: string;
    address: string;
    email: string;
  };
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: LineItem[];
  notes: string;
  taxRate: number;
}
interface Actions {
  updateField: <T extends keyof InvoiceState>(field: T, value: InvoiceState[T]) => void;
  updateNestedField: (
    section: 'sender' | 'recipient',
    field: keyof InvoiceState['sender'] | keyof InvoiceState['recipient'],
    value: string
  ) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, field: keyof Omit<LineItem, 'id'>, value: string | number) => void;
  reset: () => void;
}
const getInitialState = (): InvoiceState => ({
  sender: {
    name: 'Your Company',
    address: '123 Main St, Anytown, USA',
    email: 'your.company@example.com',
  },
  recipient: {
    name: 'Client Company',
    address: '456 Oak Ave, Othertown, USA',
    email: 'client.company@example.com',
  },
  invoiceNumber: 'INV-001',
  invoiceDate: format(new Date(), 'yyyy-MM-dd'),
  dueDate: format(new Date(new Date().setDate(new Date().getDate() + 30)), 'yyyy-MM-dd'),
  items: [
    { id: crypto.randomUUID(), description: 'Web Design Services', quantity: 10, price: 150 },
    { id: crypto.randomUUID(), description: 'Backend Development', quantity: 20, price: 200 },
  ],
  notes: 'Thank you for your business. Please pay within 30 days.',
  taxRate: 8.5,
});
export const useInvoiceStore = create<InvoiceState & Actions>()(
  persist(
    immer((set, get) => ({
      ...getInitialState(),
      updateField: (field, value) => {
        set((state) => {
          state[field] = value as any;
        });
      },
      updateNestedField: (section, field, value) => {
        set((state) => {
          state[section][field as keyof typeof state[typeof section]] = value;
        });
      },
      addItem: () => {
        set((state) => {
          state.items.push({
            id: crypto.randomUUID(),
            description: 'New Item',
            quantity: 1,
            price: 0,
          });
        });
      },
      removeItem: (id) => {
        set((state) => {
          state.items = state.items.filter((item) => item.id !== id);
        });
      },
      updateItem: (id, field, value) => {
        set((state) => {
          const item = state.items.find((item) => item.id === id);
          if (item) {
            if (field === 'quantity' || field === 'price') {
              (item[field] as number) = Number(value) || 0;
            } else {
              (item[field] as string) = String(value);
            }
          }
        });
      },
      reset: () => {
        set(getInitialState());
      },
    })),
    {
      name: 'invoicify-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);