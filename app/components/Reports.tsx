"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

import {
  UserGroupIcon,
  ClipboardDocumentIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ArrowLongUpIcon,
  ArrowLongDownIcon,
} from "@heroicons/react/24/outline";
import BarChartGrouped from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import StatsCard from "../components/StatsCard";
import EmployeeSurvey from "../dashboard/forms/EmployeeSurvey";
import HouseholdSurvey from "../dashboard/forms/HSE/Household";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Tooltip,
  Legend
);

const bluePalette = {
  area: "rgba(33, 150, 243, 0.5)",
  main: "#2196f3",
  dark: "#1565c0",
  doughnut1: "rgba(33, 150, 243, 0.5)",
  doughnut2: "rgba(13, 71, 161, 0.5)",
};

const forms = [
  { name: "کارکنان", component: <EmployeeSurvey /> },
  { name: "مشترکین خانگی", component: <HouseholdSurvey /> },
];

export default function Reports() {
  const [surveyCounts, setSurveyCounts] = useState<number[]>([]);
  const [satisfactionCounts, setSatisfactionCounts] = useState<number[]>([]);
  const [dissatisfactionCounts, setDissatisfactionCounts] = useState<number[]>(
    []
  );
  const [participationCounts, setParticipationCounts] = useState<number[]>([]);

  useEffect(() => {
    const countSeries = forms.map(() => Math.floor(Math.random() * 100) + 50);
    const satSeries = forms.map(() => Math.floor(Math.random() * 80) + 10);
    const disSatSeries = forms.map(() => Math.floor(Math.random() * 30));
    const partSeries = forms.map(() => Math.floor(Math.random() * 120) + 20);

    setSurveyCounts(countSeries);
    setSatisfactionCounts(satSeries);
    setDissatisfactionCounts(disSatSeries);
    setParticipationCounts(partSeries);
  }, []);

  const totalParticipants = participationCounts.reduce((a, b) => a + b, 0);
  const totalSatisfaction = satisfactionCounts.reduce((a, b) => a + b, 0);
  const totalDissatisfaction = dissatisfactionCounts.reduce((a, b) => a + b, 0);
  const totalSum = totalSatisfaction + totalDissatisfaction;

  const doughnutData = {
    labels: ["رضایت", "عدم رضایت"],
    datasets: [
      {
        data: [totalSatisfaction, totalDissatisfaction],
        backgroundColor: [bluePalette.doughnut1, bluePalette.doughnut2],
        borderColor: [bluePalette.main, bluePalette.dark],
        borderWidth: 2,
      },
    ],
  };

  const TrendIconUp = (
    <ArrowLongUpIcon className="w-6 h-6 inline text-green-500 mr-1" />
  );
  const TrendIconDown = (
    <ArrowLongDownIcon className="w-6 h-6 inline text-red-500 mr-1" />
  );

  return (
    <div
      dir="rtl"
      className="space-y-8 bg-slate-100 w-[96%] min-h-screen mt-6 mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="تعداد مشترکین"
          value={1200}
          icon={<UserGroupIcon className="w-9 h-9 text-blue-100" />}
          color="bg-blue-600"
          log={<span>{TrendIconUp} مقدار ثابت 1200 برای مشترکین</span>}
        />
        <StatsCard
          title="تعداد مشارکت"
          value={totalParticipants}
          icon={<ClipboardDocumentIcon className="w-9 h-9 text-blue-100" />}
          color="bg-orange-600"
          log={
            <span>
              {totalParticipants > 100 ? TrendIconUp : TrendIconDown} مجموع
              مشارکت: {totalParticipants}
            </span>
          }
        />
        <StatsCard
          title="میانگین رضایت"
          value={Math.round((totalSatisfaction / totalSum) * 100)}
          icon={<HandThumbUpIcon className="w-9 h-9 text-blue-100" />}
          color="bg-green-600"
          log={
            <span>
              {totalSatisfaction > totalDissatisfaction
                ? TrendIconUp
                : TrendIconDown}{" "}
              رضایت: {totalSatisfaction} از {totalSum}
            </span>
          }
        />
        <StatsCard
          title="میانگین نارضایتی"
          value={Math.round((totalDissatisfaction / totalSum) * 100)}
          icon={<HandThumbDownIcon className="w-9 h-9 text-blue-100" />}
          color="bg-red-600"
          log={
            <span>
              {totalDissatisfaction > totalSatisfaction
                ? TrendIconUp
                : TrendIconDown}{" "}
              نارضایتی: {totalDissatisfaction} از {totalSum}
            </span>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            عملکرد نظرسنجی (مقایسه‌ای)
          </h3>
          <div className="chart-container">
            <BarChartGrouped />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            تفکیک رضایت کلی
          </h3>
          <div className="chart-container">
            <DoughnutChart data={doughnutData} />
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {forms.map((f) => (
          <div key={f.name} className="bg-white rounded-xl shadow-sm p-6">
            <h4 className="text-md font-medium text-gray-800 mb-4">{f.name}</h4>
            {f.component}
          </div>
        ))}
      </div> */}
    </div>
  );
}
