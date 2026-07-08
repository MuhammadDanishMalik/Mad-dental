"use client";

import { useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import Header from "@/components/Header";
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

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const product = products.find((p) => p.slug === slug);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return notFound();

  const goToCheckout = () => {
    router.push(`/checkout?product=${product.slug}&qty=${qty}`);
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      goToCheckout();
    }, 600);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <Link href="/">Collections</Link>
            <span>/</span>
            <span>{product.title.slice(0, 40)}…</span>
          </nav>

          <div className={styles.layout}>
            {/* ── Left – Image ── */}
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <button className={styles.zoomBtn} aria-label="Zoom image">
                  🔍
                </button>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* ── Right – Details ── */}
            <div className={styles.detailSection}>
              <p className={styles.subtitle}>{product.subtitle}</p>
              <h1 className={styles.title}>{product.title}</h1>

              {/* Pricing */}
              <div className={styles.priceRow}>
                <span className={styles.originalPrice}>
                  Rs.{product.originalPrice.toLocaleString()}.00
                </span>
                <span className={styles.salePrice}>
                  Rs.{product.salePrice.toLocaleString()}.00
                </span>
                <span className={styles.saleBadge}>Sale</span>
              </div>

              <p className={styles.shipping}>
                <Link href="/checkout" className={styles.shippingLink}>Shipping</Link>{" "}
                calculated at checkout.
              </p>

              {/* Quantity */}
              <div className={styles.quantitySection}>
                <label className={styles.quantityLabel}>Quantity</label>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    id="qty-decrease"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    id="qty-increase"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                className={styles.addToCart}
                id="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                {added ? "Added ✓" : "Add to cart"}
              </button>

              <button className={styles.buyNow} id="buy-now-btn" onClick={goToCheckout}>
                Buy it now
              </button>

              {/* ── Rich Content ── */}
              <div className={styles.richContent}>
                {/* Bundle deal heading */}
                <p className={styles.bundleHeading}>{product.bundleHeading}</p>
                <p className={styles.bundleDesc}>
                  <RichText text={product.bundleDesc} />
                </p>

                {/* Sections */}
                {product.sections.map((section, si) => (
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
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
