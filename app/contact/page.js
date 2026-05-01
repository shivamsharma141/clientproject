"use client";
import { useState } from "react";
import styles from "./contact.module.css";
import Footer from "../component/Footer";

const IconLocation = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5"/>
    <circle cx="12" cy="9" r="2.5" fill="rgba(255,255,255,0.95)"/>
  </svg>
);

const IconClock = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5"/>
    <path d="M12 7v5l3 3" stroke="rgba(255,255,255,0.95)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconTruck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M1 3h13v13H1z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M14 8h4l3 3v5h-7V8z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="5.5" cy="18.5" r="2" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.95)" strokeWidth="0.5"/>
    <circle cx="18.5" cy="18.5" r="2" fill="rgba(255,255,255,0.95)" stroke="rgba(255,255,255,0.95)" strokeWidth="0.5"/>
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M6.6 10.8a15.4 15.4 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.24 11.4 11.4 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1C9.4 21 3 14.6 3 6.6a1 1 0 011-1H7a1 1 0 011 1c0 1.25.2 2.45.6 3.6a1 1 0 01-.25 1.1L6.6 10.8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const IconMessage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M22 2L11 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/>
  </svg>
);

const IconCheck = () => (
  <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#4a9e6a1a" stroke="#4a9e6a" strokeWidth="1.5"/>
    <path d="M7.5 12l3 3 6-6" stroke="#4a9e6a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconFAQ = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4a9e6a" strokeWidth="1.5"/>
    <path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2.5 2-2.5 3.5" stroke="#4a9e6a" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="0.8" fill="#4a9e6a"/>
  </svg>
);

const faqs = [
  { q: "Is COD available?", a: "COD is available only for Delhi orders. Outside Delhi, only online prepaid orders are accepted." },
  { q: "What is bilona ghee?", a: "Bilona ghee is made using the traditional method of churning curd with a wooden churner (bilona), then slow-cooking the extracted butter." },
  { q: "Can I order paneer outside Delhi?", a: "No. Paneer is a fresh product and is delivered only within Delhi to maintain quality and freshness." },
  { q: "How long does ghee last?", a: "Pure desi ghee has a shelf life of 12 months at room temperature in an airtight container." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async () => {
  if (!formData.name || !formData.email || !formData.message) {
    alert("Please fill all required fields");
    return;
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
      });
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

  return (
    <main>
    <div className={styles.contactPage}>
      {/* Decorative background blobs */}
      <div className={styles.blobTop} />
      <div className={styles.blobBottom} />

      {/* ── Hero ── */}
      <div className={styles.heroSection}>
        <div className={styles.eyebrowWrap}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrow}>Get in Touch</span>
          <span className={styles.eyebrowLine} />
        </div>
        <h1 className={styles.pageTitle}>
          Contact Us
        </h1>
        <p className={styles.pageSubtitle}>
          Have a question about our products?&nbsp;
          <span className={styles.subtitleAccent}>We're here to help — always.</span>
        </p>
      </div>

      {/* ── Grid ── */}
      <div className={styles.contactGrid}>

        {/* ── Left Column ── */}
        <div className={styles.leftCol}>

          {/* Info Card */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardNoise} />
            <div className={styles.infoCardTop}>
              <div className={styles.brandBadge}>
                <span>YDF</span>
              </div>
              <div>
                <div className={styles.brandName}>Yashoda Dairy Farm</div>
                <div className={styles.brandSub}>Gaav by Yashoda Dairy Farm</div>
              </div>
            </div>

            <div className={styles.infoDivider} />

            {[
              { icon: <IconLocation />, label: "Address", text: "Yashoda Dairy Farm,\nNew Delhi, India" },
              { icon: <IconClock />, label: "Delivery Hours", text: "Mon–Sat: 8 AM – 8 PM\nSunday: 9 AM – 5 PM" },
              { icon: <IconTruck />, label: "Delivery Area", text: "Pan-India (Ghee, Oil, Butter)\nDelhi only (Paneer)" },
            ].map((item, i) => (
              <div className={styles.infoItem} key={i}>
                <div className={styles.infoIconWrap}>{item.icon}</div>
                <div>
                  <div className={styles.infoLabel}>{item.label}</div>
                  <div className={styles.infoText}>{item.text.split("\n").map((t, j) => <span key={j}>{t}{j === 0 && <br/>}</span>)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Card */}
          <div className={styles.faqCard}>
            <div className={styles.faqHeader}>
              <IconFAQ />
              <div className={styles.faqTitle}>Quick FAQs</div>
            </div>

            {faqs.map((faq, i) => (
              <div
                className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <div className={styles.faqQ}>
                  <span>{faq.q}</span>
                  <span className={styles.faqChevron}>{openFaq === i ? "−" : "+"}</span>
                </div>
                {openFaq === i && <div className={styles.faqA}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column — Form ── */}
        <div className={styles.formCard}>
          <div className={styles.formTop}>
            <div className={styles.formHeading}>
              Send us a message
            </div>
            <div className={styles.formSub}>We'll respond within 24 hours</div>
          </div>
          <div className={styles.formDivider} />

          {submitted ? (
            <div className={styles.successMsg}>
              <div className={styles.successIcon}><IconCheck /></div>
              <div className={styles.successTitle}>Message Sent!</div>
              <div className={styles.successSub}>We'll get back to you within 24 hours.</div>
            </div>
          ) : (
            <>
              <div className={styles.formRow}>
                <div className={`${styles.fieldGroup} ${focused === "name" ? styles.fieldFocused : ""}`}>
                  <label className={styles.fieldLabel}>
                    <span className={styles.labelIcon}><IconUser /></span>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    className={styles.fieldInput}
                    type="text" name="name" placeholder="Your name"
                    value={formData.name} onChange={handleChange}
                    onFocus={() => setFocused("name")} onBlur={() => setFocused("")}
                  />
                </div>
                <div className={`${styles.fieldGroup} ${focused === "phone" ? styles.fieldFocused : ""}`}>
                  <label className={styles.fieldLabel}>
                    <span className={styles.labelIcon}><IconPhone /></span>
                    Phone <span className={styles.optional}>(optional)</span>
                  </label>
                  <input
                    className={styles.fieldInput}
                    type="tel" name="phone" placeholder="Your phone"
                    value={formData.phone} onChange={handleChange}
                    onFocus={() => setFocused("phone")} onBlur={() => setFocused("")}
                  />
                </div>
              </div>

              <div className={`${styles.fieldGroup} ${focused === "email" ? styles.fieldFocused : ""}`}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelIcon}><IconMail /></span>
                  Email <span className={styles.required}>*</span>
                </label>
                <input
                  className={styles.fieldInput}
                  type="email" name="email" placeholder="your@email.com"
                  value={formData.email} onChange={handleChange}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused("")}
                />
              </div>

              <div className={`${styles.fieldGroup} ${focused === "message" ? styles.fieldFocused : ""}`}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelIcon}><IconMessage /></span>
                  Message <span className={styles.required}>*</span>
                </label>
                <textarea
                  className={styles.fieldTextarea}
                  name="message" placeholder="Tell us about your query..."
                  value={formData.message} onChange={handleChange}
                  onFocus={() => setFocused("message")} onBlur={() => setFocused("")}
                />
              </div>

              <button className={styles.submitBtn} onClick={handleSubmit}>
                <span>Send Message</span>
                <span className={styles.btnIcon}><IconSend /></span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>

    // {/* {the footer is starts from here} */}
     <Footer />

     </main>
  );
}