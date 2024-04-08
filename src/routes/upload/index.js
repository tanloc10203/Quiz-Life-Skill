"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const uploadController = require("../../controllers/upload.controller");
const { upload } = require("../../utils/upload");

const router = Router();

router.post("/file", upload.single("file"), asyncHandler(uploadController.uploadFormLocalFile));
router.post("/files", upload.array("files"), asyncHandler(uploadController.uploadFormLocalFiles));

module.exports = router;
