"use client";

import React, { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  Bars3Icon,
  BellIcon,
} from "@heroicons/react/24/outline";

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

export default function Navigation({ children }: { children: ReactNode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  const isActive = (path: string) => pathname === path;

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
        <ul className="absolute top-0 right-full bg-blue-100 rounded shadow-lg w-56 z-10">
          {formNames
            .filter((name) => name.startsWith(key))
            .map((name) => {
              const slug = encodeURIComponent(name);
              return (
                <li key={name}>
                  <Link
                    href={`/dashboard/forms/${slug}`}
                    className="block py-2 px-4 hover:bg-blue-200"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    {name.replace(`${key} - `, "")}
                  </Link>
                </li>
              );
            })}
        </ul>
      )}
    </li>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500 hover:text-gray-700">
              <Bars3Icon className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                سامانه نظر سنجی اداره گاز استان قزوین
              </h2>
              <p className="text-sm text-gray-500">داشبورد مدیریتی و گزارشات</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative p-2 text-gray-400 hover:text-gray-600">
              <BellIcon className="w-6 h-6" />
              <span className="notification-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
            <button className="hover:underline text-blue-950 bg-sky-200 py-1 px-3 rounded-xl">
              خروج
            </button>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg z-50 sidebar-transition flex-shrink-0">
          <div className="py-4 border-b border-gray-200 px-6">
            <div className="flex items-center gap-3">
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

            <Link
              href="/dashboard"
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <HomeIcon className="w-5 h-5 ml-3" />
              <span>صفحه اصلی</span>
            </Link>

            <Link
              href="/reports"
              className={`flex items-center px-6 py-3 transition-colors ${
                isActive("/reports")
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <ChartBarIcon className="w-5 h-5 ml-3" />
              <span>گزارشات</span>
            </Link>

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
                  {renderSubMenu("HSE (جز و عمده)", "HSE")}
                  {formNames
                    .filter(
                      (f) =>
                        !f.startsWith("مشترکین جز") &&
                        !f.startsWith("مشترکین عمده") &&
                        !f.startsWith("HSE")
                    )
                    .map((f) => {
                      const slug = encodeURIComponent(f);
                      return (
                        <li key={f}>
                          <Link
                            href={`/dashboard/forms/${slug}`}
                            className="block py-2 px-6 text-gray-700 hover:bg-blue-200"
                            onClick={() => setIsDropdownOpen(false)}
                          >
                            {f}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-100">{children}</main>
      </div>
    </div>
  );
}
