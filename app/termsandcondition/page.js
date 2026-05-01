import Footer from "../component/Footer";
import styles from "./terms.module.css";

export const metadata = {
  title: "Terms & Conditions | GAAV by Yashoda Dairy Farm",
  description:
    "Read the terms and conditions governing your use of GAAV by Yashoda Dairy Farm and purchase of our dairy products.",
};

export default function TermsPage() {
  return (
    <>
    <div className={styles.wrapper}>
      <div className={styles.container}>

        <div className={styles.badge}>Legal</div>
        <h1 className={styles.pageTitle}>Terms &amp; Conditions</h1>
        <p className={styles.lastUpdated}>Last updated: January 1, 2026</p>

        <div className={styles.divider} />

        <div className={styles.introBox}>
          <p>
            These Terms and Conditions govern your access to and use of the
            website operated by <strong>GAAV by Yashoda Dairy Farm</strong>{" "}
            ("we", "us", or "our"), including any purchase of products through
            our platform. By placing an order or using this website, you agree
            to be bound by these terms in full. Please read them carefully
            before proceeding.
          </p>
        </div>

        {/* 1 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>01.</span> About Us
          </h2>
          <div className={styles.sectionBody}>
            <p>
              GAAV is a sub-brand of <strong>Yashoda Dairy Farm</strong>,
              based in New Delhi, India. We specialize in the production and
              home delivery of traditional A2 dairy products including bilona
              ghee, desi butter, fresh paneer, and cold-pressed mustard oil.
              All products are made using time-honored methods without
              adulteration, preservatives, or artificial additives.
            </p>
            <p>
              Our business is operated by the Bhati Family and all
              transactions, deliveries, and customer communication are managed
              directly by our team. By using this website, you acknowledge that
              you are dealing directly with Yashoda Dairy Farm.
            </p>
          </div>
        </div>

        {/* 2 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>02.</span> Product Availability
          </h2>
          <div className={styles.sectionBody}>
            <p>
              All products listed on our website are subject to availability.
              We make every effort to keep product listings accurate and
              up-to-date; however, certain products — especially fresh items
              such as paneer and seasonal dairy products — may be temporarily
              unavailable due to production constraints or high demand.
            </p>
            <p>
              In the event that an item you have ordered is out of stock, we
              will notify you at the earliest via the contact information
              provided at checkout. You will be offered the option of a
              replacement product, a delayed shipment, or a full refund.
            </p>
            <ul className={styles.bulletList}>
              <li>
                Fresh Paneer is available for delivery within Delhi NCR only.
              </li>
              <li>
                Ghee, Butter, and Oils are available for Pan-India delivery.
              </li>
              <li>
                Availability of seasonal or limited-batch products is not
                guaranteed and is on a first-come, first-served basis.
              </li>
            </ul>
          </div>
        </div>

        {/* 3 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>03.</span> Pricing &amp; Payments
          </h2>
          <div className={styles.sectionBody}>
            <p>
              All prices displayed on our website are in Indian Rupees (INR)
              and are inclusive of applicable taxes unless stated otherwise.
              Delivery charges, if any, will be clearly disclosed at the time
              of checkout before payment is processed.
            </p>
            <p>
              We reserve the right to revise product prices at any time without
              prior notice. However, any order placed and confirmed before a
              price revision will be honored at the price applicable at the
              time of placing the order.
            </p>
            <p>
              We accept online payments via UPI, debit/credit cards, net
              banking, and other methods supported by our payment gateway
              (Cashfree). Cash on Delivery (COD) is available exclusively for
              orders within Delhi. We do not store your payment card details
              on our servers.
            </p>
          </div>
        </div>

        {/* 4 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>04.</span> Order Placement &amp; Cancellation
          </h2>
          <div className={styles.sectionBody}>
            <p>
              By submitting an order on our website, you are making a binding
              offer to purchase the selected products at the stated price. Your
              order is confirmed only upon receipt of a confirmation email or
              message from us. We reserve the right to accept or decline any
              order at our discretion.
            </p>
            <p>
              <strong>Cancellation by Customer:</strong> Orders may be
              cancelled within 2 hours of placement by contacting our support
              team via WhatsApp or email. Once an order has been dispatched, it
              cannot be cancelled.
            </p>
            <p>
              <strong>Cancellation by Us:</strong> We may cancel an order if
              the product is unavailable, if there is an error in the listed
              price, or if we are unable to deliver to your location. In such
              cases, a full refund will be initiated within 5–7 business days.
            </p>
          </div>
        </div>

        {/* 5 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>05.</span> User Responsibilities
          </h2>
          <div className={styles.sectionBody}>
            <p>
              By using this website and placing orders, you agree to provide
              accurate, current, and complete information during checkout. You
              are responsible for ensuring that the delivery address, contact
              number, and email provided are correct. We shall not be liable
              for failed deliveries resulting from incorrect information
              provided by you.
            </p>
            <ul className={styles.bulletList}>
              <li>
                You must be at least 18 years of age to place an order on this
                website.
              </li>
              <li>
                You agree not to use this website for any unlawful or
                fraudulent purpose.
              </li>
              <li>
                You are responsible for maintaining the confidentiality of
                your account credentials (if applicable).
              </li>
              <li>
                You agree to inspect perishable items such as paneer upon
                delivery and report any issues within 24 hours.
              </li>
            </ul>
          </div>
        </div>

        {/* 6 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>06.</span> Limitation of Liability
          </h2>
          <div className={styles.sectionBody}>
            <p>
              To the fullest extent permitted by applicable law, Yashoda Dairy
              Farm and its family members, employees, and representatives shall
              not be liable for any indirect, incidental, consequential, or
              punitive damages arising from your use of our website or products.
            </p>
            <p>
              Our total liability to you for any claim arising out of or in
              connection with these terms or your order shall not exceed the
              amount actually paid by you for the relevant order.
            </p>
            <p>
              We are not responsible for delays caused by unforeseen
              circumstances such as natural disasters, government restrictions,
              courier failures, or other events beyond our reasonable control.
            </p>
          </div>
        </div>

        {/* 7 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span>07.</span> Governing Law
          </h2>
          <div className={styles.sectionBody}>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of India. Any disputes arising out of or
              in connection with these terms shall be subject to the exclusive
              jurisdiction of the courts of New Delhi, India.
            </p>
            <p>
              We reserve the right to amend these Terms and Conditions at any
              time. Updated terms will be posted on this page with a revised
              date. Continued use of our website after any change constitutes
              your acceptance of the new terms.
            </p>
          </div>
        </div>

        {/* Contact Box */}
        <div className={styles.contactBox}>
          <div className={styles.contactTitle}>Questions About These Terms?</div>
          <p>
            If you have any questions or concerns regarding these Terms and
            Conditions, please reach out to us directly.
          </p>
          <p>
            📧 Email:{" "}
            <a href="mailto:support@yashodadairyfarm.com">
              support@yashodadairyfarm.com
            </a>
          </p>
          <p>📍 Address: Yashoda Dairy Farm, New Delhi, India</p>
        </div>

      </div>
    </div>

   <Footer />
  

    </>

  );
}
