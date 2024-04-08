import axios from "axios";
import { store } from "~/app/store";
import { authActions } from "~/features/auth/authSlice";
import { BASE_URL } from "~/helpers/host.helper";

const instance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
});

const ROUTE_REFRESH_TOKEN = "/auth/refresh-token";

let errorCount = 0;

instance.interceptors.request.use(
  async (config) => {
    const { accessToken, userId } = store.getState().auth;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (userId) {
      config.headers["x-client-id"] = userId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    errorCount++;

    console.log(`error AxiosError`, error);

    if (response) {
      const { status, data } = response;

      console.log("====================================");
      console.log(`url`, config?.url);
      console.log("====================================");

      if (errorCount >= 3) {
        errorCount = 0;
        return Promise.reject(error);
      }

      if (status === 403 && config?.url === ROUTE_REFRESH_TOKEN) {
        console.log(`error axios config refreshToken`, JSON.stringify(data, null, 4));

        store.dispatch(authActions.reset(response.metadata));

        return Promise.reject(error);
      }

      if (status === 401 && data) {
        const { refreshToken, userId } = store.getState().auth;

        const { code, message } = data;

        console.log(`message ${message}`);

        if (message === "invalid signature") {
          // Handle Logout
          store.dispatch(authActions.reset(response.metadata));

          await instance.post("/auth/sign-out", null, {
            headers: {
              "x-client-id": userId,
            },
          });

          errorCount = 0;

          return;
        }

        if (message === "jwt expired") {
          try {
            const { metadata } = await instance.post("/auth/refresh-token", null, {
              headers: {
                "x-client-id": userId,
                "refresh-token": refreshToken,
              },
            });

            console.log(metadata);

            store.dispatch(authActions.loginSuccess(metadata));

            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${metadata.tokens.accessToken}`;
            instance.defaults.headers.common["x-client-id"] = userId;
            instance.defaults.headers.common["refresh-token"] = metadata.tokens.refreshToken;

            return instance(config);
          } catch (error) {
          } finally {
            errorCount = 0;
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
