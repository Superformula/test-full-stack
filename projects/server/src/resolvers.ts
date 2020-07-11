import * as uuid from 'uuid';
import * as schema from './schema';
import { UserModel } from "./database";

const PAGE_SIZE = 6;

export const resolvers = {
    Query: {
        getPages: async (parent, args: schema.GetPagesInput, context, info) => {
            const { pageCount, filter } = args;

            // Typescript mistake in dynamoose.
            let q: any = UserModel.scan().limit(PAGE_SIZE*pageCount);
            if (filter) {
                q = q.filter('name').beginsWith(filter);
            }

            const baseQuery = await q.exec();

            return {
                users: baseQuery,
                nextToken: baseQuery.lastKey
            };
        },
        getNextPage: async (parent, args: schema.GetNextPageInput, context, info) => {
            const { nextToken, filter } = args;

            // Typescript mistake in dynamoose.
            let q: any = UserModel.scan().startAt(nextToken).limit(PAGE_SIZE);
            if (filter) {
                q = q.filter('name').beginsWith(filter);
            }
                
            const baseQuery = await q.exec();

            return {
                users: baseQuery,
                nextToken: baseQuery.lastKey
            };
        },
        getAllUsers: async (parent, args, context, info) => {
            const users = await UserModel.scan().exec();
            return users;
        },
        getUser: async (parent, args: schema.GetUserInput, context, info) => {
            const { id } = args;
            const user = await UserModel.get(id);

            return user;
        },
    },
    Mutation: {
        createUser: async (parent, args: schema.CreateUserInput, context, info) => {
            const { input:{ name, dob, address, description } } = args;

            const user = await UserModel.create({
                id: uuid.v4(),
                name: name,
                dob: dob,
                address: address,
                description: description
            });

            return user;
        },
        updateUser: async (parent, args: schema.UpdateUserInput, context, info) => {
            const { input:{ id, name, dob, address, description } } = args;

            const user = await UserModel.update({
                id: id,
                name: name,
                dob: dob,
                address: address,
                description: description
            });

            return user;
        },
        deleteUser: async (parent, args: schema.DeleteUserInput, context, info) => {
            const { input:{ id } } = args;
            try {
                await UserModel.delete(id);
                return true;
            }
            catch(e) {
                console.error(JSON.stringify(e));
                return false;
            }
        },
    }
};