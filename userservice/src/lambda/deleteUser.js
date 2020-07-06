import getUserService from "../compositeRoot/getUserService.js";

exports.handle = async (event, context, callback) => {
  try {
    const userService = getUserService();
    return await userService.deleteUser(event.input);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
