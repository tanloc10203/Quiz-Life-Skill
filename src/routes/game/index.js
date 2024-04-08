"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const gameController = require("../../controllers/game.controller");

const router = Router();

router
  .route("/")
  .get(asyncHandler(gameController.getAllGame))
  .post(asyncHandler(gameController.createGame));

router
  .route("/:id")
  .get(asyncHandler(gameController.getGameById))
  .patch(asyncHandler(gameController.updateGame));

router.get("/skill/:skillId", asyncHandler(gameController.getGameBySkillId));

module.exports = router;
