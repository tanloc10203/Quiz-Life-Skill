"use strict";

const GameService = require("../services/game.service");
const { BadRequestError } = require("../utils/error.response");
const { Created, Ok } = require("../utils/success.response");

class GameController {
  createGame = async (req, res) => {
    const data = req.body;

    if (!data.guildId || !data.answers) {
      throw new BadRequestError(`Missing \`guildId\`, \`answers\``);
    }

    return new Created({
      message: "Create Game successfully",
      metadata: await GameService.createGame(data),
    }).send(res);
  };

  updateGame = async (req, res) => {
    let data = req.body;
    const id = req.params.id;

    if (!data.guildId || !data.answers) {
      throw new BadRequestError(`Missing \`guildId\`, \`answers\``);
    }

    data = { ...data, guild: data.guildId };

    delete data.guildId;

    return new Ok({
      message: "Update Game successfully",
      metadata: await GameService.updateGame(id, data),
    }).send(res);
  };

  getAllGame = async (req, res) => {
    const data = req.query;

    const response = await GameService.getAll(data);

    return new Ok({
      message: "Get all Game successfully",
      metadata: response,
      options: {},
    }).send(res);
  };

  getGameById = async (req, res) => {
    const id = req.params.id;

    return new Ok({
      message: "Get Game by id successfully",
      metadata: await GameService.getById(id),
    }).send(res);
  };

  getGameBySkillId = async (req, res) => {
    const id = req.params.skillId;

    return new Ok({
      message: "Get Game by skillId successfully",
      metadata: await GameService.getGameBySkillId(id),
    }).send(res);
  };
}

module.exports = new GameController();
