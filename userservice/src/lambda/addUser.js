import getUserService from "../compositeRoot/getUserService.js";

exports.handler = async (event) => {
  try {
    const userService = getUserService();
    return await userService.addUser(event.input);
  } catch (e) {
    console.error(e);
    throw e;
  }
};
