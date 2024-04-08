"use strict";

const guildModel = require("../guild.model");
const { parserParams } = require("../../helpers/filterData.helper");
const { findGame, findGameById, findGameByGuildId } = require("./game.repository");
const { mapperImageIP } = require("../../utils/upload");

const updateGuild = async (id, data) => {
  const response = await guildModel.findByIdAndUpdate(id, data, { new: true });
  return response;
};

const addGuild = async (data) => {
  const response = await guildModel.create(data);
  return response;
};

const findGuildById = async (GuildId) => {
  const response = await guildModel.findById(GuildId).exec();
  return response;
};

const findAllGuild = async (filters = {}) => {
  const { options, limit, page, skip, sortBy } = parserParams(filters);

  const response = await guildModel
    .find(options)
    .select("-__v")
    .limit(limit)
    .skip(skip)
    .sort(sortBy)
    .lean();

  const total = await guildModel.countDocuments(options);

  return {
    response,
    pagination: {
      page,
      limit,
      totalRows: Math.ceil(total / limit),
    },
  };
};

const findGuildAndGameBySkillId = async (skillId) => {
  const response = await guildModel.find({ skill: skillId }).lean();

  if (!response.length) return [];

  const results = await Promise.all(
    response.map(
      (item) =>
        new Promise(async (resolve, reject) => {
          try {
            const game = await findGameByGuildId(item._id);

            if (!game) return resolve({ ...item, game: null });

            resolve({
              ...item,
              image: mapperImageIP(item.image),
              game: {
                ...game,
                image: game.image ? mapperImageIP(game.image) : null,
                answers: game.answers.map((q) => ({ ...q, image: mapperImageIP(q.image) })),
              },
            });
          } catch (error) {
            reject(error);
          }
        })
    )
  );

  return results.filter((t) => t.game);
};

module.exports = {
  findGuildAndGameBySkillId,
  findGuildById,
  addGuild,
  findAllGuild,
  updateGuild,
};
