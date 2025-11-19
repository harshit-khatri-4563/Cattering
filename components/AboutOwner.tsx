// components/AboutOwner.tsx
import Image from 'next/image';
import styles from './AboutOwner.module.css';
import ownerImage from './photo/owner.jpg';

const AboutOwner = () => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={ownerImage}
            alt="Owner of Gourmet Catering"
            width={500}
            height={500}
            style={{ objectFit: "cover" }} // <-- FIXED
            unoptimized // <-- FIXED
          />
        </div>
        <div className={styles.textWrapper}>
          <h2>Meet the Founder</h2>
          <h3>Mahesh Modi</h3>
          <p>
            With over two decades of culinary experience, Mahesh Modi founded 
            Gourmet Catering with a simple vision: to bring people together 
            over exceptional food. 
          </p>
          <p>
            From the royal kitchens of Rajasthan to modern fusion cuisine, his 
            passion is crafting menus that are both innovative and deeply 
            comforting. He believes every event is a unique story, and the 
            food should be a memorable part of that narrative.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutOwner;