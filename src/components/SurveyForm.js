
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // or next/router if using Next.js
import config from '../config/config';
import toast from 'react-hot-toast';
export default function SurveyForm() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch(`${config.BACKEND_URI}/api/surveys/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSurvey(data);
        setAnswers(data.questions.map(() => ""));
      });
  }, [id]);

  const handleChange = (i, value) => {
    const updated = [...answers];
    updated[i] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const responsePayload = survey.questions.map((q, i) => ({
      questionText: q.questionText,
      answer: answers[i],
    }));

    const res = await fetch(`http://localhost:5000/api/surveys/${id}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: responsePayload }),
    });

    if (res.ok) {
      toast.success("Response submitted!");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (!survey) return <p>Loading...</p>;

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h2>{survey.title}</h2>
//       {survey.questions.map((q, i) => (
//         <div key={i}>
//           <p>{q.questionText}</p>

//           {q.type === "mcq" ? (
//             q.options.map((opt, oi) => (
//               <label key={oi}>
//                 <input
//                   type="radio"
//                   name={`q${i}`}
//                   value={opt}
//                   onChange={(e) => handleChange(i, e.target.value)}
//                 />{" "}
//                 {opt}
//               </label>
//             ))
//           ) : (
//             <textarea
//               value={answers[i]}
//               onChange={(e) => handleChange(i, e.target.value)}
//               rows={q.type === "long" ? 4 : 1}
//             />
//           )}
//         </div>
//       ))}

//       <button type="submit">Submit</button>
//     </form>
//   );



return (
    <div className="survey-container">
      <form onSubmit={handleSubmit} className="survey-form">
        <h2 className="survey-title">{survey.title}</h2>
        {survey.questions.map((q, i) => (
          <div key={i} className="question-container">
            <p className="question-text">{q.questionText}</p>

            {q.type === "mcq" ? (
              <div className="options-container">
                {q.options.map((opt, oi) => (
                  <label key={oi} className="option-label">
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      onChange={(e) => handleChange(i, e.target.value)}
                      className="option-input"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                value={answers[i]}
                onChange={(e) => handleChange(i, e.target.value)}
                rows={q.type === "long" ? 4 : 1}
                className="textarea-answer"
                placeholder="Type your answer here..."
              />
            )}
          </div>
        ))}

        <button type="submit" className="submit-button">
          Submit Survey
        </button>
      </form>
    </div>
  );


}
