"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import styles from "./page.module.css";

const SHIPPING = 195;

function CheckoutContent() {
  const params = useSearchParams();
  const slug = params.get("product") ?? products[0].slug;
  const qty = Number(params.get("qty") ?? 1);
  const product = products.find((p) => p.slug === slug) ?? products[0];

  const subtotal = product.salePrice * qty;
  const total = subtotal + SHIPPING;

  const [billing, setBilling] = useState<"same" | "different">("same");
  const [placed, setPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className={styles.successScreen}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Order Placed!</h2>
        <p className={styles.successText}>
          Thank you for your order. We will contact you soon to confirm delivery.
        </p>
        <Link href="/" className={styles.successBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* ─── Left Panel ─── */}
      <div className={styles.left}>
        <Link href="/" className={styles.storeName}>Mad Dental Care</Link>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>

          {/* Contact */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Contact</h2>
              <button type="button" className={styles.signInLink}>Sign in</button>
            </div>
            <div className={styles.inputGroup}>
              <input
                id="contact-email"
                type="text"
                placeholder="Email or mobile phone number"
                className={styles.input}
                required
              />
            </div>
          </section>

          {/* Delivery */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Delivery</h2>

            <div className={styles.inputGroup}>
              <label className={styles.selectLabel}>Country/Region</label>
              <select id="country" className={styles.select} defaultValue="PK">
                <option value="PK">Pakistan</option>
                <option value="US">United States</option>
                <option value="GB">United Kingdom</option>
              </select>
            </div>

            <div className={styles.row}>
              <input
                id="first-name"
                type="text"
                placeholder="First name (optional)"
                className={styles.input}
              />
              <input
                id="last-name"
                type="text"
                placeholder="Last name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                id="address"
                type="text"
                placeholder="Address"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.row}>
              <input
                id="city"
                type="text"
                placeholder="City"
                className={styles.input}
                required
              />
              <input
                id="postal"
                type="text"
                placeholder="Postal code (optional)"
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <input
                id="phone"
                type="tel"
                placeholder="Phone"
                className={styles.input}
                required
              />
            </div>

            <label className={styles.checkboxLabel} htmlFor="save-info">
              <input id="save-info" type="checkbox" className={styles.checkbox} />
              Save this information for next time
            </label>
          </section>

          {/* Shipping Method */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Shipping method</h2>
            <label className={`${styles.radioCard} ${styles.radioCardSelected}`} htmlFor="shipping-standard">
              <span className={styles.radioCardLeft}>
                <input
                  id="shipping-standard"
                  type="radio"
                  name="shipping"
                  defaultChecked
                  className={styles.radioInput}
                  readOnly
                />
                Standard
              </span>
              <span className={styles.radioCardPrice}>Rs {SHIPPING}.00</span>
            </label>
          </section>

          {/* Payment */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Payment</h2>
            <p className={styles.paymentSubtitle}>All transactions are secure and encrypted.</p>
            <label className={`${styles.radioCard} ${styles.radioCardSelected}`} htmlFor="payment-cod">
              <span className={styles.radioCardLeft}>
                <input
                  id="payment-cod"
                  type="radio"
                  name="payment"
                  defaultChecked
                  className={styles.radioInput}
                  readOnly
                />
                Cash on Delivery (COD)
              </span>
            </label>
          </section>

          {/* Billing Address */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Billing address</h2>
            <label
              className={`${styles.radioCard} ${billing === "same" ? styles.radioCardSelected : ""}`}
              htmlFor="billing-same"
            >
              <span className={styles.radioCardLeft}>
                <input
                  id="billing-same"
                  type="radio"
                  name="billing"
                  value="same"
                  checked={billing === "same"}
                  onChange={() => setBilling("same")}
                  className={styles.radioInput}
                />
                Same as shipping address
              </span>
            </label>
            <label
              className={`${styles.radioCard} ${billing === "different" ? styles.radioCardSelected : ""}`}
              htmlFor="billing-different"
            >
              <span className={styles.radioCardLeft}>
                <input
                  id="billing-different"
                  type="radio"
                  name="billing"
                  value="different"
                  checked={billing === "different"}
                  onChange={() => setBilling("different")}
                  className={styles.radioInput}
                />
                Use a different billing address
              </span>
            </label>
          </section>

          <button type="submit" id="complete-order-btn" className={styles.completeBtn}>
            Complete order
          </button>

          <footer className={styles.footer}>
            <a href="#" className={styles.footerLink}>Refund policy</a>
            <a href="#" className={styles.footerLink}>Shipping</a>
            <a href="#" className={styles.footerLink}>Privacy policy</a>
            <a href="#" className={styles.footerLink}>Terms of service</a>
          </footer>
        </form>
      </div>

      {/* ─── Right Panel ─── */}
      <div className={styles.right}>
        <div className={styles.orderItem}>
          <div className={styles.productThumbWrapper}>
            <Image
              src={product.image}
              alt={product.title}
              fill
              className={styles.productThumb}
              sizes="64px"
            />
            <span className={styles.qtyBadge}>{qty}</span>
          </div>
          <div className={styles.orderItemDetails}>
            <p className={styles.orderItemTitle}>{product.title}</p>
          </div>
          <p className={styles.orderItemPrice}>Rs {subtotal.toLocaleString()}.00</p>
        </div>

        <div className={styles.divider} />

        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>Subtotal</span>
          <span className={styles.summaryValue}>Rs {subtotal.toLocaleString()}.00</span>
        </div>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>
            Shipping <span className={styles.infoIcon}>ⓘ</span>
          </span>
          <span className={styles.summaryValue}>Rs {SHIPPING}.00</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <div className={styles.totalRight}>
            <span className={styles.totalCurrency}>PKR</span>
            <span className={styles.totalAmount}>Rs {total.toLocaleString()}.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className={styles.loading}>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
