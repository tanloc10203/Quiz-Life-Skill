"use strict";

const _ = require("lodash");
const { Types } = require("mongoose");
const { BadRequestError } = require("./error.response");

const getInfoData = (fields = [], object = {}) => {
  return _.pick(object, fields);
};

const validateObjectId = ({ id, message = "Id Invalid" }) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestError(message);
  }
};

function filterEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key, value]) => value !== "" && value !== null && value !== undefined
    )
  );
}

module.exports = {
  getInfoData,
  validateObjectId,
  filterEmptyValues,
};
