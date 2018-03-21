import * as axios from 'axios';
import { imageUploadUrl, imgUrlConfig } from '../config';

const uploadImage = (imageData) => {
  const config = {
    url: imageUploadUrl,
    method: 'post',
    data: imageData,
    headers: {
      Authorization: imgUrlConfig.authorization,
    },
  };
  return axios(config)// get data
    .then(x => x.data)
    .then((x) => {
      const result = {
        height: x.data.height,
        width: x.data.width,
        type: x.data.type,
        link: x.data.link,
        name: x.data.link,
        size: x.data.size,
        url: x.data.link,
      };
      return Promise.resolve(result);
    });
};


export default {
  uploadImage,
};
