"use strict";

const { Router } = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const categoryController = require("../../controllers/category.controller");
const { Ok } = require("../../utils/success.response");
const { findUsers } = require("../../models/repositories/user.repository");

const router = Router();

router
  .route("/")
  .get(
    asyncHandler(async (req, res) => {
      return new Ok({ message: "Get users  success", metadata: await findUsers() }).send(res);
    })
  )
  .post(asyncHandler(categoryController.createCategory));

router
  .route("/:id")
  .get(asyncHandler(categoryController.getCategoryById))
  .patch(asyncHandler(categoryController.updateCategory))
  .delete(asyncHandler(categoryController.deleteCategoryId));

module.exports = router;
