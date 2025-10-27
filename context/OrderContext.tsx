// context/OrderContext.tsx
'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Item interface (includes category)
export interface OrderItem {
  id: string;
  name: string;
  type: 'menu' | 'service';
  category: string;
}

// Context type definition
interface OrderContextType {
  items: OrderItem[];
  addItem: (item: OrderItem) => void;
  removeItem: (id: string) => void;
  isItemInOrder: (id: string) => boolean;
  clearOrder: () => void; // <-- Add clearOrder function type
}

// Create context
const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Context Provider component
export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<OrderItem[]>([]);

  const addItem = (itemToAdd: OrderItem) => {
    if (!items.some(i => i.id === itemToAdd.id)) {
      setItems(prevItems => [...prevItems, itemToAdd]);
      // Optional: alert(`${itemToAdd.name} added to order request!`);
    }
  };

  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const isItemInOrder = (id: string) => {
    return items.some(i => i.id === id);
  };

  // --- NEW: Clear Order Function ---
  const clearOrder = () => {
    setItems([]); // Reset the items array to empty
  };
  // --- END NEW ---

  return (
    // Provide clearOrder in the context value
    <OrderContext.Provider value={{ items, addItem, removeItem, isItemInOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the context
export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};