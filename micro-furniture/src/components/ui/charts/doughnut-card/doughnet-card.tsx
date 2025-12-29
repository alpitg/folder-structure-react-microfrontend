import type { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

const DoughnetCard = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 78,
      width: 78,
    },
    labels: ["Used Truck freight", "Used Ship freight", "Used Plane freight"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#50CD89", "#0D6EFD", "#E4E6EF"],
    stroke: {
      width: 0,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val}%`,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
        },
      },
    },
  };

  const chartSeries = [45, 21, 34];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="donut"
      width={78}
      height={78}
    />
  );
};

export default DoughnetCard;
