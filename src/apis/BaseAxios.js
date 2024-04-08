import instance from "./axios.config";

class BaseAxios {
  constructor(prefix) {
    this._prefix = prefix;
  }

  post = async (data) => {
    const response = await instance.post(this._prefix, data);
    return response.metadata;
  };

  patch = async (id, data) => {
    const response = await instance.patch(`${this._prefix}/${id}`, data);
    return response.metadata;
  };

  get = async (filters = {}) => {
    const response = await instance.get(this._prefix, {
      params: filters,
    });
    return response;
  };

  getById = async (id) => {
    const response = await instance.get(`${this._prefix}/${id}`);
    return response.metadata;
  };
}

export default BaseAxios;
