// ─── Money ───────────────────────────────────────────────────────────────────
export interface Money {
  amount: string;
  currencyCode: string;
}

// ─── Cart Line ────────────────────────────────────────────────────────────────
export interface CartLineMerchandise {
  id: string;            // variant GID
  title: string;         // variant title e.g. "Default Title"
  price: Money;
  compareAtPrice: Money | null;
  product: {
    title: string;       // product title
    featuredImage: {
      url: string;
      altText: string | null;
    } | null;
  };
}

export interface CartLine {
  id: string;            // line GID
  quantity: number;
  merchandise: CartLineMerchandise;
  cost: {
    totalAmount: Money;
  };
}

// ─── Cart Cost ────────────────────────────────────────────────────────────────
export interface CartCost {
  subtotalAmount: Money;
  totalAmount: Money;
  totalTaxAmount: Money | null;
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface Cart {
  id: string;
  checkoutUrl: string;
  cost: CartCost;
  lines: {
    edges: Array<{
      node: CartLine;
    }>;
  };
  totalQuantity: number;
}

// ─── Storefront API response wrapper ─────────────────────────────────────────
export interface ShopifyResponse<T> {
  data: T;
  errors?: Array<{ message: string }>;
}

// ─── Cart mutation response shapes ───────────────────────────────────────────
export interface CartCreateData {
  cartCreate: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

export interface CartLinesAddData {
  cartLinesAdd: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

export interface CartLinesUpdateData {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

export interface CartLinesRemoveData {
  cartLinesRemove: {
    cart: Cart;
    userErrors: Array<{ field: string[]; message: string }>;
  };
}

export interface CartQueryData {
  cart: Cart | null;
}

// ─── Input helpers ────────────────────────────────────────────────────────────
export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}
