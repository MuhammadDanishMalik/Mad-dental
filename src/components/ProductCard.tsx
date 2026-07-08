"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/products";
import styles from "./ProductCard.module.css";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter();

  return (
    <Link href={`/products/${product.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <span className={styles.badge}>{product.badge}</span>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <div className={styles.body}>
        <p className={styles.title}>{product.title}</p>
        <div className={styles.priceRow}>
          <span className={styles.originalPrice}>
            Rs.{product.originalPrice.toLocaleString()}.00
          </span>
          <span className={styles.salePrice}>
            Rs.{product.salePrice.toLocaleString()}.00
          </span>
        </div>
        <button
          className={styles.cartBtn}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/checkout?product=${product.slug}&qty=1`);
          }}
        >
          Add to cart
        </button>
      </div>
    </Link>
  );
}
