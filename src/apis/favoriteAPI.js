import instance from "./axios.config";
import BaseAxios from "./BaseAxios";

class FavoriteAPI extends BaseAxios {
  post = async (data) => {
    const response = await instance.post(this._prefix, data);
    return response;
  };
}

export default new FavoriteAPI("/favorite");
