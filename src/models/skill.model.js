"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Skill";
const COLLECTION_NAME = "Skills";

// Declare the Schema of the Mongo model
var skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    nameConvert: { type: String, default: "" },
    description: { type: String },
    descriptionConvert: { type: String, default: "" },
    images: { type: Array, default: [] },
    thumbNail: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    disclosure: { type: String, required: true },
    caution: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
    versionKey: false,
  }
);

// create index full text column nameEn and descriptionEn
skillSchema.index({
  nameConvert: "text",
  descriptionConvert: "text",
  disclosure: "text",
  caution: "text",
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, skillSchema);
