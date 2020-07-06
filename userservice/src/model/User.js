export default class User {
  constructor() {
    this.id = null;
    this.name = null;
    this.dateOfBirth = null;
    this.address = null;
    this.description = null;
    this.createdAt = null;
    this.updatedAt = null;
  }

  static fromJsonObject(input) {
    if (!input) {
      return null;
    }
    let user = new User();
    user.id = input.id;
    user.name = input.name;
    user.dateOfBirth = input.dateOfBirth;
    user.address = input.address;
    user.description = input.description;
    user.createdAt = input.createdAt;
    user.updatedAt = input.updatedAt;
    return user;
  }
}
