"use strict";

const {
  findGameByGuild,
  createGame,
  findGame,
  findGameById,
  updateGame,
} = require("../models/repositories/game.repository");
const { findSkillById } = require("../models/repositories/skill.repository");
const { findGuildAndGameBySkillId } = require("../models/repositories/guild.repository");
const {
  ConflictRequestError,
  BadRequestError,
  NotFoundRequestError,
} = require("../utils/error.response");
const { mapperImageIP } = require("../utils/upload");

class GameService {
  static createGame = async ({
    question,
    guildId,
    description = "",
    image = "",
    texts = [],
    answers,
  }) => {
    const GameExist = await findGameByGuild(guildId);

    if (GameExist) {
      throw new ConflictRequestError(`Game was exist!`);
    }

    const response = await createGame({
      question,
      guild: guildId,
      description,
      image,
      texts,
      answers,
    });

    if (!response) {
      throw new BadRequestError(`Error: Can't create game`);
    }

    return response;
  };

  static updateGame = async (id, data) => {
    const { guild } = data;
    // const GameExist = await findGameByGuild(guild);

    // if (GameExist && GameExist._id.toString() !== id) {
    //   throw new ConflictRequestError(`Game was exist!`);
    // }

    const response = await updateGame(id, data);

    if (!response) {
      throw new BadRequestError(`Error: Can't update game`);
    }

    return response;
  };

  static getAll = async (filters = {}) => {
    const response = await findGame();
    return response;
  };

  static getById = async (id) => {
    const response = await findGameById(id);

    if (!response) {
      throw new NotFoundRequestError(`Game not found!`);
    }

    return response;
  };

  static getGameBySkillId = async (skillId) => {
    let skill = await findSkillById(skillId);

    if (!skill) return null;

    skill = {
      ...skill,
      thumbNail: mapperImageIP(skill.thumbNail),
      images: skill.images.map((i) => mapperImageIP(i)),
    };

    const guilds = await findGuildAndGameBySkillId(skill._id);

    return { ...skill, guilds };
  };
}

module.exports = GameService;
