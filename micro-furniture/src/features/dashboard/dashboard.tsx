import "./dashboard.scss";

import CountUp from "react-countup";

const DashboardApp = () => {
  const stats = [
    {
      icon: "bi-trophy",
      value: 25,
      label: "Awards Won",
    },
    {
      icon: "bi-people",
      value: 850,
      label: "Happy Clients",
    },
    {
      icon: "bi-lightning",
      value: 95,
      label: "Project Success",
    },
    {
      icon: "bi-globe",
      value: 12,
      label: "Countries Served",
    },
  ];

  return (
    <section className="dashboard-app">
      <h1>Business Statistics</h1>
      <p>
        Get a comprehensive overview of your business performance with
        up-to-date statistics, trends, and key operational metrics.
      </p>

      <div className="row justify-content-center mt-10">
        <div className="col-lg-10">
          <div className="dashboard-stats">
            {stats.map((stat, index) => (
              <div className="stat-item" key={index}>
                <div className="stat-icon">
                  <i className={`bi ${stat.icon}`}></i>
                </div>

                <h3>
                  <CountUp end={stat?.value} duration={2} />+
                </h3>

                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardApp;
