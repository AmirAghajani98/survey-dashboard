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
    <div className="w-10/12 mx-auto p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">
        پرسشنامه HSE کارکنان
      </h1>
      <form onSubmit={() => {}} className="space-y-6">
        <div className="grid grid-cols-2 gap-4 w-full">
          {demographics.map(([key, label, options]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium">
                {label}
              </label>
              <select
                id={key}
                name={key}
                onChange={handleDemoChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              >
                {options.split(",").map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <table className="table-auto border-collapse border border-gray-300 w-full mb-4">
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
                <td className="border border-gray-300 px-4 py-2">{question}</td>
                {[1, 2, 3, 4, 5].map((score) => (
                  <td
                    key={score}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    <input
                      type="radio"
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "در حال ارسال..." : "ارسال پرسشنامه"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
