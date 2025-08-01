"use client";

import React, { useState } from "react";
import HouseholdSurvey from "./forms/HouseholdSurvey";
import Charts from "./components/Charts";
import EmployeeSurvey from "./forms/EmployeeSurvey";
import SatisfactionSurvey from "./forms/EmployeeSatisfactionSurvey";
import MinorSubscribers from "./forms/MinorSubscribers";

import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import FacilityNeighborsSurvey from "./forms/FacilityNeighborsSurvey";
import MajorSubscribersSurvey from "./forms/MajorSubscribers";
import CommunityRepresentativesSurvey from "./forms/CommunityRepresentativesSurvey";
import ApplicantsVisitorsSurvey from "./forms/ApplicantsVisitorsSurvey";
import ExecutiveContractorsSurvey from "./forms/ExecutiveContractors";
import ServiceContractorsSurvey from "./forms/ServiceContractors";
import MainStakeholdersSurvey from "./forms/MainStakeholdersSurvey";
import SuppliersSurvey from "./forms/SuppliersSurvey";

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const forms = [
    { name: "کارکنان", component: <EmployeeSurvey /> },
    { name: "همسایگان تاسیسات", component: <FacilityNeighborsSurvey /> },
    { name: "رضایت کارکنان", component: <SatisfactionSurvey /> },
    {
      name: "فرم مشترکین عمده",
      component: <MajorSubscribersSurvey />,
    },
    {
      name: "مشترکین جز",
      component: <MinorSubscribers />,
    },
    {
      name: "متقاضیان و مراجعین",
      component: <ApplicantsVisitorsSurvey />,
    },
    { name: "نمایندگان جامعه", component: <CommunityRepresentativesSurvey /> },
    {
      name: "پیمان کاران اجرایی",
      component: <ExecutiveContractorsSurvey />,
    },
    { name: "پیمانکاران خدماتی", component: <ServiceContractorsSurvey /> },
    {
      name: "تامین کنندگان کالا",
      component: <SuppliersSurvey />,
    },
    { name: "ذینفعان اصلی شرکت", component: <MainStakeholdersSurvey /> },
    { name: "مشترکین خانگی", component: <HouseholdSurvey /> },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-[#97ceff] text-slate-900 p-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900">داشبورد</h1>
          <div className="flex items-center space-x-4">
            <button className="hover:underline text-blue-950">خروج</button>
            <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
              <span className="text-blue-950 text-sm">👤</span>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-[#6bb8ff] text-blue-950 p-4">
          <h2 className="text-xl font-bold mb-4 text-blue-950">منو</h2>
          <nav>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 hover:bg-blue-400">
                <HomeIcon className="w-8 h-8 text-slate-700" />
                <button
                  onClick={() => setSelectedForm("home")}
                  className="text-lg block py-2 px-4 rounded text-blue-950 text-right w-full"
                >
                  صفحه اصلی
                </button>
              </li>
              <li className="flex items-center space-x-2 hover:bg-blue-400">
                <ChartBarIcon className="w-8 h-8 text-slate-700 " />
                <button
                  onClick={() => setSelectedForm("report")}
                  className="text-lg block py-2 px-4 rounded text-blue-950 text-right w-full"
                >
                  گزارشات
                </button>
              </li>
              <li className="flex items-center space-x-2 hover:bg-blue-400">
                <DocumentTextIcon className="w-8 h-8 text-slate-700" />
                <div className="relative w-full">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-lg block py-2 px-4 rounded  text-blue-950 text-right w-full"
                  >
                    فرم‌ها
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute left-0 mt-2 bg-blue-800 rounded shadow-lg w-full">
                      {forms.map((form, index) => (
                        <li key={index} className="py-2 px-4 hover:bg-blue-900">
                          <button
                            onClick={() => {
                              setSelectedForm(form.name);
                              setIsDropdownOpen(false);
                            }}
                            className="text-left w-full text-blue-950"
                          >
                            {form.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="flex p-8 w-full justify-between">
          {selectedForm === "home" && (
            <div className="flex w-full h-1/2 gap-x-4">
              <div className="w-full">
                <Charts />
              </div>
            </div>
          )}
          {selectedForm !== "home" && (
            <div className="p-4 bg-white rounded shadow-md w-10/12 mx-auto">
              {forms.find((form) => form.name === selectedForm)?.component || (
                <p>فرم انتخاب شده یافت نشد.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </main>
  );
};

export default Dashboard;
