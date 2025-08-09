import ApplicantsVisitorsSurvey from "@/app/dashboard/forms/ApplicantsVisitorsSurvey";
import CommunityRepresentativesSurvey from "@/app/dashboard/forms/CommunityRepresentativesSurvey";
import EmployeeSurvey from "@/app/dashboard/forms/EmployeeSurvey";
import ExecutiveContractorsSurvey from "@/app/dashboard/forms/ExecutiveContractors";
import FacilityNeighborsSurvey from "@/app/dashboard/forms/FacilityNeighborsSurvey";
import BusinessSurvey from "@/app/dashboard/forms/HSE/Business";
import HouseholdSurvey from "@/app/dashboard/forms/HSE/Household";
import IndustrialSurvey from "@/app/dashboard/forms/HSE/Industrial";
import MainStakeholdersSurvey from "@/app/dashboard/forms/MainStakeholdersSurvey";
import ServiceContractorsSurvey from "@/app/dashboard/forms/ServiceContractors";
import SuppliersSurvey from "@/app/dashboard/forms/SuppliersSurvey";
import EmployeeSatisfactionSurvey from "@/app/dashboard/forms/EmployeeSatisfactionSurvey";
import MinorBusiness from "@/app/dashboard/forms/MinorSubscribers/Business";
import MinorHousehold from "@/app/dashboard/forms/MinorSubscribers/Household";
import MinorIndustrial from "@/app/dashboard/forms/MinorSubscribers/Industrial";
import MajorBusiness from "@/app/dashboard/forms/MajorSubscribers/Business";
import MajorHousehold from "@/app/dashboard/forms/MajorSubscribers/Household";
import MajorIndustrial from "@/app/dashboard/forms/MajorSubscribers/Industrial";

const formMap: Record<string, React.FC> = {
  "کارکنان (HSE)": EmployeeSurvey,
  "رضایت کارکنان": EmployeeSatisfactionSurvey,
  "HSE - خانگی": HouseholdSurvey,
  "HSE - تجاری": BusinessSurvey,
  "HSE - صنعتی": IndustrialSurvey,
  "مشترکین جز - صنعتی": MinorIndustrial,
  "مشترکین جز - تجاری": MinorBusiness,
  "مشترکین جز - خانگی": MinorHousehold,
  "مشترکین عمده - صنعتی": MajorIndustrial,
  "مشترکین عمده - تجاری": MajorBusiness,
  "مشترکین عمده - خانگی": MajorHousehold,
  "همسایگان تاسیسات": FacilityNeighborsSurvey,
  "نمایندگان جامعه": CommunityRepresentativesSurvey,
  "متقاضیان و مراجعین": ApplicantsVisitorsSurvey,
  "پیمان کاران اجرایی": ExecutiveContractorsSurvey,
  "پیمانکاران خدماتی": ServiceContractorsSurvey,
  "تامین کنندگان کالا": SuppliersSurvey,
  "ذینفعان اصلی شرکت": MainStakeholdersSurvey,
};

export default formMap;
