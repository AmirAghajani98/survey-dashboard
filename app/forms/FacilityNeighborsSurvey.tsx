import React, { useState } from "react";
import questionsData from "../../data/questions.json";

const importanceLevels = [
  "خیلی کم/خیلی ضعیف",
  "کم/ضعیف",
  "تاحدودی/متوسط",
  "زیاد/خوب",
  "خیلی زیاد/خیلی خوب",
];

export default function FacilityNeighborsSurvey() {
  const categories = questionsData.FacilityNeighbors.categories;
  const demographics = questionsData.FacilityNeighbors.demographics;

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
        فرم نظرسنجی همسایگان تأسیسات
      </h1>
      <p className="mb-6 text-center text-lg">
        همسایه محترم؛ لطفاً با دقت به سوالات زیر پاسخ دهید.
      </p>

      <table className="table-auto border-collapse border border-gray-300 w-full mb-8">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ردیف</th>
            <th className="border border-gray-300 px-4 py-2">محور</th>
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
          {Object.entries(categories).map(([axis, qs]) =>
            qs.map((question: string, index: number) => (
              <tr key={`${axis}-${index}`}>
                <td className="border border-gray-300 px-4 py-2 text-center text-lg">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center text-xs">
                  {axis}
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
                      name={`question-${axis}-${index}`}
                      value={idx + 1}
                      onChange={(e) =>
                        handleChange(
                          `question-${axis}-${index}`,
                          e.target.value
                        )
                      }
                      className="form-radio w-5 h-5 mx-auto"
                    />
                  </td>
                ))}
              </tr>
            ))
          )}
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
