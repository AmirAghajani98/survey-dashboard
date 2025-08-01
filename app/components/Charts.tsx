import React, { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import EmployeeSurvey from "../forms/EmployeeSurvey";
import HouseholdForm from "../forms/HouseholdSurvey";
import {
  UserGroupIcon,
  ClipboardDocumentIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import StatsCard from "./StatsCard";
import FacilityNeighborsSurvey from "../forms/FacilityNeighborsSurvey";
import EmployeeSatisfactionSurvey from "../forms/EmployeeSatisfactionSurvey";
import MajorSubscribersSurvey from "../forms/MajorSubscribers";
import MinorSubscribers from "../forms/MinorSubscribers";
import ApplicantsVisitorsSurvey from "../forms/ApplicantsVisitorsSurvey";
import CommunityRepresentativesSurvey from "../forms/CommunityRepresentativesSurvey";
import ServiceContractorsSurvey from "../forms/ServiceContractors";
import SuppliersSurvey from "../forms/SuppliersSurvey";
import MainStakeholdersSurvey from "../forms/MainStakeholdersSurvey";
import ExecutiveContractorsSurvey from "../forms/ExecutiveContractors";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

const bluePalette = {
  light: "#e3f2fd",
  main: "#2196f3",
  dark: "#1565c0",
  accent: "#64b5f6",
  border: "#1976d2",
  area: "rgba(33, 150, 243, 0.2)",
  doughnut1: "rgba(33, 150, 243, 0.5)",
  doughnut2: "rgba(13, 71, 161, 0.5)",
};

const doughnutData = {
  labels: ["رضایت", "عدم رضایت"],
  datasets: [
    {
      data: [85, 15],
      backgroundColor: [bluePalette.doughnut1, bluePalette.doughnut2],
      borderColor: [bluePalette.main, bluePalette.dark],
      borderWidth: 2,
    },
  ],
};

const forms = [
  { name: "کارکنان", component: <EmployeeSurvey /> },
  { name: "همسایگان تاسیسات", component: <FacilityNeighborsSurvey /> },
  { name: "رضایت کارکنان", component: <EmployeeSatisfactionSurvey /> },
  {
    name: "مشترکین عمده",
    component: <MajorSubscribersSurvey />,
  },
  {
    name: "مشترکین جز ",
    component: <MinorSubscribers />,
  },
  { name: "متقاضیان و مراجعین", component: <ApplicantsVisitorsSurvey /> },
  { name: "نمایندگان جامعه", component: <CommunityRepresentativesSurvey /> },
  { name: "پیمان کاران اجرایی", component: <ExecutiveContractorsSurvey /> },
  { name: "پیمانکاران خدماتی", component: <ServiceContractorsSurvey /> },
  { name: "تامین کنندگان کالا", component: <SuppliersSurvey /> },
  { name: "ذینفعان اصلی شرکت", component: <MainStakeholdersSurvey /> },
  { name: "مشترکین خانگی", component: <HouseholdForm /> },
];

const Charts: React.FC = () => {
  const [surveyCounts, setSurveyCounts] = useState<number[]>([]);

  useEffect(() => {
    const counts = forms.map(() => Math.floor(Math.random() * 200) + 50);
    setSurveyCounts(counts);
  }, []);

  const areaData = {
    labels: forms.map((form) => form.name),
    datasets: [
      {
        label: "تعداد",
        data:
          surveyCounts.length > 0 ? surveyCounts : Array(forms.length).fill(0),
        backgroundColor: bluePalette.area,
        borderColor: bluePalette.main,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <>
      <div className="flex gap-4 w-full">
        <div className="bg-white shadow-md rounded-lg p-4 w-3/12">
          <h2 className="text-xl font-bold mb-4 text-blue-700">میزان رضایت </h2>
          <Doughnut data={doughnutData} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 w-7/12">
          <h2 className="text-xl font-bold mb-4 text-blue-700">نظرسنجی </h2>
          <Line
            data={areaData}
            options={{ elements: { line: { tension: 0.4 } } }}
          />
        </div>
        <div className="w-2/12 flex flex-col justify-between space-y-1">
          <StatsCard
            title="تعداد مشترکین"
            value={1200}
            icon={<UserGroupIcon className="w-8 h-8 text-blue-600" />}
          />
          <StatsCard
            title="تعداد مشارکت"
            value={15}
            icon={<ClipboardDocumentIcon className="w-8 h-8 text-blue-600" />}
          />
          <StatsCard
            title="میزان رضایت"
            value={85}
            icon={<HandThumbUpIcon className="w-8 h-8 text-blue-600" />}
          />
          <StatsCard
            title="میزان نارضایتی"
            value={15}
            icon={<HandThumbDownIcon className="w-8 h-8 text-blue-600" />}
          />
        </div>
      </div>
      <div className="pt-8 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-blue-700">
          لیست فرم‌های نظرسنجی
        </h2>
        <div className="mb-2 flex font-bold text-blue-900 text-lg border-b pb-2">
          <div className="w-3/4 text-right">عنوان فرم</div>
          <div className="w-1/4 text-center border-blue-300">تعداد نظرسنجی</div>
        </div>
        <ul className="space-y-2">
          {forms.map((form, idx) => (
            <li
              key={idx}
              className="border-b pb-2 last:border-none flex items-center"
            >
              <div className="w-3/4 text-blue-900 text-right">{form.name}</div>
              <div className="w-1/4 text-center border-blue-200">
                <span className="bg-blue-100 text-blue-700 rounded px-2 py-0.5 text-sm font-bold">
                  {surveyCounts[idx] ?? 0}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Charts;
