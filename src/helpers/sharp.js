"use strict";

const sharp = require("sharp");
const fs = require("fs").promises;
const path = require("path");

// Thiết lập các tùy chọn tối ưu hóa
const optionsConfig = {
  quality: 80, // Chất lượng hình ảnh (0 - 100)
  chromaSubsampling: "4:4:4", // Số lượng mẫu màu sắc
};

// Hàm tạo đường dẫn ngẫu nhiên cho file
function generateRandomOutputPath(outputDir, extension) {
  const randomString = Math.random().toString(36).substring(7); // Tạo chuỗi ngẫu nhiên
  return path.join(outputDir, `${randomString}${extension}`); // Kết hợp với thư mục đầu ra và phần mở rộng
}

async function optimizeImage(inputImagePath, options = optionsConfig) {
  try {
    // Đọc ảnh từ đường dẫn đến ảnh gốc
    const inputImageBuffer = await fs.readFile(inputImagePath);

    // Tạo đường dẫn đầu ra ngẫu nhiên cho file
    const extension = path.extname(inputImagePath).toLowerCase(); // Lấy phần mở rộng của ảnh gốc
    const outputImagePath = generateRandomOutputPath("src/assets/upload/", extension);

    // Giảm chất lượng và dung lượng của ảnh
    const optimizedImageBuffer = await sharp(inputImageBuffer)
      .resize(400, 400)
      .jpeg(options) // Chỉ áp dụng cho định dạng JPEG
      .toBuffer();

    // Lưu ảnh đã tối ưu hóa vào đường dẫn đích
    await fs.writeFile(outputImagePath, optimizedImageBuffer);

    console.log("Optimization complete");
    return outputImagePath;
  } catch (error) {
    console.error("Error optimizing image:", error);
  }
}

const SharpHelper = {
  optimizeImage,
};

module.exports = SharpHelper;
