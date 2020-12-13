import axios from 'axios';

export const S3Service = {
  upload,
};

function upload(preSignedURL, file) {
  axios
    .put(preSignedURL, file, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}
