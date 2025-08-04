import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { Yellowtail } from "next/font/google";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "کارکنان (HSE)",
  "متقاضیان و مراجعین",
  "نمایندگان جامعه",
  "مشترکین جز",
  "مشترکین عمده ",
  "همسایگان تاسیسات",
  "پیمانکاران اجرایی",
  "پیمانکاران خدماتی",
  "تامین کنندگان کالا",
  "ذینفعان اصلی",
  "رضایت کارکنان",
];

const data = {
  labels,
  datasets: [
    {
      label: "رضایت",
      data: labels.map(() => faker.number.int({ min: 20, max: 100 })),
      backgroundColor: "rgba(161, 145, 138, 0.7)",
    },
    {
      label: "نارضایتی",
      data: labels.map(() => faker.number.int({ min: 0, max: 80 })),
      backgroundColor: "rgba(178, 142, 209, 0.7)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "مقایسه رضایت و نارضایتی در ۴ گروه" },
  },
  scales: {
    x: { stacked: false },
    y: { beginAtZero: true },
  },
};

const BarChartGrouped: React.FC = () => {
  return <Bar options={options} data={data} />;
};

export default BarChartGrouped;
