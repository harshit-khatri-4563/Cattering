// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to an API
    console.log({ name, phone, query });
    setStatus('Thank you for your message! We will get back to you soon.');
    setName('');
    setPhone('');
    setQuery('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3>Send us a Query</h3>
      <div className={styles.formGroup}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone No.</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="query">Query</label>
        <textarea
          id="query"
          rows={5}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>Send Message</button>
      {status && <p className={styles.status}>{status}</p>}
    </form>
  );
}