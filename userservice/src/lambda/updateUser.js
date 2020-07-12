import getUserService from "../compositeRoot/getUserService.js";
import logError from "../error/logError";

exports.handler = async (event) => {
  try {
    const userService = getUserService();
    return await userService.updateUser(event.input);
  } catch (e) {
    logError(e);
    throw e;
  }
};
