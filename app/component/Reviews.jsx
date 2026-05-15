import { useState } from "react";
import styles from "./review.module.css";

const reviews = [
  {
    id: 1,
    name: "Shivam Sharma",
    location: "Delhi, India",
    product: "Yellow Mustard Cold Pressed Oil",
    rating: 5,
    date: "12 April 2026",
    text: "GAAV ka Yellow Mustard Cold Pressed Oil ekdum kamaal hai! Pure aur natural lagta hai — bilkul ghar jaisa. Delivery 2 din mein aa gayi, packaging bhi solid thi. Taste aur aroma dono ne dil jeet liya. Highly recommend!",
  },
  {
    id: 2,
    name: "Priya Mehta",
    location: "Mumbai, India",
    product: "A2 Desi Cow Bilona Ghee",
    rating: 5,
    date: "3 March 2026",
    text: "Yashoda Dairy Farm ka A2 Ghee outstanding hai. Bilona method, granular texture aur golden color — sab original hai. Meri family ab kisi aur brand ka sochti bhi nahi. Timely delivery, 10/10!",
  },
  {
    id: 3,
    name: "Rahul Gupta",
    location: "Jaipur, India",
    product: "Buffalo Bilona Ghee",
    rating: 5,
    date: "28 February 2026",
    text: "Buffalo Bilona Ghee try kiya aur ab repeat order de diya. Itna rich aroma ki khana banate waqt ghar mein khushbu bhar jaati hai. GAAV pe poora trust hai — koi adulteration nahi. Genuine product!",
  },
  {
    id: 4,
    name: "Anjali Singh",
    location: "Lucknow, India",
    product: "Black Mustard Cold Pressed Oil",
    rating: 5,
    date: "19 January 2026",
    text: "Black Mustard Oil ka pungent aroma aur dark color bilkul authentic hai! Achaari dishes mein use karo, flavour hi alag aata hai. GAAV by Yashoda Dairy Farm ne dil jeet liya. Will order again!",
  },
  {
    id: 5,
    name: "Vikram Nair",
    location: "Bangalore, India",
    product: "A2 Desi Cow Bilona Ghee",
    rating: 5,
    date: "7 May 2026",
    text: "Price dekh ke thoda hesitate kiya, par product aaya toh samajh gaya — value for money hai! Quality aisi hai ki ek baar use karo, sasta brand nahi chahiye. Timely delivery aur secure packaging — perfect!",
  },
];

function Stars({ n }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= n ? styles.on : styles.off}>★</span>
      ))}
    </div>
  );
}

function Card({ r, isActive }) {
  const initials = r.name.split(" ").map((w) => w[0]).join("");

  return (
    <div className={`${styles.card} ${isActive ? styles.cardActive : ""}`}>
      <div className={styles.body}>
        <div className={styles.topMeta}>
          <span className={styles.verifiedTag}>✔ Verified Purchase</span>
          <span className={styles.dateText}>{r.date}</span>
        </div>

        <p className={styles.productLabel}>{r.product}</p>
        <Stars n={r.rating} />
        <p className={styles.reviewText}>{r.text}</p>

        <div className={styles.hr} />

        <div className={styles.userRow}>
          <div className={styles.avatarWrap}>
            <div className={styles.avatarInitials}>{initials}</div>
            <div className={styles.checkBadge}>✓</div>
          </div>
          <div className={styles.nameBlock}>
            <span className={styles.name}>{r.name}</span>
            <span className={styles.location}>{r.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewSection() {
  const [active, setActive] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const total = reviews.length;

  const goTo = (i) => setActive((i + total) % total);

  const getOffset = (i) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const onDragStart = (e) =>
    setDragStart(e.clientX ?? e.touches?.[0]?.clientX);

  const onDragEnd = (e) => {
    if (dragStart == null) return;
    const end = e.clientX ?? e.changedTouches?.[0]?.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 45) diff > 0 ? goTo(active + 1) : goTo(active - 1);
    setDragStart(null);
  };

  return (
    <section className={styles.section}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.header}>
        <div className={styles.pill}>Customer Reviews</div>
        <h2 className={styles.heading}>
          What Our <em>Customers</em> Say
        </h2>
        <p className={styles.sub}>Real people · Real products · Real experience</p>
      </div>

      <div className={styles.carousel}>
        <button className={`${styles.arrow} ${styles.arrowL}`} onClick={() => goTo(active - 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className={styles.track}
          onMouseDown={onDragStart}
          onMouseUp={onDragEnd}
          onTouchStart={onDragStart}
          onTouchEnd={onDragEnd}
        >
          {reviews.map((r, i) => {
            const off = getOffset(i);
            const isActive = off === 0;
            return (
              <div
                key={r.id}
                className={styles.slot}
                style={{
                  transform: `translateX(calc(${off * 104}%)) scale(${isActive ? 1 : 0.88})`,
                  opacity: isActive ? 1 : Math.abs(off) === 1 ? 0.45 : 0,
                  zIndex: isActive ? 10 : 3,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <Card r={r} isActive={isActive} />
              </div>
            );
          })}
        </div>

        <button className={`${styles.arrow} ${styles.arrowR}`} onClick={() => goTo(active + 1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="15" height="15">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <div className={styles.dots}>
        {reviews.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === active ? styles.dotOn : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}