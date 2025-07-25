import React from "react";
import questions from "../../data/questions.json";

const HouseholdSurvey = () => {
  const household: string[] = questions.household;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-10 text-center">
        پرسشنامه اندازه گیری فرهنگ بهداشت، ایمنی و محیط زیست (HSE) مشترکین خانگی
        .تجاری. صنعتی جزء و عمده
      </h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
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
          {household.map((question: string, index: number) => (
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
                    type="checkbox"
                    name={`question-${index}`}
                    value={score}
                    className="form-radio w-6 h-6 mx-auto"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HouseholdSurvey;
