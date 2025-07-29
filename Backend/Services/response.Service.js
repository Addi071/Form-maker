// services/response.service.js
import Response from "../Models/response.model.js";


export const getResponsesBySurveyId = async (surveyId) => {
  try {
    const responses = await Response.find({ surveyId }).sort({ createdAt: -1 }); // Optional: newest first
    return responses;
  } catch (error) {
    throw new Error("Error fetching responses: " + error.message);
  }
};

export const deleteResponsesBySurveyId = async (surveyId) => {
  return await Response.deleteMany({ surveyId });
};