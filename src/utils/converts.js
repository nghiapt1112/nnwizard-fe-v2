export const bytesToMegaBytes = (bytes) => bytes / (1024 * 1024);

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve({ base64: reader.result, blob: file });
    reader.onerror = (error) => reject(error);
  });

export const getImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = function (e) {
      reject(e);
    };
    img.src = url;
  });
