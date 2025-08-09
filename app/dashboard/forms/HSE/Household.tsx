"use client";

import React, { useState } from "react";
import questionsData from "../../../../data/questions.json";

export default function HouseholdSurvey() {
  const questions: string[] = questionsData.HouseholdHSE.questions;
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleAnswer = (index: number, value: number) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Answers:", answers);
      setAnswers({});
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      setError("خطا در ارسال اطلاعات");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow-xl bg-white w-11/12 mx-auto my-4 rounded-xl"
    >
      <h1 className="text-3xl font-bold mb-10 text-center">
        پرسشنامه اندازه‌گیری فرهنگ بهداشت، ایمنی و محیط زیست (HSE)
        <br />
        مشترکین خانگیی (جزء و عمده)
      </h1>
      <table className="table-auto border-collapse border border-gray-300 w-full mb-6">
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
          {questions.map((question: string, index: number) => (
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
                    type="radio"
                    name={`question-${index}`}
                    value={score}
                    checked={answers[index] === score}
                    onChange={() => handleAnswer(index, score)}
                    className="form-radio w-5 h-5 mx-auto"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mt-6">
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
