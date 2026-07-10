"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCart, updateCartLine, removeFromCart } from "@/lib/cart";
import { getCartIdFromCookie, clearCartIdCookie } from "@/lib/cart-cookie";
import { Cart, CartLine } from "@/lib/shopify-types";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null); // lineId being updated

  // ── Load cart on mount ─────────────────────────────────────────────────────
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cartId = getCartIdFromCookie();
      if (!cartId) {
        setCart(null);
        return;
      }
      const fetched = await getCart(cartId);
      setCart(fetched);
    } catch (err) {
      setError("Failed to load cart. Please refresh.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // ── Update quantity ────────────────────────────────────────────────────────
  const handleQtyChange = async (line: CartLine, newQty: number) => {
    const cartId = getCartIdFromCookie();
    if (!cartId) return;
    setUpdating(line.id);
    try {
      const updated = newQty <= 0
        ? await removeFromCart(cartId, line.id)
        : await updateCartLine(cartId, line.id, newQty);
      setCart(updated);
      if (updated.totalQuantity === 0) clearCartIdCookie();
    } catch (err) {
      setError("Failed to update cart. Please try again.");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  // ── Remove line ────────────────────────────────────────────────────────────
  const handleRemove = async (lineId: string) => {
    const cartId = getCartIdFromCookie();
    if (!cartId) return;
    setUpdating(lineId);
    try {
      const updated = await removeFromCart(cartId, lineId);
      setCart(updated);
      if (updated.totalQuantity === 0) clearCartIdCookie();
    } catch (err) {
      setError("Failed to remove item. Please try again.");
      console.error(err);
    } finally {
      setUpdating(null);
    }
  };

  // ── Checkout redirect ──────────────────────────────────────────────────────
  const handleCheckout = () => {
    if (!cart || cart.totalQuantity === 0) return;
    // Redirect to Shopify's hosted checkout
    window.location.href = cart.checkoutUrl;
  };

  // ── Render states ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner} />
              <p>Loading cart…</p>
            </div>
          </div>
        </main>
      </>
    );
  }

  const lines = cart?.lines.edges.map((e) => e.node) ?? [];
  const isEmpty = lines.length === 0;

  if (isEmpty) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🛒</div>
              <h1 className={styles.emptyTitle}>Your cart is empty</h1>
              <p className={styles.emptyText}>
                Add products to your cart before proceeding to checkout.
              </p>
              <Link href="/" className={styles.shopBtn} id="shop-now-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  const subtotal = cart!.cost.subtotalAmount;
  const total = cart!.cost.totalAmount;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Your Cart</h1>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <div className={styles.layout}>
            {/* ── Cart Lines ── */}
            <div className={styles.lines}>
              {lines.map((line) => {
                const img = line.merchandise.product.featuredImage;
                const isUpdating = updating === line.id;
                return (
                  <div key={line.id} className={`${styles.lineItem} ${isUpdating ? styles.lineUpdating : ""}`}>
                    {/* Product image */}
                    <div className={styles.lineImg}>
                      {img ? (
                        <Image
                          src={img.url}
                          alt={img.altText ?? line.merchandise.product.title}
                          fill
                          sizes="80px"
                          className={styles.lineImgInner}
                        />
                      ) : (
                        <div className={styles.lineImgPlaceholder} />
                      )}
                    </div>

                    {/* Info */}
                    <div className={styles.lineInfo}>
                      <p className={styles.lineTitle}>
                        {line.merchandise.product.title}
                      </p>
                      {line.merchandise.title !== "Default Title" && (
                        <p className={styles.lineVariant}>
                          {line.merchandise.title}
                        </p>
                      )}
                      <p className={styles.linePrice}>
                        {line.cost.totalAmount.currencyCode}{" "}
                        {parseFloat(line.cost.totalAmount.amount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    {/* Qty control */}
                    <div className={styles.qtyControl}>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => handleQtyChange(line, line.quantity - 1)}
                        disabled={isUpdating}
                        aria-label="Decrease quantity"
                        id={`qty-dec-${line.id}`}
                      >
                        −
                      </button>
                      <span className={styles.qtyVal}>{line.quantity}</span>
                      <button
                        className={styles.qtyBtn}
                        onClick={() => handleQtyChange(line, line.quantity + 1)}
                        disabled={isUpdating}
                        aria-label="Increase quantity"
                        id={`qty-inc-${line.id}`}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemove(line.id)}
                      disabled={isUpdating}
                      aria-label="Remove item"
                      id={`remove-${line.id}`}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Order Summary ── */}
            <div className={styles.summary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>
                  {subtotal.currencyCode}{" "}
                  {parseFloat(subtotal.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.shippingNote}>
                  Calculated at checkout
                </span>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>
                  {total.currencyCode}{" "}
                  {parseFloat(total.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>

              <p className={styles.taxNote}>
                Tax included. Shipping calculated at checkout.
              </p>

              {/* ── THE KEY BUTTON — redirects to Shopify checkout ── */}
              <button
                id="checkout-btn"
                className={styles.checkoutBtn}
                onClick={handleCheckout}
                disabled={isEmpty}
              >
                Checkout →
              </button>

              <Link href="/" className={styles.continueShopping}>
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
