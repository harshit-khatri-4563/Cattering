// app/admin/orders/page.tsx
'use client';
import { useState, useEffect, useMemo } from 'react';
// Import SavedOrderRecord from OrderSummary, OrderItem directly from context
import { SavedOrderRecord } from '@/components/OrderSummary';
import { OrderItem } from '@/context/OrderContext'; // Correct import path for OrderItem
import styles from './AdminOrders.module.css';
import { useRouter } from 'next/navigation';

// --- Helper Function (Groups items first by type ('menu'/'service'), then by category) ---
const groupItemsByTypeAndCategory = (items: OrderItem[]) => {
  // Define the expected return structure type
  type GroupedStructure = Partial<Record<'menu' | 'service', Record<string, OrderItem[]>>>;

  return items.reduce((acc: GroupedStructure, item: OrderItem) => {
    const type = item.type;
    const category = item.category;

    if (!acc[type]) {
      acc[type] = {};
    }
    // Type assertion to assure TypeScript that acc[type] is not undefined here
    const typeGroup = acc[type]!;
    if (!typeGroup[category]) {
      typeGroup[category] = [];
    }
    // Type assertion
    typeGroup[category]!.push(item);
    return acc;
  }, {} as GroupedStructure); // Initialize with the defined type
};
// --- END HELPER ---

// --- Helper Function (Groups items JUST by category) ---
const groupItems = (items: OrderItem[]) => {
  // Define the expected return structure type
  type GroupedByCategory = Record<string, OrderItem[]>;

  return items.reduce((acc: GroupedByCategory, item: OrderItem) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as GroupedByCategory); // Initialize with the defined type
};
// --- END HELPER ---


