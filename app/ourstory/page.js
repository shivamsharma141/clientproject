import Footer from "../component/Footer";
import styles from "./story.module.css";

export const metadata = {
  title: "Our Story | Yashoda Dairy Farm",
  description:
    "Three generations of love, tradition, and commitment to pure dairy — from our farm in Delhi to your home.",
};

const steps = [
  {
    num: "01",
    title: "Natural Fodder & Free Grazing",
    desc: "Our indigenous desi cows roam freely across open fields, grazing on natural fodder — no hormones, no antibiotics, no shortcuts. Happy cows make honest milk.",
    img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80&fit=crop",
  },
  {
    num: "02",
    title: "A2 Milk Collection",
    desc: "We collect only A2 milk from our purebred desi cow breeds — milk that is gentler on digestion, richer in nutrients, and worlds apart from hybrid cow milk.",
    img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&q=80&fit=crop",
  },
  {
    num: "03",
    title: "Curd Fermentation",
    desc: "Fresh A2 milk is set to curd using a natural, living starter culture — then left overnight at room temperature to ferment slowly, the way our grandmothers did.",
    img: "https://azimpremjiuniversity.edu.in/imager/photos/news/2022/a-milky-way-to-learn-biology/901374/Curd-Sri_Lanka.f1694410636_4b32b63c5c28c858e051e9d1a2a717a1.jpg",
  },
  {
    num: "04",
    title: "Bilona Churning",
    desc: "The curd is churned using the sacred bilona method — a wooden churner moving in both directions. It takes skill. It takes patience. There is simply no faster way.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&fit=crop",
  },
  {
    num: "05",
    title: "Slow Cooking",
    desc: "Extracted butter is cooked low and slow on a gentle flame until it transforms into liquid gold — aromatic, grainy, deeply nourishing ghee. No rush. No shortcuts. Ever.",
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80&fit=crop",
  },
  {
    num: "06",
    title: "Delivered to Your Home ",
    desc: "From our farm kitchen directly to your doorstep — our ghee, fresh paneer, butter, and oils are packed with care and delivered so you taste the difference in every drop with care.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80&fit=crop",
  },
];

const promises = [
  "No adulteration, ever",
  "Zero preservatives or artificial flavours",
  "Transparent, traceable supply chain",
  "Welfare of animals is non-negotiable",
  "Family-made with love and care",
];

export default function StoryPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroEyebrow}>Our Story</p>
        <h1 className={styles.heroTitle}>
          The Bhati Family &amp; Yashoda Dairy Farm
        </h1>
        <p className={styles.heroSubtitle}>
          Three generations of love, tradition, and commitment to pure dairy —
          from our farm in Delhi to your home.
        </p>
      </section>

      {/* ── Legacy ── */}
      <section className={styles.legacySection}>
        <div className={styles.legacyGrid}>
          <div className={styles.legacyLeft}>
            <span className={styles.cowEmoji}>🐄</span>
            <div className={styles.estCard}>
              <div className={styles.estCardTitle}>Est. Yashoda Dairy Farm</div>
              <div className={styles.estCardSub}>Delhi, India</div>
            </div>
          </div>
          <div className={styles.legacyRight}>
            <p className={styles.sectionEyebrow}>The Beginning</p>
            <h2 className={styles.sectionTitle}>A Legacy Built on Purity</h2>
            <div className={styles.titleUnderline} />
            <div className={styles.legacyBody}>
              <p>
                The Bhati family has been raising indigenous desi cows for
                generations. What started as a small family farm driven by a
                deep love for animals and timeless values has grown into
                Yashoda Dairy Farm — a name synonymous with purity and trust
                across Delhi.
              </p>
              <p>
                The farm is named after Yashoda — the devoted mother of Lord
                Krishna, who herself was a cow-keeper. This name reflects our
                deepest values: nurturing, purity, and an unbreakable bond
                with the cow. It is not just a name. It is a promise.
              </p>
              <p>
                Every product we create carries the fingerprint of our
                family's dedication. Our ghee is not made in a factory — it
                is made in our farm kitchen, by hand, the way it has been made
                for centuries. Because some things should never change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Farm-to-Home Journey ── */}
      <section className={styles.journeySection}>
        <div className={styles.journeyHeader}>
          <p className={styles.journeyEyebrow}>The Process</p>
          <h2 className={styles.journeyTitle}>Farm-to-Home Journey</h2>
          <p className={styles.journeySubtitle}>
            Every drop of our ghee goes through a pure, traditional journey
            before it reaches your kitchen.
          </p>
        </div>

        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.num} className={styles.stepCard}>
              <div className={styles.stepImgWrap}>
                <img
                  src={step.img}
                  alt={step.title}
                  className={styles.stepImg}
                  loading="lazy"
                />
                <div className={styles.stepNumBadge}>{step.num}</div>
              </div>
              <div className={styles.stepBody}>
                <div className={styles.stepTitle}>{step.title}</div>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our Promise ── */}
      <section className={styles.promiseSection}>
        <div className={styles.promiseGrid}>
          <div className={styles.promiseLeft}>
            <p className={styles.sectionEyebrow}>Our Promise</p>
            <h2 className={styles.promiseTitle}>
              Trust &amp; Purity — Our Foundation
            </h2>
            <div className={styles.promiseBody}>
              <p>
                In a world full of adulteration and industrial dairy shortcuts,
                we believe every family deserves to know exactly what they are
                eating. That is why we are completely transparent about our
                process, our cows, and our methods — nothing hidden, nothing
                compromised.
              </p>
              <p>
                <strong>GAAV</strong> — our sub-brand name — means
                &quot;village&quot; or &quot;cow&quot; in Hindi. It is a
                tribute to the heart of rural India, where cows are worshipped
                and dairy is sacred. We want to carry that purity into every
                modern home.
              </p>
            </div>
            <ul className={styles.checkList}>
              {promises.map((item) => (
                <li key={item} className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.quoteCard}>
            <span className={styles.quoteMark}>&ldquo;</span>
            <p className={styles.quoteText}>
              We don&apos;t just sell ghee. We share the same food our family
              eats — made the same way, with the same hands, with the same
              love. If it is not good enough for our children, it will never
              reach yours.
            </p>
            <div className={styles.quoteAuthor}>The Bhati Family</div>
            <div className={styles.quoteOrg}>Yashoda Dairy Farm, Delhi</div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Taste the Difference</h2>
        <p className={styles.ctaSubtitle}>
          Experience the richness of pure A2 bilona ghee, fresh paneer, and
          traditionally made dairy products from Yashoda Dairy Farm.
        </p>
        <a href="/home#products" className={styles.ctaBtn}>
          Shop Now →
        </a>
      </section>

     {/* {the footer is starts from here} */}

     <Footer />



    </main>

  //  {the footer is starts from here}
  
  
  );
}