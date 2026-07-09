
import config from '../config/config';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function SurveyResponses() {
  const { surveyId } = useParams();
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${config.BACKEND_URI}/api/responses/${surveyId}`)
      .then((res) => res.json())
      .then((data) => {
        setResponses(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch responses", err);
        setIsLoading(false);
      });
  }, [surveyId]);

  const getFileUrl = (filename) => `${config.BACKEND_URI}/uploads/${filename}`;

  if (isLoading) {
    return <div className="loading-container">Loading responses...</div>;
  }

  return (
    <div className="survey-responses-container">
      <h2 className="survey-header">Responses</h2>
      
      {responses.length === 0 ? (
        <div className="no-responses">No responses found for this survey</div>
      ) : (
        responses.map((res, i) => (
          <div className="response-card" key={i}>
            <p className="response-timestamp">
              <strong>Submitted At:</strong> {new Date(res.createdAt).toLocaleString()}
            </p>
            <ul className="answers-list">
              {res.answers.map((ans, idx) => (
                <li className="answer-item" key={idx}>
                  <p className="answer-text">
                    <strong>Answer:</strong> {ans.answerText}
                  </p>

                  {ans.files && ans.files.length > 0 && (
                    <div className="files-container">
                      <strong className="files-label">Uploaded Files:</strong>
                      {ans.files.map((fileName, fIdx) => (
                        <div className="file-item" key={fIdx}>
                          {fileName.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                            <img
                              src={getFileUrl(fileName)}
                              alt="Uploaded"
                              className="image-preview"
                            />
                          ) : (
                            <a
                              href={getFileUrl(fileName)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="file-link"
                            >
                              {fileName}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default SurveyResponses;