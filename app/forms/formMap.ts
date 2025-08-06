const formMap: Record<string, () => Promise<any>> = {
  "کارکنان (HSE)": () => import("./EmployeeSurvey"),
  "رضایت کارکنان": () => import("./EmployeeSatisfactionSurvey"),
  "HSE - خانگی": () => import("./HSE/Household"),
  "HSE - تجاری": () => import("./HSE/Business"),
  "HSE - صنعتی": () => import("./HSE/Industrial"),
  "مشترکین جز - صنعتی": () => import("./MinorSubscribers/Industrial"),
  "مشترکین جز - تجاری": () => import("./MinorSubscribers/Business"),
  "مشترکین جز - خانگی": () => import("./MinorSubscribers/Household"),
  "مشترکین عمده - صنعتی": () => import("./MajorSubscribers/Industrial"),
  "مشترکین عمده - تجاری": () => import("./MajorSubscribers/Business"),
  "مشترکین عمده - خانگی": () => import("./MajorSubscribers/Household"),
  "تامین کنندگان کالا": () => import("./SuppliersSurvey"),
  "ذینفعان اصلی شرکت": () => import("./MainStakeholdersSurvey"),
  "متقاضیان و مراجعین": () => import("./ApplicantsVisitorsSurvey"),
  "نمایندگان جامعه": () => import("./CommunityRepresentativesSurvey"),
  "همسایگان تاسیسات": () => import("./FacilityNeighborsSurvey"),
  "پیمانکاران خدماتی": () => import("./ServiceContractors"),
  "پیمان کاران اجرایی": () => import("./ExecutiveContractors"),
};

export default formMap;
