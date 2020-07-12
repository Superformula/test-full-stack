import getUserService from "../compositeRoot/getUserService.js";
import logError from "../error/logError.js";

exports.handler = async (event) => {
  try {
    const userService = getUserService();
    return await userService.getUsers(
      event.input.filter,
      event.input.limit,
      event.input.startKey
    );
  } catch (e) {
    logError(e);
    throw e;
  }
};
