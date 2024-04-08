"use strict";

const {
  addAchievement,
  findAchievement,
} = require("../models/repositories/achievement.repository");
const { InternalServerRequestError } = require("../utils/error.response");

class AchievementService {
  static createAchievement = async (data) => {
    const added = await addAchievement(data);

    if (!added) {
      throw new InternalServerRequestError(`Error! Can't create achievement.`);
    }

    return added;
  };

  static getAll = async ({ userId }) => {
    const response = await findAchievement(userId);
    return response;
  };
}

module.exports = AchievementService;
