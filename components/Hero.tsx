// components/Hero.tsx
import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Image
        src="https://placehold.co/1920x1080/c0392b/white?text=Gourmet+Catering" 
        alt="Catering food display"
        fill // <-- FIXED (replaces layout="fill")
        style={{ objectFit: "cover" }} // <-- FIXED (replaces objectFit="cover")
        priority 
        unoptimized // <-- FIXED
      />
      <div className={styles.heroContent}>
        <h1>Unforgettable Events, Exquisite Flavors</h1>
        <p>Your perfect event starts here.</p>
        <a href="/contact" className={styles.ctaButton}>Book Now</a>
      </div>
    </div>
  );
};

export default Hero;