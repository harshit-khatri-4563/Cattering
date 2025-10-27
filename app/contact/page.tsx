// app/contact/page.tsx
import ContactForm from '@/components/ContactForm';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      <h1>Get In Touch</h1>
      <p className={styles.subtitle}>
        We'd love to hear about your event. Contact us for a custom quote.
      </p>
      <div className={styles.container}>
        <div className={styles.info}>
          <h3>Contact Information</h3>
          <p>
            <strong>Owner:</strong> [Your Name]
          </p>
          <p>
            <strong>Phone:</strong> [Your Phone Number]
          </p>
          <p>
            <strong>Email:</strong> [Your Email Address]
          </p>
          <p>
            <strong>Address:</strong> [Your Full Address]
          </p>
          {/* You can add a Google Maps embed here */}
        </div>
        <div className={styles.formWrapper}>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}