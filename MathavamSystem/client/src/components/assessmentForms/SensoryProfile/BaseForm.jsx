import { useState, useMemo, useEffect } from "react";
import scores from "./Scores";

function BaseForm({
  questions,
  onSubmit,
  formTitle,
  isSubmitting,
  initialResponses,
  initialComments,
}) {
  console.log("BaseForm received initialResponses prop:", initialResponses);
  console.log("BaseForm received initialComments prop:", initialComments);

  const initialResponsesObject = useMemo(() => {
    if (!initialResponses) return {};

    return initialResponses.reduce((acc, response) => {
      acc[response.qid] = {
        score: response.score,
        quadrant: response.quadrant,
      };
      return acc;
    }, {});
  }, [initialResponses]);

  console.log("Transformed initialResponsesObject:", initialResponsesObject);

  const [responses, setResponses] = useState({});
  const [comments, setComments] = useState("");

  // Use useEffect to set initial values when the component mounts or initialResponses change
  useEffect(() => {
    console.log(
      "Setting responses from initialResponsesObject:",
      initialResponsesObject
    );
    setResponses(initialResponsesObject);
    setComments(initialComments || "");
  }, [initialResponsesObject, initialComments]);

  const handleChange = (qid, score, quadrant) => {
    setResponses((prev) => ({
      ...prev,
      [qid]: { score: Number(score), quadrant: quadrant },
    }));
  };

  const totalScore = useMemo(() => {
    let sum = 0;
    questions.forEach((question) => {
      if (!question.excludeFromScore) {
        const responseValue = responses[question.qid];
        if (responseValue) {
          sum += responseValue.score;
        }
      }
    });
    return sum;
  }, [responses, questions]);

  return (
    <div className="w-full bg-white rounded-3xl shadow-md p-6 mb-6">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ responses, comments, totalScore, formTitle });
        }}
        className="space-y-6"
      >
        <div className="overflow-visible">
          <table className="min-w-full text-sm text-left text-gray-700 border-t border-b border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">My child...</th>
                {scores.map((score, index) => (
                  <th
                    key={`score-th-${index}`}
                    className="relative group px-4 py-2 text-center"
                  >
                    <span className="text-gray-900 font-medium relative">
                      {score.rate}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -top-16 w-44 p-2 text-xs bg-gray-800 text-white rounded shadow-lg invisible group-hover:visible transition-all duration-300 z-50">
                        {score.text}
                        <br />
                        {score.percent}
                      </div>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {questions.map((question) => (
                <tr
                  key={question.qid}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    {question.text}
                    {question.excludeFromScore && (
                      <span className="text-blue-500 ml-1">*</span>
                    )}
                  </td>
                  {scores.map((score, scoreIndex) => (
                    <td
                      key={`score-opt-${question.qid}-${score.rate}-${scoreIndex}`}
                      className="px-4 py-2 text-center"
                    >
                      <input
                        type="radio"
                        name={`q${question.qid}`}
                        value={score.rate}
                        checked={responses[question.qid]?.score === score.rate}
                        onChange={() =>
                          handleChange(
                            question.qid,
                            score.rate,
                            question.quadrant
                          )
                        }
                        required
                        className="accent-green-600"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {formTitle} Raw Score: {totalScore}
          </h3>
        </div>

        <div>
          <label
            htmlFor="comments"
            className="block text-lg font-semibold text-gray-800 mb-2"
          >
            {formTitle} Processing Comments:
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comments here..."
            rows={3}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 text-white font-medium px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300 w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default BaseForm;
