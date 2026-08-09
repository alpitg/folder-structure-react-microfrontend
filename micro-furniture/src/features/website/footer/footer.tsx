import { GetEnvConfig } from "../../../app.config";

const FooterApp = () => {
  const appSettings = GetEnvConfig();
  const contact = appSettings?.homePage?.contactDetails;

  return (
    <footer className="footer-app" id="contactus">
      <div className="container">
        <div className="row g-5 py-5">
          <div className="col-lg-4">
            <a href="#" className="footer-logo">
              {appSettings?.name}
              <span>.</span>
            </a>

            <p className="mt-3 mb-0">{appSettings?.description}</p>
          </div>

          <div className="col-lg-8">
            <div className="row gy-5">
              <div className="col-lg-6 col-md-6">
                <div className="d-flex">
                  <i className="bi bi-geo-alt footer-icon"></i>

                  <div>
                    <h4 className="footer-title">Address</h4>
                    <p className="footer-text mb-0">{contact?.address}</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="d-flex">
                  <i className="bi bi-telephone footer-icon"></i>

                  <div>
                    <h4 className="footer-title">Contact</h4>

                    <p className="footer-text mb-1">
                      <strong>Phone:</strong> {contact?.contactnumber}
                    </p>

                    <p className="footer-text mb-0">
                      <strong>Email:</strong> {contact?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="d-flex">
                  <i className="bi bi-clock footer-icon"></i>

                  <div>
                    <h4 className="footer-title">Opening Hours</h4>

                    <p className="footer-text mb-1">
                      <strong>Mon-Sat:</strong> 11AM - 6PM
                    </p>

                    <p className="footer-text mb-0">
                      <strong>Sunday:</strong> Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6">
                <div className="d-flex">
                  <i className="bi bi-chat-left footer-icon"></i>

                  <div>
                    <h4 className="footer-title">Connect With Us</h4>

                    <div className="d-flex gap-3 mt-3">
                      {contact?.instagram && (
                        <a
                          href={`https://www.instagram.com/${contact.instagram}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-social"
                          aria-label="Instagram"
                        >
                          <i className="bi bi-instagram"></i>
                        </a>
                      )}

                      {contact?.whatsapp?.number && (
                        <a
                          href={`https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(
                            contact.whatsapp.message || "",
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="footer-social"
                          aria-label="WhatsApp"
                        >
                          <i className="bi bi-whatsapp"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom border-top">
          <div className="row align-items-center py-4">
            <div className="col-12 text-center">
              <p className="mb-0 footer-copyright">
                Copyright &copy; {new Date().getFullYear()} {appSettings?.name}.
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
