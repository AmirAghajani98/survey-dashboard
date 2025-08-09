"use client";

import React, { useState } from "react";
import questionsData from "../../../../data/questions.json";

const importanceLevels = [
  "خیلی کم/خیلی ضعیف",
  "کم/ضعیف",
  "تاحدودی/متوسط",
  "زیاد/خوب",
  "خیلی زیاد/خیلی خوب",
];

export default function MajorBusiness() {
  const categories = questionsData.MajorSubscribers.categories;
  const demographics = questionsData.MajorSubscribers.demographics;
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (name: string, value: any) => {
    setAnswers({ ...answers, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("پاسخ‌ها:", answers);
    alert("پرسشنامه ارسال شد!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow-xl bg-white w-11/12 mx-auto my-4 rounded-xl"
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        فرم نظرسنجی مشترکین عمده (تجاری)
      </h1>
      <p className="mb-6 text-center text-lg">
        مشترک گرامی؛ با سلام و احترام، لطفاً با دقت به سوالات زیر پاسخ دهید.
      </p>
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
          اطلاعات دموگرافیک:
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {demographics.map(([key, label, options]) => (
            <div
              key={key}
              className="shadow-sm p-4 rounded-md border border-gray-200"
            >
              <label className="text-lg font-semibold block mb-2">
                {label}
              </label>
              {options ? (
                <div className="flex flex-wrap gap-3">
                  {options.split(",").map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={answers[key] === option}
                        onChange={(e) => handleChange(key, e.target.value)}
                        className="w-5 h-5"
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  name={key}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                  required
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {Object.entries(categories).map(([category, questions], catIndex) => (
        <div key={catIndex} className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
            {category}
          </h2>
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
              {(questions as string[]).map((question, index) => (
                <tr key={`${category}-${index}`}>
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
                        name={`question-${category}-${index}`}
                        value={idx + 1}
                        onChange={(e) =>
                          handleChange(
                            `question-${category}-${index}`,
                            e.target.value
                          )
                        }
                        className="form-radio w-5 h-5 mx-auto"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

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
