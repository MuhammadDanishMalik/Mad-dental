"use client";

/**
 * Checkout page — no custom payment form.
 *
 * On mount this page:
 *  1. Reads the Shopify cartId from the cookie.
 *  2. Fetches the live cart via getCart().
 *  3. Immediately redirects to cart.checkoutUrl — Shopify's hosted,
 *     PCI-compliant checkout where the customer enters shipping & payment.
 *     Shopify creates the order automatically; no extra code needed here.
 *
 * If the cart is empty or missing the user is shown an error with a
 * "Go to Cart" link instead of a dead redirect.
 */

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { getCart } from "@/lib/cart";
import { getCartIdFromCookie } from "@/lib/cart-cookie";
import styles from "./page.module.css";

type Status = "loading" | "redirecting" | "empty" | "error";

function CheckoutRedirect() {
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function redirect() {
      try {
        // 1. Read persisted cartId from cookie
        const cartId = getCartIdFromCookie();

        if (!cartId) {
          setStatus("empty");
          return;
        }

        // 2. Fetch live cart from Shopify
        const cart = await getCart(cartId);

        // 3. Guard: empty or missing cart
        if (!cart || cart.totalQuantity === 0) {
          setStatus("empty");
          return;
        }

        // 4. ✅ THE REDIRECT — send browser to Shopify's hosted checkout
        setStatus("redirecting");
        
        const url = new URL(cart.checkoutUrl);
        url.hostname = (process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "maddantalcares.myshopify.com").trim();
        window.location.href = url.toString();

      } catch (err) {
        console.error("[checkout] redirect error:", err);
        setErrorMsg(
          err instanceof Error ? err.message : "An unexpected error occurred."
        );
        setStatus("error");
      }
    }

    redirect();
  }, []);

  // ── Loading / redirecting ──────────────────────────────────────────────────
  if (status === "loading" || status === "redirecting") {
    return (
      <div className={styles.centerScreen}>
        <div className={styles.spinner} />
        <p className={styles.redirectMsg}>
          {status === "loading"
            ? "Preparing your checkout…"
            : "Redirecting to secure checkout…"}
        </p>
        <p className={styles.redirectSub}>
          You are being sent to Shopify&apos;s secure, PCI-compliant payment page.
        </p>
      </div>
    );
  }

  // ── Empty cart ─────────────────────────────────────────────────────────────
  if (status === "empty") {
    return (
      <div className={styles.centerScreen}>
        <div className={styles.emptyIcon}>🛒</div>
        <h1 className={styles.emptyTitle}>Your cart is empty</h1>
        <p className={styles.emptyText}>
          Add items to your cart before checking out.
        </p>
        <Link href="/cart" className={styles.actionBtn} id="go-to-cart-btn">
          Go to Cart
        </Link>
        <Link href="/" className={styles.secondaryBtn}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.centerScreen}>
      <div className={styles.errorIcon}>⚠️</div>
      <h1 className={styles.emptyTitle}>Checkout unavailable</h1>
      <p className={styles.emptyText}>{errorMsg}</p>
      <Link href="/cart" className={styles.actionBtn} id="go-to-cart-error-btn">
        Return to Cart
      </Link>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.centerScreen}>
          <div className={styles.spinner} />
          <p className={styles.redirectMsg}>Loading…</p>
        </div>
      }
    >
      <CheckoutRedirect />
    </Suspense>
  );
}
