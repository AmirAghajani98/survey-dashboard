import React from "react";

const questions = [
  "نقش شركت را در توسعه و آباداني استان چگونه ارزيابي مي كنيد؟",
  "از نظر شما شركت گاز استان در سال‌هاى گذشته تا چه حد توانسته عملكرد موفقي در ارائه خدمات مستمر و مداوم داشته باشد؟",
  "رعايت حقوق مشتركين توسط شركت را چگونه ارزيابي مي كنيد؟",
  "عمل به مسئوليت‌هاى اجتماعي  در زمينه آموزش‌هاى همگاني مشتركين را چگونه ارزيابي مي‌كنيد؟",
  "از نظر شما نقش گاز در ارتقاء رفاه جامعه چگونه است؟",
  "نقش گاز در حفظ محيط زيست استان را چگونه ارزيابي مي‌كنيد؟",
  "در طول يك سال گذشته قطع گاز داشته‌ايد؟",
  "نحوه اطلاع رساني از قطعي گاز، را چگونه ارزيابي مي‌كنيد؟",
  "در صورت بروز قطعي گاز  مدت زمان برقراري مجدد تا چه ميزان مطابق برنامه هاي اعلامي بوده‌است؟",
  "سرعت ارائه خدمات شركت گاز به مشتركين را چگونه ارزيابي مي‌كنيد؟",
  "نحوه ارائه خدمات توسط شركت گاز در مقايسه با ساير شركت‌ها (برق، تلفن، آب و...) چگونه است؟",
  "كدام‌يك ازكانال‌هاي ارتباطي را براي اطلاع رساني مناسب‌تر مي دانيد؟",
  "در صورت مراجعه به ادارات گاز در يك سال اخير نحوه برخورد مسئولان و كاركنان را چگونه ارزيابي مي‌كنيد؟",
  "در صورت مراجعه به ادارات گاز در يك سال اخير، نحوه پاسخگويي كاركنان را چگونه ارزيابي مي‌كنيد؟",
  "در صورت مراجعه به ادارات گاز در يك سال اخير، نحوه دسترسي به كاركنان را چگونه ارزيابي مي‌كنيد؟",
  "ميزان پايبندي شركت گاز نسبت به قوانين و مقررات را چگونه ارزيابي مي‌كنيد؟",
  "ميزان اطلاع‌رساني در خصوص نحوه ارائه خدمات را چگونه ارزيابي مي‌كنيد؟",
  "عملكرد دفاتر پيشخوان در ارائه خدمات را چگونه ارزيابي مي‌كنيد؟",
  "آيا تا كنون با تلفن 194 تماس داشته ايد؟",
  "نحوه برقراري تماس با تلفن امداد 194 و راهنمايي ماموران را چگونه ارزيابي مي‌كنيد؟",
  "مناسب ماموران امداد حضور بموقع و پس از تماس با تلفن امداد 194 چگونه ارزيابي مي‌كنيد؟",
  "عملكرد، آراستگي و نظم ظاهري، رفتار ماموران امداد را چگونه ارزيابي مي‌كنيد؟",
  "در صورتي كه تا كنون خرابي كنتور و رگلاتور داشته ايد، نحوه اقدام به رفع آن از طرف شركت گاز را چگونه ارزيابي مي‌كنيد؟",
  "دقت و صحت قرائت ماموران قرائت كنتور را چگونه ارزيابي مي‌كنيد؟",
  "نظم ظاهري ماموران قرائت آراستگي و كنتور را چگونه ارزيابي مي‌كنيد؟",
  "ساعت مراجعه براي قرائت كنتور ماموران قرائت كنتور را چگونه ارزيابي مي‌كنيد؟",
  "توزيع بموقع و مناسب قبض گاز ماموران قرائت كنتور را چگونه ارزيابي مي‌كنيد؟",
  "به نظر شما عملكرد شركت در كاهش بروكراسي اداري تا چه حد موفق بوده‌است؟",
  "در صورت مشاهده تخلف و يا نقص سيستم گاز چقدر تمايل داريد آنرا به مراجع ذيصلاح اطلاع دهيد؟",
  "تا چه حدي پرداخت به موقع قبوض گاز براي شما مهم است؟",
  "براي استمرار فعاليت‌هاي شركت گاز تا چه حد حاضر به صرفه جويي در مصرف گاز هستيد؟",
  "براي بهبودهاي فعاليت شركت گاز تا ارائه چه حد حاضر به همراهي و پيشنهاد به شركت گاز هستيد؟",
  "تا چه ميزان به شركت گاز اعتماد داريد؟",
  "در كل چقدر از عملكرد شركت گاز رضايت داريد؟",
];

const importanceLevels = [
  "خیلی کم/خیلی ضعیف",
  "کم/ضعیف",
  "تاحدودی/متوسط",
  "زیاد/خوب",
  "خیلی زیاد/خیلی خوب",
];

