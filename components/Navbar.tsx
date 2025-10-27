// components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Gourmet Catering
      </Link>

      {/* Centered navigation links */}
      <ul className={styles.navLinks}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/menu">Menu</Link></li>
        <li><Link href="/services">Services</Link></li>
        <li><Link href="/gallery">Gallery</Link></li>
        <li><Link href="/contact">Contact Us</Link></li>
      </ul>

      {/* Orders button on the right */}
      <Link href="/admin/orders" className={styles.ordersButton}>
        Orders
      </Link>
    </nav>
  );
};

export default Navbar;