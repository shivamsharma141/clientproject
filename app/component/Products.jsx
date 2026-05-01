"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './product.module.css';
import { useCart } from '../component/Cartcontext.js';

// ── TABS ARRAY (IMPORTANT - Ye chahiye) ───────────────────────
const TABS = [
  { key: 'all', label: 'All Products' },
  { key: 'ghee', label: 'Ghee' },
  { key: 'oil', label: 'Cold Pressed Oils' },
  { key: 'butter', label: 'Butter' },
  { key: 'paneer', label: 'Paneer' },
];

// ── PRODUCTS WITH IMAGES (Unsplash URLs) ──────────────────────
const PRODUCTS = [
  {
    id: 'ghee-a2',
    category: 'ghee',
    categoryLabel: 'Ghee · A2 Desi Cow',
    name: 'A2 Desi Cow Bilona Ghee',
    badge: 'BESTSELLER',
    icon: '🫙',
    image: '/cowghee.png',
    variants: [
      { label: '250 ml (Trial Pack)', price: 650 },
      { label: '500 ml (Glass Jar)', price: 1200 },
      { label: '1 Ltr (Glass Jar)', price: 2200 },
      { label: '2.5 Ltr (Dolchi Pack)', price: 5250 },
      { label: '5 Ltr (Dolchi Pack)', price: 10000 },
    ],
  },
  {
    id: 'ghee-buffalo',
    category: 'ghee',
    categoryLabel: 'Ghee · Buffalo',
    name: 'Buffalo Bilona Ghee',
    badge: null,
    icon: '🫙',
    image: '/buffaloghee.png',
    variants: [
      { label: '250 ml', price: 450 },
      { label: '500 ml', price: 875 },
      { label: '1 Ltr', price: 1700 },
      { label: '2.5 Ltr', price: 4000 },
      { label: '5 Ltr', price: 7500 },
    ],
  },
  {
    id: 'oil-yellow',
    category: 'oil',
    categoryLabel: 'Oil · Yellow Mustard',
    name: 'Yellow Mustard Cold Pressed Oil',
    badge: null,
    icon: '🏺',
    image: '/mustardoil.png',
    variants: [
      { label: '1 Ltr (Glass Bottle)', price: 340 },
      { label: '2.5 Ltr (Dolchi Pack)', price: 800 },
      { label: '5 Ltr (Dolchi Pack)', price: 1500 },
    ],
  },
  {
    id: 'oil-black',
    category: 'oil',
    categoryLabel: 'Oil · Black Mustard',
    name: 'Black Mustard Cold Pressed Oil',
    badge: null,
    icon: '🫙',
    image: 'blackmustardoil.png',
    variants: [
      { label: '1 Ltr', price: 280 },
      { label: '2.5 Ltr', price: 650 },
      { label: '5 Ltr', price: 1250 },
    ],
  },
  {
    id: 'butter',
    category: 'butter',
    categoryLabel: 'Butter · Desi Butter',
    name: 'Pure Desi Butter (White)',
    badge: 'FRESH',
    icon: '🧈',
    image: 'whitebutter.png',
    variants: [
      { label: '100 gm (Box Pack)', price: 150 },
      { label: '250 gm (Box Pack)', price: 300 },
      { label: '500 gm', price: 550 },
      { label: '1 Kg', price: 950 },
    ],
  },
  {
    id: 'paneer',
    category: 'paneer',
    categoryLabel: 'Paneer · Vacuum Packed',
    name: 'Fresh Desi Paneer',
    badge: 'FRESH',
    icon: '🥛',
    image: 'paneer.png',
    variants: [
      { label: '500 gm (Poly Pack)', price: 260 },
      { label: '1 Kg (Poly Pack)', price: 470 },
    ],
  },
];

