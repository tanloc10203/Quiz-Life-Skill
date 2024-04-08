"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const achievementController = require("../../controllers/achievement.controller");

const router = Router();

router
  .route("/")
  .get(asyncHandler(achievementController.getAllAchievement))
  .post(asyncHandler(achievementController.createAchievement));

module.exports = router;
