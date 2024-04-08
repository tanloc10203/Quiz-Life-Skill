"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const guildController = require("../../controllers/guild.controller");

const router = Router();

router
  .route("/")
  .get(asyncHandler(guildController.getAllGuild))
  .post(asyncHandler(guildController.createGuild));

router
  .route("/:id")
  .get(asyncHandler(guildController.getGuildById))
  .patch(asyncHandler(guildController.updateGuild))
  .delete(asyncHandler(guildController.deleteGuildId));

module.exports = router;
