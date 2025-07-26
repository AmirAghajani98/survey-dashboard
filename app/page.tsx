"use client";

import React, { useState } from "react";
import HouseholdForm from "./forms/household";
import StatsCard from "./components/StatsCard";
import Charts from "./components/Charts";
import EmployeeSurvey from "./forms/employees";
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserGroupIcon,
  HandThumbUpIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState("صفحه اصلی");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const forms = [
    { name: "کارکنان", component: <EmployeeSurvey /> },
    { name: "همسایگان تاسیسات", component: <div>فرم همسایگان تاسیسات</div> },
    { name: "رضایت کارکنان", component: <div>فرم رضایت کارکنان</div> },
    {
      name: "مشترکین جز و مشترکین عمده",
      component: <div>فرم مشترکین جز و مشترکین عمده</div>,
    },
    {
      name: "متقاضیان و مراجعین",
      component: <div>فرم متقاضیان و مراجعین</div>,
    },
    { name: "نمایندگان جامعه", component: <div>فرم نمایندگان جامعه</div> },
    {
      name: "پیمان کاران اجرایی",
      component: <div>فرم پیمان کاران اجرایی</div>,
    },
    { name: "پیمانکاران خدماتی", component: <div>فرم پیمانکاران خدماتی</div> },
    {
      name: "تامین کنندگان کالا",
      component: <div>فرم تامین کنندگان کالا</div>,
    },
    { name: "ذینفعان اصلی شرکت", component: <div>فرم ذینفعان اصلی شرکت</div> },
    { name: "مشترکین خانگی", component: <HouseholdForm /> },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">داشبورد</h1>
          <div className="flex items-center space-x-4">
            <button className="hover:underline">خروج</button>
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-1">
        <aside className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-xl font-bold mb-4">منو</h2>
          <nav>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <HomeIcon className="w-5 h-5 text-white" />
                <button
                  onClick={() => setSelectedForm("صفحه اصلی")}
                  className="block py-2 px-4 rounded hover:bg-gray-700 text-left w-full"
                >
                  صفحه اصلی
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <ChartBarIcon className="w-5 h-5 text-white" />
                <button
                  onClick={() => setSelectedForm("گزارشات")}
                  className="block py-2 px-4 rounded hover:bg-gray-700 text-left w-full"
                >
                  گزارشات
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <DocumentTextIcon className="w-5 h-5 text-white" />
                <div className="relative w-full">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="block py-2 px-4 rounded hover:bg-gray-700 text-left w-full"
                  >
                    فرم‌ها
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute left-0 mt-2 bg-gray-700 rounded shadow-lg w-full">
                      {forms.map((form, index) => (
                        <li key={index} className="py-2 px-4 hover:bg-gray-600">
                          <button
                            onClick={() => {
                              setSelectedForm(form.name);
                              setIsDropdownOpen(false);
                            }}
                            className="text-left w-full"
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

        <main className="flex p-8 w-full">
          {selectedForm === "صفحه اصلی" && (
            <div className="flex w-full h-3/5 items-stretch">
              <div className="w-1/4 flex flex-col space-y-4">
                <StatsCard
                  title="تعداد کاربران"
                  value={1200}
                  icon={<UserGroupIcon className="w-6 h-6 text-blue-600" />}
                />
                <StatsCard
                  title="تعداد فرم‌ها"
                  value={15}
                  icon={
                    <ClipboardDocumentIcon className="w-6 h-6 text-blue-600" />
                  }
                />
                <StatsCard
                  title="میزان رضایت"
                  value={85}
                  icon={<HandThumbUpIcon className="w-6 h-6 text-blue-600" />}
                />
              </div>
              <div className="w-3/4">
                <Charts />
              </div>
            </div>
          )}
          {selectedForm !== "صفحه اصلی" && (
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
