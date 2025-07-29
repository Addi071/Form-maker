

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

    const res = await fetch("https://form-maker-backend.onrender.com/api/surveys/create", {
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
