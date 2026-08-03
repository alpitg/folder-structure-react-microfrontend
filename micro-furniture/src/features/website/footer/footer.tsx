import { GetEnvConfig } from "../../../app.config";

const FooterApp = () => {
  const appSettings = GetEnvConfig();

  return (
    <footer className="footer-section">
      <div className="container relative">
        <div className="sofa-img">
          {/* <img
            src="/static/media/img/sofa.png"
            alt="Image"
            className="img-fluid"
          /> */}

          {/* <img
            src="/static/media/img/gif/logo.gif"
            className="img-fluid"
            alt="Image"
            width={200}
            height={200}
          /> */}
        </div>

        <div className="row">
          <div className="col-lg-8">
            <br />
          </div>
        </div>

        <div className="row g-5 mb-5 gap-8" id="contactus">
          <div className="col-lg-4">
            <div className="footer-logo-wrap">
              <a href="#" className="footer-logo">
                {appSettings.name}
                <span>.</span>
              </a>
            </div>
            <p className="mb-4">{appSettings.description}</p>
          </div>

          <div className="container">
            <div className="row gy-6">
              <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-geo-alt fs-2 me-3"></i>

                <div>
                  <h4 className="h5">Address</h4>
                  <p className="mb-0">
                    {appSettings?.homePage?.contactDetails?.address}
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-telephone fs-2 me-3"></i>

                <div>
                  <h4 className="h5">Contact</h4>

                  <p className="mb-0">
                    <strong>Phone: </strong>
                    {appSettings?.homePage?.contactDetails?.contactnumber}
                  </p>

                  <p className="mb-0">
                    <strong>Email: </strong>
                    {appSettings?.homePage?.contactDetails?.email}
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-clock fs-2 me-3"></i>

                <div>
                  <h4 className="h5">Opening Hours</h4>

                  <p className="mb-0">
                    <strong>Mon-Sat:</strong> 11AM - 6PM
                  </p>

                  <p className="mb-0">
                    <strong>Sunday:</strong> Closed
                  </p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 d-flex">
                <i className="bi bi-chat-left fs-2 me-3"></i>

                <div>
                  <h4 className="h5">Reach Us Online</h4>

                  <div className="d-flex gap-3 mt-3">
                    <a
                      href={`https://www.instagram.com/${appSettings?.homePage?.contactDetails?.instagram}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark fs-4"
                    >
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a
                      href={
                        `https://wa.me/${appSettings?.homePage?.contactDetails?.whatsapp?.number}?text=` +
                        appSettings?.homePage?.contactDetails?.whatsapp?.message
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dark fs-4"
                    >
                      <i className="bi bi-whatsapp"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-8">
              <p className="mb-2 text-center text-lg-start">
                Copyright &copy;
                {new Date().getFullYear()}. All Rights Reserved.
                {/* &mdash; */}
                {/* Designed with love by{" "}
                <a href="https://cloudmatrixlabs.com">cloudmatrixlabs.com</a> */}
              </p>
            </div>

            {/* <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex ms-auto">
                <li className="me-4">
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterApp;
