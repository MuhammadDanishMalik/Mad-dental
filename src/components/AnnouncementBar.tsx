import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.content}>
        <span>ll 2025-26 By Govt. of Pakistan.</span>
        <span className={styles.highlight}>11% Extra Discount Live If You Order Recommended Pack.</span>
        <span>5% GST Have Been Added on Because of New Finance Bill 2025-26 By Govt. of Pakistan.</span>
      </div>
    </div>
  );
}
