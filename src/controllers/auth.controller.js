"use strict";

const AuthService = require("../services/auth.service");
const { validateObjectId } = require("../utils/common");
const { BadRequestError } = require("../utils/error.response");
const { Created, Ok } = require("../utils/success.response");

class AuthController {
  signUp = async (req, res) => {
    const body = req.body;

    if (!body.displayName || !body.password || !body.username) {
      throw new BadRequestError("Missing `displayName`, `password`, `username`");
    }

    const response = await AuthService.signUp({
      displayName: body.displayName,
      password: body.password,
      username: body.username,
    });

    return new Created({
      message: "Register success.",
      metadata: response,
    }).send(res);
  };

  signIn = async (req, res) => {
    const body = req.body;

    if (!body.password || !body.username) {
      throw new BadRequestError("Missing body `username`, `password`");
    }

    const response = await AuthService.login({
      password: body.password,
      username: body.username,
    });

    return new Ok({
      message: "Login success.",
      metadata: response,
    }).send(res);
  };

  refreshToken = async (req, res) => {
    const response = await AuthService.refreshToken({
      refreshToken: req.refreshToken,
      user: req.user,
      keyStore: req.keyStore,
    });

    return new Ok({
      message: "RefreshToken success.",
      metadata: response,
    }).send(res);
  };

  logout = async (req, res) => {
    const response = await AuthService.logout(req.keyStore);

    return new Ok({
      message: "Logout success.",
      metadata: response,
    }).send(res);
  };

  getCurrentUserSignIn = async (req, res) => {
    const keyStore = req.keyStore;

    validateObjectId({
      id: keyStore.user,
      message: `\`_id\` = ${keyStore.user} Invalid`,
    });

    const response = await AuthService.getCurrentUserSignIn(keyStore.user);

    return new Ok({
      message: "Get Current User Sign In Success.",
      metadata: response,
    }).send(res);
  };

  changeProfile = async (req, res) => {
    const keyStore = req.keyStore;
    const userId = keyStore.user;
    const data = req.body;

    if (!data.displayName) {
      throw new BadRequestError("Missing `displayName`");
    }

    validateObjectId({
      id: userId,
      message: `\`_id\` = ${userId} Invalid`,
    });

    const response = await AuthService.changeProfile(userId, data);

    return new Ok({
      message: "Update Profile Success.",
      metadata: response,
    }).send(res);
  };

  changePassword = async (req, res) => {
    const keyStore = req.keyStore;
    const userId = keyStore.user;
    const data = req.body;

    if (!data.passwordOld || !data.passwordNew) {
      throw new BadRequestError("Missing `passwordOld`, `passwordNew`");
    }

    validateObjectId({
      id: userId,
      message: `\`_id\` = ${userId} Invalid`,
    });

    const response = await AuthService.changePassword(userId, data);

    return new Ok({
      message: "Change Password Success.",
      metadata: response,
    }).send(res);
  };
}

module.exports = new AuthController();
