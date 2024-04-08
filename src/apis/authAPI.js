import instance from "./axios.config";

class AuthAPI {
  constructor(prefix) {
    this._prefix = prefix;
  }

  login = async (data) => {
    const response = await instance.post(`${this._prefix}/login`, data);
    return response.metadata;
  };

  changeProfile = async (data) => {
    const response = await instance.post(`${this._prefix}/profile`, data);
    return response;
  };

  changePassword = async (data) => {
    const response = await instance.post(`${this._prefix}/password`, data);
    return response;
  };

  register = async (data) => {
    const response = await instance.post(`${this._prefix}/sign-up`, data);
    return response.metadata;
  };

  currentUser = async () => {
    const response = await instance.get(`${this._prefix}/current-user`);
    return response.metadata;
  };

  logout = async () => {
    const response = await instance.get(`${this._prefix}/sign-out`);
    return response.metadata;
  };
}

export default new AuthAPI("/auth");
