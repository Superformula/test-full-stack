import User from "../model/User.js";
import UserServiceError from "../error/UserServiceError.js";

export default class UserService {
  constructor({ userRepository }) {
    this._userRepository = userRepository;
  }

  async getUsers(filter, limit, startKey) {
    let items = await this._userRepository.getUsers(filter, limit, startKey);
    if (items && items.length > 0) {
      let item = items[items.length - 1];
      startKey = {
        id: item.id,
      };
    }
    return { items, startKey: startKey };
  }

  async getUser(input) {
    let user = User.fromJsonObject(input);

    if (!user.id) {
      throw new UserServiceError("id cannot be null when getting a user");
    }

    return this._userRepository.getUser(user);
  }

  async addUser(input) {
    let user = User.fromJsonObject(input);

    validateUserTransaction(user);

    if (user.id) {
      throw new UserServiceError("cannot add a user with an valid id");
    }

    return await this._userRepository.addUser(user);
  }

  async updateUser(input) {
    let user = User.fromJsonObject(input);

    validateUserTransaction(user);

    if (!user.id) {
      throw new UserServiceError("id cannot be null when updating a user");
    }

    return await this._userRepository.updateUser(user);
  }

  async deleteUser(input) {
    let user = User.fromJsonObject(input);

    if (!user.id) {
      throw new UserServiceError("id cannot be null when deleting a user");
    }

    return await this._userRepository.deleteUser(user);
  }
}

function validateUserTransaction(user) {
  if (!user.name || user.name.trim() === "") {
    throw new UserServiceError("user name cannot be empty");
  }
}
