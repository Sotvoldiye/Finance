import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import style from "./Chart.module.scss";

export const Chart = ({ budgets, budgetTotal }) => {
  console.log(budgetTotal,'budgets')
  const [state, setState] = useState({
    series: budgets.map((m) => m.maximum),
    options: {
      chart: {
        type: "donut",
        fontFamily: "Public Sans",
      },
      labels: budgets.map((c) => c.category),
      colors: budgets.map((c) => c.theme),
      responsive: [
        {
          breakpoint: 580,
          options: {
            chart: {
              width: 400, // Mobil qurilma uchun yaxshilandi
            },
            legend: {
              position: "bottom",
            },
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
                label: "Total",
                formatter: () => `${budgetTotal}`,
              },
              name: {
                show: true,
              },
              value: {
                show: true,
              },
            },
          },
        },
      },
     
      
      
    },
  });


  return (
    <div id="my-chart" className={style.chartContainer}>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="donut"
          width={300}
        />
      </div>
        </div>
  );
};
