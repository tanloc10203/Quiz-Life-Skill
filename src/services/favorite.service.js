"use strict";

const {
  createFavorite,
  findFavorite,
  findFavoriteById,
  findFavoriteByUserIdAndSkillId,
} = require("../models/repositories/favorite.repository");
const { BadRequestError, NotFoundRequestError } = require("../utils/error.response");

class FavoriteService {
  static addFavorite = async ({ userId, skillId }) => {
    const favoriteExist = await findFavoriteByUserIdAndSkillId(userId, skillId);

    if (favoriteExist) {
      await favoriteExist.deleteOne();
      return "Remove favorite success.";
    }

    const response = await createFavorite({
      user: userId,
      skill: skillId,
    });

    if (!response) {
      throw new BadRequestError(`Add favorite error!`);
    }

    return "Add favorite success.";
  };

  static getAll = async (filters = {}) => {
    const response = await findFavorite(filters?.userId);
    return response;
  };

  static getById = async (id) => {
    const response = await findFavoriteById(id);

    if (!response) {
      throw new NotFoundRequestError(`Favorite not found!`);
    }

    return response;
  };
}

module.exports = FavoriteService;
