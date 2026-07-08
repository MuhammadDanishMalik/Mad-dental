/**
 * Cart cookie helpers — works in both browser (document.cookie) and
 * server components/route handlers (next/headers).
 *
 * The cart ID is stored in a cookie named "shopify_cart_id".
 * Max-age: 30 days — matches Shopify's own cart expiry.
 */

const COOKIE_NAME = "shopify_cart_id";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

// ─── Browser-side helpers ─────────────────────────────────────────────────────

/** Read cart ID from document.cookie (client components only). */
export function getCartIdFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/** Write cart ID to document.cookie (client components only). */
export function setCartIdCookie(cartId: string): void {
  if (typeof document === "undefined") return;
  document.cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(cartId)}`,
    `Max-Age=${MAX_AGE}`,
    "Path=/",
    "SameSite=Lax",
    // Add Secure in production (HTTPS)
    process.env.NODE_ENV === "production" ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Remove the cart cookie (client components only). */
export function clearCartIdCookie(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=; Max-Age=0; Path=/`;
}

// ─── Server-side helpers (Next.js App Router) ─────────────────────────────────
// Import inside functions to avoid bundling next/headers in client bundles.

/**
 * Read cart ID from the incoming request cookie (Server Components / Route Handlers).
 * Returns null if not found.
 */
export async function getCartIdFromServerCookie(): Promise<string | null> {
  try {
    const { cookies } = await import("next/headers");
    const store = await cookies();
    return store.get(COOKIE_NAME)?.value ?? null;
  } catch {
    return null;
  }
}
