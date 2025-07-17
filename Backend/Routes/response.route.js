import express from "express";
import upload from "../middlewares/multer.middleware.js";
import { submitSurveyResponse, fetchSurveyResponses, getResponseCountBySurveyId, downloadSurveyResponsesCSV} from "../Controllers/response.Controller.js";

const router = express.Router();
router.post("/", upload.any(), submitSurveyResponse);
router.get("/:surveyId", fetchSurveyResponses);
router.get("/:surveyId/count", getResponseCountBySurveyId);
router.get("/:surveyId/download", downloadSurveyResponsesCSV);




export default router;
