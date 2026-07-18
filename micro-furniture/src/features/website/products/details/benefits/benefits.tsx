import "./benefits.scss";

const BenefitsApp = () => {
  const benefits = [
    {
      icon: "bi-shield-check",
      text: "12 Months Warranty*",
    },
    {
      icon: "bi-truck",
      text: "Safe & Swift Delivery",
    },
    {
      icon: "bi-tools",
      text: "Free Installation",
    },
    {
      icon: "bi-headset",
      text: "Dedicated Customer Support",
    },
  ];

  return (
    <div className="benefits-app">
      <ul className="product-benefits">
        {benefits.map(({ icon, text }) => (
          <li key={text}>
            <div className="benefit-icon">
              <i className={`bi ${icon}`} />
            </div>
            <div className="benefit-text">{text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitsApp;
