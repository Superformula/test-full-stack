import getUserService from "../compositeRoot/getUserService.js";

exports.handle = async (event, context, callback) => {
  try {
    const userService = getUserService();
    return await userService.updateUser(event.input);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
