import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const ChartWidget = () => {
  const chartOptions: ApexOptions = {
    chart: {
      id: "online-sales",
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0,
      },
    },
    colors: ["#b5b7c8"],
    tooltip: {
      enabled: true,
      y: {
        formatter: (val) => `${val}K`,
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2025-02-01",
        "2025-02-02",
        "2025-02-03",
        "2025-02-04",
        "2025-02-05",
        "2025-02-06",
        "2025-02-07",
        "2025-02-08",
        "2025-02-09",
        "2025-02-10",
        "2025-02-11",
      ],
    },
  };

  const chartSeries = [
    {
      name: "Sales",
      data: [71, 8, 91, 2, 51, 11, 48, 42, 2, 42, 8],
    },
  ];

  return (
    <div className="card-body d-flex justify-content-between flex-column px-0 pb-0">
      {/* Statistics */}
      <div className="mb-4 px-9">
        <div className="d-flex align-items-center mb-2">
          <span className="fs-2hx fw-bold text-gray-800 me-2 lh-1 ls-n2">
            47,769,700
          </span>
          <span className="d-flex align-items-end text-gray-500 fs-6 fw-semibold">
            Tons
          </span>
        </div>
        <span className="fs-6 fw-semibold text-gray-500">
          Total Online Sales
        </span>
      </div>

      {/* Chart */}
      <div style={{ height: "140px" }}>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={140}
        />
      </div>
    </div>
  );
};

export default ChartWidget;
