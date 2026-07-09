import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from '../config/config';
 

function AdminDashboard() {
  const [surveys, setSurveys] = useState([]);
  const adminData = JSON.parse(localStorage.getItem("user"));
  const adminId = adminData?._id;
  // console.log("userid is:",adminId)


   const navigate = useNavigate();

  const handleViewResponses = (id) => {
    navigate(`/survey-responses/${id}/responses`);
  };
  

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch(`${config.BACKEND_URI}/survey/admin/${adminId}`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setSurveys(data||[]);
        console.log("survey Data is: ",data)
      } catch (err) {
        console.error("Failed to fetch surveys", err);
      }
    };

    if (adminId) fetchSurveys();
  }, [adminId]);

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Your Created Surveys</h2>
        <div className="header-divider"></div>
      </div>
      
      {surveys.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p className="empty-message">You haven't created any surveys yet.</p>
        </div>
      ) : (
        <div className="survey-grid">
          {surveys.map((survey) => (
            <div key={survey._id} className="survey-card">
              <div className="card-content">
                <h3 className="survey-dash-title">{survey.title}</h3>
                <p className="survey-dash-description">{survey.description}</p>
                
                <div className="survey-stats">
                  <div className="stat-item">
                    <span className="stat-icon">❓</span>
                    <span>{survey.questions.length} questions</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">📅</span>
                    <span>{new Date(survey.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  className="view-responses-btn"
                  onClick={()=>handleViewResponses(survey._id)}
                >
                  View Responses
                  <span className="btn-arrow">→</span>
                </button>
              </div>
              <div className="card-highlight"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;