import getUserService from "../compositeRoot/getUserService.js";
import logError from "../error/logError.js";

exports.handler = async (event) => {
  try {
    const userService = getUserService();
    return await userService.deleteUser(event.input);
  } catch (e) {
    logError(e);
    throw e;
  }
};
