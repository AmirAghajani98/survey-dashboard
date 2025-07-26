import { useState } from "react";
import data from "../../data/questions.json";

const demographics = data.demographics;
const questions: string[] = data["employees "] || data;

type Answers = Record<number, string | number>;

export default function EmployeeSurvey() {
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDemoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

  const handleAnswer = (idx: number, value: string | number) => {
    setAnswers({ ...answers, [idx]: value });
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="w-2/3 mx-auto text-3xl font-bold pb-6 mb-10 text-center border-b border-gray-400">
        پرسشنامه HSE کارکنان
      </h1>
      <form onSubmit={() => {}} className="space-y-6 w-full m-auto">
        <div className="grid grid-cols-2 gap-4 w-full">
          {demographics.map(([key, label, options]) => (
            <div
              key={key}
              className="shadow-sm p-4 rounded-md border border-gray-200"
            >
              <label htmlFor={key} className="text-lg font-semibold">
                {label}
              </label>
              <select
                id={key}
                name={key}
                onChange={handleDemoChange}
                className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
              >
                {options.split(",").map((option) => (
                  <option key={option} value={option} className="text-base">
                    {option}
                  </option>
                ))}
              </select>
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
                      type="checkbox"
                      name={`question-${index}`}
                      value={score}
                      checked={answers[index] == score}
                      onChange={() => handleAnswer(index, score)}
                      className="form-radio"
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
      </form>
    </div>
  );
}
