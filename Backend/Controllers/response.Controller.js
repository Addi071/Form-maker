import Response from "../models/response.model.js"; 
import { getResponsesBySurveyId } from "../Services/response.Service.js";
import { Parser } from "json2csv";

export const submitSurveyResponse = async (req, res) => {
  try {
    const { surveyId, responses } = req.body;
    // console.log(responses)
    const parsedResponses = JSON.parse(responses);
    const answers = [];

const allIndexes = new Set([
  ...Object.keys(parsedResponses).map(Number),
  ...req.files.map((f) => parseInt(f.fieldname.split('_')[1])),
]);

for (const index of allIndexes) {
  const fileField = req.files.filter((f) => f.fieldname === `file_${index}`);
  const fileNames = fileField.map((f) => f.filename);
  const answerText = parsedResponses[index] || "";

  answers.push({
    questionIndex: parseInt(index),
    answerText,
    files: fileNames,
  });
}

    const newResponse = new Response({
      surveyId,
      answers,
    });

    await newResponse.save();
    res.status(200).json({ message: "Response saved successfully" });
  } catch (error) {
    console.error("Error submitting response:", error);
    res.status(500).json({ message: "Server error while saving response" });
  }
};

export const fetchSurveyResponses = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const responses = await getResponsesBySurveyId(surveyId);
    res.status(200).json(responses);
  } catch (error) {
    console.error("Error fetching survey responses:", error);
    res.status(500).json({ message: "Failed to fetch responses" });
  }
};

export const getResponseCountBySurveyId = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const count = await Response.countDocuments({ surveyId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching response count:", error);
    res.status(500).json({ message: "Failed to fetch response count" });
  }
};


export const downloadSurveyResponsesCSV = async (req, res) => {
  try {
    const { surveyId } = req.params;

    const responses = await Response.find({ surveyId });

    // Flatten responses
    const csvData = responses.flatMap((response, idx) =>
      response.answers.map((answer) => ({
        ResponseNumber: idx + 1,
        SubmittedAt: new Date(response.createdAt).toLocaleString(),
        QuestionIndex: answer.questionIndex,
        AnswerText: answer.answerText,
        Files: answer.files.join(", "),
      }))
    );

    if (csvData.length === 0) {
      return res.status(404).json({ message: "No responses found to export." });
    }

    const json2csvParser = new Parser({
      fields: ["ResponseNumber", "SubmittedAt", "QuestionIndex", "AnswerText", "Files"],
    });

    const csv = json2csvParser.parse(csvData);

    res.header("Content-Type", "text/csv");
    res.attachment(`survey_${surveyId}_responses.csv`);
    return res.send(csv);
  } catch (error) {
    console.error("Error downloading responses:", error);
    res.status(500).json({ message: "Failed to generate CSV" });
  }
};