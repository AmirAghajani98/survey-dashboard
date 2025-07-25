import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const pieData = {
  labels: ["رضایت", "عدم رضایت"],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: ["#0088FE", "#FF8042"],
    },
  ],
};

const barData = {
  labels: [
    "فرم 1",
    "فرم 2",
    "فرم 3",
    "فرم 4",
    "فرم 5",
    "فرم 6",
    "فرم 7",
    "فرم 8",
    "فرم 9",
    "فرم 10",
    "فرم 11",
  ],
  datasets: [
    {
      label: "تعداد",
      data: [120, 90, 150, 200, 180, 140, 110, 130, 170, 190, 160],
      backgroundColor: "#82ca9d",
    },
  ],
};

const Charts = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-white shadow-md rounded-lg p-4 w-1/4">
        <h2 className="text-xl font-bold mb-4">نمودار دایره‌ای</h2>
        <Pie data={pieData} />
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 w-2/4">
        <h2 className="text-xl font-bold mb-4">نمودار میله‌ای</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
