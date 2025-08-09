"use client";

import { useState } from "react";
import data from "../../../data/questions.json";

const demographics = data.EmployeesHSE.demographics;
const questions: string[] = data.EmployeesHSE.questions;

type Answers = Record<number, string | number>;
type DemographicAnswers = Record<string, string>;

export default function EmployeeSurvey() {
  const [answers, setAnswers] = useState<Answers>({});
  const [demoAnswers, setDemoAnswers] = useState<DemographicAnswers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDemoChange = (name: string, value: string) => {
    setDemoAnswers({ ...demoAnswers, [name]: value });
  };

  const handleAnswer = (idx: number, value: string | number) => {
    setAnswers({ ...answers, [idx]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Answers:", answers);
      setAnswers({});
    } catch (err) {
      setError("خطا در ارسال اطلاعات");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 shadow-xl bg-white w-11/12 mx-auto my-4 rounded-xl"
    >
      <div className="w-full mx-auto p-6">
        <h1 className="w-2/3 mx-auto text-3xl font-bold pb-6 mb-10 text-center border-b border-gray-400">
          پرسشنامه HSE کارکنان
        </h1>
        <div className="grid grid-cols-2 gap-4 w-full">
          {demographics.map(([key, label, options]) => (
            <div
              key={key}
              className="shadow-sm p-4 rounded-md border border-gray-200"
            >
              <label className="text-lg font-semibold block mb-2">
                {label}
              </label>
              {label === "محل کار" ? (
                <input
                  type="text"
                  name={key}
                  value={demoAnswers[key] || ""}
                  onChange={(e) => handleDemoChange(key, e.target.value)}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                  placeholder="محل کار خود را وارد کنید"
                  required
                />
              ) : options ? (
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
                        checked={demoAnswers[key] === option}
                        onChange={(e) => handleDemoChange(key, e.target.value)}
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
                  value={demoAnswers[key] || ""}
                  onChange={(e) => handleDemoChange(key, e.target.value)}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                  required
                />
              )}
            </div>
          ))}
        </div>

        <table className="border-collapse border border-gray-300 w-full mb-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">ردیف</th>
              <th className="border border-gray-300 px-4 py-2">سوال</th>
              <th className="border border-gray-300 px-4 py-2" colSpan={5}>
                جواب
              </th>
            </tr>
            <tr>
              <th colSpan={2}></th>
              {[1, 2, 3, 4, 5].map((score) => (
                <th key={score} className="border border-gray-300 px-4 py-2">
                  {score}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-base font-medium">
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
                      className="form-radio w-6 h-6 mx-auto"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white text-xl px-10 py-2 my-6 rounded hover:bg-blue-700"
          >
            {loading ? "در حال ارسال..." : "ارسال پرسشنامه"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </form>
  );
}
