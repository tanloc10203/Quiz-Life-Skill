"use strict";

const {
  addGuild,
  findAllGuild,
  findGuildById,
  updateGuild,
} = require("../models/repositories/guild.repository");
const { BadRequestError, NotFoundRequestError } = require("../utils/error.response");

class GuildService {
  static createGuild = async ({ image = "", skill, text = "", data = [] }) => {
    const response = await addGuild({ image, skill, text, data });

    if (!response) {
      throw new BadRequestError(`Error: Can't create Guild!`);
    }

    return response;
  };

  static updateGuild = async (id, data) => {
    const response = await updateGuild(id, data);

    if (!response) {
      throw new BadRequestError(`Error: Can't update Guild!`);
    }

    return response;
  };

  static getAll = async (filters = {}) => {
    const response = await findAllGuild(filters);
    return response;
  };

  static getById = async (id) => {
    const response = await findGuildById(id);

    if (!response) {
      throw new NotFoundRequestError(`Guild not found!`);
    }

    return response;
  };

  static deleteById = async (id) => {
    const response = await this.getById(id);

    await response.deleteOne();

    return true;
  };
}

module.exports = GuildService;
