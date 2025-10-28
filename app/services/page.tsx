// app/services/page.tsx
'use client'; // This directive needs to be at the top

import { useState, Suspense, useEffect } from 'react'; // Added useEffect
import ServiceItem from '@/components/ServiceItem';
import styles from './ServicesPage.module.css'; // Use ServicesPage styles
import { useSearchParams, useRouter } from 'next/navigation'; // Import useSearchParams and useRouter
import Link from 'next/link'; // Still needed for other potential links, though not for the button
// Import the data and type definition
import { servicesData, type ServiceCategoryData } from '@/data/servicesData'; // Ensure path is correct

// Separate component to handle client-side hooks
function ServicesContent() {
  const [activeCategory, setActiveCategory] = useState<string>(servicesData[0].mainCategory); // Explicit type
  const searchParams = useSearchParams(); // Get search params
  const router = useRouter(); // Initialize router hook
  const editOrderIdParam = searchParams.get('editOrderId'); // Check for edit mode
  const isEditing = !!editOrderIdParam; // Boolean flag for edit mode

  // Find the data for the active category
  const activeCategoryData = servicesData.find(
    // Add explicit type for 'category' parameter
    (category: ServiceCategoryData) => category.mainCategory === activeCategory
  );

  // Get items, default to empty array
  const itemsToShow = activeCategoryData ? activeCategoryData.items : [];

  // --- Handler for the Finish Editing button ---
  const handleFinishEditing = () => {
    router.push('/admin/orders'); // Navigate back to the admin list
  };
  // --- END Handler ---

  return (
    // Use styles from ServicesPage.module.css or reuse MenuPage styles if identical
    <div className={styles.menuPage}> {/* Assuming structure is similar to MenuPage */}

      {/* Conditional Header/Button */}
      {isEditing ? (
        <div className={styles.editHeader}> {/* Use styles defined in ServicesPage.module.css */}
          <h1>Editing Order Services</h1>
          {/* Top button removed */}
        </div>
      ) : (
        <h1 className={styles.pageTitle}>Our Event Services</h1>
      )}

      <div className={styles.menuLayout}> {/* Assuming structure is similar */}
        {/* LEFT COLUMN: Category Navigation */}
        <nav className={styles.categoryNav}> {/* Assuming structure is similar */}
          <ul>
            {/* Use imported servicesData, add explicit type */}
            {servicesData.map((category: ServiceCategoryData) => (
              <li key={category.mainCategory}>
                <button
                  className={activeCategory === category.mainCategory ? styles.active : ''}
                  onClick={() => setActiveCategory(category.mainCategory)}
                >
                  {category.mainCategory}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* RIGHT COLUMN: Item Display */}
        <main className={styles.itemDisplay}> {/* Assuming structure is similar */}
          <h2>{activeCategory}</h2>
          <div className={styles.itemGrid}> {/* Assuming structure is similar */}
            {/* Add explicit type for 'item' if needed (usually inferred) */}
            {itemsToShow.map((item) => (
              <ServiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
                category={activeCategory} // Pass category
              />
            ))}
          </div>
        </main>
      </div>

       {/* --- UPDATED: Finish Editing Button (Conditional) --- */}
       {/* Changed from Link to button, added onClick */}
       {isEditing && (
         <button onClick={handleFinishEditing} className={styles.finishEditingButton}>
           Finish Editing
         </button>
       )}
       {/* --- END UPDATED --- */}

    </div>
  );
}

// Main component using Suspense and client-side check
export default function ServicesPage() {
  // useEffect to ensure Suspense works correctly with client components using hooks
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense fallback={<div className={styles.menuPage}><h1>Loading services...</h1></div>}>
      {/* Render ServicesContent only on the client */}
      {isClient && <ServicesContent />}
    </Suspense>
  );
}