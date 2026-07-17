import "./additional-offers.scss";

const AdditionalOffersApp = () => {
  const offers = [
    {
      id: "icici-emi",
      title: "10% Instant Discount* On ICICI Credit Card EMI Transaction",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/ICICI-Bank_Logo_For-cobrands_RGB-1775651195357.jpeg",
      href: "https://www.urbanladder.com/page/icici-bank-credit-card-emi-offer?src=bank_offer_banner-1",
    },
    {
      id: "hdfc-emi",
      title: "Up to ₹4,000 Instant Discount* on HDFC Credit & Debit Card EMI",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/HDFC-logo-1761958451722.png",
      href: "https://www.urbanladder.com/page/hdfc-instant-discount-tnc?src=bank_offer_banner-2",
    },
    {
      id: "sbi-emi",
      title: "10% Instant Discount* On SBI Credit Card EMI Transaction",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/SBI-LOGO-01-1775018461504.svg",
      href: "https://www.urbanladder.com/page/sbi-bank-offer-terms-conditions?src=bank_offer_banner-3",
    },
    {
      id: "extra1000",
      title: "Extra ₹1,000 Off on Orders Above ₹15,000",
      subtitle: "Use Code EXTRA1000",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Icon-5-1757770900507.png",
      href: "/",
    },
    {
      id: "extra1800",
      title: "Extra ₹1,800 Off on Orders Above ₹20,000",
      subtitle: "Use Code EXTRA1800",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Icon-5-1757770900507.png",
      href: "/",
    },
    {
      id: "extra3000",
      title: "Extra ₹3,000 Off on Orders Above ₹30,000",
      subtitle: "Use Code EXTRA3000",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Icon-5-1757770900507.png",
      href: "/",
    },
    {
      id: "extra5000",
      title: "Extra ₹5,000 Off on Orders Above ₹75,000",
      subtitle: "Use Code EXTRA5000",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Icon-5-1757770900507.png",
      href: "/",
    },
    {
      id: "gift-voucher",
      title: "Gift Voucher Worth Up to ₹15,000",
      subtitle: "On Orders Above ₹1,00,000",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Frame-1000005287-1758604776678.png",
      href: "/",
    },
    {
      id: "gst",
      title: "Enjoy Reduced GST Rates",
      subtitle: "On Select Products",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/Frame-1000005288-1758604991233.png",
      href: "/",
    },
    {
      id: "reliance-sbi",
      title: "5% Instant Savings on Reliance SBI Co-branded Cards",
      image:
        "https://cdn.swadeshonline.com/v2/patient-paper-41f385/swad-p/wrkr/company/17/applications/65f437fae78851028707daee/theme/pictures/free/original/ril-logo-1x1-1763036462620.png",
      href: "https://www.sbicard.com/en/reliance-eapply.page",
    },
  ];

  return (
    <section className="additional-offers">
      <h2 className="mb-4 section-title">Deals You Can't Miss.</h2>

      <div className="additional-offers-list">
        {offers.map(({ id, title, subtitle, image, href }) => (
          <a
            key={id}
            href={href}
            className="additional-offers-item hover-ease-out"
          >
            <img className="additional-offers-image" src={image} alt={title} />

            <p className="additional-offers-text">
              {title}
              {subtitle && (
                <>
                  <br />
                  <strong>{subtitle}</strong>
                </>
              )}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default AdditionalOffersApp;
