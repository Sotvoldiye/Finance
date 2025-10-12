import React from "react";
import ReactApexChart from "react-apexcharts";
import style from "./Chart.module.scss";

export const Chart = ({ budgets, budgetTotal }) => {
  const series = budgets.map((m) => Number(m.maximum));

  const options = {
    chart: {
      type: "donut",
    },
    labels: budgets.map((c) => c.category),
    colors: budgets.map((c) => c.theme),
    responsive: [
      {
        breakpoint: 580,
        options: {
          chart: { width: 400 },
          legend: { position: "bottom" },
        },
      },
    ],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "",
              formatter: function () {
                return `$${budgetTotal}`;
              },
            },
            value: {
              show: true,
              formatter: function (val) {
                // har bir qiymatni $ bilan ko‘rsatish
                return `$${val}`;
              },
            },
            name: { show: true },
          },
        },
      },
    },
  };

  return (
    <div id="my-chart" className={style.chartContainer}>
      <div id="chart">
        <ReactApexChart
          key={budgetTotal + budgets.length} // 🔑 chart qayta render bo'lishi uchun
          options={options}
          series={series}
          type="donut"
          width={300}
        />
      </div>
    </div>
  );
};
