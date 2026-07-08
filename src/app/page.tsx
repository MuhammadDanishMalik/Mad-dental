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
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Products</h1>

          {/* Filter & Sort Bar */}
          <div className={styles.toolbar}>
            <div className={styles.filters}>
              <span className={styles.filterLabel}>Filter:</span>
              <button className={styles.filterBtn}>
                Availability <span className={styles.chevron}>▾</span>
              </button>
              <button className={styles.filterBtn}>
                Price <span className={styles.chevron}>▾</span>
              </button>
            </div>
            <div className={styles.sortArea}>
              <span className={styles.sortLabel}>Sort by:</span>
              <button className={styles.sortBtn}>
                Alphabetically, A-Z <span className={styles.chevron}>▾</span>
              </button>
              <span className={styles.productCount}>
                {products.length} products
              </span>
            </div>
          </div>

          {error && (
            <div className={styles.errorBanner}>
              ⚠️ {error}
            </div>
          )}

          {/* Product Grid */}
          <div className={styles.grid}>
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