export default function AdminOrdersPage() {
  const [allOrders, setAllOrders] = useState<SavedOrderRecord[]>([]); // Holds all orders from storage
  const [editingOrder, setEditingOrder] = useState<SavedOrderRecord | null>(null); // Holds the order currently being edited
  const [filter, setFilter] = useState<'active' | 'completed'>('active'); // State for filtering ('active' or 'completed')
  const [invoiceOrder, setInvoiceOrder] = useState<SavedOrderRecord | null>(null); // State for invoice modal
  const router = useRouter(); // Initialize router hook

  // Load orders from Local Storage when the component first mounts
  useEffect(() => {
    const storedOrders = localStorage.getItem('savedCateringOrders');
    if (storedOrders) {
      try {
        const parsedOrders: SavedOrderRecord[] = JSON.parse(storedOrders);
        // Ensure all orders have a status property (for backward compatibility)
        const ordersWithStatus = parsedOrders.map(order => ({
          ...order,
          status: order.status || 'active', // Default older orders to 'active'
          notes: order.notes || '' // Ensure notes field exists
        }));
        // Sort orders by creation date, newest first
        ordersWithStatus.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setAllOrders(ordersWithStatus); // Set the state with loaded and sorted orders
      } catch (e) {
        console.error("Error parsing orders from Local Storage:", e);
        localStorage.removeItem('savedCateringOrders'); // Clear corrupted data
      }
    }
  }, []); // Empty dependency array means this runs only once after initial render

  // Memoize the filtered list of orders based on the current filter state
  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => order.status === filter);
  }, [allOrders, filter]); // Recalculate only when allOrders or filter changes

  // Helper function to save the current list of orders back to Local Storage
  const saveOrdersToLocalStorage = (updatedOrders: SavedOrderRecord[]) => {
     // Re-sort before saving to maintain order
     updatedOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    localStorage.setItem('savedCateringOrders', JSON.stringify(updatedOrders));
    setAllOrders(updatedOrders); // Update the component's state
  };

  // --- Delete Order Handler ---
  const handleDelete = (recordIdToDelete: number) => {
    // Confirmation dialog
    if (window.confirm('Are you sure you want to permanently delete this order? This cannot be undone.')) {
      // Filter out the order to be deleted
      const updatedOrders = allOrders.filter(order => order.recordId !== recordIdToDelete);
      saveOrdersToLocalStorage(updatedOrders); // Save the updated list
      // If the currently edited order is the one deleted, close the edit modal
      if (editingOrder?.recordId === recordIdToDelete) {
        setEditingOrder(null);
      }
       // If the invoice being viewed is the one deleted, close the invoice modal
      if (invoiceOrder?.recordId === recordIdToDelete) {
        setInvoiceOrder(null);
      }
      alert('Order deleted successfully.'); // User feedback
    }
  };

  // --- Edit Order Handlers ---
  // Sets the order to be edited (opens the modal)
  const handleEdit = (orderToEdit: SavedOrderRecord) => {
    // Create deep copies to prevent accidentally modifying the original state directly
     // Ensure notes field exists when starting edit
    setEditingOrder({ ...orderToEdit, notes: orderToEdit.notes || '', items: [...orderToEdit.items] });
  };

  // Updates the temporary 'editingOrder' state as form fields change (input & textarea)
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingOrder) return;
    // Update the specific field (name, venue, event_date, event_time, notes)
    setEditingOrder({
      ...editingOrder,
      [e.target.name]: e.target.value,
    });
  };

  // Removes an item from the order currently being edited
  const handleRemoveItemFromEdit = (itemIdToRemove: string) => {
    if (!editingOrder) return;
    // Update the items array in the temporary editing state
    setEditingOrder({
        ...editingOrder,
        items: editingOrder.items.filter(item => item.id !== itemIdToRemove)
    });
  };

  // Saves changes made in the edit modal (includes auto-delete if empty)
  const handleSaveChanges = () => {
    if (!editingOrder) return;

    // Check if all items were removed during editing
    if (editingOrder.items.length === 0) {
        if (window.confirm('This order now has no items. Do you want to delete the entire order instead of saving an empty one?')) {
            handleDelete(editingOrder.recordId); // Use the existing delete function
            setEditingOrder(null); // Close the modal
            return; // Stop the save process
        } else {
             // User chose not to delete, just close modal without saving empty items
             setEditingOrder(null);
             alert("Save cancelled as order became empty.");
             return;
        }
    }

    // Replace the old order record with the edited version in the main list
    const updatedOrders = allOrders.map(order =>
      order.recordId === editingOrder.recordId ? editingOrder : order
    );
    saveOrdersToLocalStorage(updatedOrders); // Save the updated list
    setEditingOrder(null); // Close the edit modal
    alert('Order details updated successfully!');
  };
  // --- END Edit Handlers ---


  // --- Add More Items Handler ---
  const handleAddItemsRedirect = () => {
      if (!editingOrder) return;
      // 1. Save any detail changes made in the modal *before* redirecting
       const updatedOrders = allOrders.map(order =>
          order.recordId === editingOrder.recordId ? editingOrder : order
       );
       saveOrdersToLocalStorage(updatedOrders);
       // 2. Redirect to the menu page, passing the order ID as a URL parameter
       router.push(`/menu?editOrderId=${editingOrder.recordId}`);
       // 3. Close the edit modal
       setEditingOrder(null);
  }
  // --- END Add Items Handler ---


  // --- Status Change Handlers ---
  // Marks an 'active' order as 'completed'
  const handleMarkCompleted = (recordIdToComplete: number) => {
     if (window.confirm('Mark this order as completed? It will move to the Completed list.')) {
        const updatedOrders = allOrders.map(order =>
          order.recordId === recordIdToComplete ? { ...order, status: 'completed' as const } : order
        );
        saveOrdersToLocalStorage(updatedOrders);
     }
  };

  // Marks a 'completed' order back to 'active'
  const handleMarkActive = (recordIdToActivate: number) => {
     if (window.confirm('Mark this order as active again?')) {
        const updatedOrders = allOrders.map(order =>
          order.recordId === recordIdToActivate ? { ...order, status: 'active' as const } : order
        );
        saveOrdersToLocalStorage(updatedOrders);
     }
  };
  // --- END Status Change Handlers ---


  // --- Invoice Handlers ---
  const handleShowInvoice = (orderToShow: SavedOrderRecord) => {
    setInvoiceOrder(orderToShow); // Set the order to display in the invoice modal
  };

  const handlePrintInvoice = () => {
    // Use CSS print styles targeted specifically at the invoice modal
    window.print();
  };
  // --- END Invoice Handlers ---


  // --- JSX Rendering ---
  return (
    <div className={styles.adminPage}>
      <h1>Saved Order Requests</h1>

      {/* Filter Buttons */}
      <div className={styles.filterContainer}>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? styles.activeFilter : ''}
        >
          Active ({allOrders.filter(o => o.status === 'active').length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? styles.activeFilter : ''}
        >
          Completed ({allOrders.filter(o => o.status === 'completed').length})
        </button>
      </div>

      {/* Edit Form Modal (conditionally rendered) */}
      {editingOrder && ( // Outer conditional rendering
        <div className={styles.editModalOverlay}>
          <div className={styles.editModal}> {/* Modal Content Starts */}
            <h2>Edit Order Details</h2>
            <div className={styles.formGrid}>
               <div className={styles.formGroup}> <label htmlFor="editName">Name:</label> <input id="editName" type="text" name="name" value={editingOrder.name} onChange={handleEditChange} /> </div>
               <div className={styles.formGroup}> <label htmlFor="editVenue">Venue:</label> <input id="editVenue" type="text" name="venue" value={editingOrder.venue} onChange={handleEditChange} /> </div>
               <div className={styles.formGroup}> <label htmlFor="editDate">Date:</label> <input id="editDate" type="date" name="event_date" value={editingOrder.event_date} onChange={handleEditChange} /> </div>
               <div className={styles.formGroup}> <label htmlFor="editTime">Time:</label> <input id="editTime" type="time" name="event_time" value={editingOrder.event_time} onChange={handleEditChange} /> </div>
            </div>
            <div className={`${styles.formGroup} ${styles.notesGroup}`}>
                 <label htmlFor="editNotes">Notes:</label>
                 <textarea id="editNotes" name="notes" value={editingOrder.notes || ''} onChange={handleEditChange} rows={3}></textarea>
            </div>
            <div className={styles.editItemList}>
                <strong>Items:</strong>
                {editingOrder.items.length === 0 ? (
                    <p className={styles.noItems}>No items left in this order.</p>
                ) : (
                   // Use groupItems helper (by category only)
                   // Add explicit types to map parameters
                   Object.entries(groupItems(editingOrder.items)).map(([categoryName, itemsInCategory]: [string, OrderItem[]]) => (
                     <div key={categoryName} className={styles.editCategoryGroup}>
                       <h4 className={styles.editSubListHeader}>{categoryName} ({itemsInCategory.length})</h4>
                       <ul className={styles.editableItemList}>
                           {/* Add explicit type to item */}
                           {itemsInCategory.map((item: OrderItem) => (
                               <li key={item.id}>
                                   <span>{item.name} <span className={styles.itemCategory}>({item.type})</span></span>
                                   <button onClick={() => handleRemoveItemFromEdit(item.id)} className={styles.removeItemButton} title="Remove Item">&times;</button>
                               </li>
                           ))}
                       </ul>
                     </div>
                   ))
                )}
                 <p className={styles.note}>To add new items, click "Add More Items".</p>
            </div>
            <div className={styles.editActions}>
              <button onClick={handleAddItemsRedirect} className={styles.addItemsButton}>Add More Items</button>
              <button onClick={handleSaveChanges} className={styles.saveButton}>Save Changes</button>
              <button onClick={() => setEditingOrder(null)} className={styles.cancelButton}>Cancel</button>
            </div>
          </div> {/* Modal Content Ends */}
        </div>
      )} {/* End Edit Modal Conditional */}


      {/* Invoice Modal (conditionally rendered) */}
      {invoiceOrder && ( // Outer conditional rendering
        <div className={styles.invoiceModalOverlay} id="invoice-overlay">
          <div className={styles.invoiceModal} id="invoice-modal-content"> {/* Modal Content Starts */}
            <button onClick={() => setInvoiceOrder(null)} className={styles.closeInvoiceButton}>&times;</button>
            <h2>Order Invoice / Item List</h2>
            <div id="printable-invoice-area">
                <div className={styles.invoiceHeader}>
                    <p><strong>Order ID:</strong> {invoiceOrder.recordId}</p>
                    <p><strong>Saved:</strong> {new Date(invoiceOrder.createdAt).toLocaleString()}</p>
                    {invoiceOrder.name && <p><strong>Name:</strong> {invoiceOrder.name}</p>}
                    {invoiceOrder.venue && <p><strong>Venue:</strong> {invoiceOrder.venue}</p>}
                    {invoiceOrder.event_date && <p><strong>Date:</strong> {invoiceOrder.event_date}</p>}
                    {invoiceOrder.event_time && <p><strong>Time:</strong> {invoiceOrder.event_time}</p>}
                    {invoiceOrder.notes && <p className={styles.invoiceNotes}><strong>Notes:</strong> {invoiceOrder.notes}</p>}
                </div>
                <hr className={styles.invoiceSeparator} />
                <div className={styles.invoiceItemList}>
                    <h3>Requested Items ({invoiceOrder.items.length})</h3>
                    {/* Use groupItemsByTypeAndCategory */}
                    {/* Add explicit types to map parameters */}
                    {Object.entries(groupItemsByTypeAndCategory(invoiceOrder.items)).map(([itemType, categories]: [string, Record<string, OrderItem[]>]) => (
                        <div key={itemType} className={styles.invoiceTypeGroup}>
                            <h4 className={styles.invoiceListHeader}>{itemType === 'menu' ? 'Menu Items' : 'Services'}</h4>
                            {/* Add explicit types to map parameters */}
                            {Object.entries(categories).map(([categoryName, itemsInCategory]: [string, OrderItem[]]) => (
                                <div key={categoryName} className={styles.invoiceCategoryGroup}>
                                    <h5>{categoryName}</h5>
                                    <ul>
                                        {/* Add explicit type to item */}
                                        {itemsInCategory.map((item: OrderItem) => ( <li key={item.id}>{item.name}</li> ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                    {invoiceOrder.items.length === 0 && <p>No items found for this order.</p>}
                </div>
            </div> {/* End Printable Area */}
            <div className={styles.invoiceActions}>
                <button onClick={handlePrintInvoice} className={styles.printInvoiceButton}>Print Invoice</button>
            </div>
          </div> {/* Modal Content Ends */}
        </div>
      )} {/* End Invoice Modal Conditional */}


      {/* List of Saved Orders */}
      {filteredOrders.length === 0 ? (
        <p>No {filter} orders found.</p>
      ) : (
        <ul className={styles.orderList}>
          {filteredOrders.map((order) => (
             <li key={order.recordId} className={styles.orderItem}>
               <div className={styles.orderDetails}>
                 <p className={styles.savedDate}><strong>Saved:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                 <div className={styles.detailsGrid}>
                   {order.name && <p><strong>Name:</strong> {order.name}</p>}
                   {order.venue && <p><strong>Venue:</strong> {order.venue}</p>}
                   {order.event_date && <p><strong>Date:</strong> {order.event_date}</p>}
                   {order.event_time && <p><strong>Time:</strong> {order.event_time}</p>}
                 </div>
                 {order.notes && <p className={styles.notesDisplay}><strong>Notes:</strong> {order.notes}</p>}
                 <p><strong>Total Items:</strong> {order.items.length}</p>
                 {/* Item list hidden here for brevity */}
                 {/* <ul className={styles.itemList}> {order.items.map((item: OrderItem) => ( <li key={item.id}>{item.name} <span className={styles.itemCategory}>({item.category} / {item.type})</span></li> ))} </ul> */}
               </div>
               <div className={styles.orderActions}>
                 <button onClick={() => handleEdit(order)} className={styles.editButton}>View/Edit Details</button>
                 <button onClick={() => handleShowInvoice(order)} className={styles.invoiceButton}>View Invoice</button>
                 {/* Show "Mark Completed" only for active orders */}
                 {order.status === 'active' && (
                    <button onClick={() => handleMarkCompleted(order.recordId)} className={styles.completeButton}>Mark Completed</button>
                 )}
                 {/* Show "Mark Active" only for completed orders */}
                 {order.status === 'completed' && (
                    <button onClick={() => handleMarkActive(order.recordId)} className={styles.activateButton}>Mark Active</button>
                 )}
                 {/* --- Ensure this Delete Button is present --- */}
                 <button onClick={() => handleDelete(order.recordId)} className={styles.deleteButton}>Delete Order</button>
               </div>
             </li>
          ))}
        </ul>
      )} {/* End of Order List */}
    </div> // End of Admin Page div
  );
} // End of Component