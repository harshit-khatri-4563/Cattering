// components/ServiceItem.tsx
'use client';
import Image from 'next/image';
import styles from './MenuItem.module.css'; // Reuse MenuItem styles
import { useOrder, OrderItem } from '@/context/OrderContext';
import { useSearchParams } from 'next/navigation';
import { SavedOrderRecord } from './OrderSummary'; // Import type

interface ServiceItemProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
}

const ServiceItem = ({ id, name, description, imageUrl, category }: ServiceItemProps) => {
  const { addItem, removeItem, isItemInOrder } = useOrder();
  const searchParams = useSearchParams();
  const editOrderIdParam = searchParams.get('editOrderId');

  const isEditingExistingOrder = !!editOrderIdParam;
  const editOrderId = isEditingExistingOrder ? parseInt(editOrderIdParam!, 10) : null;

  // --- Check if item is in the relevant order ---
  let inOrder = false;
  if (isEditingExistingOrder && editOrderId !== null) {
    const existingOrdersJSON = typeof window !== 'undefined' ? localStorage.getItem('savedCateringOrders') : null;
    const existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
    const orderBeingEdited = existingOrders.find(o => o.recordId === editOrderId);
    inOrder = orderBeingEdited ? orderBeingEdited.items.some(item => item.id === id) : false;
  } else {
    inOrder = isItemInOrder(id);
  }
  // --- End Check ---


  // --- Updated Toggle Handler ---
  const handleToggle = () => {
    if (isEditingExistingOrder && editOrderId !== null) {
      // --- Logic for Editing Existing Order (Local Storage) ---
      const existingOrdersJSON = localStorage.getItem('savedCateringOrders');
      let existingOrders: SavedOrderRecord[] = existingOrdersJSON ? JSON.parse(existingOrdersJSON) : [];
      const orderIndex = existingOrders.findIndex(o => o.recordId === editOrderId);

      if (orderIndex === -1) {
        alert("Error: Could not find the order being edited.");
        return;
      }

      const orderBeingEdited = existingOrders[orderIndex];
      const itemExistsInEditedOrder = orderBeingEdited.items.some(item => item.id === id);

      if (itemExistsInEditedOrder) {
         alert(`${name} is already in the order. Remove items on the admin page.`);
      } else {
        // Add item to the specific order in local storage
        const newItem: OrderItem = { id, name, type: 'service', category: category }; // Correct type: 'service'
        orderBeingEdited.items.push(newItem);
        localStorage.setItem('savedCateringOrders', JSON.stringify(existingOrders));
        alert(`${name} added to saved order.`);
        window.location.reload(); // Simple refresh
      }

    } else {
      // --- Logic for New Order (Context) ---
      if (inOrder) {
        removeItem(id);
      } else {
        addItem({ id, name, type: 'service', category: category }); // Correct type: 'service'
      }
    }
  };
  // --- End Updated Handler ---


  // Determine button text and style
  let buttonText = 'Add to Order';
  let buttonClass = styles.addButton;
  if (isEditingExistingOrder) {
      buttonText = inOrder ? 'Item Added' : 'Add to Saved Order';
      buttonClass = inOrder ? styles.disabledButton : styles.addButton;
  } else if (inOrder) {
      buttonText = 'Remove';
      buttonClass = styles.removeButton;
  }


  return (
    <div className={styles.card}>
      <Image src={imageUrl} alt={name} width={300} height={200} style={{ objectFit: "cover" }} unoptimized />
      <div className={styles.content}>
        <h3>{name}</h3>
        <p>{description}</p>
        <button
          onClick={handleToggle}
          className={buttonClass}
          disabled={isEditingExistingOrder && inOrder} // Disable if editing and item already added
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
export default ServiceItem;