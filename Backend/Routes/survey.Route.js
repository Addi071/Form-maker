
import express from 'express';
import { createSurvey, getAllSurveys, getSurveyById, getSurveysByAdmin, deleteSurveyById, updateSurveyById } from '../Controllers/survey.Controller.js';

let surveyRouter = express.Router();

surveyRouter.post('/', createSurvey);
surveyRouter.get('/', getAllSurveys);
surveyRouter.get('/admin/:adminId', getSurveysByAdmin);
surveyRouter.get('/:id', getSurveyById);
surveyRouter.put('/:id', updateSurveyById);
surveyRouter.delete('/:id', deleteSurveyById);



export default surveyRouter;