// ── Login Required Toast ──────────────────────────────────────
function LoginToast({ onClose, onLogin }) {
  return (
    <div className={styles.toastOverlay} onClick={onClose}>
      <div className={styles.toast} onClick={(e) => e.stopPropagation()}>
        <div className={styles.toastIcon}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#c9922a" strokeWidth="1.6" />
            <path d="M12 8v4M12 16h.01" stroke="#c9922a" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className={styles.toastContent}>
          <p className={styles.toastTitle}>Login Required</p>
          <p className={styles.toastMsg}>Please login to continue with your purchase.</p>
        </div>
        <div className={styles.toastActions}>
          <button className={styles.toastLoginBtn} onClick={onLogin}>
            Login Now
          </button>
          <button className={styles.toastCancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
        <button className={styles.toastClose} onClick={onClose} aria-label="Close">✕</button>
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────
function ProductCard({ product, onLoginRequired }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product, selectedVariant);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'include' });
      const data = await res.json();

      if (!data.user) {
        onLoginRequired();
        return;
      }

      addToCart(product, selectedVariant);
      router.push('/checkout');

    } catch {
      onLoginRequired();
    }
  };

  return (
    <div className={styles.card}>
      {product.badge && (
        <div className={`${styles.badge} ${styles[`badge${product.badge}`]}`}>
          {product.badge}
        </div>
      )}

      <div className={styles.cardImg}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.cardImgEl} />
        ) : (
          <div className={styles.cardImgPlaceholder}>
            <span className={styles.placeholderIcon}>{product.icon}</span>
            <span className={styles.placeholderText}>{product.name}</span>
            <span className={styles.placeholderHint}>Upload image → set image: '/path'</span>
          </div>
        )}
        <div className={styles.cardImgOverlay} />
      </div>

      <div className={styles.cardBody}>
        <p className={styles.cardType}>{product.categoryLabel}</p>
        <h3 className={styles.cardName}>{product.name}</h3>

        <div className={styles.variantList}>
          {product.variants.map((v, i) => (
            <button
              key={i}
              className={`${styles.variantRow} ${selectedVariant === i ? styles.variantSelected : ''}`}
              onClick={() => setSelectedVariant(i)}
            >
              <span className={styles.variantLabel}>{v.label}</span>
              <span className={styles.variantPrice}>
                <span className={styles.rupee}>₹</span>
                {v.price.toLocaleString('en-IN')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.selectedInfo}>
          <span className={styles.selectedLabel}>{product.variants[selectedVariant].label}</span>
          <span className={styles.selectedPrice}>
            ₹{product.variants[selectedVariant].price.toLocaleString('en-IN')}
          </span>
        </div>

        <div className={styles.btnRow}>
          <button
            className={`${styles.btnCart} ${added ? styles.btnAdded : ''}`}
            onClick={handleAddToCart}
          >
            {added ? (
              <>✓ &nbsp;Added!</>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                Cart
              </>
            )}
          </button>

          <button className={styles.btnBuy} onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Products Page ────────────────────────────────────────
export default function Products() {
  const [activeTab, setActiveTab] = useState('all');
  const [showLoginToast, setShowLoginToast] = useState(false);
  const router = useRouter();

  const filtered = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  const handleLoginRedirect = () => {
    setShowLoginToast(false);
    router.push('/loggin');
  };

  return (
    <section className={styles.section} id="shop">

      {showLoginToast && (
        <LoginToast
          onClose={() => setShowLoginToast(false)}
          onLogin={handleLoginRedirect}
        />
      )}

      <div className={styles.sectionLabel}>
        <span className={styles.labelLine} />
        OUR PRODUCTS
        <span className={styles.labelLine} />
      </div>
      <h2 className={styles.sectionTitle}>Handpicked Favourites</h2>
      <p className={styles.sectionSub}>
        From the purest A2 bilona ghee to fresh paneer — each product made
        with care, tradition, and zero compromise.
      </p>

      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.key}
            className={`${styles.tab} ${activeTab === t.key ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onLoginRequired={() => setShowLoginToast(true)}
          />
        ))}
      </div>
    </section>
  );
}