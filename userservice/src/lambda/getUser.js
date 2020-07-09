import getUserService from "../compositeRoot/getUserService.js";

exports.handler = async (event, context, callback) => {
  try {
    const userService = getUserService();
    return await userService.getUser(event.input);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
