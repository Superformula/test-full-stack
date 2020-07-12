import getUserService from "../compositeRoot/getUserService.js";

exports.handler = async (event) => {
  try {
    const userService = getUserService();
    return await userService.getUsers(
      event.input.filter,
      event.input.limit,
      event.input.startKey
    );
  } catch (e) {
    console.error(e);
    throw e;
  }
};
