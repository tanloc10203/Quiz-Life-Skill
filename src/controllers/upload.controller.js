"use strict";

const { NotFoundRequestError } = require("../utils/error.response");
const { Ok } = require("../utils/success.response");

class UploadController {
  uploadFormLocalFile = async (req, res) => {
    const { file } = req;

    if (!file) {
      throw new NotFoundRequestError(`File not found!`);
    }

    return new Ok({
      message: "Upload form local file successfully.",
      metadata: { filename: file.filename, path: file.path, originalname: file.originalname },
    }).send(res);
  };

  uploadFormLocalFiles = async (req, res) => {
    const { files } = req;

    if (!files?.length) {
      throw new NotFoundRequestError(`Files not found!`);
    }

    return new Ok({
      message: "Upload form local files successfully.",
      metadata: Array.from(files).map((file) => ({
        filename: file.filename,
        path: file.path,
        originalname: file.originalname,
      })),
    }).send(res);
  };
}

module.exports = new UploadController();
