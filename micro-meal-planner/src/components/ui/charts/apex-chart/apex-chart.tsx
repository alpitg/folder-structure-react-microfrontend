import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const ApexChartApp = () => {
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
      theme: "dark", // TODO: make the theme dynamic
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
    <Chart options={chartOptions} series={series} type="area" height={125} />
  );
};

export default ApexChartApp;
