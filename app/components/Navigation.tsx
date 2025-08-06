"use client";

import React, { useState, useRef, useEffect, ReactNode, FC } from "react";
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  Bars3Icon,
  BellIcon,
} from "@heroicons/react/24/outline";
import { usePathname, useRouter } from "next/navigation";

interface NavigationProps {
  children?: ReactNode;
}

const formNames = [
  "کارکنان (HSE)",
  "متقاضیان و مراجعین",
  "نمایندگان جامعه",
  "پیمان کاران اجرایی",
  "پیمانکاران خدماتی",
  "تامین کنندگان کالا",
  "ذینفعان اصلی شرکت",
  "همسایگان تاسیسات",
  "رضایت کارکنان",
  "مشترکین جز - صنعتی",
  "مشترکین جز - تجاری",
  "مشترکین جز - خانگی",
  "مشترکین عمده - صنعتی",
  "مشترکین عمده - تجاری",
  "مشترکین عمده - خانگی",
  "HSE - خانگی",
  "HSE - تجاری",
  "HSE - صنعتی",
];

const Navigation: FC<NavigationProps> = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
        setOpenSubMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderSubMenu = (title: string, key: string) => (
    <li className="relative">
      <div
        onClick={() => setOpenSubMenu(openSubMenu === key ? null : key)}
        className="flex justify-between items-center py-2 px-6 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
      >
        {title}
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform ${
            openSubMenu === key ? "rotate-180" : ""
          }`}
        />
      </div>
      {openSubMenu === key && (
        <ul className="absolute top-0 right-full bg-blue-100 rounded shadow-lg w-48 z-10">
          {formNames
            .filter((name) => name.startsWith(key))
            .map((name, i) => (
              <li
                key={i}
                onClick={() => {
                  router.push(`/forms/${encodeURIComponent(name)}`);
                  setIsDropdownOpen(false);
                  setOpenSubMenu(null);
                }}
                className={`py-2 px-4 cursor-pointer hover:bg-blue-200 ${
                  pathname === `/forms/${encodeURIComponent(name)}`
                    ? "bg-blue-300 text-white"
                    : ""
                }`}
              >
                {name.replace(`${key} - `, "")}
              </li>
            ))}
        </ul>
      )}
    </li>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                سامانه نظر سنجی اداره گاز استان قزوین
              </h2>
              <p className="text-sm text-gray-500">داشبورد مدیریتی و گزارشات</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div
              className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="اطلاعیه‌ها"
            >
              <BellIcon className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <button
              onClick={() => router.push("/login")}
              className="hover:underline text-blue-950 bg-sky-200 py-1 px-3 rounded-xl"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white shadow-lg z-50 flex-shrink-0">
          <div className="py-4 border-b border-gray-200 px-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <HomeIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">pmk-group</h1>
                <p className="text-sm text-gray-500">پویش مهر کسری</p>
              </div>
            </div>
          </div>

          <nav className="mt-4">
            <div className="px-6 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                منو
              </p>
            </div>

            <div
              onClick={() => router.push("/")}
              className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <HomeIcon className="w-5 h-5 ml-3" />
              <span>صفحه اصلی</span>
            </div>

            <div
              onClick={() => router.push("/reports")}
              className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                pathname === "/reports"
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <ChartBarIcon className="w-5 h-5 ml-3" />
              <span>گزارشات</span>
            </div>

            <div className="px-6 mt-4 mb-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                میزکار
              </p>
            </div>

            <div ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <DocumentTextIcon className="w-5 h-5 ml-3" />
                  <span>فرم‌ها</span>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
              {isDropdownOpen && (
                <ul className="bg-blue-100/80 rounded-b-lg shadow-inner">
                  {renderSubMenu("مشترکین جز", "مشترکین جز")}
                  {renderSubMenu("مشترکین عمده", "مشترکین عمده")}
                  {renderSubMenu("HSE", "HSE")}
                  {formNames
                    .filter(
                      (f) =>
                        !f.startsWith("مشترکین جز") &&
                        !f.startsWith("مشترکین عمده") &&
                        !f.startsWith("HSE")
                    )
                    .map((f, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          router.push(`/forms/${encodeURIComponent(f)}`);
                          setIsDropdownOpen(false);
                        }}
                        className={`py-2 px-6 text-gray-700 hover:bg-blue-200 cursor-pointer ${
                          pathname === `/forms/${encodeURIComponent(f)}`
                            ? "bg-blue-300 text-white"
                            : ""
                        }`}
                      >
                        {f}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </nav>
        </aside>

        <div className="flex-1 overflow-y-auto bg-slate-100">{children}</div>
      </div>
    </div>
  );
};

export default Navigation;
