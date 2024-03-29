// action will be CRUD = create, read, update, delete
// module -> action -> detail

export const SAVE_ARTICLE = 'SAVE_ARTICLE';
export const PUBLIC_ARTICLE = 'PUBLIC_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const LOAD_ARTICLES = 'LOAD_ARTICLES';
export const READ_USER_ARTICLES = 'READ_USER_ARTICLES';
export const READ_ALL_ARTICLES = 'READ_ALL_ARTICLES';
export const READ_FIRST_ARTICLES = 'READ_FIRST_ARTICLES';
export const READ_MORE_ARTICLES = 'READ_MORE_ARTICLES';
export const SET_ARTICLE = 'SET_ARTICLE';
export const SET_ARTICLE_ID = 'SET_ARTICLE_ID';
export const UPDATE_COVER_IMAGE = 'UPDATE_COVER_IMAGE';
export const UPDATE_LOADING_FLAG = 'UPDATE_LOADING_FLAG';
export const UPDATE_UPLOADING_STATUS = 'UPDATE_UPLOADING_STATUS';
export const UPDATE_UPLOADING_IMAGE_FLAG = 'UPDATE_UPLOADING_IMAGE_FLAG';

// update article
export const ARTICLE_UPDATE_DEFAULT_STATE = 'ARTICLE_UPDATE_DEFAULT_STATE';
export const ARTICLE_UPDATE_LIKE_STATE = 'ARTICLE_UPDATE_LIKE_STATE';

export const GET_NUMBER_ARTICLES = 'GET_NUMBER_ARTICLES';

// update user
export const USER_UPDATE_FOLLOW_STATE = 'USER_UPDATE_FOLLOW_STATE';
// set local state
export const USER_UPDATE_DEFAULT_STATE = 'USER_SET_USER_INFO_STATE';
export const USER_UPDATE_INFO_STATE = 'USER_UPDATE_INFO_STATE';
export const USER_UPDATE_CURRENT_USER_STATE = 'USER_UPDATE_CURRENT_USER_STATE';

// LOADING STATUS
export const ARTICLE_UPDATE_SAVING_DRAFT = 'ARTICLE_UPDATE_SAVING_DRAFT';
export const ARTICLE_UPDATE_PUBLISH = 'ARTICLE_UPDATE_PUBLISH';

// CATEGORY
export const CATEGORY_CREATE = 'CATEGORY_CREATE';
export const CATEGORY_READ = 'CATEGORY_READ';
export const CATEGORY_DELETE = 'CATEGORY_DELETE';
export const CATEGORY_UPDATE = 'CATEGORY_UPDATE';

// LOADING PROGRESS
export const LOADING_ARTICLES_BY_USER = 'LOADING_ARTICLES_BY_USER';

// ARTICLE USER COMMIT ACTION
export const ARTICLE_USER_SET_PUBLISH = 'ARTICLE_USER_SET_PUBLISH';
export const ARTICLE_USER_SET_DRAFT = 'ARTICLE_USER_SET_DRAFT';
export const ARTICLE_USER_SET_CONTENT = 'ARTICLE_USER_SET_CONTENT';
export const ARTICLE_USER_SET_STATUS = 'ARTICLE_USER_SET_STATUS';

export const ARTICLE_CATEGORY_SET_CONTENT = 'ARTICLE_CATEGORY_SET_CONTENT';
export const ARTICLE_CATEGORY_SET_ID = 'ARTICLE_CATEGORY_SET_ID';
export const ARTICLE_CATEGORY_ADD_CONTENT = 'ARTICLE_CATEGORY_ADD_CONTENT';
export const ARTICLE_CATEGORY_NEXT_PAGE = 'ARTICLE_CATEGORY_NEXT_PAGE';
export const ARTICLE_CATEGORY_CLEAR_STATE = 'ARTICLE_CATEGORY_CLEAR_STATE';

// NEW SERVER
export const AUTH_SET_TOKEN = 'AUTH_SET_TOKEN';
export const AUTH_SET_ERROR = 'AUTH_SET_ERROR';
export const AUTH_SET_LOADING = 'AUTH_SET_LOADING';
export const AUTH_SET_AUTH_USER = 'AUTH_SET_AUTH_USER';
export const AUTH_SET_USER_INFO = 'AUTH_SET_USER_INFO';
export const AUTH_CLEAR_STATE = 'AUTH_CLEAR_STATE';

export const ARTICLE_SET_SELECTED = 'ARTICLE_SET_SELECTED';
export const ARTICLE_SET_VIEW = 'ARTICLE_SET_VIEW';
export const ARTICLE_SET_HOME_CONTENT = 'ARTICLE_SET_HOME_CONTENT';

export const IMAGE_SET_UPLOAD = 'IMAGE_SET_UPLOAD';
