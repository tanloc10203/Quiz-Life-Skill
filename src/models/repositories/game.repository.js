"use strict";

const gameModel = require("../game.model");

const findGameByGuild = async (guildId) => {
  const response = await gameModel.findOne({ guild: guildId }).lean();
  return response;
};

const createGame = async (data) => {
  const created = await gameModel.create(data);
  return created;
};

const updateGame = async (id, data) => {
  const updated = await gameModel.findByIdAndUpdate(id, data, { new: true });
  return updated;
};

const findGameById = async (id) => {
  const response = await gameModel.findById(id).lean();
  return response;
};

const findGameByGuildId = async (id) => {
  const response = await gameModel.findOne({ guild: id }).lean();
  return response;
};

const findGame = async (guildId = "") => {
  let condition = {};

  if (guildId) condition = { guild: guildId };

  const response = await gameModel.find(condition).lean();

  return response;
};

module.exports = {
  findGameByGuild,
  createGame,
  updateGame,
  findGameById,
  findGame,
  findGameByGuildId,
};
