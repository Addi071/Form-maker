import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  questionIndex: Number,
  answerText: String,
  files: [String],
});

const responseSchema = new mongoose.Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  answers: [answerSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Response = mongoose.models.Response || mongoose.model("Response", responseSchema);

export default Response;
