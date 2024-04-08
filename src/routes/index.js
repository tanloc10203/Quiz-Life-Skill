"use strict";

const { Router } = require("express");

const router = Router();

router.use("/api/v1/auth", require("./auth"));
router.use("/api/v1/user", require("./user"));
router.use("/api/v1/category", require("./category"));
router.use("/api/v1/skill", require("./skill"));
router.use("/api/v1/guild", require("./guild"));
router.use("/api/v1/game", require("./game"));
router.use("/api/v1/upload", require("./upload"));
router.use("/api/v1/achievement", require("./achievement"));
router.use("/api/v1/favorite", require("./favorite"));

module.exports = router;
