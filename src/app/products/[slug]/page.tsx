import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import { getProductByHandle } from "@/lib/shopify-products";
import Header from "@/components/Header";
import AddToCartControls from "@/components/AddToCartControls";
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

              <p className={styles.shipping}>
                <Link href="/checkout" className={styles.shippingLink}>Shipping</Link>{" "}
                calculated at checkout.
              </p>

              {/* Client component for quantity & adding to cart */}
              <AddToCartControls variantId={variantId} />

              {/* ── Rich Content (if available locally) ── */}
              {localProduct && (
                <div className={styles.richContent}>
                  {/* Bundle deal heading */}
                  <p className={styles.bundleHeading}>{localProduct.bundleHeading}</p>
                  <p className={styles.bundleDesc}>
                    <RichText text={localProduct.bundleDesc} />
                  </p>

                  {/* Sections */}
                  {localProduct.sections.map((section, si) => (
                    <div key={si} className={styles.section}>
                      <h2 className={styles.sectionTitle}>{section.title}</h2>
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
                          <p className={styles.guideTitle}>{section.appGuide.title}</p>
                          <ol className={styles.stepList}>
                            {section.appGuide.steps.map((step, sti) => (
                              <li key={sti} className={styles.stepItem}>
                                <strong>{step.label}</strong> {step.desc}
                              </li>
                            ))}
                          </ol>
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
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
