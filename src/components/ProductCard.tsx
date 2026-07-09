"use client";

import Image from "next/image";
import Link from "next/link";
import { ShopifyProduct } from "@/lib/shopify-products";
import styles from "@/app/page.module.css";

export default function ProductCard({ product }: { product: ShopifyProduct }) {
  const variant = product.variants.edges[0]?.node;
  const salePrice = parseFloat(variant?.price.amount ?? "0");
  const compareAt = variant?.compareAtPrice
    ? parseFloat(variant.compareAtPrice.amount)
    : null;
  const currency = variant?.price.currencyCode ?? "PKR";
  const onSale = compareAt !== null && compareAt > salePrice;

  const fmt = (n: number) =>
    n.toLocaleString("en-PK", { minimumFractionDigits: 2 });

  return (
    <Link
      href={`/products/${product.handle}`}
      className={styles.card}
      id={`product-${product.handle}`}
    >
      <div className={styles.imageWrapper}>
        {onSale && <span className={styles.badge}>Sale</span>}
        {product.featuredImage ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText ?? product.title}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
        
        {/* Action Buttons always visible on mobile at bottom of image, hover on desktop */}
        <div className={styles.hoverActions}>
          <div className={styles.topActions}>
            <button className={styles.iconActionBtn} aria-label="Add to wishlist" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
            <button className={styles.iconActionBtn} aria-label="Quick view" onClick={(e) => e.preventDefault()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </button>
          </div>
          <button className={styles.quickAddBtn} onClick={(e) => e.preventDefault()}>Quick Add</button>
        </div>

        {/* Mobile Action Buttons (Bottom Center Overlay) */}
        <div className={styles.mobileActions}>
          <button className={styles.mobileActionBtn} aria-label="Add to cart" onClick={(e) => e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          </button>
          <button className={styles.mobileActionBtn} aria-label="Add to wishlist" onClick={(e) => e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button className={styles.mobileActionBtn} aria-label="Quick view" onClick={(e) => e.preventDefault()}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </button>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.priceRow}>
          <span className={styles.salePrice}>
            {currency} {fmt(salePrice)}
          </span>
          {onSale && compareAt && (
            <span className={styles.originalPrice}>
              {currency} {fmt(compareAt)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
