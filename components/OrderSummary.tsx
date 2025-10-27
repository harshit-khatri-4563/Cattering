// components/OrderSummary.tsx
'use client';
import { useState, useEffect } from 'react';
// Import clearOrder from the context hook
import { useOrder, OrderItem } from '@/context/OrderContext'; // Make sure OrderItem is exported from context
import styles from './OrderSummary.module.css';
import { useRouter } from 'next/navigation';

// Interface for saved orders (should match definition in admin page if separate)
export interface SavedOrderRecord {
  recordId: number;
  name: string;
  venue: string;
  event_date: string;
  event_time: string;
  items: OrderItem[];
  createdAt: string;
  status: 'active' | 'completed';
  notes?: string;
}

// Helper Function (Groups items by category)
const groupItems = (items: OrderItem[]) => {
  return items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) { acc[category] = []; }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, OrderItem[]>);
};

const OrderSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Get clearOrder from the hook
  const { items, removeItem, clearOrder } = useOrder();
  const router = useRouter();

  const [name, setName] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const totalItems = items.length;

  const handleSaveLocally = () => {
    if (items.length === 0) {
      alert("Cannot save an empty order.");
      return;
    }

    const newOrderRecord: SavedOrderRecord = {
      recordId: Date.now(),
      name: name,
      venue: venue,
      event_date: date,
      event_time: time,
      items: items,
      createdAt: new Date().toISOString(),
      status: 'active',
      notes: '', // Initialize notes as empty string when saving
    };

    try {
      const existingOrdersJSON = localStorage.getItem('savedCateringOrders');
      const existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      existingOrders.push(newOrderRecord);
      localStorage.setItem('savedCateringOrders', JSON.stringify(existingOrders));

      alert('Order saved locally! View saved orders on the admin page.');
      setIsOpen(false);
      setName(''); setVenue(''); setDate(''); setTime(''); // Clear input fields
      clearOrder(); // Reset the current order items in the context

    } catch (error) {
      console.error("Failed to save order to Local Storage:", error);
      alert("Error saving order. Check browser console.");
    }
  };

  // Filter and group items
  const menuItems = items.filter(item => item.type === 'menu');
  const serviceItems = items.filter(item => item.type === 'service');
  const groupedServiceItems = groupItems(serviceItems);
  const groupedMenuItems = groupItems(menuItems);

  const handlePrint = () => { window.print(); };

  // Don't render button if cart is empty and modal is closed
  // Also, check if component has mounted to prevent hydration issues with totalItems
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
      setHasMounted(true);
  }, []);

  if (!hasMounted) {
      return null; // Don't render anything on the server or initial client render
  }


  if (totalItems === 0 && !isOpen) return null; // Hide button if cart becomes empty

  // Render floating button if modal is closed
  if (!isOpen) {
    return (
      <button className={styles.openButton} onClick={() => setIsOpen(true)}>
        View Order ({totalItems})
      </button>
    );
  }

  // --- Render the Modal ---
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} id="order-summary-modal">
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>&times;</button>
        <h2>Your Order Request</h2>
        <div className={styles.listContainer} id="printable-order-area">
           {/* Optional Fields Section */}
           <div className={styles.optionalFields} id="optional-fields-print">
            <div className={styles.formGroup}>
              <label htmlFor="orderName">Name <span className={styles.optionalText}>(Optional)</span>:</label>
              <input type="text" id="orderName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name"/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="orderVenue">Venue <span className={styles.optionalText}>(Optional)</span>:</label>
              <input type="text" id="orderVenue" value={venue} onChange={(e) => setVenue(e.target.value)} placeholder="Event Location"/>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="orderDate">Date <span className={styles.optionalText}>(Optional)</span>:</label>
              <input type="date" id="orderDate" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="orderTime">Time <span className={styles.optionalText}>(Optional)</span>:</label>
              <input type="time" id="orderTime" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
           </div>

           {/* Render Grouped Services */}
           {Object.keys(groupedServiceItems).length > 0 && (
              <>
                <h3 className={styles.listHeader}>Services</h3>
                {Object.entries(groupItems(serviceItems)).map(([categoryName, itemsInCategory]) => ( // Use groupItems here too
                  <div key={`service-${categoryName}`}>
                    <h4 className={styles.subListHeader}>{categoryName}</h4>
                    <ul className={styles.itemList}>
                      {itemsInCategory.map((item: OrderItem) => ( // Add type
                        <li key={item.id} className={styles.item}>
                          <span className={styles.itemName}>{item.name}</span>
                          <div className={styles.controls}>
                            <button className={styles.removeButton} onClick={() => removeItem(item.id)}>Remove</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}
           {/* Render Grouped Menu Items */}
           {Object.keys(groupedMenuItems).length > 0 && (
              <>
                <h3 className={styles.listHeader}>Menu Items</h3>
                 {Object.entries(groupItems(menuItems)).map(([categoryName, itemsInCategory]) => ( // Use groupItems
                  <div key={`menu-${categoryName}`}>
                    <h4 className={styles.subListHeader}>{categoryName}</h4>
                    <ul className={styles.itemList}>
                       {itemsInCategory.map((item: OrderItem) => ( // Add type
                        <li key={item.id} className={styles.item}>
                          <span className={styles.itemName}>{item.name}</span>
                          <div className={styles.controls}>
                            <button className={styles.removeButton} onClick={() => removeItem(item.id)}>Remove</button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </>
            )}

           {items.length === 0 && (<p style={{ textAlign: 'center', marginTop: '1rem' }}>Your order request is currently empty.</p>)}
        </div>
        {/* Button Container */}
        <div className={styles.buttonContainer}>
          <button onClick={handlePrint} className={styles.printButton}> Print Order </button>
          <button onClick={handleSaveLocally} className={styles.submitButton}> Save Order Locally </button>
        </div>
        {/* Removed note */}
      </div>
    </div>
  );
};
export default OrderSummary;