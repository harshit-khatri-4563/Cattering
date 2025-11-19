// components/CountUpStats.tsx
'use client'; // This is crucial!

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import styles from './CountUpStats.module.css';

const CountUpStats = () => {
  // 'ref' tracks the element. 'inView' is a boolean: true if visible.
  // 'triggerOnce: true' means it only animates one time.
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Start when 10% of the element is visible
  });

  return (
    <section className={styles.stats} ref={ref}>
      <div className={styles.statItem}>
        <h2>
          {/* Only start the animation if 'inView' is true */}
          {inView && <CountUp end={20} duration={2.5} />} +
        </h2>
        <p>Years of Excellence</p>
      </div>
      <div className={styles.statItem}>
        <h2>
          {inView && <CountUp end={500} duration={2.5} />} +
        </h2>
        <p>Menu Options</p>
      </div>
      <div className={styles.statItem}>
        <h2>
          {inView && <CountUp end={1000} duration={2.5} />} +
        </h2>
        <p>Clients Served</p>
      </div>
    </section>
  );
};

export default CountUpStats;