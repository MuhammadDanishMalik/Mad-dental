"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCart, addToCart } from "@/lib/cart";
import { getCartIdFromCookie, setCartIdCookie } from "@/lib/cart-cookie";
import styles from "@/app/products/[slug]/page.module.css";

export default function AddToCartControls({ variantId }: { variantId: string }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);

  const handleAddToCart = async (redirect: boolean) => {
    if (!variantId) {
      setCartError("No Shopify variant ID found.");
      return;
    }
    setCartLoading(true);
    setCartError(null);
    try {
      const existingCartId = getCartIdFromCookie();
      let cart;
      if (existingCartId) {
        cart = await addToCart(existingCartId, variantId, qty);
      } else {
        cart = await createCart([{ merchandiseId: variantId, quantity: qty }]);
      }
      setCartIdCookie(cart.id);
      if (redirect) {
        // "Buy it now" → go straight to Shopify checkout
        const url = new URL(cart.checkoutUrl);
        url.hostname = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "maddantalcares.myshopify.com";
        window.location.href = url.toString();
      } else {
        // "Add to cart" → go to cart page
        router.push("/cart");
      }
    } catch (err) {
      console.error(err);
      setCartError(err instanceof Error ? err.message : "Failed to add to cart.");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <>
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
      {cartError && <p className={styles.cartErrorMsg}>{cartError}</p>}

      <button
        className={styles.addToCart}
        id="add-to-cart-btn"
        onClick={() => handleAddToCart(false)}
        disabled={cartLoading}
      >
        {cartLoading ? "Adding…" : "Add to cart"}
      </button>

      <button
        className={styles.buyNow}
        id="buy-now-btn"
        onClick={() => handleAddToCart(true)}
        disabled={cartLoading}
      >
        Buy it now
      </button>

      {/* Sticky footer for mobile */}
      <div className={styles.stickyFooter}>
        <button
          className={styles.stickyAddToCart}
          onClick={() => handleAddToCart(false)}
          disabled={cartLoading}
        >
          {cartLoading ? "Adding…" : "Add to cart"}
        </button>
      </div>
    </>
  );
}
