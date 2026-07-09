import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import { getProducts, ShopifyProduct } from "@/lib/shopify-products";
import styles from "./page.module.css";

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: ShopifyProduct }) {
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
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.priceRow}>
          {onSale && compareAt && (
            <span className={styles.originalPrice}>
              {currency} {fmt(compareAt)}
            </span>
          )}
          <span className={styles.salePrice}>
            {currency} {fmt(salePrice)}
          </span>
        </div>
        <button className={styles.cartBtn}>Add to cart</button>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

          <div className={styles.shopLayout}>
            {/* Sidebar Filters */}
            <aside className={styles.sidebar}>
              <h2 className={styles.sidebarTitle}>Filters</h2>
              
              <div className={styles.filterGroup}>
                <button className={styles.filterGroupBtn}>
                  Availability <span className={styles.chevron}>▾</span>
                </button>
                <div className={styles.filterOptions}>
                  <label className={styles.checkboxLabel}>
                    <input type="checkbox" /> In stock ({products.length})
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
                  <input type="range" min="0" max="5000" className={styles.rangeSlider} />
                  <div className={styles.priceInputs}>
                    <div className={styles.inputWrap}>
                      <span className={styles.currencySymbol}>Rs</span>
                      <input type="number" defaultValue="0" />
                    </div>
                    <span>To</span>
                    <div className={styles.inputWrap}>
                      <span className={styles.currencySymbol}>Rs</span>
                      <input type="number" defaultValue="3000" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className={styles.productArea}>
              <div className={styles.toolbar}>
                <span className={styles.productCount}></span>
                <div className={styles.sortArea}>
                  <span className={styles.sortLabel}>Featured <span className={styles.chevron}>▾</span></span>
                  <div className={styles.viewToggles}>
                    <button className={styles.viewBtn}>=</button>
                    <button className={styles.viewBtn}>||</button>
                    <button className={styles.viewBtn}>|||</button>
                    <button className={`${styles.viewBtn} ${styles.activeViewBtn}`}>||||</button>
                  </div>
                </div>
              </div>

              <div className={styles.grid}>
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
          
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
