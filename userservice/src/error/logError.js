import UserServiceError from "./UserServiceError.js";

const logError = (e) => {
  if (e instanceof UserServiceError) {
    console.warn(e);
  } else {
    console.error(e);
  }
};
export default logError;
