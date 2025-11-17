// components/Navbar.tsx
'use client'; // This component is now interactive
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to close the menu, useful after clicking a link
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        Gourmet Catering
      </Link>

      {/* --- Mobile Menu Button --- */}
      <button
        className={styles.mobileMenuButton}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {/* Simple burger/close icon */}
        {isMobileMenuOpen ? '✖' : '☰'}
      </button>

      {/* --- Navigation Links --- */}
      {/* Apply 'active' class when mobile menu is open */}
      <ul className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
        <li><Link href="/" onClick={closeMenu}>Home</Link></li>
        <li><Link href="/menu" onClick={closeMenu}>Menu</Link></li>
        <li><Link href="/services" onClick={closeMenu}>Services</Link></li>
        <li><Link href="/gallery" onClick={closeMenu}>Gallery</Link></li>
        <li><Link href="/contact" onClick={closeMenu}>Contact Us</Link></li>
      </ul>

      {/* Orders button on the right (will be part of mobile menu) */}
      <Link
        href="/admin/orders"
        className={`${styles.ordersButton} ${isMobileMenuOpen ? styles.active : ''}`}
        onClick={closeMenu}
      >
        Orders
      </Link>
    </nav>
  );
};

export default Navbar;