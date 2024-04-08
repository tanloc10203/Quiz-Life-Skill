"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const favoriteController = require("../../controllers/favorite.controller");

const router = Router();

router
  .route("/")
  .get(asyncHandler(favoriteController.getAllFavorite))
  .post(asyncHandler(favoriteController.addFavorite));

router.get("/:id", asyncHandler(favoriteController.getFavoriteById));

module.exports = router;
