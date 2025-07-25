"use client";

import React, { useState } from "react";
import HouseholdForm from "./forms/household";
import StatsCard from "./components/StatsCard";
import Charts from "./components/Charts";
import EmployeeSurvey from "./forms/employees";

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
    <div className="flex flex-col min-h-screen">
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
                <span>🏠</span>
                <button
                  onClick={() => setSelectedForm("صفحه اصلی")}
                  className="block py-2 px-4 rounded hover:bg-gray-700 text-left w-full"
                >
                  صفحه اصلی
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <span>📊</span>
                <button
                  onClick={() => setSelectedForm("گزارشات")}
                  className="block py-2 px-4 rounded hover:bg-gray-700 text-left w-full"
                >
                  گزارشات
                </button>
              </li>
              <li className="flex items-center space-x-2">
                <span>📄</span>
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

        <main className="flex-1 p-8">
          {selectedForm === "صفحه اصلی" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <div className="lg:col-span-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatsCard title="تعداد کاربران" value={1200} />
                <StatsCard title="تعداد فرم‌ها" value={15} />
                <StatsCard title="میزان رضایت" value={85} />
              </div>
              <div className="lg:col-span-2">
                <Charts />
              </div>
            </div>
          )}
          {selectedForm !== "صفحه اصلی" && (
            <div>
              {forms.find((form) => form.name === selectedForm)?.component || (
                <p>فرم انتخاب شده یافت نشد.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
