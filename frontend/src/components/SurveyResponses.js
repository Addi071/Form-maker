// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// function SurveyResponses() {
//   const { surveyId } = useParams();
//   const [responses, setResponses] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:6060/api/responses/${surveyId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Fetched response:", data);
//         setResponses(data);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch responses", err);
//       });
//   }, [surveyId]);

//   const getFileUrl = (fileId) => {
//     return `http://localhost:5000/api/files/${fileId}`;
//   };

//   return (
//     <div>
//       <h2>Responses</h2>
//       {responses.map((res, i) => (
//   <div key={i} style={{ border: "1px solid gray", margin: "1rem", padding: "1rem" }}>
//     <p><strong>Submitted At:</strong> {new Date(res.createdAt).toLocaleString()}</p>
//     <ul>
//       {res.answers.map((ans, idx) => (
//         <li key={idx}>
//           <p><strong>Q:</strong> Question {ans.questionIndex + 1}</p>
//           <p><strong>Answer:</strong> {ans.answerText}</p>

//           {ans.files && ans.files.length > 0 && (
//             <div>
//               <strong>Uploaded Files:</strong>
//               <ul>
//                 {ans.files.map((file, fileIdx) => (
//                   <li key={fileIdx}>
//                     <a
//                       href={`http://localhost:5000/api/files/${file}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {file}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </li>
//       ))}
//     </ul>
//   </div>
// ))}

//     </div>
//   );
// }

// export default SurveyResponses;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import "./SurveyResponses.css"; // Main CSS file
// import "./SurveyResponses.animations.css"; // Animation CSS

function SurveyResponses() {
  const { surveyId } = useParams();
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:6060/api/responses/${surveyId}`)
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

  const getFileUrl = (filename) => `http://localhost:6060/uploads/${filename}`;

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