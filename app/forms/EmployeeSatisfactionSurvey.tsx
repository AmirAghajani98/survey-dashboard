import { useState } from "react";
import data from "../../data/questions.json";

const survey = data.EmployeeSatisfaction;
const demographics = survey.demographics;
const categories = survey.categories;
const additionalQuestions = survey.additional || [];
const participationQuestions = survey.participation || [];
const suggestionQuestions = survey.suggestions || [];

type Answers = Record<string, string | number>;

interface Category {
  title: string;
  questions: string[];
}

export default function EmployeeSatisfactionSurvey() {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Answers:", answers);
      alert("پرسشنامه با موفقیت ارسال شد!");
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
        پرسشنامه سنجش رضایت کارکنان
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

        {additionalQuestions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
              سوالات اضافی
            </h2>
            {additionalQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block text-base font-medium mb-2">
                  {question}
                </label>
                <textarea
                  name={`additional-${index}`}
                  value={answers[`additional-${index}`] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [`additional-${index}`]: e.target.value,
                    }))
                  }
                  className="form-textarea w-full border border-gray-300 p-2"
                />
              </div>
            ))}
          </div>
        )}

        {participationQuestions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
              سوالات مشارکت
            </h2>
            {participationQuestions.map((item, index) => (
              <div key={index} className="mb-6">
                <p className="text-base font-medium mb-2">{item.question}</p>
                <div className="flex flex-wrap gap-4">
                  {item.options.map((option, optIndex) => (
                    <label key={optIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`participation-${index}`}
                        value={option}
                        checked={answers[`participation-${index}`] === option}
                        onChange={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [`participation-${index}`]: option,
                          }))
                        }
                        className="form-radio w-6 h-6 mx-auto"
                      />
                      {option}
                    </label>
                  ))}
                </div>
                {item.followup &&
                  answers[`participation-${index}`] === "مشاركت نداشته ام" && (
                    <textarea
                      name={`followup-${index}`}
                      value={answers[`followup-${index}`] || ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [`followup-${index}`]: e.target.value,
                        }))
                      }
                      className="form-textarea mt-2 w-full border border-gray-300 p-2"
                      placeholder={item.followup}
                    />
                  )}
              </div>
            ))}
          </div>
        )}

        {suggestionQuestions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-blue-900 border-b pb-2">
              پیشنهادات
            </h2>
            {suggestionQuestions.map((question, index) => (
              <div key={index} className="mb-4">
                <label className="block text-base font-medium mb-2">
                  {question}
                </label>
                <textarea
                  name={`suggestion-${index}`}
                  value={answers[`suggestion-${index}`] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [`suggestion-${index}`]: e.target.value,
                    }))
                  }
                  className="form-textarea w-full border border-gray-300 p-2"
                  placeholder="لطفاً توضیحات خود را وارد کنید"
                />
              </div>
            ))}
          </div>
        )}

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
