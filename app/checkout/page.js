"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../component/Cartcontext.js";
import styles from "./checkout.module.css";

const UPI_ID          = "7982706406@pthdfc";
const MERCHANT_NAME   = "Yashodha Dairy Farmin";
const WHATSAPP_NUMBER = "918506000615";

const DELHI_KEYWORDS = [
  "delhi","new delhi","north delhi","south delhi",
  "east delhi","west delhi","central delhi","ndmc",
];
const DELHI_PINCODES = new Set(
  Array.from({ length: 99 }, (_, i) => `1100${String(i + 1).padStart(2, "0")}`)
);

function checkDelhi(city = "", pincode = "") {
  const c = city.toLowerCase().trim();
  const p = pincode.trim();
  return DELHI_KEYWORDS.some((k) => c.includes(k)) || DELHI_PINCODES.has(p);
}

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);
}

function buildUpiUrl(amount, orderId) {
  const note = encodeURIComponent(`Order #${orderId} - ${MERCHANT_NAME}`);
  return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&cu=INR&tn=${note}`;
}

// ── SVG Icons ──────────────────────────────────────────────────
const IconCheck = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#22c55e" />
    <path d="M4 7.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWarn = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="6" stroke="#ef4444" strokeWidth="1.3" />
    <path d="M6.5 4v3M6.5 9h.01" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

const IconUPI = () => (
  <svg width="32" height="32" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="10" fill="#1a1a2e" />
    <text x="24" y="31" textAnchor="middle" fill="#f0b429" fontSize="15" fontWeight="800" fontFamily="Georgia,serif">UPI</text>
  </svg>
);

const IconCOD = () => (
  <svg width="32" height="32" viewBox="0 0 48 48">
    <rect width="48" height="48" rx="10" fill="#78350f" />
    <circle cx="24" cy="24" r="11" stroke="#fbbf24" strokeWidth="2.2" fill="none" />
    <path d="M24 17v14M18 24h12" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

const IconWA = () => (
  <svg width="19" height="19" viewBox="0 0 32 32">
    <circle cx="16" cy="16" r="16" fill="#25D366" />
    <path d="M22.5 9.5A9.1 9.1 0 0 0 7.2 20.4L6 26l5.8-1.5a9 9 0 0 0 4.3 1.1 9.1 9.1 0 0 0 6.4-15.6z" fill="#fff" />
    <path d="M20.5 18.9c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.8.9c-.1.2-.3.2-.5.1a7.5 7.5 0 0 1-3.8-3.3c-.1-.3 0-.4.2-.6l.5-.6.2-.4-1-2.3c-.3-.6-.5-.5-.7-.5h-.5c-.2 0-.5.1-.7.3a3.6 3.6 0 0 0-1.1 2.7c0 1.6 1.1 3.1 1.2 3.3.2.2 2.2 3.4 5.4 4.7.8.3 1.4.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" fill="#25D366" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconCard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </svg>
);

const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7a5800" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconScan = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
);

const IconParty = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22l-4-9-9-4 20-7z" />
  </svg>
);

const IconOrderId = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

// ── Warning Banner ─────────────────────────────────────────────
function WaBanner({ text }) {
  return (
    <div style={{
      background: "#fff8e1", border: "1px solid #ffe082", borderRadius: 10,
      padding: "11px 16px", fontSize: "0.78rem", color: "#7a5800",
      lineHeight: 1.7, display: "flex", gap: 9, alignItems: "flex-start",
    }}>
      <span style={{ flexShrink: 0, marginTop: 1 }}><IconAlert /></span>
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

// ── UPI QR Modal ───────────────────────────────────────────────
function UpiModal({ upiUrl, amount, onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    import("qrcode").then((QRCode) => {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, upiUrl, {
          width: 220,
          margin: 2,
          color: { dark: "#1a2e1b", light: "#fdfaf5" },
        });
      }
    });
  }, [upiUrl]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(0,0,0,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fdfaf5", borderRadius: 18, padding: "32px 28px",
          textAlign: "center", maxWidth: 300, width: "90%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 4 }}>
          <IconScan />
          <div style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8a7a6a" }}>
            Scan to Pay
          </div>
        </div>
        <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "#1a2e1b", marginBottom: 18 }}>
          ₹{amount.toLocaleString("en-IN")}
        </div>
        <canvas ref={canvasRef} style={{ borderRadius: 10, display: "block", margin: "0 auto" }} />
        <p style={{ fontSize: "0.78rem", color: "#9a8a78", marginTop: 16, lineHeight: 1.6, marginBottom: 4 }}>
          Scan with GPay, PhonePe, Paytm or any UPI app
        </p>
        <div style={{ fontSize: "0.7rem", color: "#bbb", wordBreak: "break-all", marginBottom: 14 }}>
          {UPI_ID}
        </div>
        <WaBanner text="<strong>Your order will only be confirmed after you send a WhatsApp message.</strong> Please do not skip that step after closing this." />
        <button
          onClick={onClose}
          style={{
            marginTop: 16, width: "100%", padding: "11px 0", borderRadius: 10,
            border: "1.5px solid #ddd6c8", background: "transparent",
            fontSize: "0.88rem", color: "#6b5e50", cursor: "pointer",
          }}
        >
          Payment Done — Close
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const {
    cartItems,
    cartSubtotal,
    cartTotal,
    discountAmount,
    promoApplied,
    promoCode,
  } = useCart();

  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    address: "", city: "", pincode: "",
  });
  const [touched, setTouched]       = useState({});
  const [payMethod, setPayMethod]   = useState("upi");
  const [isDelhi, setIsDelhi]       = useState(false);
  const [step, setStep]             = useState("form");
  const [loading, setLoading]       = useState(false);
  const [savedOrder, setSavedOrder] = useState(null);
  const [mounted, setMounted]       = useState(false);
  const [qrUrl, setQrUrl]           = useState(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (mounted && cartItems.length === 0) router.push("/cart");
  }, [cartItems, mounted, router]);

  useEffect(() => {
    const d = checkDelhi(form.city, form.pincode);
    setIsDelhi(d);
    if (!d && payMethod === "cod") setPayMethod("upi");
  }, [form.city, form.pincode]);

  const rules = {
    fullName: (v) => !v.trim() ? "Full name is required" : v.trim().length < 2 ? "Name is too short" : "",
    phone:    (v) => !/^\d{10}$/.test(v.trim()) ? "Enter a valid 10-digit number" : "",
    email:    (v) => v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "Enter a valid email" : "",
    address:  (v) => !v.trim() ? "Address is required" : v.trim().length < 10 ? "Please enter your full address" : "",
    city:     (v) => !v.trim() ? "City is required" : "",
    pincode:  (v) => !/^\d{6}$/.test(v.trim()) ? "Enter a valid 6-digit pincode" : "",
  };
  const errOf  = (f) => (touched[f] ? rules[f](form[f]) : "");
  const allOk  = Object.keys(rules).every((f) => !rules[f](form[f]));
  const formOk = ["fullName","phone","address","city","pincode"].every((f) => !rules[f](form[f]));

  const touch    = (name) => setTouched((p) => ({ ...p, [name]: true }));
  const touchAll = () =>
    setTouched(Object.keys(rules).reduce((a, k) => ({ ...a, [k]: true }), {}));

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "phone" || name === "pincode") && !/^\d*$/.test(value)) return;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleReview = () => {
    touchAll();
    if (!allOk) return;
    setStep("review");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: cartItems,
          subtotal: cartSubtotal,
          discountAmount,
          promoCode: promoApplied ? promoCode : null,
          total: cartTotal,
          paymentMethod: payMethod.toUpperCase(),
          status: payMethod === "cod" ? "confirmed" : "pending_payment",
        }),
      });

      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setSavedOrder(data.order);

      if (payMethod === "upi") {
        const orderId = data.order._id?.toString().slice(-6).toUpperCase() || "000000";
        const upiUrl  = buildUpiUrl(cartTotal, orderId);

        if (isMobile()) {
          window.location.href = upiUrl;
          setTimeout(() => setStep("done"), 1500);
        } else {
          setQrUrl(upiUrl);
        }
      } else {
        setStep("done");
      }
    } catch (err) {
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQRClose = () => {
    setQrUrl(null);
    setStep("done");
  };

  const openWhatsApp = () => {
    const orderId = savedOrder?._id?.toString().slice(-6).toUpperCase() || "—";
    const lines = cartItems
      .map((i) => `  • ${i.name} ×${i.quantity}  ₹${(i.price * i.quantity).toLocaleString("en-IN")}`)
      .join("\n");
    const promoLine = promoApplied
      ? `Promo Code: ${promoCode} (−₹${discountAmount.toLocaleString("en-IN")})\n`
      : "";
    const msg =
      `Order Confirmation\n` +
      `Order ID: #${orderId}\n\n` +
      `${form.fullName}\n` +
      `Phone: ${form.phone}\n` +
      `Address: ${form.address}, ${form.city} – ${form.pincode}\n\n` +
      `Items:\n${lines}\n\n` +
      `Subtotal: ₹${cartSubtotal.toLocaleString("en-IN")}\n` +
      promoLine +
      `Total: ₹${cartTotal.toLocaleString("en-IN")}\n` +
      `Payment: ${payMethod === "cod" ? "Cash on Delivery" : "UPI"}\n\n` +
      `Please confirm my order.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (!mounted || cartItems.length === 0) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>

        {/* Progress Bar */}
        <div className={styles.progress}>
          {["Details", "Review", "Payment"].map((label, i) => {
            const idx = ["form","review","done"].indexOf(step);
            const done = i < idx;
            const active = i === idx;
            return (
              <div key={label} className={styles.progressItem}>
                <div className={`${styles.progressDot} ${active ? styles.progressActive : done ? styles.progressDone : ""}`}>
                  {done ? "✓" : i + 1}
                </div>
                <span className={`${styles.progressLabel} ${active ? styles.progressLabelActive : ""}`}>{label}</span>
                {i < 2 && <div className={`${styles.progressLine} ${done ? styles.progressLineDone : ""}`} />}
              </div>
            );
          })}
        </div>

        <h1 className={styles.title}>Checkout</h1>

        <div style={{ marginBottom: 24 }}>
          <WaBanner text="<strong>Your order will only be confirmed after you send a WhatsApp message.</strong> After placing your order, tap <strong>'Confirm Order on WhatsApp'</strong> — without this step your order will not be processed." />
        </div>

        {/* ════ STEP 1 — FORM ════ */}
        {step === "form" && (
          <div className={styles.grid}>
            <div className={styles.left}>

              <section className={styles.card}>
                <h2 className={styles.cardTitle}>
                  <IconUser /> Customer Details
                </h2>

                <F label="Full Name" required err={errOf("fullName")}>
                  <I name="fullName" placeholder="Your full name" value={form.fullName}
                    onChange={handleChange} onBlur={() => touch("fullName")}
                    ok={!errOf("fullName") && touched.fullName && form.fullName}
                    err={!!errOf("fullName")} />
                </F>

                <div className={styles.row2}>
                  <F label="Phone" required err={errOf("phone")}>
                    <I name="phone" placeholder="10-digit number" value={form.phone} maxLength={10}
                      onChange={handleChange} onBlur={() => touch("phone")}
                      ok={!errOf("phone") && touched.phone && form.phone}
                      err={!!errOf("phone")} />
                  </F>
                  <F label="Email" err={errOf("email")}>
                    <I name="email" placeholder="Optional" value={form.email}
                      onChange={handleChange} onBlur={() => touch("email")}
                      ok={!errOf("email") && touched.email && form.email}
                      err={!!errOf("email")} />
                  </F>
                </div>
              </section>

              <section className={styles.card}>
                <h2 className={styles.cardTitle}>
                  <IconLocation /> Delivery Address
                </h2>

                <F label="Full Address" required err={errOf("address")}>
                  <div className={styles.inputWrap}>
                    <textarea
                      className={`${styles.textarea}${errOf("address") ? " " + styles.inputErr : !errOf("address") && touched.address && form.address ? " " + styles.inputOk : ""}`}
                      name="address" placeholder="House/flat no., street, area, landmark..."
                      value={form.address} onChange={handleChange} onBlur={() => touch("address")}
                    />
                  </div>
                </F>

                <div className={styles.row2}>
                  <F label="City" required err={errOf("city")}>
                    <div className={styles.inputWrap}>
                      <I name="city" placeholder="City" value={form.city}
                        onChange={handleChange} onBlur={() => touch("city")}
                        ok={!errOf("city") && touched.city && form.city}
                        err={!!errOf("city")} />
                      {isDelhi && <span className={styles.delhiBadge}>Delhi ✓</span>}
                    </div>
                  </F>
                  <F label="Pincode" required err={errOf("pincode")}>
                    <I name="pincode" placeholder="6-digit" value={form.pincode} maxLength={6}
                      onChange={handleChange} onBlur={() => touch("pincode")}
                      ok={!errOf("pincode") && touched.pincode && form.pincode}
                      err={!!errOf("pincode")} />
                  </F>
                </div>
              </section>

              {formOk && (
                <section className={`${styles.card} ${styles.cardAnimate}`}>
                  <h2 className={styles.cardTitle}>
                    <IconCard /> Payment Method
                  </h2>

                  <div
                    className={`${styles.payOpt} ${payMethod === "upi" ? styles.payOptSelected : ""}`}
                    onClick={() => setPayMethod("upi")}
                  >
                    <input type="radio" className={styles.radio} readOnly checked={payMethod === "upi"} />
                    <IconUPI />
                    <div className={styles.payInfo}>
                      <div className={styles.payName}>Pay via UPI</div>
                      <div className={styles.paySub}>GPay · PhonePe · Paytm · any UPI app</div>
                    </div>
                    <span className={styles.payBadge}>Instant</span>
                  </div>

                  {isDelhi && (
                    <div
                      className={`${styles.payOpt} ${payMethod === "cod" ? styles.payOptSelected : ""}`}
                      onClick={() => setPayMethod("cod")}
                    >
                      <input type="radio" className={styles.radio} readOnly checked={payMethod === "cod"} />
                      <IconCOD />
                      <div className={styles.payInfo}>
                        <div className={styles.payName}>Cash on Delivery</div>
                        <div className={styles.paySub}>Pay cash at delivery · Delhi only</div>
                      </div>
                    </div>
                  )}

                  <p style={{ fontSize: "0.74rem", color: "#9a8a78", marginTop: 14, lineHeight: 1.6 }}>
                    After payment, you must confirm your order on WhatsApp. Your order is not final until we receive your WhatsApp message.
                  </p>
                </section>
              )}
            </div>

            <div className={styles.right}>
              <div className={styles.summary}>
                <h2 className={styles.summaryTitle}>Order Summary</h2>

                {cartItems.map((item) => (
                  <div className={styles.summaryItem} key={item.itemId}>
                    <div>
                      <div className={styles.iName}>{item.name}</div>
                      <div className={styles.iQty}>Qty: {item.quantity}</div>
                    </div>
                    <div className={styles.iPrice}>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}

                <div className={styles.divider} />

                <div className={styles.summaryItem}>
                  <div><div className={styles.iName}>Subtotal</div></div>
                  <div className={styles.iPrice}>₹{cartSubtotal.toLocaleString("en-IN")}</div>
                </div>
{promoApplied && (
  <div className={styles.summaryItem}>
    <div>
      <div className={styles.iName} style={{ color: "#1d6b3f" }}>
        Promo: {promoCode}
      </div>
      <div className={styles.iQty}>{Math.round((discountAmount / cartSubtotal) * 100)}% discount applied</div>
    </div>
    <div className={styles.iPrice} style={{ color: "#1d6b3f" }}>
      − ₹{discountAmount.toLocaleString("en-IN")}
    </div>
  </div>
)}

                <div className={styles.divider} />
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total</span>
                  <span className={styles.totalAmt}>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>

                <button className={styles.ctaBtn} onClick={handleReview}>
                  Review Order &nbsp;<IconArrow />
                </button>

                {!formOk && <p className={styles.hint}>Please fill all required fields</p>}

                <p style={{ fontSize: "0.72rem", color: "#b0a090", marginTop: 14, textAlign: "center", lineHeight: 1.6 }}>
                  Order confirmed only after WhatsApp message
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ════ STEP 2 — REVIEW ════ */}
        {step === "review" && (
          <div className={styles.reviewWrap}>
            <div className={styles.reviewCard}>
              <h2 className={styles.reviewTitle}>Order Review</h2>
              <p className={styles.reviewSub}>Please check everything before paying</p>

              <div className={styles.reviewSection}>
                <div className={styles.reviewSectionTitle}>Customer</div>
                <Row k="Name"  v={form.fullName} />
                <Row k="Phone" v={form.phone} />
                {form.email && <Row k="Email" v={form.email} />}
              </div>

              <div className={styles.reviewSection}>
                <div className={styles.reviewSectionTitle}>Delivery</div>
                <Row k="Address" v={form.address} />
                <Row k="City"    v={`${form.city} – ${form.pincode}`} />
              </div>

              <div className={styles.reviewSection}>
                <div className={styles.reviewSectionTitle}>Items</div>
                {cartItems.map((item) => (
                  <Row
                    key={item.itemId}
                    k={`${item.name} ×${item.quantity}`}
                    v={`₹${(item.price * item.quantity).toLocaleString("en-IN")}`}
                  />
                ))}
                {promoApplied && (
                  <Row
                    k={`Promo (${promoCode})`}
                    v={`− ₹${discountAmount.toLocaleString("en-IN")}`}
                  />
                )}
                <div className={styles.reviewTotal}>
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className={styles.reviewSection}>
                <div className={styles.reviewSectionTitle}>Payment</div>
                <Row k="Method" v={payMethod === "cod" ? "Cash on Delivery" : "UPI"} />
              </div>

              <div style={{ margin: "16px 0" }}>
                <WaBanner text="<strong>Important:</strong> Your order will only be confirmed after you tap <strong>'Confirm on WhatsApp'</strong> below. Do not skip this step." />
              </div>

              <div className={styles.reviewActions}>
                {payMethod === "upi" ? (
                  <button
                    className={`${styles.ctaBtn} ${styles.upiBtn}`}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    <IconUPI />
                    {loading ? "Processing..." : `Pay ₹${cartTotal.toLocaleString("en-IN")} via UPI`}
                  </button>
                ) : (
                  <button
                    className={`${styles.ctaBtn} ${styles.codBtn}`}
                    onClick={handlePlaceOrder}
                    disabled={loading}
                  >
                    <IconCOD />
                    {loading ? "Saving order..." : "Place Order (Cash on Delivery)"}
                  </button>
                )}

                <button className={styles.waBtn} onClick={() => { handlePlaceOrder().then(openWhatsApp); }}>
                  Confirm on WhatsApp
                </button>
              </div>

              <button className={styles.backBtn} onClick={() => setStep("form")}>
                ← Edit Details
              </button>
            </div>
          </div>
        )}

        {/* ════ STEP 3 — DONE ════ */}
        {step === "done" && (
          <div className={styles.doneWrap}>
            <div className={styles.doneIcon}>
              <IconParty />
            </div>
            <h2 className={styles.doneTitle}>Order Placed!</h2>
            {savedOrder && (
              <div className={styles.doneId}>
                <IconOrderId />
                Order ID: <strong>#{savedOrder._id?.toString().slice(-6).toUpperCase()}</strong>
              </div>
            )}

            <div style={{ maxWidth: 380, margin: "16px auto" }}>
              <WaBanner text={
                payMethod === "upi"
                  ? "<strong>Your order is not confirmed yet!</strong> Please complete your UPI payment first, then send us a WhatsApp message. Without WhatsApp confirmation, your order will not be processed."
                  : "<strong>Your order is not confirmed yet!</strong> Please send us a WhatsApp message to confirm your order. Without this step, your order will not be processed."
              } />
            </div>

            <button className={styles.waBtn} style={{ maxWidth: 320, margin: "0 auto" }} onClick={openWhatsApp}>
               Confirm Order on WhatsApp
            </button>
            <button className={styles.backBtn} onClick={() => router.push("/")}>
              Go to Home
            </button>
          </div>
        )}

        {qrUrl && (
          <UpiModal
            upiUrl={qrUrl}
            amount={cartTotal}
            onClose={handleQRClose}
          />
        )}

      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────
function F({ label, required, err, children }) {
  return (
    <div className="co-f" style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8a7a6a", marginBottom: 6 }}>
        {label}{required && <span style={{ color: "#ef4444", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {err && (
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 5, fontSize: "0.74rem", color: "#ef4444" }}>
          <IconWarn /> {err}
        </div>
      )}
    </div>
  );
}

function I({ name, placeholder, value, onChange, onBlur, ok, err, maxLength }) {
  return (
    <div style={{ position: "relative" }}>
      <input
        style={{
          width: "100%", border: `1.5px solid ${err ? "#ef4444" : ok ? "#22c55e" : "#ddd6c8"}`,
          borderRadius: 10, padding: "12px 38px 12px 14px", fontSize: "0.92rem", color: "#1a2e1b",
          background: "#fdfaf5", outline: "none", fontFamily: "inherit", boxSizing: "border-box",
          transition: "border-color .2s, box-shadow .2s",
        }}
        name={name} placeholder={placeholder} value={value}
        onChange={onChange} onBlur={onBlur} maxLength={maxLength}
        onFocus={(e) => { e.target.style.borderColor = "#2c6e49"; e.target.style.boxShadow = "0 0 0 3px rgba(44,110,73,0.1)"; }}
      />
      {ok && (
        <span style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)" }}>
          <IconCheck />
        </span>
      )}
    </div>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid #f5f0e8", fontSize: "0.89rem", gap: 12 }}>
      <span style={{ color: "#9a8a78" }}>{k}</span>
      <span style={{ fontWeight: 500, color: "#1a2e1b", textAlign: "right", maxWidth: "62%" }}>{v}</span>
    </div>
  );
}