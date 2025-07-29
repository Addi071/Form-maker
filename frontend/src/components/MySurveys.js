import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./MySurveys.css";
// import "./MySurveys.animations.css";

function MySurveys() {
  const [surveys, setSurveys] = useState([]);
  const [responseCounts, setResponseCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("user"));
  const adminId = adminData?._id;

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:6060/survey/admin/${adminId}`);
        const data = await res.json();
        setSurveys(data || []);

        const counts = {};
        for (const survey of data) {
          const resCount = await fetch(`http://localhost:6060/api/responses/${survey._id}/count`);
          const result = await resCount.json();
          counts[survey._id] = result.count || 0;
        }
        setResponseCounts(counts);
      } catch (err) {
        console.error("Error fetching surveys or response counts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (adminId) fetchSurveys();
  }, [adminId]);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this survey and all its responses?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:6060/survey/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSurveys(surveys.filter((s) => s._id !== id));
        alert("Survey deleted successfully.");
      } else {
        alert("Failed to delete survey.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Server error.");
    }
  };

  const handleCopyLink = (surveyId) => {
    const url = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const handleDownloadCSV = (surveyId) => {
    window.open(`http://localhost:6060/api/responses/${surveyId}/download`, "_blank");
  };

  if (isLoading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="my-surveys-container">
      <h2 className="page-title">My Surveys</h2>

      {surveys.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No Surveys Yet</h3>
          <p>You haven't created any surveys. Click the button below to get started!</p>
          <button 
            className="create-survey-btn"
            onClick={() => navigate("/create-survey")}
          >
            Create Your First Survey
          </button>
        </div>
      ) : (
        <div className="survey-grid">
          {surveys.map((survey) => (
            <div className="survey-card" key={survey._id}>
              <div className="card-header">
                <h3>{survey.title}</h3>
                <span className="response-count">
                  {responseCounts[survey._id] || 0} responses
                </span>
              </div>
              <p className="survey-my-description">{survey.description}</p>

              <div className="survey-meta">
                <div className="meta-item">
                  <span className="meta-label">Questions</span>
                  <span className="meta-value">{survey.questions.length}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created</span>
                  <span className="meta-value">
                    {new Date(survey.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="survey-actions">
                <button 
                  className="action-btn preview-btn"
                  onClick={() => navigate(`/survey/${survey._id}`)}
                >
                  Preview
                </button>
                <button 
                  className="action-btn responses-btn"
                  onClick={() => navigate(`/survey-responses/${survey._id}/responses`)}
                >
                  Responses
                </button>
                <button 
                  className="action-btn copy-btn"
                  onClick={() => handleCopyLink(survey._id)}
                >
                  Copy Link
                </button>
                <button 
                  className="action-btn download-btn"
                  onClick={() => handleDownloadCSV(survey._id)}
                >
                  Download CSV
                </button>
                <button 
                  className="action-btn update-btn"
                  onClick={() => navigate(`/update-survey/${survey._id}`)}
                >
                  Update
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => handleDelete(survey._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MySurveys;