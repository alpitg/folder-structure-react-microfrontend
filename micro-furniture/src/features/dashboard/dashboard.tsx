import "./dashboard.scss";

import CountUp from "react-countup";
import { useGetDashboardStatsQuery } from "../../app/redux/crm/dashboard/dashboard.api";

const DashboardApp = () => {
  const { data: stats = [], isLoading, isError } = useGetDashboardStatsQuery();

  return (
    <section className="dashboard-app">
      <h1>Business Statistics</h1>

      <p>
        Get a comprehensive overview of your business performance with
        up-to-date statistics, trends, and key operational metrics.
      </p>

      <div className="row justify-content-center mt-10">
        <div className="col-lg-10">
          {isLoading ? (
            <div className="text-center py-5">Loading statistics...</div>
          ) : isError ? (
            <div className="text-center text-danger py-5">
              Failed to load statistics.
            </div>
          ) : (
            <div className="dashboard-stats">
              {stats?.map((stat, index) => (
                <div className="stat-item" key={index}>
                  <div className="stat-icon">
                    <i className={`bi ${stat.icon}`}></i>
                  </div>

                  <h3>
                    <CountUp end={stat?.value ?? 0} duration={2} />
                  </h3>

                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardApp;
