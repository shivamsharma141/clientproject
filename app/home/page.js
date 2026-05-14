'use client';

import React from 'react';
import styles from './home.module.css';
import Products from '../component/Products.jsx';
import Getintouch from '../component/Getintouch.jsx';
import Footer from '../component/Footer';

const MARQUEE_ITEMS = [
  'A2 Desi Cow Ghee', 'Bilona Method', 'Farm Fresh Paneer',
  'Cold Pressed Oils', 'Zero Additives', 'All India Delivery',
  'Pure Tradition Since 1987',
];

const TRUST_ITEMS = [
  { icon: '🌿', text: 'No Preservatives' },
  { icon: '🐄', text: 'Indigenous Desi Cows' },
  { icon: '🏡', text: 'Farm-to-Home' },
  { icon: '🔄', text: 'Traditional Bilona Process' },
  { icon: '💚', text: 'No Artificial Colours' },
];

export default function Home() {
  const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  const scrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // WhatsApp handler
  const handleWhatsAppClick = () => {
    const phoneNumber = '919354266273'; // Replace with your actual WhatsApp number (with country code, no + or spaces)
    const message = encodeURIComponent(
      '🙏 Namaste! I want to order pure dairy products from Yashoda Dairy Farm. Please share details about A2 Desi Cow Ghee, Paneer, and other products.'
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className={styles.hero}>
        <div className={styles.bgPattern}></div>

        <div className={styles.mandalaBg}>
          <div className={styles.mandalaRing}></div>
          <div className={styles.mandalaRing2}></div>
        </div>

        {/* ── Nav (Logo + Pill only — links removed) ── */}
        <nav className={styles.nav}>
          <div className={styles.navLogo}>
            YASHODA
            <span className={styles.navLogoSub}>Dairy Farm &nbsp;·&nbsp; Est. 1987</span>
          </div>
          <div className={styles.navPill}>✦ Bilona Method Certified</div>
        </nav>

        {/* ── Scrolling Marquee strip ── */}
        <div className={styles.marqueeWrap}>
          <div className={styles.marqueeTrack}>
            {marqueeItems.map((item, i) => (
              <span key={i}>
                {item}
                {i < marqueeItems.length - 1 && (
                  <span className={styles.marqueeSep}> &nbsp;✦&nbsp; </span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* ── Hero inner ── */}
        <div className={styles.heroInner}>
          {/* ── Left Content ── */}
          <div className={styles.heroLeft}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot}></span>
              Bhati Family Farm &nbsp;·&nbsp; Since 1987
            </div>

            <div className={styles.headingGroup}>
              <h1 className={styles.headingWhite}>The Taste of</h1>
              <h1 className={styles.headingGold}><em>Pure Tradition</em></h1>
            </div>

            <p className={styles.heroDesc}>
              <span className={styles.descLine1}>🫙 A2 Desi Cow Bilona Ghee, Fresh Paneer,</span>
              <span className={styles.descLine2}>Butter &amp; Cold-Pressed Oils —</span>
              <span className={styles.descLine3}>Crafted the traditional way by the Bhati family</span>
              <span className={styles.descLine4}>at Yashoda Dairy Farm, straight from our cows to your kitchen.</span>
            </p>

            <div className={styles.btnGroup}>
              <a href="#products" onClick={scrollToProducts} className={styles.btnPrimary}>
                Shop Now &rarr;
              </a>
              <a href="/ourstory" className={styles.btnSecondary}>
                Our Story &nbsp;↗
              </a>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.stat}>
                <span className={styles.statNum}>100%</span>
                <span className={styles.statLabel}>Natural</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>A2</span>
                <span className={styles.statLabel}>Desi Cow</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Zero</span>
                <span className={styles.statLabel}>Additives</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>Delivery</span>
                <span className={styles.statLabel}>All Over India</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.stat}>
                <span className={styles.statNum}>37+</span>
                <span className={styles.statLabel}>Years Legacy</span>
              </div>
            </div>
          </div>

          {/* ── Right Visual ── */}
          <div className={styles.heroRight}>
            <div className={styles.circleWrap}>
              <div className={styles.outerRing}></div>
              <div className={styles.midRing}></div>
              <div className={styles.glowHalo}></div>
              <div className={styles.imgCircle}>
                <img
                  src="https://as2.ftcdn.net/v2/jpg/11/78/19/51/1000_F_1178195135_SqX3awKdhZaBlCPYxkE8mXwKmTqP4xBo.jpg"
                  alt="Pure A2 Bilona Ghee in a glass jar"
                  className={styles.gheeImg}
                />
                <div className={styles.imgOverlay}></div>
              </div>
              <div className={styles.seal}>
                <div className={styles.sealInner}></div>
                <span className={styles.sealText}>PURE{'\n'}BILONA{'\n'}✦</span>
              </div>
              <div className={styles.deliveryBadge}>COD only in Delhi 🚚</div>
              <div className={styles.floatBadge1}>Farm Fresh 🌿</div>
              <div className={styles.floatBadge2}>Desi Cow 🐄</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <div className={styles.trustBar}>
        {TRUST_ITEMS.map((item, i) => (
          <React.Fragment key={i}>
            <div className={styles.trustItem}>
              <span className={styles.trustIcon}>{item.icon}</span>
              <span className={styles.trustText}>{item.text}</span>
            </div>
            {i < TRUST_ITEMS.length - 1 && (
              <div className={styles.trustDot}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Products Section ── */}
      <div id="products">
        <Products />
      </div>

      {/* ── Get in Touch ── */}
      <Getintouch />

      {/* ── Footer ── */}
      <Footer />

      {/* ── WhatsApp Floating Button ── */}
      <button 
        onClick={handleWhatsAppClick} 
        className={styles.whatsappFloat}
        aria-label="Order on WhatsApp"
      >
        <svg className={styles.whatsappIcon} viewBox="0 0 32 32" fill="white">
  <path d="M16 0C7.164 0 0 7.164 0 16c0 2.828.736 5.484 2.024 7.788L0 32l8.396-2.2A15.924 15.924 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.124 22.712c-.344.968-1.716 1.776-2.804 2.012-.744.156-1.716.284-4.988-.984-4.184-1.62-6.884-5.828-7.092-6.096-.208-.268-1.716-2.272-1.716-4.336s1.088-3.076 1.472-3.496c.384-.42.84-.524 1.12-.524.28 0 .56.004.804.016.26.012.608-.1.952.724.344.824 1.176 2.888 1.28 3.096.104.208.172.452.036.72-.136.268-.208.436-.416.672-.208.236-.436.528-.624.708-.208.196-.424.412-.184.808.24.396 1.068 1.764 2.296 2.856 1.576 1.404 2.908 1.84 3.32 2.048.412.208.652.172.892-.104.24-.276.992-1.156 1.256-1.556.264-.4.528-.336.892-.2.364.136 2.32 1.096 2.72 1.296.4.2.668.3.764.468.096.168.096.968-.248 1.936z"/>
</svg>
        <span className={styles.whatsappTooltip}>Order on WhatsApp</span>
      </button>
    </>
  );
}