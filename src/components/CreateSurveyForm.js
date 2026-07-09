import React, { useState } from "react";
import config from '../config/config';
import toast from 'react-hot-toast';
function CreateSurveyForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const admindata = JSON.parse(localStorage.getItem("user")); // assuming this is where the admin's ID is stored\
  const adminId = admindata?._id;
//  console.log(adminId)
  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", type: "short", options: [] }]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    if (field === "type" && value === "mcq") {
      updated[index].options = [""];
    }
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...questions];
    updated[qIndex].options.push("");
    setQuestions(updated);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!adminId) {
      toast.error("Admin not logged in");
      return;
    }

    const res = await fetch(`${config.BACKEND_URI}/survey`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ title, description, questions, adminId }),
    },
  );

    const data = await res.json();
    console.log("Survey creation response:", data);
    if (res.ok) {
      toast.success("Survey created successfully");
      setTitle("");
      setDescription("");
      setQuestions([]);
    } else {
      toast.error("Failed to create survey");
    }
  };

  return (
    <div className="survey-create-container">
      <form onSubmit={handleSubmit} className="survey-create-form">
        <h2 className="survey-create-title">Create Survey</h2>

        <input
          type="text"
          className="survey-input"
          placeholder="Survey Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="survey-textarea"
          placeholder="Survey Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        {questions.map((q, i) => (
          <div key={i} className="question-card">
            <input
              type="text"
              className="question-input"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) => updateQuestion(i, "questionText", e.target.value)}
              required
            />
            <select
              className="question-select"
              value={q.type}
              onChange={(e) => updateQuestion(i, "type", e.target.value)}
            >
              <option value="short">Short Answer</option>
              <option value="long">Long Answer</option>
              <option value="mcq">Multiple Choice</option>
              <option value="file">File Upload</option>
            </select>

            {q.type === "mcq" && (
              <div className="options-container">
                {q.options.map((opt, j) => (
                  <div key={j} className="option-input-group">
                    <input
                      type="text"
                      className="option-input"
                      placeholder={`Option ${j + 1}`}
                      value={opt}
                      onChange={(e) => updateOption(i, j, e.target.value)}
                    />
                  </div>
                ))}
                <button 
                  type="button" 
                  className="add-option-btn"
                  onClick={() => addOption(i)}
                >
                  + Add Option
                </button>
              </div>
            )}

            <button 
              type="button" 
              className="remove-question-btn"
              onClick={() => removeQuestion(i)}
            >
              Remove Question
            </button>
          </div>
        ))}

        <button 
          type="button" 
          className="add-question-btn"
          onClick={addQuestion}
        >
          + Add Question
        </button>
        <br />
        <button type="submit" className="submit-survey-btn">Create Survey</button>
      </form>
    </div>
  );
}

export default CreateSurveyForm;