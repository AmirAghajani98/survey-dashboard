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
import EmployeeSurvey from "../forms/employees";
import HouseholdForm from "../forms/household";

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

const forms = [
  { name: "کارکنان", component: <EmployeeSurvey /> },
  { name: "همسایگان تاسیسات", component: <div>فرم همسایگان تاسیسات</div> },
  { name: "رضایت کارکنان", component: <div>فرم رضایت کارکنان</div> },
  {
    name: "مشترکین جز و مشترکین عمده",
    component: <div>فرم مشترکین جز و مشترکین عمده</div>,
  },
  { name: "متقاضیان و مراجعین", component: <div>فرم متقاضیان و مراجعین</div> },
  { name: "نمایندگان جامعه", component: <div>فرم نمایندگان جامعه</div> },
  { name: "پیمان کاران اجرایی", component: <div>فرم پیمان کاران اجرایی</div> },
  { name: "پیمانکاران خدماتی", component: <div>فرم پیمانکاران خدماتی</div> },
  { name: "تامین کنندگان کالا", component: <div>فرم تامین کنندگان کالا</div> },
  { name: "ذینفعان اصلی شرکت", component: <div>فرم ذینفعان اصلی شرکت</div> },
  { name: "مشترکین خانگی", component: <HouseholdForm /> },
];

const barData = {
  labels: forms.map((form) => form.name),
  datasets: [
    {
      label: "تعداد",
      data: forms.map(() => Math.floor(Math.random() * 200) + 50),
      backgroundColor: "#82ca9d",
    },
  ],
};

const Charts = () => {
  return (
    <div className="flex gap-4">
      <div className="bg-white shadow-md rounded-lg p-4 w-4/12">
        <h2 className="text-xl font-bold mb-4">نمودار دایره‌ای</h2>
        <Pie data={pieData} />
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 w-8/12">
        <h2 className="text-xl font-bold mb-4">نمودار میله‌ای</h2>
        <Bar data={barData} />
      </div>
    </div>
  );
};

export default Charts;
