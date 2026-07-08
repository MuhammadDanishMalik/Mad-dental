"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartIdFromCookie } from "@/lib/cart-cookie";
import { getCart } from "@/lib/cart";
import styles from "./Header.module.css";

export default function Header() {
  const [itemCount, setItemCount] = useState(0);

  // Refresh cart count on mount and when cookie changes
  useEffect(() => {
    async function fetchCount() {
      try {
        const cartId = getCartIdFromCookie();
        if (!cartId) return;
        const cart = await getCart(cartId);
        setItemCount(cart?.totalQuantity ?? 0);
      } catch {
        // silently ignore — cart count is best-effort
      }
    }
    fetchCount();
  }, []);

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
          <Link href="/cart" className={styles.cartLink} id="header-cart-btn">
            🛒
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
