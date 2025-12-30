import "./contact-strip.scss";

const ContactStrip = () => {
  return (
    <div className="contact-strip">
      <div className="row">
        <div className="column column-1-3">
          <ul className="contact-details-list">
            <li className="sl-small-phone">
              <p>
                Phone:
                <br />
                +91 8149403097
              </p>
            </li>
          </ul>
        </div>
        <div className="column column-1-3">
          <ul className="contact-details-list">
            <li className="sl-small-location">
              <p>
                Plot No: 17 Balaji Nagar west Opposite Rahul medical store
                <br />
                Manewada road, Nagpur 440027
              </p>
            </li>
          </ul>
        </div>
        <div className="column column-1-3">
          <ul className="contact-details-list">
            <li className="sl-small-mail">
              <p>
                E-mail:
                <br />
                <a href="mailto:vivaanassociates01@gmail.com">
                  vivaanassociates01@gmail.com
                </a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactStrip;
