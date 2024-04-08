"use strict";

const achievementModel = require("../achievement.model");

const addAchievement = async (data) => {
  const response = await achievementModel.create(data);
  return response;
};

const findAchievement = async (userId = "") => {
  const response = await achievementModel
    .find(userId ? { user: userId } : {})
    .populate("user", "_id displayName")
    .populate("skill", "_id name")
    .sort({ createdAt: "desc" })
    .lean();

  return response;
};

module.exports = {
  addAchievement,
  findAchievement,
};
