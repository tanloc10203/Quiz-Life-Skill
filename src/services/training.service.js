"use strict";

const axios = require("axios");
const CloudinaryHelper = require("../helpers/cloudinary");
const SharpHelper = require("../helpers/sharp");

const configs = {
  AI_CLIENT_ID: process.env.AI_CLIENT_ID,
  AI_SECRET_KEY: process.env.AI_SECRET_KEY,
  URL_TRAINING: process.env.URL_TRAINING,
};

class TrainingService {
  static start = async (file) => {
    const url = `${configs.URL_TRAINING}/keywords`;

    const imagePath = await SharpHelper.optimizeImage(file.path);

    // const uploadImage = await CloudinaryHelper.uploadImage(
    //   `${file.destination}/${file.filename}`,
    //   "training"
    // );

    // const params = {
    //   url: CloudinaryHelper.resultUrlImage(uploadImage),
    //   num_keywords: 10,
    // };

    const uploadImage = await CloudinaryHelper.uploadImage(imagePath, "training");

    const params = {
      url: CloudinaryHelper.resultUrlImage(uploadImage),
      num_keywords: 10,
    };

    const response = await axios.get(url, {
      params,
      auth: {
        username: configs.AI_CLIENT_ID,
        password: configs.AI_SECRET_KEY,
      },
    });

    return response?.data?.keywords?.map((t) => t?.keyword).join(" ");
  };
}

module.exports = TrainingService;
