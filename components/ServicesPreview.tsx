// components/ServicesPreview.tsx
import styles from './ServicesPreview.module.css';
import Link from 'next/link';

const ServicesPreview = () => {
  return (
    <section className={styles.services}>
      <h2>What We Do</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>💍 Weddings</h3>
          <p>From grand receptions to intimate ceremonies, we make your big day delicious.</p>
          <Link href="/services#shaddi" className={styles.arrow}>➡️</Link>
        </div>
        <div className={styles.card}>
          <h3>🎉 Corporate Events</h3>
          <p>Impress your clients and colleagues with professional, high-quality catering.</p>
          <Link href="/services" className={styles.arrow}>➡️</Link>
        </div>
        <div className={styles.card}>
          <h3>🎂 Private Parties</h3>
          <p>Birthdays, anniversaries, or just a get-together. We handle the food, you have the fun.</p>
          <Link href="/services#bachelors" className={styles.arrow}>➡️</Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;