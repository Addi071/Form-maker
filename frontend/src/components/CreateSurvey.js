// import { useState } from "react";

// export default function CreateSurvey() {
//   const [title, setTitle] = useState("");
//   const [questions, setQuestions] = useState([
//     { questionText: "", type: "short", options: [""] },
//   ]);

//   const handleQuestionChange = (i, field, value) => {
//     const updated = [...questions];
//     updated[i][field] = value;

//     if (field === "type" && value !== "mcq") {
//       updated[i].options = [];
//     } else if (field === "type" && value === "mcq") {
//       updated[i].options = [""];
//     }

//     setQuestions(updated);
//   };

//   const handleOptionChange = (qi, oi, value) => {
//     const updated = [...questions];
//     updated[qi].options[oi] = value;
//     setQuestions(updated);
//   };

//   const addOption = (qi) => {
//     const updated = [...questions];
//     updated[qi].options.push("");
//     setQuestions(updated);
//   };

//   const addQuestion = () => {
//     setQuestions([...questions, { questionText: "", type: "short", options: [] }]);
//   };

//   const deleteQuestion = (index) => {
//     const updated = [...questions];
//     updated.splice(index, 1);
//     setQuestions(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("http://localhost:5000/api/surveys/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title, questions }),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert(`Survey Created!\nShare link:\nhttp://localhost:3000/survey/${data.surveyId}`);
//     } else {
//       alert("Survey creation failed!");
//     }
//   };

//   return (
//     // 
    


//     <form onSubmit={handleSubmit} className="survey-creator-form">
//   <h2 className="survey-creator-title">Create Survey</h2>

//   <input
//     type="text"
//     className="survey-title-input"
//     placeholder="Survey Title"
//     value={title}
//     onChange={(e) => setTitle(e.target.value)}
//     required
   
//   />

//   {questions.map((q, qi) => (
//     <div key={qi} className="question-card">
//       <input
//         type="text"
//         className="question-input"
//         placeholder={`Question ${qi + 1}`}
//         value={q.questionText}
//             onChange={(e) => handleQuestionChange(qi, "questionText", e.target.value)}
//             required
//       />

//       <select
//         className="question-type-select"
//         value={q.type}
//             onChange={(e) => handleQuestionChange(qi, "type", e.target.value)}
//       >
//         <option value="short">Short Answer</option>
//             <option value="long">Long Answer</option>
//             <option value="mcq">Multiple Choice</option>
//         {/* options */}
//       </select>

//       {q.type === "mcq" &&
//         q.options.map((opt, oi) => (
//           <input
//             key={oi}
//             type="text"
//             className="option-input"
//             placeholder={`Option ${oi + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(qi, oi, e.target.value)}
//                 required
//           />
//         ))}

//       {q.type === "mcq" && (
//         <button type="button" className="add-option-btn" onClick={() => addOption(qi)}>
//           + Add Option
//         </button>
//       )}

//       <button type="button" className="delete-question-btn" onClick={() => deleteQuestion(qi)}>
//         🗑️ Delete Question
//       </button>
//     </div>
//   ))}

//   <button type="button" className="add-question-btn" onClick={addQuestion}>
//     + Add Question
//   </button>

//   <button type="submit" className="submit-survey-btn">Submit Survey</button>
// </form>



//   );
// }


import { useState } from "react";

export default function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [file, setFile] = useState(null);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", type: "short", options: [] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (i, j, value) => {
    const updated = [...questions];
    updated[i].options[j] = value;
    setQuestions(updated);
  };

  const addOption = (i) => {
    const updated = [...questions];
    updated[i].options.push("");
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("questions", JSON.stringify(questions));
    if (file) formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/surveys/create", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Survey created successfully!");
      setTitle("");
      setQuestions([]);
      setFile(null);
    } else {
      alert("Survey creation failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl font-bold mb-4">Create Survey</h2>

      <input
        type="text"
        placeholder="Survey title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 border p-2 w-full"
        required
      />

      {questions.map((q, i) => (
        <div key={i} className="mb-4 border p-2">
          <input
            type="text"
            placeholder="Enter question"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(i, "questionText", e.target.value)}
            className="w-full mb-2"
            required
          />

          <select
            value={q.type}
            onChange={(e) => handleQuestionChange(i, "type", e.target.value)}
            className="mb-2"
          >
            <option value="short">Short Answer</option>
            <option value="long">Long Answer</option>
            <option value="mcq">MCQ</option>
          </select>

          {q.type === "mcq" &&
            q.options.map((opt, j) => (
              <input
                key={j}
                type="text"
                placeholder={`Option ${j + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(i, j, e.target.value)}
                className="block mb-1"
              />
            ))}

          {q.type === "mcq" && (
            <button type="button" onClick={() => addOption(i)} className="text-blue-600 text-sm">
              + Add Option
            </button>
          )}

          <button type="button" onClick={() => removeQuestion(i)} className="text-red-500 text-sm ml-4">
            Delete Question
          </button>
        </div>
      ))}

      <button type="button" onClick={addQuestion} className="bg-green-500 text-white px-4 py-2 rounded">
        Add Question
      </button>

      <div className="mt-4">
        <label>Attach file (max 5 MB): </label>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*,.pdf,.doc,.docx" />
      </div>

      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Create Survey
      </button>
    </form>
  );
}
