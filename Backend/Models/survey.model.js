import mongoose from "mongoose";

// Embedded schema for each question
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['short', 'long', 'mcq', 'file'],
    required: true
  },
  options: {
    type: [String],
    default: function () {
      return this.type === 'mcq' ? [""] : undefined;
    },
    validate: {
      validator: function (v) {
        if (this.type === 'mcq') {
          return Array.isArray(v) && v.length > 0;
        }
        return true;
      },
      message: 'Options are required for MCQ type questions.'
    }
  }
});

// Main survey schema
const surveySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: {
    type: [questionSchema],
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // assuming you have an Admin model
    required: true
  }
}, { timestamps: true });

const Survey = mongoose.model("Survey", surveySchema);
export default Survey;