const MajorSubscribersSurvey = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        فرم نظرسنجی مشترکین جزء
      </h1>
      <p className="mb-6 text-center text-lg">
        مشترک گرامی؛ با سلام و احترام، لطفاً با دقت به سوالات زیر پاسخ دهید.
      </p>
      <table className="table-auto border-collapse border border-gray-300 w-full mb-8">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ردیف</th>
            <th className="border border-gray-300 px-4 py-2">سوال</th>
            {importanceLevels.map((level, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-2 py-2 text-center text-xs"
              >
                {level}
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
              {importanceLevels.map((_, idx) => (
                <td
                  key={idx}
                  className="border border-gray-300 px-2 py-2 text-center"
                >
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={idx + 1}
                    className="form-radio w-5 h-5 mx-auto"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-2">
          انتقاد یا پیشنهاد نسبت به عملکرد شرکت گاز در سال 1402:
        </h2>
        <div className="mb-2">الف. انتقاد از عملکرد شرکت گاز:</div>
        {[1, 2, 3].map((i) => (
          <input
            key={i}
            type="text"
            placeholder={`انتقاد ${i}`}
            className="border rounded w-full mb-2 p-2"
          />
        ))}
        <div className="mb-2">ب. پیشنهاد برای بهبود عملکرد شرکت گاز:</div>
        {[1, 2, 3].map((i) => (
          <input
            key={i}
            type="text"
            placeholder={`پیشنهاد ${i}`}
            className="border rounded w-full mb-2 p-2"
          />
        ))}
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-2">اطلاعات دموگرافیک پاسخگو:</h2>
        <div className="mb-2">1) جنس پاسخگو:</div>
        <label className="mr-4">
          <input type="radio" name="gender" value="مرد" /> مرد
        </label>
        <label className="mr-4">
          <input type="radio" name="gender" value="زن" /> زن
        </label>
        <div className="mb-2 mt-4">2) سن پاسخگو:</div>
        <input
          type="text"
          name="age"
          className="border rounded w-1/2 p-2"
          placeholder="سن"
        />
        <div className="mb-2 mt-4">3) وضعیت تحصیلی:</div>
        {[
          "زیر دیپلم",
          "دیپلم",
          "فوق دیپلم",
          "لیسانس",
          "فوق لیسانس و بالاتر",
        ].map((level, idx) => (
          <label key={idx} className="mr-4">
            <input type="radio" name="education" value={level} /> {level}
          </label>
        ))}
        <div className="mb-2 mt-4">4) وضعیت اشتغال سرپرست خانوار:</div>
        {[
          "شغل آزاد",
          "کارمند بخش خصوصی",
          "کارمند بخش دولتی",
          "کارفرما",
          "خانه دار",
          "دانشجو یا محصل",
          "بیکار",
        ].map((job, idx) => (
          <label key={idx} className="mr-4">
            <input type="radio" name="job" value={job} /> {job}
          </label>
        ))}
        <div className="mb-2 mt-4">5) وضعیت مسکن:</div>
        {["شخصی", "رهني- استيجاري", "سازمانی (در ازای خدمت)", "سایر"].map(
          (home, idx) => (
            <label key={idx} className="mr-4">
              <input type="radio" name="home" value={home} /> {home}
            </label>
          )
        )}
        <input
          type="text"
          name="home-other"
          className="border rounded w-1/2 p-2 mt-2"
          placeholder="سایر (توضیح)"
        />
        <div className="mb-2 mt-4">6) نوع واحد مسکونی:</div>
        {["ویلايي (حياط دار)", "آپارتماني"].map((type, idx) => (
          <label key={idx} className="mr-4">
            <input type="radio" name="unitType" value={type} /> {type}
          </label>
        ))}
        <input
          type="text"
          name="unitCount"
          className="border rounded w-1/2 p-2 mt-2"
          placeholder="تعداد واحد در بلوک (در صورت آپارتمانی بودن)"
        />
        <div className="mb-2 mt-4">7) موقعیت پاسخگو در خانواده:</div>
        {["سرپرست خانوار", "همسر", "فرزند", "سایر"].map((role, idx) => (
          <label key={idx} className="mr-4">
            <input type="radio" name="familyRole" value={role} /> {role}
          </label>
        ))}
        <input
          type="text"
          name="familyRoleOther"
          className="border rounded w-1/2 p-2 mt-2"
          placeholder="سایر (توضیح)"
        />
        <div className="mb-2 mt-4">8) نوع مصرف:</div>
        {["خانگی", "تجاری", "صنعتی", "کسب و خدمات", "عمومی"].map(
          (usage, idx) => (
            <label key={idx} className="mr-4">
              <input type="radio" name="usageType" value={usage} /> {usage}
            </label>
          )
        )}
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-2">
          تاریخ و اطلاعات تکمیل پرسشنامه:
        </h2>
        <input
          type="text"
          name="date"
          className="border rounded w-1/2 p-2 mb-2"
          placeholder="تاریخ تکمیل پرسشنامه"
        />
        <input
          type="text"
          name="startTime"
          className="border rounded w-1/2 p-2 mb-2"
          placeholder="ساعت شروع"
        />
        <input
          type="text"
          name="endTime"
          className="border rounded w-1/2 p-2 mb-2"
          placeholder="ساعت اتمام"
        />
        <input
          type="text"
          name="interviewer"
          className="border rounded w-1/2 p-2 mb-2"
          placeholder="نام و نام خانوادگی پرسشگر"
        />
        <input
          type="text"
          name="reviewer"
          className="border rounded w-1/2 p-2 mb-2"
          placeholder="نام و نام خانوادگی بازبین"
        />
      </div>
    </div>
  );
};

export default MajorSubscribersSurvey;
