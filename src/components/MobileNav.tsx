"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartIdFromCookie } from "@/lib/cart-cookie";
import { getCart } from "@/lib/cart";
import styles from "./MobileNav.module.css";

export default function MobileNav() {
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      try {
        const cartId = getCartIdFromCookie();
        if (!cartId) return;
        const cart = await getCart(cartId);
        setItemCount(cart?.totalQuantity ?? 0);
      } catch {
        // silently ignore
      }
    }
    fetchCount();

    const handleCartUpdate = () => fetchCount();
    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("focus", handleCartUpdate);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("focus", handleCartUpdate);
    };
  }, []);

  return (
    <nav className={styles.mobileNav}>
      <Link href="/" className={styles.navItem} aria-label="Home">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>
      <Link href="/" className={styles.navItem} aria-label="Grid">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </Link>
      <Link href="/cart" className={styles.navItem} aria-label="Cart">
        <div className={styles.cartIconWrapper}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span className={styles.cartBadge}>{itemCount}</span>
        </div>
      </Link>
      <button className={styles.navItem} aria-label="Search">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </nav>
  );
}
