import { useState } from "react";
import data from "../../data/questions.json";

const survey = data.ServiceContractors;
const demographics = survey.demographics;
const categories = survey.categories;
const suggestions = survey.suggestions;

type Answers = Record<string, string | number>;

interface Category {
  title: string;
  questions: string[];
}

export default function ServiceContractorsSurvey() {
  const categoryEntries = Object.entries(categories).map(
    ([title, questions]) => ({
      title,
      questions: questions as string[],
    })
  );

  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDemoChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setAnswers((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({ ...prev, [`q${questionId}`]: value }));
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [`q${questionId}`]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Answers:", answers);
      alert("پرسشنامه پیمانکاران خدماتی با موفقیت ارسال شد!");
      setAnswers({});
    } catch (err) {
      setError("خطا در ارسال اطلاعات");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="w-2/3 mx-auto text-3xl font-bold pb-6 mb-10 text-center border-b border-gray-400">
        پرسشنامه پیمانکاران خدماتی
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 w-full m-auto">
        <div className="grid grid-cols-2 gap-4 w-full">
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
                  onChange={handleDemoChange}
                  value={answers[key] || ""}
                  className="mt-2 w-full border border-gray-200 shadow-sm p-2 text-base"
                  required
                >
                  <option value="">لطفا انتخاب کنید</option>
                  {options.split(",").map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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
                    میزان رضایت / پاسخ
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

                  const isFirstTextQuestion =
                    category.title === "اطلاع رسانی" && index === 0;

                  return (
                    <tr key={questionId}>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-base font-medium">
                        {question}
                      </td>
                      {isFirstTextQuestion ? (
                        <td
                          colSpan={5}
                          className="border border-gray-300 px-4 py-2"
                        >
                          <input
                            type="text"
                            name={`q${questionId}`}
                            value={answers[`q${questionId}`] || ""}
                            onChange={(e) =>
                              handleTextChange(questionId, e.target.value)
                            }
                            className="w-full border border-gray-300 p-2 rounded"
                            placeholder="پاسخ خود را وارد کنید"
                          />
                        </td>
                      ) : (
                        [1, 2, 3, 4, 5].map((score) => (
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
                        ))
                      )}
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
      </form>
    </div>
  );
}
