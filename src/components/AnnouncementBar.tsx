import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeContent}>
          <span className={styles.highlight}>11% Extra Discount Live If You Order Recommended Pack.</span>
          <span>5% GST Have Been Added on Because of New Finance Bill 2025-26 By Govt. of Pakistan.</span>
        </div>
        <div className={styles.marqueeContent} aria-hidden="true">
          <span className={styles.highlight}>11% Extra Discount Live If You Order Recommended Pack.</span>
          <span>5% GST Have Been Added on Because of New Finance Bill 2025-26 By Govt. of Pakistan.</span>
        </div>
      </div>
    </div>
  );
}
