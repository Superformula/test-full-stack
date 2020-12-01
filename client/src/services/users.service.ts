import User from "models/user.model";
import { API, graphqlOperation } from 'aws-amplify';

function listUsersQuery(limit: number, nextToken: string | null) {
  return `
    query list {
      listUsers (limit: ${limit}, nextToken: ${nextToken ? `"${nextToken}"` : null}) {
        items {
          id name address dob description
        }
        nextToken
      }
    }
  `
}

function updateUserQuery({ id, name, address, description }: User) {
  return `
    mutation update {
      updateUser ( 
        input: {
          id: "${id}"
          name: "${name}",
          address: "${address}",
          description: "${description}"
        },
      ) {
        name address description
      }
    }
  `
}

class UsersService {
  async getUsersList(limit: number, nextToken: string | null) : Promise<{ items: Array<User>, token: string}> {
    const response: any = await API.graphql(graphqlOperation(listUsersQuery(limit, nextToken)));
    const items = response.data.listUsers.items;
    const token = response.data.listUsers.nextToken;
    return {
      items,
      token,
    };
  }

  async updateUser(user: User) {
    return API.graphql(graphqlOperation(updateUserQuery(user)));
  }

}

export default UsersService;