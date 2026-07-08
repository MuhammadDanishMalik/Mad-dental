import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import styles from "./page.module.css";

export default function CollectionsPage() {
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
              <span className={styles.productCount}>{products.length} products</span>
            </div>
          </div>

          {/* Product Grid */}
          <div className={styles.grid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
