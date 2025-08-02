"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import Charts from "./components/Charts";
import EmployeeSurvey from "./forms/EmployeeSurvey";
import SatisfactionSurvey from "./forms/EmployeeSatisfactionSurvey";
import HouseholdSurvey from "./forms/HSE/Household";
import BusinessSurvey from "./forms/HSE/Business";
import IndustrialMinor from "./forms/MinorSubscribers/Industrial";
import BusinessMinor from "./forms/MinorSubscribers/Business";
import HouseholdMinor from "./forms/MinorSubscribers/Household";
import IndustrialMajor from "./forms/MajorSubscribers/Industrial";
import BusinessMajor from "./forms/MajorSubscribers/Business";
import HouseholdMajor from "./forms/MajorSubscribers/Household";
import FacilityNeighborsSurvey from "./forms/FacilityNeighborsSurvey";
import CommunityRepresentativesSurvey from "./forms/CommunityRepresentativesSurvey";
import ApplicantsVisitorsSurvey from "./forms/ApplicantsVisitorsSurvey";
import ExecutiveContractorsSurvey from "./forms/ExecutiveContractors";
import ServiceContractorsSurvey from "./forms/ServiceContractors";
import MainStakeholdersSurvey from "./forms/MainStakeholdersSurvey";
import SuppliersSurvey from "./forms/SuppliersSurvey";

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setOpenSubMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const forms = [
    { name: "کارکنان (HSE)", component: <EmployeeSurvey /> },
    { name: "متقاضیان و مراجعین", component: <ApplicantsVisitorsSurvey /> },
    { name: "نمایندگان جامعه", component: <CommunityRepresentativesSurvey /> },
    { name: "پیمان کاران اجرایی", component: <ExecutiveContractorsSurvey /> },
    { name: "پیمانکاران خدماتی", component: <ServiceContractorsSurvey /> },
    { name: "تامین کنندگان کالا", component: <SuppliersSurvey /> },
    { name: "ذینفعان اصلی شرکت", component: <MainStakeholdersSurvey /> },
    { name: "همسایگان تاسیسات", component: <FacilityNeighborsSurvey /> },
    { name: "رضایت کارکنان", component: <SatisfactionSurvey /> },
    { name: "مشترکین جز - صنعتی", component: <IndustrialMinor /> },
    { name: "مشترکین جز - تجاری", component: <BusinessMinor /> },
    { name: "مشترکین جز - خانگی", component: <HouseholdMinor /> },
    { name: "مشترکین عمده - صنعتی", component: <IndustrialMajor /> },
    { name: "مشترکین عمده - تجاری", component: <BusinessMajor /> },
    { name: "مشترکین عمده - خانگی", component: <HouseholdMajor /> },
    { name: "HSE - خانگی", component: <HouseholdSurvey /> },
    { name: "HSE - تجاری", component: <BusinessSurvey /> },
    { name: "HSE - صنعتی", component: <IndustrialMajor /> },
  ];

  const renderControlledSubMenu = (title: string, filterKey: string) => (
    <li className="relative">
      <div
        onClick={() =>
          setOpenSubMenu(openSubMenu === filterKey ? null : filterKey)
        }
        className="flex justify-between items-center py-2 px-4 hover:bg-blue-300 cursor-pointer"
      >
        {title}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            openSubMenu === filterKey ? "rotate-180" : ""
          }`}
        />
      </div>
      {openSubMenu === filterKey && (
        <ul className="absolute top-0 right-full bg-blue-200 rounded shadow-lg w-48 z-10">
          {forms
            .filter((f) => f.name.startsWith(filterKey))
            .map((subForm, index) => (
              <li
                key={index}
                className="py-2 px-4 hover:bg-blue-300 cursor-pointer"
                onClick={() => {
                  setSelectedForm(subForm.name);
                  setIsDropdownOpen(false);
                  setOpenSubMenu(null);
                }}
              >
                {subForm.name.replace(`${filterKey} - `, "")}
              </li>
            ))}
        </ul>
      )}
    </li>
  );

  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <header className="bg-[#97ceff] text-slate-900 p-4 flex-shrink-0">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">داشبورد</h1>
          <button className="hover:underline text-blue-950">خروج</button>
        </nav>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-[#6bb8ff] text-blue-950 p-4 flex-shrink-0">
          <h2 className="text-xl font-bold mb-4">منو</h2>
          <nav>
            <ul className="space-y-2">
              <li
                className="flex items-center space-x-2 hover:bg-blue-400 cursor-pointer"
                onClick={() => setSelectedForm("home")}
              >
                <HomeIcon className="w-8 h-8 text-slate-700" />
                <span className="text-lg">صفحه اصلی</span>
              </li>
              <li
                className="flex items-center space-x-2 hover:bg-blue-400 cursor-pointer"
                onClick={() => setSelectedForm("report")}
              >
                <ChartBarIcon className="w-8 h-8 text-slate-700 " />
                <span className="text-lg">گزارشات</span>
              </li>
              <li className="flex items-center hover:bg-blue-400 cursor-pointer relative">
                <div ref={dropdownRef} className="w-full">
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex justify-between items-center w-full text-lg cursor-pointer"
                  >
                    <DocumentTextIcon className="w-8 h-8 text-slate-700" />
                    <span className="flex-1 text-right">فرم‌ها</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  {isDropdownOpen && (
                    <ul className="top-10 bg-blue-100 rounded shadow-lg w-56 p-2">
                      {renderControlledSubMenu("مشترکین جز", "مشترکین جز")}
                      {renderControlledSubMenu("مشترکین عمده", "مشترکین عمده")}
                      {renderControlledSubMenu("HSE (جز و عمده)", "HSE")}
                      {forms
                        .filter(
                          (f) =>
                            !f.name.startsWith("مشترکین جز") &&
                            !f.name.startsWith("مشترکین عمده") &&
                            !f.name.startsWith("HSE")
                        )
                        .map((form, index) => (
                          <li
                            key={index}
                            className="py-2 px-4 hover:bg-blue-300 cursor-pointer"
                            onClick={() => {
                              setSelectedForm(form.name);
                              setIsDropdownOpen(false);
                              setOpenSubMenu(null);
                            }}
                          >
                            {form.name}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {selectedForm === "home" && <Charts />}
          {selectedForm !== "home" && (
            <div className="p-4 bg-white rounded shadow-md w-11/12 mx-auto">
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
