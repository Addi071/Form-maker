import * as surveyService from '../Services/survey.Service.js';
import * as responseService from '../Services/response.Service.js';

import mongoose from "mongoose";
export const createSurvey = async (req, res) => {
  try {
    const survey = await surveyService.createSurvey(req.body);
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSurveys = async (req, res) => {
  try {
    const surveys = await surveyService.getAllSurveys();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSurveyById = async (req, res) => {
  try {
    const survey = await surveyService.getSurveyById(req.params.id);
    if (!survey) return res.status(404).json({ message: 'Survey not found' });
    res.status(200).json(survey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSurveysByAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    console.log(adminId)
  
   if (!mongoose.Types.ObjectId.isValid(adminId)) {
      return res.status(400).json({ error: 'Invalid adminId format' });
    }
    const surveys = await surveyService.getSurveysByAdminId( adminId );

    res.status(200).json(surveys);
  } catch (error) {
    console.error("Error fetching surveys for admin:", error);
    res.status(500).json({ error: "Internal Server Error in get survey by admin" });
  }
};

export const deleteSurveyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the survey
    const deletedSurvey = await surveyService.deleteSurveyById(id);
    if (!deletedSurvey) {
      return res.status(404).json({ message: 'Survey not found' });
    }

    // Delete associated responses
    await responseService.deleteResponsesBySurveyId(id);

    res.status(200).json({ message: 'Survey and associated responses deleted successfully' });
  } catch (error) {
    console.error('Error deleting survey:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateSurveyById = async (req, res) => {
  try {
    const surveyId = req.params.id;
    const updatedData = req.body;

    const updatedSurvey = await surveyService.updateSurvey(surveyId, updatedData);
    if (!updatedSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    res.status(200).json(updatedSurvey);
  } catch (error) {
    console.error("Error updating survey:", error);
    res.status(500).json({ message: "Failed to update survey" });
  }
};