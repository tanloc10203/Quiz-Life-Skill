"use strict";

const {
  findSkillByNameAndCategory,
  addSkill,
  findAllSkill,
  updateSkill,
  findSkillById,
} = require("../models/repositories/skill.repository");
const { findGuildAndGameBySkillId } = require("../models/repositories/guild.repository");
const {
  ConflictRequestError,
  BadRequestError,
  NotFoundRequestError,
} = require("../utils/error.response");
const removeVietnameseTones = require("../helpers/convertText.helper");
const { mapperImageIP, unlink } = require("../utils/upload");
const { filterEmptyValues } = require("../utils/common");

class SkillService {
  static createSkill = async ({
    name,
    description,
    images,
    category,
    thumbNail,
    disclosure,
    caution,
  }) => {
    // Check 1: name and category exist
    const response = await findSkillByNameAndCategory(category, name);

    if (response) {
      throw new ConflictRequestError(`Skill was exist in category skill`);
    }

    const data = {
      name,
      description,
      nameConvert: removeVietnameseTones(name),
      descriptionConvert: removeVietnameseTones(description),
      images,
      thumbNail,
      category,
      disclosure,
      caution,
    };

    const created = await addSkill(data);

    if (!created) {
      throw new BadRequestError(`Error! Can't create skill!`);
    }

    return created;
  };

  static updateSkill = async (skillId, payload) => {
    const { name, description, category, disclosure, caution } = payload;

    // Check 1: name and category exist
    const [response, skill] = await Promise.all([
      findSkillByNameAndCategory(category, name),
      findSkillById(skillId),
    ]);

    if (!skill) {
      throw new NotFoundRequestError(`Skill not found!`);
    }

    if (response && response._id.toString() !== skillId) {
      throw new ConflictRequestError(`Skill was exist in category skill`);
    }

    let data = {
      name,
      description,
      nameConvert: removeVietnameseTones(name) ?? "",
      descriptionConvert: removeVietnameseTones(description) ?? "",
      category,
      disclosure,
      caution,
    };

    // If exit new images then remove all image old
    if (payload.images && Array.isArray(payload.images)) {
      if (skill.images.length) {
        skill.images.forEach((image) => unlink(image));
      }

      data.images = payload.images;
    }

    if (payload.thumbNail) {
      unlink(skill.thumbNail);
      data.thumbNail = payload.thumbNail;
    }

    data = filterEmptyValues(data);

    const updated = await updateSkill(skillId, data);

    if (!updated) {
      throw new BadRequestError(`Error! Can't update skill!`);
    }

    return updated;
  };

  static getAllSkill = async (filters = {}) => {
    const response = await findAllSkill(filters);

    if (!response.length) return [];

    return response.map((t) => ({
      ...t,
      thumbNail: mapperImageIP(t.thumbNail),
      images: t.images.map((i) => mapperImageIP(i)),
    }));
  };

  static getSkillById = async (id) => {
    const response = await findSkillById(id);

    if (!response) throw new NotFoundRequestError(`Get Skill By Id Not Found!`);

    return response;
  };

  static findSkillByKeywords = async (keywords) => {
    const response = await findAllSkill({ isKeywords: true, name: keywords });
    return response.map((t) => ({
      ...t,
      thumbNail: mapperImageIP(t.thumbNail),
      images: t.images.map((i) => mapperImageIP(i)),
    }));
  };
}

module.exports = SkillService;
