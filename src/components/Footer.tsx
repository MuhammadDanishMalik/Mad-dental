"use client";

import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.container}>
          <div className={styles.logoCol}>
            <Image 
              src="/logo.png" 
              alt="Mad Dental" 
              width={180} 
              height={60} 
              style={{ objectFit: 'contain' }}
            />
          </div>
          
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>QUICK LINKS</h3>
            <Link href="/">HOME</Link>
            <Link href="/">SHOP NOW</Link>
            <Link href="/">BUNDLE & SAVE</Link>
            <Link href="/">EXPLORE</Link>
          </div>
          
          <div className={styles.linksCol}>
            <h3 className={styles.colTitle}>INFORMATION</h3>
            <Link href="/">PRIVACY POLICY</Link>
            <Link href="/">REFUND POLICY</Link>
            <Link href="/">SHIPPING POLICY</Link>
            <Link href="/">TERMS OF SERVICE</Link>
            <Link href="/">CONTACT US</Link>
          </div>
          
          <div className={styles.socialCol}>
            <h3 className={styles.colTitle}>STAY FRESH. STAY CONNECTED.</h3>
            <div className={styles.socialIcons}>
              <a href="https://www.facebook.com/people/Mad-Dental-Care/61564797954833/" target="_blank" rel="noopener noreferrer" className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
              <a href="https://www.instagram.com/maddentalcare/" target="_blank" rel="noopener noreferrer" className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.youtube.com/@MadDentalsCare" target="_blank" rel="noopener noreferrer" className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21.582 6.186c-.23-.86-.908-1.538-1.768-1.768C18.254 4 12 4 12 4s-6.254 0-7.814.418c-.86.23-1.538.908-1.768 1.768C2 7.746 2 12 2 12s0 4.254.418 5.814c.23.86.908 1.538 1.768 1.768C7.746 20 12 20 12 20s6.254 0 7.814-.418c.86-.23 1.538-.908 1.768-1.768C22 16.254 22 12 22 12s0-4.254-.418-5.814zM10 15V9l5.2 3-5.2 3z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@maddentalcare_" target="_blank" rel="noopener noreferrer" className={styles.iconCircle}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.24-2.37.59-4.84 2.27-6.51 1.74-1.74 4.18-2.62 6.64-2.36v4.06c-1.22-.24-2.5-.02-3.55.59-1.27.75-2.09 2.15-2.12 3.63-.03 1.48.74 2.91 1.99 3.69 1.13.71 2.53.86 3.79.43 1.25-.43 2.19-1.46 2.44-2.76.12-.66.11-1.34.11-2.01V.02h4.03v.02z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.bottomSection}>
        <div className={styles.bottomContainer}>
          <div className={styles.copyright}>© MAD DENTAL 2026</div>
          <button className={styles.topBtn} onClick={scrollToTop} aria-label="Scroll to top">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="19" x2="12" y2="5"></line>
              <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
