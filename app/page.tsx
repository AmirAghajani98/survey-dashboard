"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import Navigation from "./components/Navigation";
import Reports from "./reports/page";
import EmployeeSurvey from "./forms/EmployeeSurvey";
import EmployeeSatisfactionSurvey from "./forms/EmployeeSatisfactionSurvey";
import HouseholdSurvey from "./forms/HSE/Household";
import BusinessSurvey from "./forms/HSE/Business";
import MajorIndustrial from "./forms/MajorSubscribers/Industrial";
import MinorIndustrial from "./forms/MinorSubscribers/Industrial";
import MinorBusiness from "./forms/MinorSubscribers/Business";
import MinorHouseHold from "./forms/MinorSubscribers/Household";
import MajorBusiness from "./forms/MajorSubscribers/Business";
import MajorHouseHold from "./forms/MajorSubscribers/Household";
import FacilityNeighborsSurvey from "./forms/FacilityNeighborsSurvey";
import CommunityRepresentativesSurvey from "./forms/CommunityRepresentativesSurvey";
import ApplicantsVisitorsSurvey from "./forms/ApplicantsVisitorsSurvey";
import ExecutiveContractorsSurvey from "./forms/ExecutiveContractors";
import ServiceContractorsSurvey from "./forms/ServiceContractors";
import SuppliersSurvey from "./forms/SuppliersSurvey";
import MainStakeholdersSurvey from "./forms/MainStakeholdersSurvey";

export default function Dashboard() {
  const [selected, setSelected] = useState<string>("home");
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

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

  return <Navigation>{renderContent()}</Navigation>;
}
