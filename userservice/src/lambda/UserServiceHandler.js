import getUserService from "../compositeRoot/getUserService.js";
import logError from "../error/logError.js";
import Constants from "../utils/constants.js";

exports.handler = async (event) => {
  try {
    const userService = getUserService();
    switch (event.fieldName) {
      case Constants.ADD_USER:
        return await userService.addUser(event.input);
      case Constants.GET_USER:
        return await userService.getUser(event.input);
      case Constants.DELETE_USER:
        return await userService.deleteUser(event.input);
      case Constants.GET_USERS:
        return await userService.getUsers(
          event.input.filter,
          event.input.limit,
          event.input.startKey
        );
      case Constants.UPDATE_USER:
        return await userService.updateUser(event.input);
    }
  } catch (e) {
    logError(e);
    throw e;
  }
};
