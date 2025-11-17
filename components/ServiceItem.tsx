// components/ServiceItem.tsx
'use client';
import Image from 'next/image';
import styles from './MenuItem.module.css'; // Reuse MenuItem styles
import { useOrder, OrderItem } from '@/context/OrderContext';
import { useSearchParams } from 'next/navigation';
import { SavedOrderRecord } from './OrderSummary';
import { useState, useEffect } from 'react'; // Import useState and useEffect

interface ServiceItemProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const ServiceItem = ({ id, name, description, imageUrl, category }: ServiceItemProps) => {
  const { items, addItem, removeItem, isItemInOrder: isItemInContextOrder } = useOrder(); // Get items for dependency
  const searchParams = useSearchParams();
  const editOrderIdParam = searchParams.get('editOrderId');

  // --- State for Button Appearance ---
  const [buttonState, setButtonState] = useState({
    text: 'Add to Order',
    className: styles.addButton,
    disabled: false,
    _inOrder: false, // Internal state to track if item is in order
  });
  const [isClient, setIsClient] = useState(false); // Track if component is mounted

  // --- Determine Edit Mode ---
  const isEditingExistingOrder = !!editOrderIdParam;
  const editOrderId = isEditingExistingOrder ? parseInt(editOrderIdParam!, 10) : null;

  // --- Effect to Update Button State After Mount ---
  useEffect(() => {
    setIsClient(true); // Component has mounted on the client
    let currentInOrder = false;

    if (isEditingExistingOrder && editOrderId !== null) {
      // Check Local Storage (client-side)
      const existingOrdersJSON = localStorage.getItem('savedCateringOrders');
      const existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      const orderBeingEdited = existingOrders.find(o => o.recordId === editOrderId);
      currentInOrder = orderBeingEdited ? orderBeingEdited.items.some(item => item.id === id) : false;

      // Update button state (Add/Remove for edit mode)
      setButtonState({
        text: currentInOrder ? 'Remove from Saved' : 'Add to Saved Order',
        className: currentInOrder ? styles.removeButton : styles.addButton,
        disabled: false, // Not disabled
        _inOrder: currentInOrder,
      });

    } else {
      // Check Context (new order)
      currentInOrder = isItemInContextOrder(id);
      setButtonState({
        text: currentInOrder ? 'Remove' : 'Add to Order',
        className: currentInOrder ? styles.removeButton : styles.addButton,
        disabled: false,
        _inOrder: currentInOrder,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editOrderId, isEditingExistingOrder, isItemInContextOrder, items]); // Added items dependency

  // --- Toggle Handler (Add/Remove for BOTH modes, no alerts) ---
  const handleToggle = () => {
     if (!isClient) return;

    if (isEditingExistingOrder && editOrderId !== null) {
      // --- Logic for Editing Existing Order (Local Storage) ---
      const existingOrdersJSON = localStorage.getItem('savedCateringOrders');
      let existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      const orderIndex = existingOrders.findIndex(o => o.recordId === editOrderId);

      if (orderIndex === -1) {
        console.error("Error: Could not find the order being edited."); // Log error instead of alert
        return;
      }

      const orderBeingEdited = existingOrders[orderIndex];
      const itemIndexInEditedOrder = orderBeingEdited.items.findIndex(item => item.id === id);

      if (itemIndexInEditedOrder > -1) { // If item exists, remove it
         orderBeingEdited.items.splice(itemIndexInEditedOrder, 1); // Remove item
         localStorage.setItem('savedCateringOrders', JSON.stringify(existingOrders));
         // Update button state immediately
         setButtonState({ text: 'Add to Saved Order', className: styles.addButton, disabled: false, _inOrder: false });
      } else { // If item doesn't exist, add it
        const newItem: OrderItem = { id, name, type: 'service', category: category }; // Correct type: 'service'
        orderBeingEdited.items.push(newItem);
        localStorage.setItem('savedCateringOrders', JSON.stringify(existingOrders));
        // Update button state immediately
        setButtonState({ text: 'Remove from Saved', className: styles.removeButton, disabled: false, _inOrder: true });
      }

    } else {
      // --- Logic for New Order (Context) ---
      if (buttonState._inOrder) { // Check internal state
        removeItem(id);
        // State will update via useEffect recalculation from context change
      } else {
        addItem({ id, name, type: 'service', category: category }); // Correct type: 'service'
        // State will update via useEffect recalculation from context change
      }
    }
  };

  return (
    <div className={styles.card}>
      <Image src={imageUrl} alt={name} width={300} height={200} style={{ objectFit: "cover" }} unoptimized />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
        {/* Render button based on state */}
        {isClient ? (
             <button
                onClick={handleToggle}
                className={buttonState.className}
                disabled={buttonState.disabled} // Should be false now in edit mode
             >
            {buttonState.text}
             </button>
        ) : ( // Default server render
             <button className={styles.addButton} disabled={true}> Add to Order </button>
        )}
      </div>
    </div>
  );
};
export default ServiceItem;