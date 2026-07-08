import { ShopifyResponse } from "./shopify-types";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;

if (!domain || !token) {
  console.warn(
    "[shopify] NEXT_PUBLIC_SHOPIFY_DOMAIN or NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN is not set."
  );
}

const ENDPOINT = `https://${domain}/api/2025-01/graphql.json`;

/**
 * Generic Shopify Storefront API GraphQL fetch.
 * Throws on HTTP errors or GraphQL-level errors.
 */
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
    // Don't cache mutations; for queries Next.js can cache as needed.
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API HTTP error: ${res.status} ${res.statusText}`
    );
  }

  const json: ShopifyResponse<T> = await res.json();

  if (json.errors?.length) {
    throw new Error(
      `Shopify GraphQL error: ${json.errors.map((e) => e.message).join(", ")}`
    );
  }

  return json.data;
}
