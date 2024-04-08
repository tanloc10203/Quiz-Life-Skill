"use strict";

const favoriteModel = require("../favorites.model");

const findFavoriteByUserIdAndSkillId = async (userId, skillId) => {
  const response = await favoriteModel.findOne({ user: userId, skill: skillId });
  return response;
};

const createFavorite = async (data) => {
  const created = await favoriteModel.create(data);
  return created;
};

const findFavoriteById = async (id) => {
  const response = await favoriteModel.findById(id);
  return response;
};

const findFavorite = async (userId = "") => {
  let conditions = {};

  if (userId) conditions = { user: userId };

  const response = await favoriteModel.find(conditions).populate("skill").lean();

  return response;
};

module.exports = {
  findFavoriteByUserIdAndSkillId,
  createFavorite,
  findFavoriteById,
  findFavorite,
};
