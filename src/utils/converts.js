import dcraw from 'dcraw';

export const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
};

export const bytesToMegaBytes = (bytes) => bytes / (1024 * 1024);
export const FILES_NEED_CONVERT = ['NEF', 'RAF', 'DNG', 'CRW', 'CR2', 'ARW'];

export const getFileExtension = (filename) => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
};

export const toBase64 = (file) => {
  const fileExtend = getFileExtension(file.name);
  const needConvert =
    fileExtend && FILES_NEED_CONVERT.includes(fileExtend.toUpperCase());
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if (needConvert) {
      reader.readAsArrayBuffer(file);
      reader.onload = (o) => {
        const buf = new Uint8Array(o.currentTarget.result);
        const thumbnail = dcraw(buf, { extractThumbnail: true });
        const blob = new Blob([thumbnail], { type: 'image/png' });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        const metadata = dcraw(buf, { verbose: true, identify: true })
          .split('\n')
          .filter(String);
        resolve({
          base64: imageUrl,
          blob: file,
          thumbnailFile: blobToFile(blob, `thumbnail.png`),
          metaData: metadata,
        });
      };
    } else {
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ base64: reader.result, blob: file });
      };
    }
    reader.onerror = (error) => reject(error);
  });
};

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

export const blobToFile = (theBlob, fileName) => {
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};
