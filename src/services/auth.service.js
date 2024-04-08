"use strict";

const { createTokenPair } = require("../auth/authUtils");
const UserRoles = require("../constants/userRole.constant");
const { hashPassword, comparePassword } = require("../helpers/password.helper");
const {
  addKeyStore,
  removeKeyTokenById,
  deleteKeyStoreByUserId,
} = require("../models/repositories/keyToken.repository");
const {
  findUserByUsername,
  checkExistAdmin,
  addUser,
  findUserById,
  updateUser,
} = require("../models/repositories/user.repository");
const { getInfoData } = require("../utils/common");
const {
  ConflictRequestError,
  NotFoundRequestError,
  BadRequestError,
  ForbiddenRequestError,
} = require("../utils/error.response");
const crypto = require("node:crypto");

class AuthService {
  static signUp = async ({ displayName, username, password }) => {
    // 1: Kiểm tra username có trùng không và check có tài khoản admin chưa

    const [usernameExist, adminExist] = await Promise.all([
      findUserByUsername(username),
      checkExistAdmin(),
    ]);

    if (usernameExist) {
      throw new ConflictRequestError("Username is exist");
    }

    // 2: Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const response = await addUser({
      displayName,
      username,
      password: passwordHash,
      role: adminExist ? UserRoles.client : UserRoles.admin,
    });

    return getInfoData(["_id", "displayName", "username"], response);
  };

  static login = async ({ username, password }) => {
    // 1: Get user by username
    const userHolder = await findUserByUsername(username);

    if (!userHolder) {
      throw new NotFoundRequestError("Username not found !");
    }

    // 2: Check password
    const checkPassword = await comparePassword(password, userHolder.password);

    if (!checkPassword) {
      throw new BadRequestError("Wrong Password!");
    }

    // 3. Generate token { accessToken, refreshToken }
    const tokens = await AuthService.generateKeyPairSync(userHolder);

    return {
      tokens,
      userId: userHolder._id,
    };
  };

  static refreshToken = async ({ refreshToken, user, keyStore }) => {
    const { userId, username } = user;

    // If Gửi token cũ lên nằm trong token đã sử dụng thì xóa
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await deleteKeyStoreByUserId(userId);
      throw new ForbiddenRequestError("Something wrong happened! Pls regin...");
    }

    if (keyStore.refreshToken !== refreshToken) {
      throw new ForbiddenRequestError("User not registered...");
    }

    const foundUser = await findUserByUsername(username);

    if (!foundUser) {
      throw new NotFoundRequestError("User not found...");
    }

    const tokens = createTokenPair(
      {
        userId,
        username,
      },
      keyStore.publicKey,
      keyStore.privateKey
    );

    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokensUsed: refreshToken,
      },
    });

    return {
      userId: foundUser._id,
      tokens,
    };
  };

  static logout = async (keyStore) => {
    return await removeKeyTokenById(keyStore._id);
  };

  static getCurrentUserSignIn = async (userId) => {
    return await findUserById(userId, "-password");
  };

  static generateKeyPairSync = async (user) => {
    // Generate secure accessToken (publicKey), refreshToken (privateKey)
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    // Generate accessToken, refreshToken
    const tokens = createTokenPair(
      {
        userId: user._id,
        username: user.username,
      },
      publicKey,
      privateKey
    );

    // Save tokens
    await addKeyStore({
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
      userId: user._id,
    });

    return tokens;
  };

  static changeProfile = async (id, { image = "", displayName, email = "" }) => {
    const updated = await updateUser(id, { image, displayName, email });

    if (!updated) {
      throw new NotFoundRequestError(`User not found`);
    }

    const { password, ...others } = updated;

    return others;
  };

  static changePassword = async (id, { passwordOld, passwordNew }) => {
    const userHolder = await findUserById(id);

    if (!userHolder) {
      throw new NotFoundRequestError(`User not found`);
    }

    // 2: Check password
    const checkPassword = await comparePassword(passwordOld, userHolder.password);

    if (!checkPassword) {
      throw new BadRequestError("Wrong Password Old!");
    }

    // 2: Hash password
    const passwordHash = await hashPassword(passwordNew);

    const updated = await updateUser(id, { password: passwordHash });

    if (!updated) {
      throw new NotFoundRequestError(`User not found`);
    }

    return true;
  };
}

module.exports = AuthService;
