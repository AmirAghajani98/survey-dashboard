import React from "react";

const Survey = () => {
  const questions = [
    "از خدمات امداد 194شرکت گاز استان قزوین در مواقع حوادث و یا هرگونه خدمات امدادرسانی چه مقدار رضایت دارید؟",
    "از زمان امدادرسانی امدادگران چه مقدار رضایت دارید؟",
    "از خدمات بیمه حوادث مشترکین (خانگی و تجاری) شرکت ملی گاز ایران چه مقدار اطلاع/رضایت دارید؟",
    "آیا از خدمات آموزش نکات ایمنی در مدارس به دانش آموزان بهره مند شده و رضایت دارید؟",
    "در صورتیکه فرزند شما در مدارس ،توسط شرکت گاز استان آموزش نکات ایمنی را دیده باشد، در مورد اثربخشی آنها چه نظری دارید؟",
    "آیا انیمیشن های نکات ایمنی که توسط شرکت ملی گاز در تلویزیون نمایش داده می‌شود اثر بخش بوده است؟",
    "آیا تبلیغاتی که در سطح شهر توسط شرکت ملی گاز در ارتباط با نکات ایمنی نصب شده‌اند اثربخش بوده است؟",
    "چه مقدار از عملکرد ایمنی شرکت گاز استان قزوین رضایت دارید؟",
    "انتظارات و پیشنهادات شما در زمینه نکات ایمنی از شرکت گاز استان قزوین چیست؟",
    "آیا می دانید که مجموعه مقررات استفاده از گاز طبیعی که جزء لاینفک قرارداد مشترکین است در سایت شرکت ملی گاز ایران به روزرسانی و قابل دسترسی است؟",
    "آیا نسبت به اصلاح موارد و اشکالات ایمنی موجود در سیستم گاز خانگی که توسط فرزندان به والدین گوش‌زد شده است، اقدام اصلاحی انجام شده است؟",
    "آیا وسایل گاز سوز همانند (بخاری گازی ، پکیچ ، آبگرمکن گازی،اجاق گاز و.....) در منزل شما توسط نصاب صلاحیت دار نصب یا سرویس و راه اندازی می‌شود؟",
    "آیا می دانید کلیه وسایل گاز سوز از جمله اجاق گاز می بایست دارای ترموکوپل باشند؟",
    "آیا فرزندان آموزش نکات ایمنی در ارتباط با گاز جهت اصلاح موارد در منزل به والدین خود انتقال داده اند؟",
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-10 text-center">
        پرسشنامه اندازه گیری فرهنگ بهداشت، ایمنی و محیط زیست (HSE) مشترکین خانگی
        .تجاری. صنعتی جزء و عمده
      </h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ردیف</th>
            <th className="border border-gray-300 px-4 py-2">سوال</th>
            <th className="border border-gray-300 px-4 py-2" colSpan={5}>
              جواب
            </th>
          </tr>
          <tr>
            <th className="border border-gray-300 px-4 py-2" colSpan={2}></th>
            {[1, 2, 3, 4, 5].map((score) => (
              <th
                key={score}
                className="border border-gray-300 px-4 py-2 text-center"
              >
                {score}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center text-lg">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-lg">
                {question}
              </td>
              {[1, 2, 3, 4, 5].map((score) => (
                <td
                  key={score}
                  className="border border-gray-300 px-4 py-2 text-center"
                >
                  <input
                    type="checkbox"
                    name={`question-${index}`}
                    value={score}
                    className="form-radio w-6 h-6 mx-auto"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Survey;
