// app/services/page.tsx
'use client'; // This makes the page interactive

import { useState } from 'react'; 
import ServiceItem from '@/components/ServiceItem';
import styles from './ServicesPage.module.css'; // Uses the ServicesPage.module.css file

// --- DECOR-FOCUSED DUMMY DATA ---
// 6 items in each of your requested categories.
const servicesData = [
  {
    mainCategory: 'Engagement',
    items: [
      { id: 'ser_e1', name: 'Elegant Ring Ceremony Backdrop', description: 'Stunning backdrops for your special moment.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_e2', name: 'Intimate Floral Setup', description: 'Cozy and beautiful decor for close family.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_e3', name: 'Romantic Lighting Theme', description: 'Warm and romantic fairy lights and spotlights.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_e4', name: 'Floral Archway Entry', description: 'A beautiful floral arch to welcome guests.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_e5', name: 'Luxe Lounge Seating', description: 'Comfortable and stylish lounge areas for guests.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_e6', name: 'Custom Welcome Signage', description: 'Personalized welcome signs for the couple.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
  {
    mainCategory: 'Mahendi',
    items: [
      { id: 'ser_m1', name: 'Bohemian Mahendi Decor', description: 'Colorful drapes, cushions, and low seating.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_m2', name: 'Marigold Swing (Jhoola)', description: 'A beautifully decorated swing for the bride.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_m3', name: 'Colorful Tassel & Kite Theme', description: 'A vibrant and playful decor setup.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_m4', name: 'Genda Phool Backdrop', description: 'A classic and traditional marigold wall.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_m5', name: 'Low \'Baithak\' Seating', description: 'Traditional low seating with bolsters.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_m6', name: 'Custom Photo Booth', description: 'Funky props and backdrops for Mahendi.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
  {
    mainCategory: 'Haldi',
    items: [
      { id: 'ser_h1', name: 'Traditional Yellow & White Theme', description: 'Classic, bright, and cheerful Haldi themes.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_h2', name: 'Marigold & Banana Leaf Decor', description: 'A very traditional and auspicious setup.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_h3', name: 'Floral Jewelry & \'Urli\' Setup', description: 'A beautiful setup with water, petals, and flowers.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_h4', name: 'Custom Haldi Seating', description: 'A special ornate seat for the bride/groom.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_h5', name: 'Pastel Yellow Decor', description: 'A modern, subtle take on the Haldi theme.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_h6', name: 'Entryway Decor', description: 'Welcoming entrance with flowers and drapes.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
  {
    mainCategory: 'Bachelors Party',
    items: [
      { id: 'ser_b1', name: 'Casino Royale Theme', description: 'Poker tables, custom lighting, and lounge setup.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_b2', name: 'Neon & LED Light Setup', description: 'A club-style atmosphere with neon signs.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_b3', name: 'Custom Bar & Lounge', description: 'A fully stocked bar with professional lighting.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_b4', name: 'Pool Party Decor', description: 'Floating lights, inflatables, and a cabana setup.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_b5', name: 'Vintage \'Peaky Blinders\' Theme', description: 'A 1920s-style speakeasy decor setup.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_b6', name: 'Sports Night Theme', description: 'Decor themed around your favorite sports team.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
  {
    mainCategory: 'Wedding (Shaadi)',
    items: [
      { id: 'ser_w1', name: 'Royal Palace Mandap', description: 'A grand, palace-inspired mandap structure.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_w2', name: 'Enchanted Forest Theme', description: 'Lush greenery, fairy lights, and floral ceilings.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_w3', name: 'Red & Gold Traditional Decor', description: 'Classic royal wedding colors with rich fabrics.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_w4', name: 'Pastel Floral Dream', description: 'A modern, soft-hued floral-heavy decor.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_w5', name: 'Grand Floral Chandeliers', description: 'Massive floral installations hanging from the ceiling.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_w6', name: 'Elegant Aisle & Walkway', description: 'Beautifully decorated pathways for the entry.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
  {
    mainCategory: 'Stage Decoration',
    items: [
      { id: 'ser_s1', name: 'Grand Royal Sofa Stage', description: 'Luxurious seating with an ornate backdrop.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_s2', name: 'Modern LED Wall Stage', description: 'A dynamic stage with customizable graphics.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_s3', name: 'Pastel Floral Dream Stage', description: 'A stage covered in soft-colored exotic flowers.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_s4', name: 'Minimalist White & Green', description: 'An elegant and modern stage with foliage.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_s5', name: 'Ornate Carved Backdrop', description: 'A traditional, intricately carved stage set.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_s6', name: 'Draped Curtain & Chandelier', description: 'A classic, glamorous look with rich fabrics.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
  {
    mainCategory: 'Bride-Groom Entry',
    items: [
      { id: 'ser_en1', name: 'Phoolon ki Chaadar', description: 'A stunning floral canopy for the bride\'s entry.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_en2', name: 'Vintage Car Entry', description: 'A classic car decorated with flowers.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_en3', name: 'Cold Pyro & Sparkler Aisle', description: 'A sparkling walkway for a dramatic entry.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_en4', name: 'Royal Palki (Palanquin) Entry', description: 'A traditional and royal entry for the bride.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_en5', name: 'Smoke Fog \'On Clouds\' Entry', description: 'A magical entry with a low-lying fog machine.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
      { id: 'ser_en6', name: 'Baggi (Carriage) Entry', description: 'A fairytale horse-drawn carriage entrance.', imageUrl: 'https://placehold.co/300x200/B8860B/white?text=Decor' },
    ]
  },
];
// --- END DUMMY DATA ---

export default function ServicesPage() {
  // State to track the active category. Initialize with the first one.
  const [activeCategory, setActiveCategory] = useState(servicesData[0].mainCategory);

  // Find the data for the currently active category
  const activeCategoryData = servicesData.find(
    (category) => category.mainCategory === activeCategory
  );
  
  // Get the items to display, or an empty array if none are found
  const itemsToShow = activeCategoryData ? activeCategoryData.items : [];

  return (
    <div className={styles.menuPage}>
      <h1 className={styles.pageTitle}>Our Event Services</h1>
      
      <div className={styles.menuLayout}>
        {/* LEFT COLUMN: Category Navigation */}
        <nav className={styles.categoryNav}>
          <ul>
            {servicesData.map((category) => (
              <li key={category.mainCategory}>
                <button
                  // Add 'active' class if this is the selected category
                  className={activeCategory === category.mainCategory ? styles.active : ''}
                  // On click, update the state to this category
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
              <ServiceItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                imageUrl={item.imageUrl}
                category={activeCategory} // Pass the category name
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}