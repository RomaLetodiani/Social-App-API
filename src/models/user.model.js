const mongoose = require("mongoose");

const birthDataSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true },
    day: { type: Number, required: true },
    month: { type: Number, required: true },
    city: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const educationDataSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true },
    universityName: { type: String, required: true },
    schoolGraduationYear: { type: Number },
    universityGraduationYear: { type: Number },
  },
  {
    versionKey: false,
  }
);

const hobbySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    birthData: { type: birthDataSchema, required: true },
    educationData: { type: educationDataSchema, required: true },
    hobbies: [hobbySchema],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("User", userSchema);
