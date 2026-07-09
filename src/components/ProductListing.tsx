"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "@/lib/shopify-products";
import styles from "@/app/page.module.css";
import ProductCard from "./ProductCard";

export default function ProductListing({ initialProducts }: { initialProducts: ShopifyProduct[] }) {
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  const filteredProducts = initialProducts.filter(p => {
    const variant = p.variants.edges[0]?.node;
    const price = parseFloat(variant?.price.amount ?? "0");
    return price <= maxPrice;
  });

  return (
    <div className={styles.shopLayout}>
      {/* Sidebar Filters */}
      <aside className={styles.sidebar}>
        <details className={styles.filterDetails}>
          <summary className={styles.filterSummary}>
            <h2 className={styles.sidebarTitle}>Filters</h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.filterChevron}><polyline points="6 9 12 15 18 9"></polyline></svg>
          </summary>

          <div className={styles.filterContent}>
            <div className={styles.filterGroup}>
              <button className={styles.filterGroupBtn}>
                Availability <span className={styles.chevron}>▾</span>
              </button>
              <div className={styles.filterOptions}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" defaultChecked /> In stock ({initialProducts.length})
                </label>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" /> Out of stock (0)
                </label>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <button className={styles.filterGroupBtn}>
                Price <span className={styles.chevron}>▾</span>
              </button>
              <div className={styles.priceRange}>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className={styles.rangeSlider}
                />
                <div className={styles.priceInputs}>
                  <div className={styles.inputWrap}>
                    <span className={styles.currencySymbol}>Rs</span>
                    <input type="number" value={0} readOnly />
                  </div>
                  <span>To</span>
                  <div className={styles.inputWrap}>
                    <span className={styles.currencySymbol}>Rs</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </aside>

      {/* Product Grid Area */}
      <div className={styles.productArea}>
        <div className={styles.toolbar}>
          <div className={styles.mobileSortArea}>
            <span className={styles.sortLabel}>Filter <span className={styles.chevron}>▾</span></span>
            <span className={styles.sortLabel}>Featured <span className={styles.chevron}>▾</span></span>
          </div>
          <div className={styles.viewToggles}>
            <button className={styles.viewBtn}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <button className={`${styles.viewBtn} ${styles.activeViewBtn}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="4" x2="9" y2="20"></line><line x1="15" y1="4" x2="15" y2="20"></line></svg>
            </button>
          </div>
        </div>

        <div className={styles.grid}>
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
          {filteredProducts.length === 0 && (
            <p>No products found in this price range.</p>
          )}
        </div>
      </div>
    </div>
  );
}
