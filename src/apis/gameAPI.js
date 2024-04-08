import instance from "./axios.config";
import BaseAxios from "./BaseAxios";

class GameAPI extends BaseAxios {
  getGameBySkillId = async (id) => {
    const response = await instance.get(`${this._prefix}/skill/${id}`);
    return response.metadata;
  };
}

export default new GameAPI("/game");
