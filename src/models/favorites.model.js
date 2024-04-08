"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Favorite";
const COLLECTION_NAME = "Favorites";

// Declare the Schema of the Mongo model
var favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", index: true },
    skill: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Skill", index: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, favoriteSchema);
