
import mongoose from "mongoose";
import Survey from '../Models/survey.model.js';

export const createSurvey = async (data) => {
  const survey = new Survey(data);
  return await survey.save();
};

export const getAllSurveys = async () => {
  return await Survey.find();
};

export const getSurveyById = async (id) => {
  return await Survey.findById(id);
};

export const getSurveysByAdminId = async (adminId) => {
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw new Error("Invalid adminId format");
  }

  return await Survey.find({ adminId });
};

export const deleteSurveyById = async (id) => {
  return await Survey.findByIdAndDelete(id);
};

export const updateSurvey = async (surveyId, updatedData) => {
  return await Survey.findByIdAndUpdate(
    surveyId,
    {
      $set: {
        title: updatedData.title,
        description: updatedData.description,
        questions: updatedData.questions
      }
    },
    { new: true } // Return the updated document
  );
};