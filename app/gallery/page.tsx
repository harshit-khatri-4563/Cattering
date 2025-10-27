// app/gallery/page.tsx
import Image from 'next/image';
import styles from './GalleryPage.module.css';

// --- DUMMY DATA FOR GALLERY ---
const galleryImages = [
  { id: 1, title: 'Grand Wedding Buffet', description: 'Our lavish setup for a 500-guest wedding.', src: 'https://placehold.co/400x300/c0392b/white?text=Wedding+Buffet' },
  { id: 2, title: 'Intimate Mehendi Decor', description: 'Colorful and vibrant decor.', src: 'https://placehold.co/400x300/B8860B/white?text=Mahendi+Decor' },
  { id: 3, title: 'Corporate Lunch Setup', description: 'Professional and elegant.', src: 'https://placehold.co/400x300/2C3E50/white?text=Corporate+Lunch' },
  { id: 4, title: 'Bride-Groom Stage', description: 'A magical stage setup.', src: 'https://placehold.co/400x300/B8860B/white?text=Wedding+Stage' },
  { id: 5, title: 'Rajasthani Live Counter', description: 'Serving hot Dal Baati.', src: 'https://placehold.co/400x300/e67e22/white?text=Live+Counter' },
  { id: 6, title: 'Exquisite Dessert Spread', description: 'A sweet ending to a perfect night.', src: 'https://placehold.co/400x300/d35400/white?text=Desserts' },
];
// --- END DATA ---

export default function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      <h1>Our Past Events</h1>
      <div className={styles.galleryGrid}>
        {galleryImages.map(image => (
          <div key={image.id} className={styles.galleryItem}>
            <Image 
              src={image.src} 
              alt={image.title} 
              width={400} 
              height={300} 
              style={{ objectFit: "cover" }} // <-- FIXED
              unoptimized // <-- FIXED
            />
            <div className={styles.overlay}>
              <h3>{image.title}</h3>
              <p>{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}