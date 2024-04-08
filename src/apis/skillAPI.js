import BaseAxios from "./BaseAxios";
import instance from "./axios.config";

class SkillAPI extends BaseAxios {
  imageForm = async (image) => {
    let localUri = image;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);

    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append("file", { uri: localUri, name: filename, type });

    const response = await instance.post(`${this._prefix}/image`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    return response;
  };
}

export default new SkillAPI("/skill");
