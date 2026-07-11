import { ShopifyResponse } from "./shopify-types";

const rawDomain = (process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || "").trim();
const token = (process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN || "").trim();

// Strip https:// or http:// and any trailing slashes just in case they were added in Vercel
const domain = rawDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");

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
    cache: "no-store",
  }).catch((err) => {
    throw new Error(`Failed to fetch from Endpoint: [${ENDPOINT}]. Env domain: [${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}]. Env token: [${token ? "set" : "missing"}]. Raw error: ${err.message}`);
  });

  if (!res.ok) {
    throw new Error(
      `Shopify Storefront API HTTP error: ${res.status} ${res.statusText} at ${ENDPOINT}`
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
