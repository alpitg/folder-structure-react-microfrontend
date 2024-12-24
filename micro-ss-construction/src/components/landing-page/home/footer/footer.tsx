import "./footer.scss";

const Footer = () => {
  const companyName = "SS Construction";

  return (
    <div className="footer">
      <div className="row text-align-center padding-top-bottom-30">
        <span className="copyright">
          {`Copyright © ${new Date().getFullYear()} ${companyName} | Designed by `}
          <a
            href="https://www.technossplash.com"
            title="Technossplash"
            target="_blank"
          >
            Technossplash
          </a>
        </span>
      </div>
    </div>
  );
};

export default Footer;
