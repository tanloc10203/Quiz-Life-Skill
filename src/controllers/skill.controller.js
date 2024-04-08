"use strict";

const { BadRequestError } = require("../utils/error.response");
const { Created, Ok } = require("../utils/success.response");
const SkillService = require("../services/skill.service");
const TrainingService = require("../services/training.service");
const { isEmpty } = require("lodash");

class SkillController {
  createSkill = async (req, res) => {
    const data = req.body;

    if (
      !data.name ||
      !data.description ||
      !data.category ||
      !data.disclosure ||
      !data.caution ||
      !data.images?.length ||
      !data.thumbNail
    ) {
      throw new BadRequestError(
        `Missing \`name\`, \`description\`, \`category\`, \`disclosure\`, \`caution\`, \`images\`, \`thumbNail\``
      );
    }

    return new Created({
      message: "Create skill successfully",
      metadata: await SkillService.createSkill(data),
    }).send(res);
  };

  updateSkill = async (req, res) => {
    const data = req.body;
    const skillId = req.params.id;

    if (isEmpty(data)) {
      throw new BadRequestError(`Body is empty`);
    }

    if (
      data?.name === "" ||
      data?.description === "" ||
      data?.category === "" ||
      data?.disclosure === "" ||
      data?.caution === ""
    ) {
      throw new BadRequestError(
        `Empty \`name\` or \`description\` or \`category\` or \`disclosure\` or \`caution\``
      );
    }

    return new Ok({
      message: "Update skill successfully",
      metadata: await SkillService.updateSkill(skillId, data),
    }).send(res);
  };

  getAllSkill = async (req, res) => {
    const data = req.query;

    const response = await SkillService.getAllSkill(data);

    return new Ok({
      message: "Get all skill successfully",
      metadata: response,
      options: {},
    }).send(res);
  };

  getSkillById = async (req, res) => {
    const id = req.params.id;

    const response = await SkillService.getSkillById(id);

    return new Ok({
      message: "Get a skill successfully",
      metadata: response,
    }).send(res);
  };

  getSkillByImage = async (req, res) => {
    const { file } = req;

    if (!file) {
      throw new BadRequestError(`File not found!`);
    }

    const response = await TrainingService.start(file);

    const results = await SkillService.findSkillByKeywords(response);

    return new Ok({
      message: "Get skill by image successfully",
      metadata: { results, keywords: response },
    }).send(res);
  };
}

module.exports = new SkillController();
