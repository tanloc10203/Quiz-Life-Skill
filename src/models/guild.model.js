"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Guild";
const COLLECTION_NAME = "Guilds";

// Declare the Schema of the Mongo model
var guildSchema = new mongoose.Schema(
  {
    image: String,
    skill: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Skill" },
    text: { type: String, required: true },
    data: { type: [{ text: String }], default: [] },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, guildSchema);
