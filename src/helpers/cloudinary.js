"use strict";

const { v2: Cloudinary } = require("cloudinary");
const { unlink } = require("../utils/upload");

Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const uploadImage = async (imagePath, folder) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    folder: folder,
    timeout: 10000,
  };

  try {
    const result = await Cloudinary.uploader.upload(imagePath, options);
    unlink(imagePath);
    return `v${result.version}/${result.public_id}.${result.format}`;
  } catch (error) {
    console.log(error);
    return "";
  }
};

// Gets details of an uploaded image
const getAssetInfo = async (publicId) => {
  // Return colors in the response
  const options = {
    colors: true,
  };

  try {
    // Get details about the asset
    const result = await Cloudinary.api.resource(publicId, options);
    console.log(result);
    return result.colors;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Creates an HTML image tag with a transformation that
 * results in a circular thumbnail crop of the image
 * focused on the faces, applying an outline of the
 * first color, and setting a background of the second color.
 * @param publicId
 * @param colors
 * @returns
 */
const createImageTag = (publicId, ...colors) => {
  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = Cloudinary.image(publicId, {
    transformation: [
      { width: 250, height: 250, gravity: "faces", crop: "thumb" },
      { radius: "max" },
      { effect: "outline:10", color: effectColor },
      { background: backgroundColor },
    ],
  });

  return imageTag;
};

/**
 * @description Xử lý trường photo và trả về version, folder, id, format
 * @param photo @description trường photo được lưu trong DB có dạng `version/folder/id.format`
 * @returns
 */
const handleImageId = (photo) => {
  /**
   * photo = version/folder/id.format
   * result => {version, folder, id, format}
   */

  const photoArray = photo.split("/");
  const publicIdArray = photoArray[2].split(".");
  return {
    version: photoArray[0],
    folder: photoArray[1],
    id: publicIdArray[0],
    format: publicIdArray[1],
  };
};

/**
 *
 * @param publicId @description Mã được trả về sau khi upload image
 * @returns
 */
const removeImageV2 = async (photo) => {
  try {
    const { folder, id } = handleImageId(photo);
    const publicId = `${folder}/${id}`;
    const result = await Cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Trả về urlImage
 * @param publicId chuỗi kết hợp `folder/id`
 * @returns
 */
const resultUrlImage = (publicId) => {
  return `${process.env.CLOUDINARY_URI}/${process.env.CLOUDINARY_NAME}/image/upload/${publicId}`;
};

const CloudinaryHelper = {
  createImageTag,
  getAssetInfo,
  uploadImage,
  handleImageId,
  removeImageV2,
  resultUrlImage,
};

module.exports = CloudinaryHelper;
