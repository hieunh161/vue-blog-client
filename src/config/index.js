export const baseUrl = 'https://my-blog-68afd.firebaseapp.com';

export const firebaseConfig = {
  apiKey: 'AIzaSyD6QnbW4Sk4kZuWdGzO2BkIKtHj9n4CxHg',
  authDomain: 'my-blog-68afd.firebaseapp.com',
  databaseURL: 'https://my-blog-68afd.firebaseio.com',
  projectId: 'my-blog-68afd',
  storageBucket: '',
  messagingSenderId: '157291960262',
};

export const imgUrlConfig = {
  uploadUrl: 'https://api.imgur.com/3/image.json',
  authorization: 'Client-ID 5b3be50a7c3a7ff',
};

export const apiDomain = 'http://localhost:8000/';
export const apiPrefix = 'api/v1/';

export const loginUrl = `${apiDomain}oauth/token`;
export const userInfoUrl = `${apiDomain}${apiPrefix}users`;
export const userUrl = `${apiDomain}${apiPrefix}user`;
export const categoryUrl = `${apiDomain}${apiPrefix}categories`;

export const articleUrl = `${apiDomain}${apiPrefix}articles`;

export const imageUploadUrl = 'https://api.imgur.com/3/image.json';
