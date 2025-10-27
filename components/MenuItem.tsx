// components/MenuItem.tsx
'use client';
import Image from 'next/image';
import styles from './MenuItem.module.css';
import { useOrder, OrderItem } from '@/context/OrderContext';
import { useSearchParams } from 'next/navigation';
import { SavedOrderRecord } from './OrderSummary';
import { useState, useEffect } from 'react'; // Import useState and useEffect

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const MenuItem = ({ id, name, description, imageUrl, category }: MenuItemProps) => {
  const { addItem, removeItem, isItemInOrder: isItemInContextOrder } = useOrder(); // Renamed for clarity
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

  // --- Determine Edit Mode (runs on both server and client initially) ---
  const isEditingExistingOrder = !!editOrderIdParam;
  const editOrderId = isEditingExistingOrder ? parseInt(editOrderIdParam!, 10) : null;

  // --- Effect to Update Button State After Mount ---
  useEffect(() => {
    setIsClient(true); // Component has mounted on the client

    let currentInOrder = false;

    if (isEditingExistingOrder && editOrderId !== null) {
      // Check Local Storage (only runs client-side)
      const existingOrdersJSON = localStorage.getItem('savedCateringOrders');
      const existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      const orderBeingEdited = existingOrders.find(o => o.recordId === editOrderId);
      currentInOrder = orderBeingEdited ? orderBeingEdited.items.some(item => item.id === id) : false;

      // Update button state based on Local Storage check
      setButtonState({
        text: currentInOrder ? 'Item Added' : 'Add to Saved Order',
        className: currentInOrder ? styles.disabledButton : styles.addButton,
        disabled: currentInOrder, // Disable if already added in edit mode
        _inOrder: currentInOrder,
      });

    } else {
      // Check Context (only runs client-side effectively for state update)
      currentInOrder = isItemInContextOrder(id);

      // Update button state based on Context check
      setButtonState({
        text: currentInOrder ? 'Remove' : 'Add to Order',
        className: currentInOrder ? styles.removeButton : styles.addButton,
        disabled: false, // Never disabled when adding to new order
        _inOrder: currentInOrder,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editOrderId, isEditingExistingOrder, isItemInContextOrder]); // Dependencies

  // --- Toggle Handler (uses buttonState._inOrder) ---
  const handleToggle = () => {
    // Prevent action if not yet mounted (though button likely won't show anyway)
     if (!isClient) return;

    if (isEditingExistingOrder && editOrderId !== null) {
      // Logic for Editing Existing Order (Local Storage)
      const existingOrdersJSON = localStorage.getItem('savedCateringOrders');
      let existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      const orderIndex = existingOrders.findIndex(o => o.recordId === editOrderId);

      if (orderIndex === -1) {
        alert("Error: Could not find the order being edited."); return;
      }

      const orderBeingEdited = existingOrders[orderIndex];

      if (buttonState._inOrder) { // Check internal state
         alert(`${name} is already in the order. Remove items on the admin page.`);
      } else {
        const newItem: OrderItem = { id, name, type: 'menu', category: category };
        orderBeingEdited.items.push(newItem);
        localStorage.setItem('savedCateringOrders', JSON.stringify(existingOrders));
        alert(`${name} added to saved order.`);
        // Update button state immediately after adding
        setButtonState({ text: 'Item Added', className: styles.disabledButton, disabled: true, _inOrder: true });
        // No need for reload if state updates correctly
      }
    } else {
      // Logic for New Order (Context)
      if (buttonState._inOrder) { // Check internal state
        removeItem(id);
        // State will update via useEffect recalculation
      } else {
        addItem({ id, name, type: 'menu', category: category });
        // State will update via useEffect recalculation
      }
    }
  };

  return (
    <div className={styles.card}>
      <Image src={imageUrl} alt={name} width={300} height={200} style={{ objectFit: "cover" }} unoptimized />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
        {/* Render button only after mounting or use initial state */}
        {isClient ? (
             <button
                onClick={handleToggle}
                className={buttonState.className}
                disabled={buttonState.disabled}
             >
            {buttonState.text}
             </button>
        ) : (
            // Render a default button state on the server and initial client render
             <button
                className={styles.addButton} // Default to add button style
                disabled={true} // Initially disabled until client check runs
             >
                Add to Order
             </button>
        )}
      </div>
    </div>
  );
};
export default MenuItem;