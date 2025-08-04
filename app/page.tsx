"use client";

import React, { useState } from "react";
import Navigation from "./components/Navigation";
import ApplicantsVisitorsSurvey from "./forms/ApplicantsVisitorsSurvey";
import CommunityRepresentativesSurvey from "./forms/CommunityRepresentativesSurvey";
import EmployeeSurvey from "./forms/EmployeeSurvey";
import ExecutiveContractorsSurvey from "./forms/ExecutiveContractors";
import FacilityNeighborsSurvey from "./forms/FacilityNeighborsSurvey";
import BusinessSurvey from "./forms/HSE/Business";
import HouseholdSurvey from "./forms/HSE/Household";
import MainStakeholdersSurvey from "./forms/MainStakeholdersSurvey";
import ServiceContractorsSurvey from "./forms/ServiceContractors";
import SuppliersSurvey from "./forms/SuppliersSurvey";
import MajorBusiness from "./forms/MajorSubscribers/Business";
import MajorIndustrial from "./forms/MajorSubscribers/Industrial";
import EmployeeSatisfactionSurvey from "./forms/EmployeeSatisfactionSurvey";
import MajorHouseHold from "./forms/MajorSubscribers/Household";
import MinorHouseHold from "./forms/MinorSubscribers/Household";
import MinorBusiness from "./forms/MinorSubscribers/Business";
import MinorIndustrial from "./forms/MinorSubscribers/Industrial";
import Reports from "./components/Reports";

const Dashboard: React.FC = () => {
  const [selected, setSelected] = useState<string>("home");

  const renderContent = () => {
    switch (selected) {
      case "home":
        return <p className="p-6">به داشبورد خوش آمدید!</p>;
      case "reports":
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
            فرم انتخاب‌ شده یافت نشد.
          </p>
        );
    }
  };

  return (
    <Navigation selected={selected} onSelect={setSelected}>
      {renderContent()}
    </Navigation>
  );
};

export default Dashboard;
