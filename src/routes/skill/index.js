"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const skillController = require("../../controllers/skill.controller");
const { upload } = require("../../utils/upload");

const router = Router();

router
  .route("/")
  .get(asyncHandler(skillController.getAllSkill))
  .post(asyncHandler(skillController.createSkill));

router
  .route("/:id")
  .patch(asyncHandler(skillController.updateSkill))
  .get(asyncHandler(skillController.getSkillById));

router.post("/image", upload.single("file"), asyncHandler(skillController.getSkillByImage));

module.exports = router;
