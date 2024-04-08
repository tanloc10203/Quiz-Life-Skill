"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Game";
const COLLECTION_NAME = "Games";

// Declare the Schema of the Mongo model
var gameSchema = new mongoose.Schema(
  {
    question: String,
    guild: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guild",
      required: true,
      index: true,
    },
    description: String,
    image: String,
    texts: [{ text: String }],
    answers: {
      type: [
        {
          isCorrect: { type: Boolean, required: true },
          image: String,
          text: String,
        },
      ],
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
module.exports = mongoose.model(DOCUMENT_NAME, gameSchema);
