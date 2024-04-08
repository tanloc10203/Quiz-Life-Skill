"use strict";

const GuildService = require("../services/guild.service");
const { BadRequestError } = require("../utils/error.response");
const { Created, Ok } = require("../utils/success.response");
const { mapperImageIP } = require("../utils/upload");

class GuildController {
  createGuild = async (req, res) => {
    const data = req.body;

    if (!data.image || !data.skill || !data.text || !data.data?.length) {
      throw new BadRequestError(`Missing \`image\`, \`skill\`, \`text\`, \`data\``);
    }

    return new Created({
      message: "Create Guild successfully",
      metadata: await GuildService.createGuild(data),
    }).send(res);
  };

  updateGuild = async (req, res) => {
    const data = req.body;
    const id = req.params.id;

    if (!data.image || !data.skill || !data.text || !data.data?.length) {
      throw new BadRequestError(`Missing \`image\`, \`skill\`, \`text\`, \`data\``);
    }

    return new Ok({
      message: "Update Guild successfully",
      metadata: await GuildService.updateGuild(id, data),
    }).send(res);
  };

  getAllGuild = async (req, res) => {
    const data = req.query;

    const { pagination, response } = await GuildService.getAll(data);

    return new Ok({
      message: "Get all Guild successfully",
      metadata: response?.map((item) => ({ ...item, image: mapperImageIP(item.image) })),
      options: pagination,
    }).send(res);
  };

  getGuildById = async (req, res) => {
    const id = req.params.id;

    return new Ok({
      message: "Get Guild by id successfully",
      metadata: await GuildService.getById(id),
    }).send(res);
  };

  deleteGuildId = async (req, res) => {
    const id = req.params.id;

    return new Ok({
      message: "Delete Guild successfully",
      metadata: await GuildService.deleteById(id),
    }).send(res);
  };
}

module.exports = new GuildController();
