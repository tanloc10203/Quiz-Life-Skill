"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Achievement";
const COLLECTION_NAME = "Achievements";

// Declare the Schema of the Mongo model
var achievementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    results: {
      type: Array,
      required: true,
    },
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, achievementSchema);
