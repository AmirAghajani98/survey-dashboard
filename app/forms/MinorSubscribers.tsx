import React, { useState } from "react";
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

type QuestionType = {
  text: string;
  axis: string;
  type: string | undefined;
  next: number | undefined;
};

const getQuestionsWithAxis = (): QuestionType[] => {
  const cats = questionsData.MinorSubscribers.categories;
  const result: QuestionType[] = [];
  Object.entries(cats).forEach(([axis, arr]) => {
    arr.forEach((text: string) => {
      let type = undefined;
      let next = undefined;
      if (text.includes("قطع گاز")) (type = "yesno"), (next = 10);
      if (text.includes("تلفن 194")) (type = "yesno"), (next = 24);
      if (text.includes("کانال‌های ارتباطی")) type = "channels";
      result.push({ text, axis, type, next });
    });
  });
  return result;
};

const questions = getQuestionsWithAxis();
const demographics = questionsData.MinorSubscribers.demographics;

export default function MinorSubscribers() {
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("پاسخ‌ها:", answers);
    alert("پرسشنامه ارسال شد!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
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
            <th className="border border-gray-300 px-2 py-2">سایر</th>
            <th className="border border-gray-300 px-2 py-2">
              توضیحات <br />
              (اطلاع رسانی نمی‌شود/ مراجعه ای نداشتم/ نظری ندارم)
            </th>
            <th className="border border-gray-300 px-2 py-2">
              ضریب اهمیت <br />
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
                        type="radio"
                        name={`question-${index}`}
                        value="بلی"
                        onChange={(e) =>
                          handleChange(`question-${index}`, e.target.value)
                        }
                      />{" "}
                      بلی
                    </label>
                    <label className="mx-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="خیر"
                        onChange={(e) =>
                          handleChange(`question-${index}`, e.target.value)
                        }
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
                          onChange={(e) =>
                            handleChange(
                              `channel-${index}-${idx}`,
                              e.target.checked
                            )
                          }
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
                        type="radio"
                        name={`question-${index}`}
                        value={idx + 1}
                        onChange={(e) =>
                          handleChange(`question-${index}`, e.target.value)
                        }
                        className="w-5 h-5 mx-auto my-auto"
                      />
                    </td>
                  ))}
                  <td className="border border-gray-300 px-2 py-2 text-center text-xs"></td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <input
                      type="text"
                      name={`desc-${index}`}
                      onChange={(e) =>
                        handleChange(`desc-${index}`, e.target.value)
                      }
                      className="border rounded w-full p-1 text-xs"
                      placeholder="توضیحات"
                    />
                  </td>
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    <select
                      name={`importance-${index}`}
                      onChange={(e) =>
                        handleChange(`importance-${index}`, e.target.value)
                      }
                      className="border rounded p-1 text-xs"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-2">
          انتقاد یا پیشنهاد نسبت به عملکرد شرکت گاز:
        </h2>
        <textarea
          className="border rounded w-full p-2 mb-2"
          placeholder="انتقادات و پیشنهادات خود را بنویسید..."
          onChange={(e) => handleChange("suggestions", e.target.value)}
        />
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-lg mb-4">اطلاعات دموگرافیک:</h2>
        <div className="grid grid-cols-2 gap-4">
          {demographics.map(([key, label, options]) => (
            <div
              key={key}
              className="shadow-sm p-4 rounded-md border border-gray-200"
            >
              <label htmlFor={key} className="text-lg font-semibold">
                {label}
              </label>
              {options ? (
                <select
                  id={key}
                  name={key}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                >
                  <option value="">انتخاب کنید</option>
                  {options.split(",").map((option) => (
                    <option key={option} value={option} className="text-base">
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name={key}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded shadow"
        >
          ارسال پرسشنامه
        </button>
      </div>
    </form>
  );
}
