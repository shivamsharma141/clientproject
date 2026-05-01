"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "../component/Cartcontext.js";
import "./navbar.css";

const CartIcon = () => (
  <svg className="nav__cart-icon" viewBox="0 0 24 24">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="3" y1="6" x2="21" y2="6" strokeLinecap="round" />
    <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_LINKS = [
  { label: "Home", href: "/home" },
  { label: "Products", href: "/home", scrollTo: "products" },
  { label: "Our Story", href: "/ourstory" },
  { label: "Contact", href: "/contact" },
  { label: "Terms & Conditions", href: "/termsandcondition" },
  { label: "Refund Policy", href: "/refund" }, 
];

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) { setUser(null); return; }
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };
    checkUser();
  }, []);

  // ✅ After navigation to /home, scroll to #products
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.__scrollTarget;
    if (hash && pathname === "/home") {
      window.__scrollTarget = null;
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((p) => !p);
  const goToLogin = () => { closeMenu(); router.push("/loggin"); };

  const handleLogout = async () => {
    setUser(null);
    closeMenu();
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const handleCartClick = () => {
    closeMenu();
    router.push("/cart");
  };

  // ✅ Smart nav click handler
  const handleNavClick = (e, link) => {
    e.preventDefault();
    closeMenu();

    if (link.scrollTo) {
      if (pathname === "/home") {
        // Already on home — just scroll
        const el = document.getElementById(link.scrollTo);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // On another page — store scroll target, then navigate
        window.__scrollTarget = link.scrollTo;
        router.push("/home");
      }
    } else {
      router.push(link.href);
    }
  };

  const AuthButton = () => {
    if (loadingUser) return <button className="nav__login">...</button>;
    return user ? (
      <button className="nav__login" onClick={handleLogout}>Logout</button>
    ) : (
      <button className="nav__login" onClick={goToLogin}>Login</button>
    );
  };

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>

        <a href="/" className="nav__logo">
          <span className="nav__logo-brand">GAAV</span>
          <span className="nav__logo-divider" />
          <span className="nav__logo-sub">by Yashoda Dairy Farm</span>
        </a>

        {/* Desktop */}
        <div className="nav__right">
          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => handleNavClick(e, link)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            <button className="nav__cart" onClick={handleCartClick}>
              <CartIcon />
              <span className={`nav__cart-badge${cartCount > 0 ? " visible" : ""}`}>
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            </button>
            <AuthButton />
          </div>
        </div>

        {/* Mobile */}
        <div className="nav__mobile-actions">
          <button className="nav__cart" onClick={handleCartClick}>
            <CartIcon />
            <span className={`nav__cart-badge${cartCount > 0 ? " visible" : ""}`}>
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          </button>

          <button
            className={`nav__hamburger${menuOpen ? " open" : ""}`}
            onClick={toggleMenu}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav__overlay${menuOpen ? " open" : ""}`} onClick={closeMenu} />

      <aside className={`nav__drawer${menuOpen ? " open" : ""}`}>
        <div className="nav__drawer-header">
          <a href="/" onClick={closeMenu}>GAAV</a>
          <button onClick={closeMenu}>✕</button>
        </div>

        <nav className="nav__drawer-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="nav__drawer-link"
            >
              {link.label}
              <span className="drawer-arrow">→</span>
            </a>
          ))}
        </nav>

        <div className="nav__drawer-footer">
          <button className="nav__drawer-cart-row" onClick={handleCartClick}>
            <CartIcon />
            <span>View Cart</span>
            <span className={`nav__drawer-cart-badge${cartCount > 0 ? " visible" : ""}`}>
              {cartCount > 9 ? "9+" : cartCount}
            </span>
          </button>
          <AuthButton />
        </div>

        <div className="nav__drawer-brand-strip">
          by Yashoda Dairy Farm
        </div>
      </aside>
    </>
  );
}