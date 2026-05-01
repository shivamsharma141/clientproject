"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../component/Cartcontext.js";
import styles from "./cart.module.css";

// ═══════════════════════════════════════
// SVG ICONS
// ═══════════════════════════════════════
const CartIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const TrashIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);

const LockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InfoIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ═══════════════════════════════════════
// LOGIN TOAST
// ═══════════════════════════════════════
function LoginToast({ onClose, onLogin }) {
  return (
    <div className={styles.toastOverlay} onClick={onClose}>
      <div className={styles.toast} onClick={(e) => e.stopPropagation()}>

        {/* Close btn */}
        <button className={styles.toastClose} onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>

        {/* Icon */}
        <div className={styles.toastIconWrap}>
          <div className={styles.toastIconCircle}>
            <LockIcon />
          </div>
          <div className={styles.toastIconRing} />
        </div>

        {/* Text */}
        <div className={styles.toastBody}>
          <h3 className={styles.toastTitle}>Login Required</h3>
          <p className={styles.toastMsg}>
            Please log in to your account to proceed with your order.
          </p>
        </div>

        {/* Actions */}
        <div className={styles.toastActions}>
          <button className={styles.toastLoginBtn} onClick={onLogin}>
            Login Now
          </button>
          <button className={styles.toastCancelBtn} onClick={onClose}>
            Continue Browsing
          </button>
        </div>

      </div>
    </div>
  );
}

// ═══════════════════════════════════════
// MAIN CART PAGE
// ═══════════════════════════════════════
export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [showLoginToast, setShowLoginToast] = useState(false);

  const handleProceedToCheckout = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      const data = await res.json();
      if (!data.user) { setShowLoginToast(true); return; }
      router.push("/checkout");
    } catch {
      setShowLoginToast(true);
    }
  };

  const handleLoginRedirect = () => {
    setShowLoginToast(false);
    router.push("/loggin");
  };

  // ── Empty State ──────────────────────
  if (cartItems.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrap}>
              <CartIcon />
            </div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyText}>
              Looks like you haven&apos;t added anything yet. Explore our pure dairy products.
            </p>
            <a href="/home#products" className={styles.emptyBtn}>
              Shop Now &rarr;
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ── Filled Cart ──────────────────────
  return (
    <div className={styles.page}>
      {showLoginToast && (
        <LoginToast
          onClose={() => setShowLoginToast(false)}
          onLogin={handleLoginRedirect}
        />
      )}

      <div className={styles.container}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerLeft}>
            <h1 className={styles.pageTitle}>Your Cart</h1>
            <span className={styles.cartBadge}>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
          </div>
          <a href="/products" className={styles.continueLink}>
            <ArrowLeftIcon /> Continue Shopping
          </a>
        </div>

        <div className={styles.layout}>

          {/* ── LEFT: Items ── */}
          <div className={styles.itemsCol}>
            {cartItems.map((item) => (
              <div key={item.itemId} className={styles.cartCard}>

                {/* Image */}
                <div className={styles.itemImg}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} className={styles.itemImgEl} />
                  ) : (
                    <div className={styles.itemImgPlaceholder}>
                      <span className={styles.itemIcon}>{item.icon}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className={styles.itemInfo}>
                  {item.categoryLabel && (
                    <span className={styles.itemCategory}>{item.categoryLabel}</span>
                  )}
                  <p className={styles.itemName}>{item.name}</p>
                  {item.variantLabel && (
                    <p className={styles.itemVariant}>{item.variantLabel}</p>
                  )}
                </div>

                {/* Right side: price + controls */}
                <div className={styles.itemRight}>
                  <div className={styles.itemPriceBlock}>
                    <span className={styles.itemPrice}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                    <span className={styles.itemUnitPrice}>
                      ₹{item.price.toLocaleString("en-IN")} each
                    </span>
                  </div>

                  <div className={styles.itemActions}>
                    <div className={styles.qtyControl}>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.itemId, -1)}>−</button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.itemId, +1)}>+</button>
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => removeFromCart(item.itemId)}
                      aria-label="Remove item"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* ── RIGHT: Summary ── */}
          <div className={styles.summaryCol}>
            <div className={styles.summaryCard}>

              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryDivider} />

              <div className={styles.summaryLines}>
                {cartItems.map((item) => (
                  <div key={item.itemId} className={styles.summaryLine}>
                    <span className={styles.summaryLineLabel}>
                      {item.name}
                      <span className={styles.summaryQty}> × {item.quantity}</span>
                    </span>
                    <span className={styles.summaryLinePrice}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryLine}>
                <span className={styles.summaryLineLabel}>Delivery</span>
                <span className={styles.freeTag}>
                  <CheckIcon /> FREE
                </span>
              </div>

              <div className={styles.summaryDivider} />

              <div className={styles.summaryTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.summaryTotalAmount}>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* COD note */}
              <div className={styles.codNote}>
                <span className={styles.codIcon}><InfoIcon /></span>
                <span>COD available only in Delhi. Online payment available everywhere.</span>
              </div>

              <button className={styles.checkoutBtn} onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}