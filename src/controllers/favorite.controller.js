"use strict";

const FavoriteService = require("../services/favorite.service");
const { BadRequestError } = require("../utils/error.response");
const { Created, Ok } = require("../utils/success.response");
const { mapperImageIP } = require("../utils/upload");

class FavoriteController {
  addFavorite = async (req, res) => {
    const data = req.body;

    if (!data.userId || !data.skillId) {
      throw new BadRequestError(`Missing \`userId\` or \`skillId\``);
    }

    const response = await FavoriteService.addFavorite(data);

    return new Created({
      message: response,
      metadata: true,
    }).send(res);
  };

  getAllFavorite = async (req, res) => {
    const data = req.query;

    const response = await FavoriteService.getAll(data);

    return new Ok({
      message: "Get all favorite successfully",
      metadata: response.map((t) => ({
        ...t,
        skill: {
          ...t.skill,
          thumbNail: mapperImageIP(t.skill.thumbNail),
          images: t.skill.images.map((i) => mapperImageIP(i)),
        },
      })),
    }).send(res);
  };

  getFavoriteById = async (req, res) => {
    const id = req.params.id;

    return new Ok({
      message: "Get favorite by id successfully",
      metadata: await FavoriteService.getById(id),
    }).send(res);
  };
}

module.exports = new FavoriteController();
