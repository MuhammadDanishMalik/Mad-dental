import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { getProductByHandle, getProducts } from "@/lib/shopify-products";
import Header from "@/components/Header";
import AddToCartControls from "@/components/AddToCartControls";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";

/** Renders plain text with **bold** markers as <strong> */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Fetch live Shopify product
  const shopifyProduct = await getProductByHandle(slug);
  if (!shopifyProduct) return notFound();

  // Find rich data in local products.ts using the handle
  const localProduct = products.find((p) => p.handle === slug);

  const variant = shopifyProduct.variants.edges[0]?.node;
  const variantId = variant?.id ?? "";
  const salePrice = parseFloat(variant?.price.amount ?? "0");
  const compareAt = variant?.compareAtPrice ? parseFloat(variant.compareAtPrice.amount) : null;
  const currency = variant?.price.currencyCode ?? "PKR";
  const onSale = compareAt !== null && compareAt > salePrice;

  const fmt = (n: number) => n.toLocaleString("en-PK", { minimumFractionDigits: 2 });
  
  // Get all products for related products section
  const allShopifyProducts = await getProducts();
  const relatedProducts = allShopifyProducts.filter(p => p.handle !== slug).slice(0, 4);
  
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Collections</Link>
            <span>/</span>
            <span>{shopifyProduct.title.slice(0, 40)}…</span>
          </nav>

          <div className={styles.layout}>
            {/* ── Left – Image ── */}
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <button className={styles.zoomBtn} aria-label="Zoom image">
                  🔍
                </button>
                {shopifyProduct.featuredImage ? (
                  <Image
                    src={shopifyProduct.featuredImage.url}
                    alt={shopifyProduct.featuredImage.altText ?? shopifyProduct.title}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                ) : (
                  <div className={styles.imagePlaceholder} />
                )}
              </div>
            </div>

            {/* ── Right – Details ── */}
            <div className={styles.detailSection}>
              <p className={styles.subtitle}>{localProduct?.subtitle ?? "PAKISTAN'S NO 1"}</p>
              <h1 className={styles.title}>{shopifyProduct.title}</h1>

              {/* Pricing */}
              <div className={styles.priceRow}>
                {onSale && compareAt && (
                  <span className={styles.originalPrice}>
                    {currency} {fmt(compareAt)}
                  </span>
                )}
                <span className={styles.salePrice}>
                  {currency} {fmt(salePrice)}
                </span>
                {onSale && <span className={styles.saleBadge}>Sale</span>}
              </div>

              {/* Client component for quantity & adding to cart */}
              <AddToCartControls variantId={variantId} />

              <div className={styles.estimatedDelivery}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span><strong>Estimated Delivery:</strong> Jul 10 - Jul 14</span>
              </div>

              {/* ── Rich Content (if available locally) ── */}
              {localProduct && (
                <div className={styles.accordionGroup}>
                  <details className={styles.accordion} open>
                    <summary className={styles.accordionSummary}>
                      <span className={styles.accordionTitle}>
                        <span role="img" aria-label="Description">📜</span> Description
                      </span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevronIcon}><polyline points="18 15 12 9 6 15"></polyline></svg>
                    </summary>
                    <div className={styles.accordionContent}>
                      {/* Bundle deal heading */}
                      <h2 className={styles.bundleHeading}>{localProduct.bundleHeading}</h2>
                      <p className={styles.bundleDesc}>
                        <RichText text={localProduct.bundleDesc} />
                      </p>

                      {/* Sections */}
                      {localProduct.sections.map((section, si) => (
                        <div key={si} className={styles.section}>
                          <h3 className={styles.sectionTitle}>{section.title}</h3>
                          <p className={styles.sectionIntro}>
                            <RichText text={section.intro} />
                          </p>

                          {/* Why You'll Love It */}
                          {section.whyLoveIt && (
                            <div className={styles.whyBlock}>
                              <p className={styles.whyTitle}>✨ Why You&apos;ll Love It:</p>
                              <ul className={styles.featureList}>
                                {section.whyLoveIt.map((f, fi) => (
                                  <li key={fi} className={styles.featureItem}>
                                    <strong>{f.title}</strong> {f.desc}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Application Guide */}
                          {section.appGuide && (
                            <div className={styles.guideBlock}>
                              {section.appGuide.steps.map((step, sti) => (
                                <div key={sti} className={styles.stepBlock}>
                                  <p className={styles.stepLabel}>{step.label}</p>
                                  <p className={styles.stepDesc}>{step.desc}</p>
                                </div>
                              ))}
                              {section.appGuide.proTip && (
                                <blockquote className={styles.proTip}>
                                  <em>
                                    <strong>Pro Tip:</strong> {section.appGuide.proTip}
                                  </em>
                                </blockquote>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>

                  <details className={styles.accordion}>
                    <summary className={styles.accordionSummary}>
                      <span className={styles.accordionTitle}>
                        <span role="img" aria-label="Disclaimer">⚠️</span> Disclaimer
                      </span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chevronIcon}><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </summary>
                    <div className={styles.accordionContent}>
                      <p className={styles.disclaimerText}>Results may vary. Consult a dentist if you have sensitive teeth.</p>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── It May Interest You ── */}
        {relatedProducts.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>It May Interest You</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* ── Newsletter Section ── */}
        <div className={styles.newsletterSection}>
          <div className={styles.newsletterContent}>
            <div className={styles.newsletterIcon}>
              <svg width="40" height="40" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 10 Q 50 50 90 10" stroke="#0131C2" strokeWidth="12" strokeLinecap="round" fill="none"/>
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
