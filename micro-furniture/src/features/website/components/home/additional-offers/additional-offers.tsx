import "./additional-offers.scss";

const AdditionalOffersApp = () => {
  const offers = [
    {
      id: "sofa-emi",
      title: "10% Instant Discount* On Sofas.",
      image: "/static/media/img/furniture/category/sofas.png",
    },
    {
      id: "wardrobes-emi",
      title: "Up to ₹500 Instant Discount* on wardrobes.",
      image: "static/media/img/furniture/category/wardrobes.png",
    },
    {
      id: "bed-emi",
      title: "10% Instant Discount* On queen size bed.",
      image: "/static/media/img/furniture/category/beds.png",
    },
    {
      id: "art1000",
      title: "Extra ₹1,000 Off on Orders Above ₹15,000",
      subtitle: "Use Code ART1000",
      image: "/static/media/img/offers/discount.png",
    },
    {
      id: "art1800",
      title: "Extra ₹2,000 Off on Orders Above ₹20,000",
      subtitle: "Use Code ART2000",
      image: "/static/media/img/offers/discount.png",
    },
    {
      id: "gst",
      title: "Enjoy Reduced GST Rates",
      subtitle: "On Select Products",
      image: "/static/media/img/offers/gst.png",
    },
  ];

  return (
    <section className="additional-offers">
      <div className="container">
        <h2 className="mb-4 section-title">Deals You Can't Miss.</h2>

        <div className="additional-offers-list">
          {offers.map(({ id, title, subtitle, image }) => (
            <a key={id} className="additional-offers-item hover-ease-out">
              <img
                className="additional-offers-image"
                src={image}
                alt={title}
              />

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
      </div>
    </section>
  );
};

export default AdditionalOffersApp;
