"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCartIdFromCookie } from "@/lib/cart-cookie";
import { getCart } from "@/lib/cart";
import { Cart } from "@/lib/shopify-types";
import styles from "./MobileCheckoutBar.module.css";

export default function MobileCheckoutBar() {
  const [cart, setCart] = useState<Cart | null>(null);
  const pathname = usePathname();

  const fetchCart = useCallback(async () => {
    try {
      const cartId = getCartIdFromCookie();
      if (!cartId) {
        setCart(null);
        return;
      }
      const fetchedCart = await getCart(cartId);
      setCart(fetchedCart);
    } catch {
      // silently ignore
    }
  }, []);

  useEffect(() => {
    fetchCart();

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    window.addEventListener("focus", handleCartUpdate); // also update when returning to app

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
      window.removeEventListener("focus", handleCartUpdate);
    };
  }, [fetchCart]);

  // Don't show if cart is empty or we are on the checkout page (we redirect anyway but just in case)
  if (!cart || cart.totalQuantity === 0 || pathname === "/checkout") {
    return null;
  }

  const subtotal = cart.cost.subtotalAmount;

  // Calculate if there's any discount
  const originalSubtotalAmount = cart.lines.edges.reduce((sum, { node }) => {
    const qty = node.quantity;
    const compareAt = node.merchandise.compareAtPrice;
    const price = node.merchandise.price;
    const lineItemOriginalPrice = compareAt ? parseFloat(compareAt.amount) : parseFloat(price.amount);
    return sum + lineItemOriginalPrice * qty;
  }, 0);

  const subtotalAmount = parseFloat(subtotal.amount);
  const showOriginal = originalSubtotalAmount > subtotalAmount;

  const handleCheckout = () => {
    if (!cart || cart.totalQuantity === 0) return;
    window.location.href = cart.checkoutUrl;
  };

  return (
    <div className={styles.mobileCheckoutBar}>
      <div className={styles.summaryRow}>
        <span className={styles.subtotalLabel}>Subtotal:</span>
        <div className={styles.priceContainer}>
          {showOriginal && (
            <span className={styles.originalValue}>
              {subtotal.currencyCode}{" "}
              {originalSubtotalAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          )}
          <span className={styles.totalValue}>
            {subtotal.currencyCode}{" "}
            {subtotalAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <button className={styles.checkoutBtn} onClick={handleCheckout}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.lockIcon}
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        CHECKOUT
      </button>

      <Link href="/" className={styles.continueShopping}>
        Continue Shopping
      </Link>
    </div>
  );
}
