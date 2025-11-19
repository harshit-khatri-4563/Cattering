// components/Hero.tsx
import Image from 'next/image';
import styles from './Hero.module.css';
import bannerImage from './photo/banner.jpg';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <Image
        src={bannerImage} 
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