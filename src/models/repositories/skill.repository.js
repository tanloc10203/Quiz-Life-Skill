"use strict";

const removeVietnameseTones = require("../../helpers/convertText.helper");
const skillModel = require("../skill.model");
const gameModel = require("../game.model");
const { getInfoData } = require("../../utils/common");
const { mapperImageIP } = require("../../utils/upload");

const addSkill = async (data) => {
  const response = await skillModel.create(data);
  return response;
};

const updateSkill = async (id, data) => {
  const response = await skillModel.findByIdAndUpdate(id, data, { new: true });
  return response;
};

const findSkillByNameAndCategory = async (category, name) => {
  const response = await skillModel
    .findOne({
      category,
      nameConvert: { $regex: removeVietnameseTones(name), $options: "i" },
    })
    .exec();
  return response;
};

const findSkillById = async (skillId) => {
  const response = await skillModel.findById(skillId).lean();
  return response;
};

const findAllSkill = async (filters = {}) => {
  let conditions = {};

  if (filters.name) {
    const length = String(filters.name).split(" ").length;

    (conditions = {
      ...conditions,
      $text: {
        $search: filters?.isKeywords
          ? removeVietnameseTones(filters.name)
          : length >= 4
          ? `\"${removeVietnameseTones(filters.name)}\"`
          : removeVietnameseTones(filters.name),
      },
    }),
      { score: { $meta: "textScore" } };
  }

  const response = await skillModel.find(conditions).populate("category").sort().lean();

  return response;
};

const findGames = async () => {
  const response = await skillModel.find().lean();

  if (!response.length) return [];

  const result = await Promise.all(
    response.map(
      (item) =>
        new Promise(async (resolve, reject) => {
          try {
            const games = await gameModel.find({ skill: item._id.toString() }).lean();

            if (!games.length) return resolve({ ...item, games: [] });

            resolve({
              ...item,
              games: games.map((t) => ({
                ...t,
                image: t.image ? mapperImageIP(t.image) : null,
                answers: t.answers.map((a) => ({
                  ...a,
                  image: a.image ? mapperImageIP(a.image) : null,
                })),
              })),
            });
          } catch (error) {
            reject(error);
          }
        })
    )
  );

  return result
    .filter((t) => t.games.length)
    .map((t) =>
      getInfoData(
        ["_id", "name", "description", "images", "thumbNail", "disclosure", "caution", "games"],
        t
      )
    )
    .map((item) => ({
      ...item,
      thumbNail: item.thumbNail ? mapperImageIP(item.thumbNail) : "",
      images: item.images.length ? item.images.map((t) => mapperImageIP(t)) : [],
    }));
};

const findGameBySkillId = async (skillId) => {
  const [skill, games] = await Promise.all([
    skillModel.findById(skillId).lean(),
    gameModel.find({ skill: skillId }).lean(),
  ]);

  if (!skill || !games.length) return null;

  const result = getInfoData(
    ["_id", "name", "description", "images", "thumbNail", "disclosure", "caution"],
    skill
  );

  const resultGame = games.map((t) => ({
    ...t,
    image: t.image ? mapperImageIP(t.image) : null,
    answers: t.answers.map((a) => ({
      ...a,
      image: a.image ? mapperImageIP(a.image) : null,
    })),
  }));

  return {
    ...result,
    thumbNail: result.thumbNail ? mapperImageIP(result.thumbNail) : "",
    images: result.images.length ? result.images.map((t) => mapperImageIP(t)) : [],
    games: resultGame,
  };
};

module.exports = {
  addSkill,
  findSkillByNameAndCategory,
  findAllSkill,
  updateSkill,
  findSkillById,
  findGames,
  findGameBySkillId,
};
