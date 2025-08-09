"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowserClient } from "@/utils/supabase/client";
import Reports from "./reports/page";
import EmployeeSurvey from "./dashboard/forms/EmployeeSurvey";
import EmployeeSatisfactionSurvey from "./dashboard/forms/EmployeeSatisfactionSurvey";
import HouseholdSurvey from "./dashboard/forms/HSE/Household";
import BusinessSurvey from "./dashboard/forms/HSE/Business";
import MajorIndustrial from "./dashboard/forms/MajorSubscribers/Industrial";
import MinorIndustrial from "./dashboard/forms/MinorSubscribers/Industrial";
import MinorBusiness from "./dashboard/forms/MinorSubscribers/Business";
import MinorHouseHold from "./dashboard/forms/MinorSubscribers/Household";
import MajorBusiness from "./dashboard/forms/MajorSubscribers/Business";
import MajorHouseHold from "./dashboard/forms/MajorSubscribers/Household";
import FacilityNeighborsSurvey from "./dashboard/forms/FacilityNeighborsSurvey";
import CommunityRepresentativesSurvey from "./dashboard/forms/CommunityRepresentativesSurvey";
import ApplicantsVisitorsSurvey from "./dashboard/forms/ApplicantsVisitorsSurvey";
import ExecutiveContractorsSurvey from "./dashboard/forms/ExecutiveContractors";
import ServiceContractorsSurvey from "./dashboard/forms/ServiceContractors";
import SuppliersSurvey from "./dashboard/forms/SuppliersSurvey";
import MainStakeholdersSurvey from "./dashboard/forms/MainStakeholdersSurvey";

export default function Dashboard() {
  const [selected, setSelected] = useState<string>("home");
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/login");
      }
      setCheckingSession(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        router.push("/login");
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, [router]);
  if (checkingSession) {
    return null;
  }

  const renderContent = () => {
    switch (selected) {
      case "home":
        return <p className="p-6">به داشبورد خوش آمدید!</p>;
      case "report":
        return <Reports />;
      case "کارکنان (HSE)":
        return <EmployeeSurvey />;
      case "رضایت کارکنان":
        return <EmployeeSatisfactionSurvey />;
      case "HSE - خانگی":
        return <HouseholdSurvey />;
      case "HSE - تجاری":
        return <BusinessSurvey />;
      case "HSE - صنعتی":
        return <MajorIndustrial />;
      case "مشترکین جز - صنعتی":
        return <MinorIndustrial />;
      case "مشترکین جز - تجاری":
        return <MinorBusiness />;
      case "مشترکین جز - خانگی":
        return <MinorHouseHold />;
      case "مشترکین عمده - صنعتی":
        return <MajorIndustrial />;
      case "مشترکین عمده - تجاری":
        return <MajorBusiness />;
      case "مشترکین عمده - خانگی":
        return <MajorHouseHold />;
      case "همسایگان تاسیسات":
        return <FacilityNeighborsSurvey />;
      case "نمایندگان جامعه":
        return <CommunityRepresentativesSurvey />;
      case "متقاضیان و مراجعین":
        return <ApplicantsVisitorsSurvey />;
      case "پیمان کاران اجرایی":
        return <ExecutiveContractorsSurvey />;
      case "پیمانکاران خدماتی":
        return <ServiceContractorsSurvey />;
      case "تامین کنندگان کالا":
        return <SuppliersSurvey />;
      case "ذینفعان اصلی شرکت":
        return <MainStakeholdersSurvey />;

      default:
        return (
          <p className="p-6 text-center text-gray-500">
            فرم انتخاب‌شده یافت نشد.
          </p>
        );
    }
  };

  return <>{renderContent()}</>;
}
