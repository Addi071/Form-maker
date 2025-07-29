import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateSurvey() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:6060/survey/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSurvey(data);
        setQuestions(data.questions);
      });
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;

    // Reset options when changing type to mcq
    if (field === "type" && value === "mcq" && !updatedQuestions[index].options) {
      updatedQuestions[index].options = [""];
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        type: "short",
        options: [],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedSurvey = { ...survey, questions };

    const res = await fetch(`http://localhost:6060/survey/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSurvey),
    });

    if (res.ok) {
      alert("Survey updated successfully");
      navigate("/my-surveys");
    } else {
      alert("Failed to update survey");
    }
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <div className="update-survey-form">
      <h2>Update Survey - {survey.title}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc" }}>
            <label>Question {index + 1}</label>
            <input
              type="text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, "questionText", e.target.value)}
              required
            />

            <select
              value={q.type}
              onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
            >
              <option value="short">Short Answer</option>
              <option value="long">Long Answer</option>
              <option value="mcq">Multiple Choice</option>
              <option value="file">File Upload</option>
            </select>

            {q.type === "mcq" && (
              <div>
                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={opt}
                    placeholder={`Option ${oIndex + 1}`}
                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                  />
                ))}
                <button type="button" onClick={() => addOption(index)}>+ Add Option</button>
              </div>
            )}
          </div>
        ))}

        <button type="button" onClick={addQuestion}>+ Add Question</button>
        <br /><br />
        <button type="submit">Update Survey</button>
      </form>
    </div>
  );
}

export default UpdateSurvey;
