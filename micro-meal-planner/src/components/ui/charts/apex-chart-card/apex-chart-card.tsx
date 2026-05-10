import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const ApexChartCard = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
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
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      x: { format: "dd MMM" },
      y: {
        formatter: (val: any) => `${val}K`,
      },
    },
    xaxis: {
      categories: [
        "Feb 05",
        "Feb 06",
        "Feb 07",
        "Feb 08",
        "Feb 09",
        "Feb 10",
        "Feb 11",
      ],
    },
    colors: ["#00A261"],
  };

  const series = [
    {
      name: "Sales",
      data: [10, 42, 28, 50, 32, 48, 57],
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
      <div className="px-3" style={{ height: "140px" }}>
        <Chart
          options={chartOptions}
          series={series}
          type="area"
          height={125}
        />
      </div>
    </div>
  );
};

export default ApexChartCard;
