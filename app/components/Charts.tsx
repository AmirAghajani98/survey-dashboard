"use client";

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

import {
  UserGroupIcon,
  ClipboardDocumentIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
} from "@heroicons/react/24/outline";
import StatsCard from "../components/StatsCard";
import EmployeeSurvey from "../forms/EmployeeSurvey";
import HouseholdForm from "../forms/HSE/Household";

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
      <div className="grid grid-cols-1 items-center justify-center md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="تعداد مشترکین"
          value={1200}
          icon={<UserGroupIcon className="w-10 h-10 text-blue-100" />}
          color="bg-blue-600"
        />
        <StatsCard
          title="تعداد مشارکت"
          value={15}
          icon={<ClipboardDocumentIcon className="w-10 h-10 text-blue-100" />}
          color="bg-orange-600"
        />
        <StatsCard
          title="میزان رضایت"
          value={85}
          icon={<HandThumbUpIcon className="w-10 h-10 text-blue-100" />}
          color="bg-green-600"
        />
        <StatsCard
          title="میزان نارضایتی"
          value={15}
          icon={<HandThumbDownIcon className="w-10 h-10 text-blue-100" />}
          color="bg-red-600"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Notification Performance
          </h3>
          <div className="flex space-x-2 mb-6">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-100 rounded-lg">
              Daily
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">
              Weekly
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-lg">
              Monthly
            </button>
          </div>
          <div className="chart-container">
            <Line
              data={areaData}
              options={{ elements: { line: { tension: 0.4 } } }}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Alert Distribution
            </h3>
            <div className="chart-container">
              <Doughnut data={doughnutData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-paper-plane text-blue-600 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  Marketing campaign sent
                </p>
                <p className="text-xs text-gray-500">
                  by Sarah Johnson • 5 minutes ago
                </p>
              </div>
              <span className="text-xs text-gray-400">2,847 recipients</span>
            </div>

            <div className="flex items-center space-x-4 p-3 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-green-600 text-sm"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">
                  System backup completed
                </p>
                <p className="text-xs text-gray-500">Automated • 1 hour ago</p>
              </div>
              <span className="text-xs text-gray-400">Success</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            System Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Email Service
                  </p>
                  <p className="text-xs text-gray-500">Uptime: 99.9%</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Operational
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full status-indicator"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    SMS Gateway
                  </p>
                  <p className="text-xs text-gray-500">Uptime: 99.7%</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Operational
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full status-indicator"></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Push Notifications
                  </p>
                  <p className="text-xs text-gray-500">Uptime: 98.2%</p>
                </div>
              </div>
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                Degraded
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Charts;
