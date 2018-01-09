/* Database Reference */
export const REF_ARTICLE = 'article';
export const REF_USER = 'user';
export const REF_TAG = 'tag';
export const REF_CATEGORY = 'category';
export const REF_ARTICLE_SHALLOW = 'article_shallow';
export const REF_LIKE = 'like';

/* Article status */
export const ARTICLE_STATUS = {
  DRAFT: 0,
  PUBLISH: 10,
};

/* User Role */
export const USER_ROLE = {
  MEMBER: 0,
  MANAGER: 10,
  ADMIN: 20,
};

/* Upload Status */
export const UPLOAD_STATUS = {
  INITIAL: 0,
  SAVING: 10,
  SUCCESS: 20,
  FAILED: 30,
};

/* External URL */
export const IMG_UPLOAD_URL = 'https://api.imgur.com/3/image.json';

export const DEFAULT_COVER_IMAGE = 'https://i.imgur.com/I3QyKzY.png';
