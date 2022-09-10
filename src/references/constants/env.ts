export const IS_DEVELOPMENT_MODE = process.env.REACT_APP_IS_DEVELOPMENT_MODE==="true" ? true : false;
export const IS_USE_FAKE_API = process.env.REACT_APP_IS_USE_FAKE_API==="true" ? true : false;
const URL_FAKE_API=process.env.REACT_APP_FAKE_API_URL;
const URL_BACKEND_API=process.env.REACT_APP_API_URL;
export const REACT_APP_BACKEND=process.env.REACT_APP_BACKEND;
export const URL_API=IS_USE_FAKE_API?URL_FAKE_API:URL_BACKEND_API;