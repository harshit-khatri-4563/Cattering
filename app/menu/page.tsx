'use client';

import { useState, Suspense, useEffect } from 'react';
import MenuItem from '@/components/MenuItem';
import styles from './MenuPage.module.css';
import { useSearchParams, useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link';
import { menuData, type MenuCategoryData } from '@/data/menuData';

// Separate component to handle client-side hooks like useSearchParams
// Separate component to handle client-side hooks like useSearchParams
function MenuContent() {
  const [activeCategory, setActiveCategory] = useState<string>(menuData[0].mainCategory);
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize router
  const editOrderIdParam = searchParams.get('editOrderId');
  const isEditing = !!editOrderIdParam;

  const activeCategoryData = menuData.find(
    (category: MenuCategoryData) => category.mainCategory === activeCategory
  );
  const itemsToShow = activeCategoryData ? activeCategoryData.items : [];

  // --- NEW: Handler for the Finish Editing button ---
  const handleFinishEditing = () => {
    router.push('/admin/orders'); // Navigate back to the admin list
  };
  // --- END NEW ---

  return (
    <div className={styles.menuPage}>

      {/* Conditional Header */}
      {isEditing ? (
        <div className={styles.editHeader}>
          <h1>Editing Order Items</h1>
          {/* Top button removed */}
        </div>
      ) : (
        <h1 className={styles.pageTitle}>Our Culinary Offerings</h1>
      )}

      <div className={styles.menuLayout}>
        {/* LEFT COLUMN: Category Navigation */}
        <nav className={styles.categoryNav}>
          <ul>
            {menuData.map((category: MenuCategoryData) => (
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
        <main className={styles.itemDisplay}>
          <h2>{activeCategory}</h2>
          <div className={styles.itemGrid}>
            {itemsToShow.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
                category={activeCategory}
              />
            ))}
          </div>
        </main>
      </div>

      {/* --- UPDATED: Finish Editing Button (Conditional) --- */}
      {isEditing && (
        <button onClick={handleFinishEditing} className={styles.finishEditingButton}>
          Finish Editing
        </button>
      )}
      {/* --- END UPDATED --- */}

    </div>
  );
}

// Main component using Suspense
export default function MenuPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Suspense fallback={<div className={styles.menuPage}><h1>Loading menu...</h1></div>}>
      {isClient && <MenuContent />}
    </Suspense>
  );
}