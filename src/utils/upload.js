"use strict";

const multer = require("multer");
const fs = require("fs");
const NetworkHelper = require("../helpers/network.helper");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dirUpload = "src/assets/upload/";
    if (!fs.existsSync(dirUpload)) {
      fs.mkdirSync(dirUpload, { recursive: true });
    }
    cb(null, dirUpload);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".");
    const newExt = ext[ext.length - 1];
    cb(null, `${Date.now()}.${newExt}`);
  },
});

const upload = multer({ storage: storage });

const unlink = (filename, path = "") => {
  const pathImageRemove = !path ? "src\\assets\\upload\\" + filename : filename;

  if (!fs.existsSync(pathImageRemove)) {
    return;
  }

  fs.unlinkSync(pathImageRemove);
};

const mapperImage = (image) => `http://localhost:${process.env.PORT}/${image}`;

const mapperImageIP = (image) => NetworkHelper.serverUrlIP(image);

module.exports = {
  upload,
  unlink,
  mapperImage,
  mapperImageIP,
};
