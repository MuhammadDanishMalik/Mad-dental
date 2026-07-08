"use client";

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMad}>mad</span>
          <span className={styles.logoDental}>dental</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Collections</Link>
          <Link href="/" className={styles.navLink}>About</Link>
          <Link href="/" className={styles.navLink}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
