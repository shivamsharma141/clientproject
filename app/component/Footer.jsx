'use client';
import React from 'react';
import Link from 'next/link';
import styles from './footer.module.css';

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 0115.07 1.18 2 2 0 0117 3.36v3a2 2 0 01-1.44 1.93 16 16 0 00-1.55.52 1 1 0 00-.47 1.39 16.26 16.26 0 007.59 7.59 1 1 0 001.39-.47c.17-.51.34-1 .52-1.55A2 2 0 0122 16.92z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const LeafIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0118 7a7 7 0 01-7 13z"/>
    <path d="M11 20c0-5.5 4-10 7-13"/>
  </svg>
);

const GheeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 3h8l1 5H7L8 3z"/>
    <path d="M7 8v13h10V8"/>
    <path d="M10 12h4"/>
  </svg>
);

const ButterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="8" width="18" height="10" rx="2"/>
    <path d="M3 12h18"/>
    <path d="M7 8V6a2 2 0 014 0v2"/>
  </svg>
);

const PaneerIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    <path d="M12 12v3"/>
    <path d="M9 13.5h6"/>
  </svg>
);

const OilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 3h6l1 4H8L9 3z"/>
    <path d="M8 7v14h8V7"/>
    <path d="M12 11v4"/>
    <path d="M10 13h4"/>
  </svg>
);

const BookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const BoxIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const UserIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const PRODUCTS = [
  { label: 'Ghee',        icon: <GheeIcon />,   href: '/home#products' },
  { label: 'Butter',      icon: <ButterIcon />,  href: '/home#products' },
  { label: 'Paneer',      icon: <PaneerIcon />,  href: '/home#products' },
  { label: 'Mustard Oil', icon: <OilIcon />,     href: '/home#products' },
];

const COMPANY = [
  { label: 'Our Story',   icon: <BookIcon />, href: '/ourstory'   },
  { label: 'Contact Us',  icon: <MailIcon />, href: '/contact' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={styles.container}>

        {/* ── Brand ── */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <div className={styles.logo}>GAAV</div>
            <div className={styles.logoGlow} />
          </div>
          <div className={styles.logoSub}>✦ BY YASHODA DAIRY FARM ✦</div>

          <p className={styles.tagline}>
            <em>Pure. Natural. Trusted.</em><br />
            <em>Farm-to-home dairy since generations.</em>
          </p>

          <div className={styles.dividerLine} />

          <div className={styles.contactBlock}>
            <p className={styles.contactName}>
              <span className={styles.contactNameIcon}><UserIcon /></span>
              Harshit Bhati
            </p>

            <a href="tel:8506000615" className={styles.contactPhone}>
              <span className={styles.svgIcon}><PhoneIcon /></span>
              +91 85060 00615
            </a>
            <a href="tel:9354266273" className={styles.contactPhone}>
              <span className={styles.svgIcon}><PhoneIcon /></span>
              +91 93542 66273
            </a>

            <div className={styles.address}>
              <span className={styles.svgIcon} style={{marginTop:'3px'}}><LocationIcon /></span>
              <span>
                GATA No. 154, Opp. Govt. School,<br />
                Araniya Kamalpur, Bulandshahr,<br />
                Uttar Pradesh – 203202
              </span>
            </div>
          </div>
        </div>

        <div className={styles.spacer} />

        {/* ── Products ── */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>
            <span className={styles.headingLine} />
            PRODUCTS
          </h4>
          <ul className={styles.colList}>
            {PRODUCTS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.colLink}>
                  <span className={styles.linkIcon}>{item.icon}</span>
                  {item.label}
                  <span className={styles.linkArrow}><ArrowIcon /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Company ── */}
        <div className={styles.col}>
          <h4 className={styles.colHeading}>
            <span className={styles.headingLine} />
            COMPANY
          </h4>
          <ul className={styles.colList}>
            {COMPANY.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.colLink}>
                  <span className={styles.linkIcon}>{item.icon}</span>
                  {item.label}
                  <span className={styles.linkArrow}><ArrowIcon /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* ── Bottom Bar ── */}
      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          © 2026 <span className={styles.copyrightBrand}>GAAV</span> by Yashoda Dairy Farm. All rights reserved.
        </p>
        <div className={styles.bottomRight}>
          <span className={styles.leafIcon}><LeafIcon /></span>
          <p className={styles.bottomTag}>
            100% Pure &nbsp;·&nbsp; No Additives &nbsp;·&nbsp; No Preservatives
          </p>
        </div>
      </div>
    </footer>
  );
}