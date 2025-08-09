"use client";

import { useState } from "react";
import data from "../../../data/questions.json";

const survey = data.CommunityRepresentatives;
const demographics = survey.demographics;
const categories = survey.categories;
const suggestions = survey.suggestions;

type Answers = Record<string, string | number>;

export default function CommunityRepresentativesSurvey() {
  const categoryEntries = Object.entries(categories).map(
    ([title, questions]) => ({
      title,
      questions: questions as string[],
    })
  );

  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [`q${questionId}`]: value }));
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
          پرسشنامه نمایندگان جامعه
        </h1>
        <div className="grid grid-cols-2 gap-4 w-full">
          {demographics.map(([key, label, options]) => (
            <div
              key={key}
              className="shadow-sm p-4 rounded-md border border-gray-200"
            >
              <label htmlFor={key} className="text-lg font-semibold mb-2 block">
                {label}
              </label>

              {options ? (
                <div className="flex flex-wrap gap-3">
                  {(options as string).split(",").map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-2 text-base cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={answers[key] === option}
                        onChange={handleDemoChange}
                        className="w-5 h-5"
                        required
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ) : (
                <input
                  id={key}
                  name={key}
                  type="text"
                  value={answers[key] || ""}
                  onChange={handleDemoChange}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                  required
                />
              )}
            </div>
          ))}
        </div>

        {categoryEntries.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
              {category.title}
            </h2>
            <table className="border-collapse border border-gray-300 w-full mb-4">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">ردیف</th>
                  <th className="border border-gray-300 px-4 py-2">سوال</th>
                  <th className="border border-gray-300 px-4 py-2" colSpan={5}>
                    میزان رضایت
                  </th>
                </tr>
                <tr>
                  <th
                    className="border border-gray-300 px-4 py-2"
                    colSpan={2}
                  ></th>
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
                {category.questions.map((question, index) => {
                  const questionId = `${categoryIndex}_${index}`;
                  return (
                    <tr key={questionId}>
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
                            name={`q${questionId}`}
                            value={score}
                            checked={answers[`q${questionId}`] === score}
                            onChange={() => handleAnswer(questionId, score)}
                            required
                            className="form-radio w-6 h-6 mx-auto"
                          />
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
            انتقادات و پیشنهادات
          </h2>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2">
              {suggestions.انتقادات}
            </label>
            <textarea
              name="criticisms"
              value={answers["criticisms"] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, criticisms: e.target.value }))
              }
              className="form-textarea w-full border border-gray-300 p-2"
              placeholder="انتقادات خود را وارد کنید"
            />
          </div>
          <div className="mb-4">
            <label className="block text-base font-medium mb-2">
              {suggestions.پیشنهادات}
            </label>
            <textarea
              name="suggestions"
              value={answers["suggestions"] || ""}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, suggestions: e.target.value }))
              }
              className="form-textarea w-full border border-gray-300 p-2"
              placeholder="پیشنهادات خود را وارد کنید"
            />
          </div>
        </div>

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
