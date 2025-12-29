import { GetEnvConfig } from "../../../app.config";

export default function Footer() {
  const appSettings = GetEnvConfig();

  return (
    <footer className="footer-section">
      <div className="container relative">
        <div className="sofa-img">
          <img
            src="static/media/img/sofa.png"
            alt="Image"
            className="img-fluid"
          />
        </div>

        {/* <div className="row">
          <div className="col-lg-8">
            <div className="subscription-form">
              <h3 className="d-flex align-items-center">
                <span className="me-1">
                  <img
                    src="static/media/img/envelope-outline.svg"
                    alt="Image"
                    className="img-fluid"
                  />
                </span>
                <span>Subscribe to Newsletter</span>
              </h3>

              <form action="#" className="row g-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="col-auto">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary">
                    <span className="fa fa-paper-plane"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="col-lg-8">
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>

        <div className="row g-5 mb-5" id="contactus">
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <a href="#" className="footer-logo">
                {appSettings.name}
                <span>.</span>
              </a>
            </div>
            <p className="mb-4">{appSettings.description}</p>

            <ul className="list-unstyled custom-social">
              <li>
                <a href="#">
                  <span className="bi bi-instagram"></span>
                  {appSettings?.homePage?.contactDetails?.instagram}
                </a>
              </li>
              <li>
                <a
                  href={
                    `https://wa.me/${appSettings?.homePage?.contactDetails?.whatsapp?.number}?text=` +
                    appSettings?.homePage?.contactDetails?.whatsapp?.message
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="bi bi-whatsapp"></span>
                  {appSettings?.homePage?.contactDetails?.contactnumber}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="row links-wrap">
              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">About us</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Contact us</a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Support</a>
                  </li>
                  <li>
                    <a href="#">Knowledge base</a>
                  </li>
                  <li>
                    <a href="#">Live chat</a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Jobs</a>
                  </li>
                  <li>
                    <a href="#">Our team</a>
                  </li>
                  <li>
                    <a href="#">Leadership</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Nordic Chair</a>
                  </li>
                  <li>
                    <a href="#">Kruzo Aero</a>
                  </li>
                  <li>
                    <a href="#">Ergonomic Chair</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-8">
              <p className="mb-2 text-center text-lg-start">
                Copyright &copy;
                {new Date().getFullYear()}. All Rights Reserved. &mdash;
                Designed with love by{" "}
                <a href="https://cloudmatrixlabs.com">cloudmatrixlabs.com</a>
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
}
