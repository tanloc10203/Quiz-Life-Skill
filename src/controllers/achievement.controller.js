"use strict";

const AchievementService = require("../services/achievement.service");
const { BadRequestError } = require("../utils/error.response");
const { Created, Ok } = require("../utils/success.response");

class AchievementController {
  createAchievement = async (req, res) => {
    const data = req.body;

    if (!data.user || !data.results.length || !data.skill) {
      throw new BadRequestError(`Missing \`name\`, \`results\`, \`skill\``);
    }

    return new Created({
      message: "Create Achievement successfully",
      metadata: await AchievementService.createAchievement(data),
    }).send(res);
  };

  getAllAchievement = async (req, res) => {
    const data = req.query;

    const response = await AchievementService.getAll(data);

    return new Ok({
      message: "Get all Achievement successfully",
      metadata: response,
    }).send(res);
  };
}

module.exports = new AchievementController();
