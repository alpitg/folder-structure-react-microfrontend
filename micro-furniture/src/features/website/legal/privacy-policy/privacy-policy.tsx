import { GetEnvConfig } from "../../../../app.config";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

const PrivacyPolicyApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          {/* Header */}
          <div className="mb-5">
            <h1 className="fw-bold mb-3">Privacy Policy</h1>

            <p className="text-muted mb-0">
              Last updated: {appSettings?.legal?.lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-5">
            <p>
              We respect your privacy and are committed to protecting your
              personal information. This Privacy Policy explains how we collect,
              use, disclose, and protect information when you visit or use our
              website, create an account, place an order, or otherwise interact
              with our services.
            </p>

            <p>
              By using our website, you acknowledge that you have read and
              understood this Privacy Policy.
            </p>
          </section>

          {/* 1 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">1. Information We Collect</h2>

            <p>
              We may collect different types of information depending on how you
              use our website.
            </p>

            <h3 className="h6 fw-bold mt-4 mb-3">Information You Provide</h3>

            <ul>
              <li>Name and contact information.</li>
              <li>Email address and phone number.</li>
              <li>Billing and shipping addresses.</li>
              <li>Account login information.</li>
              <li>Order and transaction information.</li>
              <li>Customer support communications.</li>
              <li>Product reviews, feedback, and other content you submit.</li>
            </ul>

            <h3 className="h6 fw-bold mt-4 mb-3">
              Information Collected Automatically
            </h3>

            <p>
              When you access our website, certain technical information may be
              collected automatically, including your IP address, browser type,
              device information, operating system, pages visited, referring
              pages, and general usage information.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              2. Cookies and Similar Technologies
            </h2>

            <p>
              We may use cookies, local storage, and similar technologies to
              provide and improve our website.
            </p>

            <p>These technologies may be used to:</p>

            <ul>
              <li>Keep you signed in.</li>
              <li>Maintain shopping cart information.</li>
              <li>Remember your preferences.</li>
              <li>Understand how visitors use our website.</li>
              <li>Improve website performance and functionality.</li>
              <li>Support security and fraud prevention.</li>
            </ul>

            <p>
              You can control cookies through your browser settings. Some
              website features may not function properly if certain cookies are
              disabled.
            </p>
          </section>

          {/* 3 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">3. How We Use Your Information</h2>

            <p>We may use your information to:</p>

            <ul>
              <li>Create and manage your account.</li>
              <li>Process and fulfill orders.</li>
              <li>Process payments and refunds.</li>
              <li>Arrange shipping and delivery.</li>
              <li>Provide customer support.</li>
              <li>Send order confirmations and transaction updates.</li>
              <li>Respond to questions and requests.</li>
              <li>Improve our products and services.</li>
              <li>Personalize your shopping experience.</li>
              <li>Detect and prevent fraud or unauthorized activity.</li>
              <li>Maintain the security of our website and systems.</li>
              <li>Comply with applicable legal requirements.</li>
            </ul>
          </section>

          {/* 4 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">4. Payment Information</h2>

            <p>
              Payments may be processed by third-party payment providers. When
              you make a payment, your payment information may be transmitted
              directly to the applicable payment provider.
            </p>

            <p>
              We do not intentionally store complete payment card information on
              our servers when payment processing is handled by an authorized
              third-party payment provider.
            </p>

            <p>
              Payment providers may process your information according to their
              own privacy policies and terms.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">5. Sharing of Information</h2>

            <p>
              We do not sell your personal information. We may share information
              with trusted service providers when necessary to operate our
              business and provide our services.
            </p>

            <p>These parties may include:</p>

            <ul>
              <li>Payment processing providers.</li>
              <li>Shipping and delivery partners.</li>
              <li>Technology and hosting providers.</li>
              <li>Customer support providers.</li>
              <li>Analytics and performance providers.</li>
              <li>Security and fraud-prevention providers.</li>
              <li>Professional advisors where necessary.</li>
            </ul>

            <p>
              Service providers are expected to use personal information only
              for the purposes for which it is provided and as permitted by
              applicable law.
            </p>
          </section>

          {/* 6 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">6. Legal Requirements</h2>

            <p>
              We may disclose information when we believe disclosure is
              reasonably necessary to comply with applicable laws, regulations,
              legal processes, government requests, or court orders.
            </p>

            <p>
              We may also disclose information when necessary to protect our
              rights, property, users, customers, or the security of our
              services.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">7. Data Security</h2>

            <p>
              We use reasonable technical and organizational measures designed
              to protect personal information against unauthorized access,
              alteration, disclosure, loss, or misuse.
            </p>

            <p>
              However, no method of transmission or electronic storage is
              completely secure. Therefore, we cannot guarantee absolute
              security of your information.
            </p>
          </section>

          {/* 8 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">8. Data Retention</h2>

            <p>
              We retain personal information for as long as reasonably necessary
              to provide our services, maintain business and transaction
              records, resolve disputes, prevent fraud, and comply with
              applicable legal and regulatory obligations.
            </p>

            <p>
              When information is no longer required, we may securely delete,
              anonymize, or otherwise dispose of it in accordance with our
              applicable retention practices.
            </p>
          </section>

          {/* 9 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">9. Your Rights and Choices</h2>

            <p>
              Depending on applicable law, you may have rights regarding your
              personal information, including the ability to:
            </p>

            <ul>
              <li>Request access to personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of certain information.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Object to certain types of processing.</li>
              <li>Request information about how your data is processed.</li>
            </ul>

            <p>
              Some requests may be subject to legal or operational limitations.
              We may also need to verify your identity before processing a
              request.
            </p>
          </section>

          {/* 10 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">10. Marketing Communications</h2>

            <p>
              With your permission where required, we may send promotional
              communications about products, offers, discounts, and other
              updates.
            </p>

            <p>
              You can unsubscribe from marketing emails by using the unsubscribe
              option included in those communications or by contacting us.
            </p>

            <p>
              Even if you opt out of promotional communications, we may still
              send necessary transactional messages, such as order
              confirmations, shipping updates, account notifications, and
              security-related communications.
            </p>
          </section>

          {/* 11 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">11. Children's Privacy</h2>

            <p>
              Our website is not intended to be used by children who are not
              legally permitted to use online shopping services under applicable
              law.
            </p>

            <p>
              We do not knowingly collect personal information from children
              where such collection is prohibited by law.
            </p>
          </section>

          {/* 12 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              12. Third-Party Links and Services
            </h2>

            <p>
              Our website may contain links to third-party websites,
              applications, payment services, social media platforms, or other
              external services.
            </p>

            <p>
              We are not responsible for the privacy practices, content, or
              security of third-party services. We recommend reviewing their
              respective privacy policies before providing personal information.
            </p>
          </section>

          {/* 13 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              13. Guest Shopping and Cart Information
            </h2>

            <p>
              You may be able to browse products and maintain a shopping cart
              without creating an account.
            </p>

            <p>
              When you use guest shopping functionality, we may store a
              temporary identifier or similar information in your browser to
              maintain your shopping cart and provide the requested shopping
              experience.
            </p>
          </section>

          {/* 14 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">14. Business Transfers</h2>

            <p>
              If our business is involved in a merger, acquisition,
              restructuring, sale of assets, or similar transaction, personal
              information may be transferred as part of that transaction,
              subject to applicable law.
            </p>
          </section>

          {/* 15 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              15. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our services, technology, business practices, or legal
              requirements.
            </p>

            <p>
              When we make changes, we will update the "Last updated" date at
              the top of this page. Your continued use of our website after
              changes are published may constitute acceptance of the updated
              Privacy Policy, where permitted by law.
            </p>
          </section>

          {/* 16 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">16. Contact Us</h2>

            <p>
              If you have questions, concerns, or requests regarding this
              Privacy Policy or the handling of your personal information,
              please contact us through the contact information provided on our
              website.
            </p>

            <div className="bg-light rounded p-4">
              <p className="mb-1">
                <strong>Privacy Support</strong>
              </p>
              <p className="mb-1">
                Email: {appSettings?.homePage?.contactDetails?.email}
              </p>

              <p className="mb-0">
                Website: {appSettings?.homePage?.contactDetails?.site}
              </p>
            </div>
          </section>

          {/* Terms Link */}
          <section className="border-top pt-4 mt-5">
            <p className="mb-0 text-muted">
              Please also review our{" "}
              <a
                href={ROUTE_URL.WEBSITE.TERMS_OF_USE}
                className="text-decoration-none"
              >
                Terms of Use
              </a>{" "}
              for information about using our website and purchasing our
              products.
            </p>
          </section>

          {/* Disclaimer */}
          <div className="border-top pt-4 mt-4">
            <p className="small text-muted mb-0">
              This Privacy Policy is provided as a generic starting point for an
              e-commerce website. It should be reviewed and adapted by a
              qualified legal professional based on your business, data
              processing activities, jurisdiction, third-party services, and
              applicable privacy laws.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicyApp;
