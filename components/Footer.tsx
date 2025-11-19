// components/Footer.tsx
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.section}>
          <h3>Gourmet Catering</h3>
          <p>Delivering excellence, one plate at a time.</p>
          <div className={styles.socials}>
            {/* Add your social media icons/links here */}
            <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">Twitter</a>
          </div>
        </div>
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/services#engagement">Engagement</Link></li>
            <li><Link href="/services#mahendi">Mahendi</Link></li>
            <li><Link href="/services#shaddi">Shaadi</Link></li>
            <li><Link href="/services#decoration">Stage Decoration</Link></li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Contact Us</h3>
          <p><strong>Name:</strong> Mahesh Modi</p>
          <p><strong>Phone:</strong> 9999999999</p>
          <p><strong>Address:</strong> ABC</p>
        </div>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Gourmet Catering. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;