import React from "react";
import questionsData from "../../data/questions.json";

const importanceLevels = [
  "خیلی کم/خیلی ضعیف",
  "کم/ضعیف",
  "تاحدودی/متوسط",
  "زیاد/خوب",
  "خیلی زیاد/خیلی خوب",
];

const channels = [
  "تابلوهای تبلیغاتی",
  "وب سایت",
  "شبکه های مجازی",
  "قبض گاز",
  "نشریات",
  "صدا و سیما",
  "تلفن گویا",
  "پیامک",
];

const getQuestionsWithAxis = () => {
  const cats = questionsData.ParticipantSubscribers_categories;
  const result: {
    text: string;
    axis: string;
    type: string | undefined;
    next: number | undefined;
  }[] = [];
  Object.entries(cats).forEach(([axis, arr]) => {
    arr.forEach((text) => {
      let type = undefined;
      let next = undefined;
      if (text.includes("قطع گاز داشته‌اید")) (type = "yesno"), (next = 10);
      if (text.includes("تلفن 194 تماس داشته اید"))
        (type = "yesno"), (next = 24);
      if (text.includes("کانال‌های ارتباطی")) type = "channels";
      result.push({ text, axis, type, next });
    });
  });
  return result;
};

const questions = getQuestionsWithAxis();

