import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { getProducts, ShopifyProduct } from "@/lib/shopify-products";
import styles from "./page.module.css";

import ProductListing from "@/components/ProductListing";

// ─── Page ─────────────────────────────────────────────────────────────────────

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  let products: ShopifyProduct[] = [];
  let error = "";

  try {
    products = await getProducts(20);
  } catch (err) {
    error =
      err instanceof Error ? err.message : "Failed to load products.";
    console.error("[collections]", err);
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Teeth Whitening Products</h1>
            <p>Ready to build your routine?<br/>Shop our full range of Mad Dental Care Products.</p>
          </div>
        </div>

        <div className={styles.container}>
          {error && (
            <div className={styles.errorBanner}>
              ⚠️ {error}
            </div>
          )}

          <ProductListing initialProducts={products} />
          
          {/* About Section */}
          <div className={styles.aboutSection}>
            <h2>A Bit About Our MAD Dental Care Products</h2>
            <p>
              At <strong>MAD Dental Care</strong>, our mission is simple to redefine everyday oral care with products that keep your smile healthy, confident, and bright. We are committed to delivering high-quality smile care solutions that not only improve your oral hygiene but also enhance your overall confidence.
            </p>
            <p>
              Our MAD Dental Care product range includes daily-use oral care essentials, effective teeth whitening solutions, and specially formulated products designed to target specific dental needs. Whether you're maintaining your routine or upgrading your smile care game, we have the perfect solution for every smile.
            </p>
            <p>
              Because at MAD Dental Care, a healthy smile is a powerful smile.
            </p>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterIcon}>
              <svg viewBox="0 0 100 50" fill="none" width="60" height="30">
                <path d="M10 10 Q 50 40 90 10" stroke="var(--accent-blue)" strokeWidth="12" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <h2>Pakistan Biggest Oral Care Brand</h2>
            <p>Get exclusive deals and early access to new products by putting your Email.</p>
            
            <form className={styles.subscribeForm}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
