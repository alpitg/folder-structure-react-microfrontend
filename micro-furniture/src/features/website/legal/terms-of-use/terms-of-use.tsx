import { GetEnvConfig } from "../../../../app.config";
import { ROUTE_URL } from "../../../../routes/constants/routes.const";

const TermsOfUseApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-9">
          {/* Header */}
          <div className="mb-5">
            <h1 className="fw-bold mb-3">Terms of Use</h1>

            <p className="text-muted mb-0">
              Last updated: {appSettings?.legal?.lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-5">
            <p>
              Welcome to our website. These Terms of Use govern your access to
              and use of our website, products, services, and related
              applications. By accessing or using our website, you agree to be
              bound by these Terms of Use.
            </p>

            <p>
              If you do not agree with any part of these terms, please do not
              use our website or services.
            </p>
          </section>

          {/* 1 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">1. Eligibility</h2>

            <p>
              You must be legally capable of entering into a binding agreement
              to use our website and purchase products from us. If you are using
              the website on behalf of another person or organization, you
              confirm that you have the authority to accept these terms on their
              behalf.
            </p>
          </section>

          {/* 2 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">2. Account Registration</h2>

            <p>
              Certain features of our website may require you to create an
              account. You are responsible for providing accurate and up-to-date
              information when creating your account.
            </p>

            <p>
              You are responsible for maintaining the confidentiality of your
              login credentials and for all activities carried out through your
              account.
            </p>

            <p>
              Please notify us immediately if you believe your account has been
              accessed without authorization.
            </p>
          </section>

          {/* 3 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              3. Products and Product Information
            </h2>

            <p>
              We make reasonable efforts to ensure that product descriptions,
              images, prices, availability, and other information displayed on
              our website are accurate.
            </p>

            <p>
              However, product colors and appearances may vary depending on your
              device or display settings. We reserve the right to correct
              errors, update product information, and change product
              availability at any time.
            </p>
          </section>

          {/* 4 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">4. Pricing and Taxes</h2>

            <p>
              Product prices displayed on our website are subject to change
              without prior notice.
            </p>

            <p>
              Applicable taxes, shipping charges, discounts, promotional offers,
              and other charges will be displayed during the ordering process
              where applicable.
            </p>

            <p>
              In the event of a pricing or calculation error, we reserve the
              right to correct the error and, where necessary, cancel or request
              confirmation of the affected order.
            </p>
          </section>

          {/* 5 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">5. Orders</h2>

            <p>
              Placing an order constitutes a request to purchase the selected
              products. An order is subject to our acceptance and product
              availability.
            </p>

            <p>
              We reserve the right to refuse, cancel, or limit an order for
              reasons including product availability, pricing errors, suspected
              fraudulent activity, technical issues, or other legitimate
              business reasons.
            </p>

            <p>
              If an order is cancelled after payment has been received, any
              eligible refund will be processed according to our applicable
              refund and cancellation procedures.
            </p>
          </section>

          {/* 6 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">6. Payments</h2>

            <p>
              Payments may be processed through third-party payment providers.
              By submitting payment information, you authorize the applicable
              payment provider to process the transaction.
            </p>

            <p>
              We do not knowingly store complete payment card details on our
              servers when payment processing is handled by an authorized
              third-party payment provider.
            </p>
          </section>

          {/* 7 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">7. Shipping and Delivery</h2>

            <p>
              We will make reasonable efforts to deliver orders within the
              estimated delivery period displayed during checkout.
            </p>

            <p>
              Delivery times may be affected by factors outside our control,
              including courier delays, weather conditions, public holidays,
              incorrect delivery information, or other unforeseen circumstances.
            </p>

            <p>
              You are responsible for providing accurate shipping and contact
              information when placing an order.
            </p>
          </section>

          {/* 8 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              8. Returns, Refunds and Cancellations
            </h2>

            <p>
              Returns, cancellations, replacements, and refunds are subject to
              our applicable return and refund policy.
            </p>

            <p>
              Certain products may not be eligible for return or cancellation
              due to their nature, condition, customization, or applicable laws.
            </p>

            <p>
              Please review the applicable return and refund information before
              placing an order.
            </p>
          </section>

          {/* 9 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">9. Promotions and Discounts</h2>

            <p>
              Promotional offers, discount codes, cashback offers, and other
              promotional benefits may be subject to additional terms and
              conditions.
            </p>

            <p>
              Unless otherwise stated, promotional offers cannot be combined
              with other offers and may be withdrawn or modified at any time.
            </p>
          </section>

          {/* 10 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">10. Prohibited Activities</h2>

            <p>
              You agree not to misuse our website or services. You must not:
            </p>

            <ul>
              <li>Use the website for unlawful or fraudulent purposes.</li>

              <li>
                Attempt to gain unauthorized access to our systems or accounts.
              </li>

              <li>Interfere with the operation or security of the website.</li>

              <li>Introduce malicious code, viruses, or harmful software.</li>

              <li>
                Use automated systems to scrape, copy, or collect website data
                without authorization.
              </li>

              <li>Provide false or misleading information.</li>

              <li>
                Abuse promotional offers, discounts, or referral programs.
              </li>
            </ul>
          </section>

          {/* 11 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">11. Intellectual Property</h2>

            <p>
              Unless otherwise stated, the content available on our website,
              including logos, trademarks, text, graphics, product images,
              designs, software, and other materials, is owned by or licensed to
              us.
            </p>

            <p>
              You may not copy, reproduce, distribute, modify, publish, or
              commercially exploit our content without prior written permission.
            </p>
          </section>

          {/* 12 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">12. User Content</h2>

            <p>
              If our website allows you to submit reviews, comments, images,
              feedback, or other content, you are responsible for the content
              you submit.
            </p>

            <p>
              You agree not to submit content that is unlawful, defamatory,
              abusive, misleading, offensive, or infringes the rights of another
              person.
            </p>

            <p>
              By submitting content, you grant us permission to use, display,
              reproduce, and distribute that content for purposes related to
              operating and promoting our services, subject to applicable law.
            </p>
          </section>

          {/* 13 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">13. Third-Party Services</h2>

            <p>
              Our website may use or provide links to third-party services,
              including payment providers, shipping providers, analytics
              services, social media platforms, or other external services.
            </p>

            <p>
              Third-party services are governed by their own terms and policies.
              We are not responsible for the content, availability, security, or
              practices of third-party services.
            </p>
          </section>

          {/* 14 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">14. Website Availability</h2>

            <p>
              We aim to keep our website available and functioning properly.
              However, we do not guarantee that the website will always be
              available, uninterrupted, secure, or free from errors.
            </p>

            <p>
              We may temporarily suspend or restrict access to the website for
              maintenance, updates, security reasons, or other operational
              requirements.
            </p>
          </section>

          {/* 15 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">15. Disclaimer</h2>

            <p>
              To the extent permitted by applicable law, our website and
              services are provided on an "as available" basis.
            </p>

            <p>
              We do not guarantee that the website, its content, or its services
              will always be accurate, complete, reliable, or uninterrupted.
            </p>
          </section>

          {/* 16 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">16. Limitation of Liability</h2>

            <p>
              To the maximum extent permitted by applicable law, we will not be
              liable for indirect, incidental, special, consequential, or
              similar losses arising from your use of our website or services.
            </p>

            <p>
              Nothing in these Terms of Use excludes or limits liability that
              cannot legally be excluded or limited under applicable law.
            </p>
          </section>

          {/* 17 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">17. Indemnification</h2>

            <p>
              To the extent permitted by applicable law, you agree to indemnify
              and hold us harmless from claims, losses, liabilities, damages,
              and expenses arising from your misuse of the website, violation of
              these terms, or violation of the rights of another person.
            </p>
          </section>

          {/* 18 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">18. Privacy</h2>

            <p>
              Your use of our website is also subject to our Privacy Policy,
              which explains how we collect, use, store, and protect personal
              information.
            </p>

            <p>
              Please review our{" "}
              <a
                href={ROUTE_URL.WEBSITE.PRIVACY_POLICY}
                className="text-decoration-none"
              >
                Privacy Policy
              </a>{" "}
              for more information.
            </p>
          </section>

          {/* 19 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">19. Changes to These Terms</h2>

            <p>
              We may update these Terms of Use from time to time. Updated terms
              will be published on this page with a revised "Last updated" date.
            </p>

            <p>
              Your continued use of our website after changes are published
              constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* 20 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">20. Governing Law</h2>

            <p>
              These Terms of Use shall be governed by and interpreted in
              accordance with the applicable laws and regulations governing our
              business and your use of the website.
            </p>

            <p>
              Any disputes shall be subject to the jurisdiction of the
              appropriate courts or authorities as determined under applicable
              law.
            </p>
          </section>

          {/* 21 */}
          <section className="mb-5">
            <h2 className="h4 fw-bold mb-3">21. Contact Us</h2>

            <p>
              If you have any questions about these Terms of Use, please contact
              us through the contact information provided on our website.
            </p>

            <div className="bg-light rounded p-4">
              <p className="mb-1">
                <strong>Customer Support</strong>
              </p>

              <p className="mb-1">
                Email: {appSettings?.homePage?.contactDetails?.email}
              </p>

              <p className="mb-0">
                Website: {appSettings?.homePage?.contactDetails?.site}
              </p>
            </div>
          </section>

          {/* Footer note */}
          <div className="border-top pt-4 mt-5">
            <p className="small text-muted mb-0">
              These Terms of Use are provided as a generic starting point for an
              e-commerce website and should be reviewed and adapted by a
              qualified legal professional for your business, jurisdiction,
              products, and applicable laws.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TermsOfUseApp;
