import Constants from "expo-constants";
import env from "~/configs/env";
const { manifest2, linkingUri } = Constants;

const v1 = manifest2?.extra?.expoClient?.hostUri
  ?.split(":")
  ?.shift()
  ?.concat(`:${env.SERVER_PORT}`);

const v2 = linkingUri?.split(":")[1] + `:${env.SERVER_PORT}`;

export const HOST = v1 || v2;

export const BASE_URL = `http://${HOST}`;

console.log(`BASE_URL :: ${BASE_URL}`);
