import DynamoDbUserRepository from "../repository/DynamoDbUserRepository.js";
import UserService from "../service/UserService.js";

const getUserService = () => {
  let userRepository = new DynamoDbUserRepository();
  return new UserService({ userRepository });
};

export default getUserService;
