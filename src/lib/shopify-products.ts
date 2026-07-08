import { shopifyFetch } from "./shopify";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  price: ShopifyMoney;
  compareAtPrice: ShopifyMoney | null;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ShopifyImage | null;
  images: { edges: Array<{ node: ShopifyImage }> };
  variants: { edges: Array<{ node: ShopifyVariant }> };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  tags: string[];
}

// ─── Shared fragment ──────────────────────────────────────────────────────────

const PRODUCT_FIELDS = /* GraphQL */ `
  fragment ProductFields on Product {
    id
    title
    handle
    description
    descriptionHtml
    tags
    featuredImage { url altText }
    images(first: 5) { edges { node { url altText } } }
    priceRange {
      minVariantPrice { amount currencyCode }
      maxVariantPrice { amount currencyCode }
    }
    compareAtPriceRange {
      minVariantPrice { amount currencyCode }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          price { amount currencyCode }
          compareAtPrice { amount currencyCode }
        }
      }
    }
  }
`;

// ─── getProducts ──────────────────────────────────────────────────────────────

interface ProductsData {
  products: { edges: Array<{ node: ShopifyProduct }> };
}

/**
 * Fetch up to `first` products from Shopify (default 20).
 * Sorted by relevance (Shopify default).
 */
export async function getProducts(first = 20): Promise<ShopifyProduct[]> {
  const query = /* GraphQL */ `
    ${PRODUCT_FIELDS}
    query getProducts($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges { node { ...ProductFields } }
      }
    }
  `;
  const data = await shopifyFetch<ProductsData>(query, { first });
  return data.products.edges.map((e) => e.node);
}

// ─── getProductByHandle ───────────────────────────────────────────────────────

interface ProductByHandleData {
  product: ShopifyProduct | null;
}

/**
 * Fetch a single product by its Shopify handle.
 * Returns null if not found.
 */
export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const query = /* GraphQL */ `
    ${PRODUCT_FIELDS}
    query getProductByHandle($handle: String!) {
      product(handle: $handle) { ...ProductFields }
    }
  `;
  const data = await shopifyFetch<ProductByHandleData>(query, { handle });
  return data.product ?? null;
}
