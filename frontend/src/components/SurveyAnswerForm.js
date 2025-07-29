

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import "./SurveyAnswerForm.css"; // Create this CSS file

// function SurveyAnswerForm() {
//   const { id } = useParams();
//   const [survey, setSurvey] = useState(null);
//   const [responses, setResponses] = useState({});
//   const [files, setFiles] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     fetch(`http://localhost:6060/survey/${id}`)
//       .then((res) => res.json())
//       .then((data) => setSurvey(data));
//   }, [id]);

//   const handleChange = (index, value) => {
//     setResponses({ ...responses, [index]: value });
//   };

//   const handleFileChange = (index, fileList) => {
//     setFiles({ ...files, [index]: fileList });
//     setResponses((prev) => ({ ...prev, [index]: "" }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("surveyId", id);
//     formData.append("responses", JSON.stringify(responses));

//     Object.keys(files).forEach((key) => {
//       Array.from(files[key]).forEach((file) => {
//         formData.append(`file_${key}`, file);
//       });
//     });

//     try {
//       const res = await fetch("http://localhost:6060/api/responses", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         alert("Response submitted successfully!");
//       } else {
//         alert("Failed to submit response. Please try again.");
//       }
//     } catch (error) {
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!survey) return (
//     <div className="loading-container">
//       <div className="spinner"></div>
//       <p>Loading survey...</p>
//     </div>
//   );

//   return (
//     <div className="survey-answer-container">
//       <form onSubmit={handleSubmit} className="survey-answer-form">
//         <h2 className="survey-title animate-pop">{survey.title}</h2>
//         {survey.description && <p className="survey-description animate-fade">{survey.description}</p>}

//         {survey.questions?.map((q, index) => (
//           <div key={index} className="question-answer-group animate-slide-up">
//             <label className="question-label">{q.questionText}</label>

//             {q.type === "short" && (
//               <input
//                 type="text"
//                 className="answer-input"
//                 value={responses[index] || ""}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 required={q.required}
//               />
//             )}

//             {q.type === "long" && (
//               <textarea
//                 className="answer-textarea"
//                 value={responses[index] || ""}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 required={q.required}
//               ></textarea>
//             )}

//             {q.type === "mcq" && (
//               <div className="mcq-options">
//                 {q.options.map((opt, i) => (
//                   <label key={i} className="mcq-option">
//                     <input
//                       type="radio"
//                       name={`q_${index}`}
//                       value={opt}
//                       checked={responses[index] === opt}
//                       onChange={() => handleChange(index, opt)}
//                       required={q.required && i === 0}
//                     />
//                     <span className="radio-custom"></span>
//                     {opt}
//                   </label>
//                 ))}
//               </div>
//             )}

//             {q.type === "file" && (
//               <div className="file-upload-container">
//                 <label className="file-upload-label">
//                   <input
//                     type="file"
//                     className="file-upload-input"
//                     accept="*"
//                     multiple
//                     onChange={(e) => handleFileChange(index, e.target.files)}
//                   />
//                   <span className="file-upload-button">Choose Files</span>
//                   <span className="file-upload-text">
//                     {files[index] 
//                       ? `${files[index].length} file(s) selected` 
//                       : "No files chosen"}
//                   </span>
//                 </label>
//               </div>
//             )}
//           </div>
//         ))}

//         <button 
//           type="submit" 
//           className="submit-button"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? (
//             <span className="button-spinner"></span>
//           ) : (
//             "Submit Response"
//           )}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SurveyAnswerForm;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SurveyAnswerForm() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [files, setFiles] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false); // NEW

  // Check localStorage on mount
  useEffect(() => {
    const submittedSurveys = JSON.parse(localStorage.getItem("submittedSurveys")) || [];
    if (submittedSurveys.includes(id)) {
      setHasSubmitted(true);
    }
  }, [id]);

  useEffect(() => {
    if (!hasSubmitted) {
      fetch(`https://form-maker-backend.onrender.com/survey/${id}`)
        .then((res) => res.json())
        .then((data) => setSurvey(data));
    }
  }, [id, hasSubmitted]);

  const handleChange = (index, value) => {
    setResponses({ ...responses, [index]: value });
  };

  const handleFileChange = (index, fileList) => {
    setFiles({ ...files, [index]: fileList });
    setResponses((prev) => ({ ...prev, [index]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("surveyId", id);
    formData.append("responses", JSON.stringify(responses));

    Object.keys(files).forEach((key) => {
      Array.from(files[key]).forEach((file) => {
        formData.append(`file_${key}`, file);
      });
    });

    try {
      const res = await fetch("https://form-maker-backend.onrender.com/api/responses", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Response submitted successfully!");

        // Save to localStorage (NEW)
        const submittedSurveys = JSON.parse(localStorage.getItem("submittedSurveys")) || [];
        submittedSurveys.push(id);
        localStorage.setItem("submittedSurveys", JSON.stringify(submittedSurveys));
        setHasSubmitted(true); // Trigger submitted message
      } else {
        alert("Failed to submit response. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubmitted) {
    return (
      <div className="survey-answer-container">
        <div className="already-submitted-message">
          <h2 className="survey-title">You have already submitted this survey.</h2>
          <p>Thank you for your participation!</p>
        </div>
      </div>
    );
  }

  if (!survey) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading survey...</p>
    </div>
  );

  return (
    <div className="survey-answer-container">
      <form onSubmit={handleSubmit} className="survey-answer-form">
        <h2 className="survey-title animate-pop">{survey.title}</h2>
        {survey.description && <p className="survey-description animate-fade">{survey.description}</p>}

        {survey.questions?.map((q, index) => (
          <div key={index} className="question-answer-group animate-slide-up">
            <label className="question-label">{q.questionText}</label>

            {q.type === "short" && (
              <input
                type="text"
                className="answer-input"
                value={responses[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                required={q.required}
              />
            )}

            {q.type === "long" && (
              <textarea
                className="answer-textarea"
                value={responses[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                required={q.required}
              ></textarea>
            )}

            {q.type === "mcq" && (
              <div className="mcq-options">
                {q.options.map((opt, i) => (
                  <label key={i} className="mcq-option">
                    <input
                      type="radio"
                      name={`q_${index}`}
                      value={opt}
                      checked={responses[index] === opt}
                      onChange={() => handleChange(index, opt)}
                      required={q.required && i === 0}
                    />
                    <span className="radio-custom"></span>
                    {opt}
                  </label>
                ))}
              </div>
            )}

            {q.type === "file" && (
              <div className="file-upload-container">
                <label className="file-upload-label">
                  <input
                    type="file"
                    className="file-upload-input"
                    accept="*"
                    multiple
                    onChange={(e) => handleFileChange(index, e.target.files)}
                  />
                  <span className="file-upload-button">Choose Files</span>
                  <span className="file-upload-text">
                    {files[index] 
                      ? `${files[index].length} file(s) selected` 
                      : "No files chosen"}
                  </span>
                </label>
              </div>
            )}
          </div>
        ))}

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="button-spinner"></span>
          ) : (
            "Submit Response"
          )}
        </button>
      </form>
    </div>
  );
}

export default SurveyAnswerForm;
