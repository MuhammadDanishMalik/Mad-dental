"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCartIdFromCookie } from "@/lib/cart-cookie";
import { getCart } from "@/lib/cart";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  const [itemCount, setItemCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
        <button className={styles.hamburger} aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <Link href="/" className={styles.logo}>
          <Image 
            src="/logo.png" 
            alt="Mad Dental" 
            width={120} 
            height={45} 
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>HOME</Link>
          <Link href="/" className={styles.navLink}>SHOP NOW</Link>
          <Link href="/" className={styles.navLink}>BUNDLE & SAVE</Link>
          <Link href="/" className={styles.navLink}>EXPLORE ▾</Link>
        </nav>

        <div className={styles.icons}>
          <button 
            className={styles.iconBtn} 
            aria-label="Search"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <Link href="/cart" className={styles.cartLink} id="header-cart-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {itemCount > 0 && (
              <span className={styles.cartBadge}>{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
      
      {isSearchOpen && (
        <div className={styles.searchDropdown}>
          <div className={styles.searchContainer}>
            <input 
              type="text" 
              placeholder="Search products..." 
              className={styles.searchInput}
              autoFocus
            />
            <button className={styles.searchBtn} aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