const ParticipantSubscribers = () => {
  return (
    <form className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        فرم نظرسنجی مشترکین جزء
      </h1>
      <p className="mb-6 text-center text-lg">
        مشترک گرامی؛ با سلام و احترام، لطفاً با دقت به سوالات زیر پاسخ دهید.
      </p>
      <table className="table-auto border-collapse border border-gray-300 w-full mb-8">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-2">ردیف</th>
            <th className="border border-gray-300 px-2 py-2">محور</th>
            <th className="border border-gray-300 px-2 py-2">سوال</th>
            {importanceLevels.map((level, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-1 py-2 text-center text-xs"
              >
                {level}
              </th>
            ))}
            <th className="border border-gray-300 px-2 py-2">سایر</th>{" "}
            <th className="border border-gray-300 px-2 py-2">
              توضیحات
              <br />
              (اطلاع رسانی نمی‌شود/ مراجعه ای نداشتم/ تماسی نداشتم/ نظری ندارم)
            </th>
            <th className="border border-gray-300 px-2 py-2">
              ضریب اهمیت
              <br />
              سوال 1 یا 2 یا 3
            </th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-2 py-2 text-center text-lg">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                {q.axis}
              </td>
              <td className="border border-gray-300 px-2 py-2 text-lg">
                {q.text}
              </td>

              {q.type === "yesno" ? (
                <>
                  <td
                    className="border border-gray-300 px-1 py-2 text-center"
                    colSpan={5}
                  >
                    <label className="mx-2">
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value="بلی"
                      />{" "}
                      بلی
                    </label>
                    <label className="mx-2">
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value="خیر"
                      />{" "}
                      خیر
                    </label>
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-xs">
                    {q.next ? `در صورت خیر بروید به سوال ${q.next}` : ""}
                  </td>
                </>
              ) : q.type === "channels" ? (
                <>
                  <td
                    className="border border-gray-300 px-1 py-2 text-center"
                    colSpan={5}
                  >
                    {channels.map((ch, idx) => (
                      <label key={idx} className="mx-2">
                        <input
                          type="checkbox"
                          name={`channel-${index}-${idx}`}
                          value={ch}
                        />{" "}
                        {ch}
                      </label>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center text-xs"></td>
                </>
              ) : (
                <>
                  {importanceLevels.map((_, idx) => (
                    <td
                      key={idx}
                      className="border border-gray-300 px-1 py-2 text-center"
                    >
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value={idx + 1}
                        className="w-5 h-5 mx-auto my-auto"
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 px-2 py-2 text-center text-xs"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <input
                      type="text"
                      name={`desc-${index}`}
                      className="border rounded w-full p-1 text-xs"
                      placeholder="توضیحات"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <select
                      name={`importance-${index}`}
                      className="border rounded p-1 text-xs"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>{" "}
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-2">
          انتقاد یا پیشنهاد نسبت به عملکرد شرکت گاز در سال 1402:
        </h2>
        <div className="sm:flex w-full gap-2">
          <div className="w-1/2 flex flex-col">
            <div className="mb-2">الف. انتقاد از عملکرد شرکت گاز:</div>
            <input
              type="text"
              placeholder="انتقاد"
              className="border rounded w-full mb-2 p-2"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="mb-2">ب. پیشنهاد برای بهبود عملکرد شرکت گاز:</div>
            <input
              type="text"
              placeholder="پیشنهاد "
              className="border rounded w-full mb-2 p-2"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 ">
        <h2 className="font-bold text-lg mb-2">اطلاعات دموگرافیک پاسخگو:</h2>
        <div className="flex items-center justify-between w-full">
          <div className="flex w-1/2 items-center">
            <h3 className="mb-2">1) جنس پاسخگو:</h3>
            <label className="mr-4 flex gap-2">
              <input
                type="checkbox"
                name="gender"
                value="مرد"
                className="w-5 h-5 mx-auto my-auto"
              />
              مرد
            </label>
            <label className="mr-4 flex gap-2">
              <input
                type="checkbox"
                name="gender"
                value="زن"
                className="w-5 h-5 mx-auto my-auto"
              />
              زن
            </label>
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <h3 className="mb-2 mt-4">2) سن پاسخگو:</h3>
            <input
              type="text"
              name="age"
              placeholder="انتقاد"
              className="border rounded mb-2 p-2"
            />
          </div>
        </div>
        <div className="h-[1px] w-1/2 border-b mx-auto my-4"></div>
        <div className="sm:flex gap-6 w-full items-center">
          <div className="mb-2 mt-4">3) وضعیت تحصیلی:</div>
          {[
            "زیر دیپلم",
            "دیپلم",
            "فوق دیپلم",
            "لیسانس",
            "فوق لیسانس و بالاتر",
          ].map((level, idx) => (
            <label key={idx} className="mr-4 ">
              <input
                type="checkbox"
                name="education"
                value={level}
                className="w-5 h-5 mx-auto my-auto"
              />{" "}
              {level}
            </label>
          ))}
        </div>
        <div className="h-[1px] w-1/2 border-b mx-auto my-6"></div>
        <div className="sm:flex gap-6 w-full items-center">
          <div className="mb-2 mt-2">4) وضعیت اشتغال سرپرست خانوار:</div>
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
              <input
                type="checkbox"
                name="job"
                value={job}
                className="w-5 h-5 mx-auto my-auto"
              />{" "}
              {job}
            </label>
          ))}
        </div>
        <div className="h-[1px] w-1/2 border-b mx-auto my-6"></div>
        <div className="sm:flex gap-6 w-full items-center">
          <div className="mb-2 mt-4">5) وضعیت مسکن:</div>
          {["شخصی", "رهني- استيجاري", "سازمانی (در ازای خدمت)", "سایر"].map(
            (home, idx) => (
              <label key={idx} className="mr-4">
                <input
                  type="checkbox"
                  name="home"
                  value={home}
                  className="w-5 h-5 mx-auto my-auto"
                />{" "}
                {home}
              </label>
            )
          )}
          <input
            type="text"
            name="home-other"
            className="border rounded mb-2 p-2 w-[40%]"
            placeholder="سایر (توضیح)"
          />
        </div>
        <div className="h-[1px] w-1/2 border-b mx-auto my-6"></div>
        <div className="sm:flex gap-6 w-full items-center">
          <div className="mb-2 mt-4">6) نوع واحد مسکونی:</div>
          {["ویلايي (حياط دار)", "آپارتماني"].map((type, idx) => (
            <label key={idx} className="mr-4">
              <input
                type="checkbox"
                name="unitType"
                value={type}
                className="w-5 h-5 mx-auto my-auto"
              />{" "}
              {type}
            </label>
          ))}
          <input
            type="text"
            name="unitCount"
            className="border rounded w-1/2 p-2 mt-2"
            placeholder="تعداد واحد در بلوک (در صورت آپارتمانی بودن)"
          />
        </div>
        <div className="h-[1px] w-1/2 border-b mx-auto my-6"></div>
        <div className="sm:flex gap-6 w-full items-center">
          <div className="mb-2 mt-4">7) موقعیت پاسخگو در خانواده:</div>
          {["سرپرست خانوار", "همسر", "فرزند", "سایر"].map((role, idx) => (
            <label key={idx} className="mr-2 flex gap-3">
              <input
                type="checkbox"
                name="familyRole"
                value={role}
                className="w-5 h-5 mx-auto my-auto"
              />{" "}
              {role}
            </label>
          ))}
          <input
            type="text"
            name="familyRoleOther"
            className="border rounded p-2 mt-2 w-2/5"
            placeholder="سایر (توضیح)"
          />
        </div>
        <div className="h-[1px] w-1/2 border-b mx-auto my-6"></div>
        <div className="sm:flex gap-6 w-full items-center">
          <div className="mb-2 mt-4">8) نوع مصرف:</div>
          {["خانگی", "تجاری", "صنعتی", "کسب و خدمات", "عمومی"].map(
            (usage, idx) => (
              <label key={idx} className="mr-4">
                <input
                  type="checkbox"
                  name="usageType"
                  value={usage}
                  className="w-5 h-5 mx-auto my-auto"
                />{" "}
                {usage}
              </label>
            )
          )}
        </div>
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
      <div className="flex justify-end mt-8 full">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 w-1/3 rounded shadow"
        >
          ارسال
        </button>
      </div>
    </form>
  );
};

export default ParticipantSubscribers;
