import { shopifyFetch } from "./shopify";
import {
  Cart,
  CartCreateData,
  CartLinesAddData,
  CartLinesRemoveData,
  CartLinesUpdateData,
  CartLineInput,
  CartQueryData,
} from "./shopify-types";

// ─── Shared fragment ──────────────────────────────────────────────────────────
// Reused in every mutation/query that returns a Cart object.
const CART_FIELDS = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount    { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                featuredImage { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

// ─── createCart ───────────────────────────────────────────────────────────────

/**
 * Create a new Shopify cart with one or more line items.
 * Returns the full Cart object including checkoutUrl.
 */
export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FIELDS}
    mutation cartCreate($lines: [CartLineInput!]!) {
      cartCreate(input: { lines: $lines }) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<CartCreateData>(query, { lines });

  if (data.cartCreate.userErrors.length) {
    throw new Error(
      data.cartCreate.userErrors.map((e) => e.message).join(", ")
    );
  }

  return data.cartCreate.cart;
}

// ─── addToCart ────────────────────────────────────────────────────────────────

/**
 * Add a variant to an existing cart.
 * Returns the updated Cart.
 */
export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FIELDS}
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<CartLinesAddData>(query, {
    cartId,
    lines: [{ merchandiseId, quantity }],
  });

  if (data.cartLinesAdd.userErrors.length) {
    throw new Error(
      data.cartLinesAdd.userErrors.map((e) => e.message).join(", ")
    );
  }

  return data.cartLinesAdd.cart;
}

// ─── updateCartLine ───────────────────────────────────────────────────────────

/**
 * Update the quantity of a specific line in the cart.
 * Setting quantity to 0 effectively removes the line.
 * Returns the updated Cart.
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FIELDS}
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<CartLinesUpdateData>(query, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  if (data.cartLinesUpdate.userErrors.length) {
    throw new Error(
      data.cartLinesUpdate.userErrors.map((e) => e.message).join(", ")
    );
  }

  return data.cartLinesUpdate.cart;
}

// ─── removeFromCart ───────────────────────────────────────────────────────────

/**
 * Remove a line item from the cart entirely.
 * Returns the updated Cart.
 */
export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const query = /* GraphQL */ `
    ${CART_FIELDS}
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart { ...CartFields }
        userErrors { field message }
      }
    }
  `;

  const data = await shopifyFetch<CartLinesRemoveData>(query, {
    cartId,
    lineIds: [lineId],
  });

  if (data.cartLinesRemove.userErrors.length) {
    throw new Error(
      data.cartLinesRemove.userErrors.map((e) => e.message).join(", ")
    );
  }

  return data.cartLinesRemove.cart;
}

// ─── getCart ──────────────────────────────────────────────────────────────────

/**
 * Fetch a cart by ID.
 * Returns the Cart (with lines, costs, and checkoutUrl) or null if not found.
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const query = /* GraphQL */ `
    ${CART_FIELDS}
    query getCart($cartId: ID!) {
      cart(id: $cartId) { ...CartFields }
    }
  `;

  const data = await shopifyFetch<CartQueryData>(query, { cartId });
  return data.cart ?? null;
}
