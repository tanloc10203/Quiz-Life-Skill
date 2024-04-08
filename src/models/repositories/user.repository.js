"use strict";

const userModel = require("../user.model");
const UserRoles = require("../../constants/userRole.constant");

const findUserByUsername = async (username) => {
  const response = await userModel.findOne({ username }).lean();
  return response;
};

const checkExistAdmin = async () => {
  const response = await userModel.findOne({ role: UserRoles.admin }).lean();
  return Boolean(response);
};

const addUser = async (data) => {
  const response = await userModel.create(data);
  return response;
};

const updateUser = async (id, data) => {
  const response = await userModel.findByIdAndUpdate(id, data, { new: true }).lean();
  return response;
};

const findUserById = async (userId, select = "") => {
  const response = await userModel.findById(userId).select(select);
  return response;
};

const findUsers = async () => {
  const response = await userModel.find().lean();
  return response;
};

module.exports = {
  findUserByUsername,
  checkExistAdmin,
  findUserById,
  addUser,
  findUsers,
  updateUser,
};
