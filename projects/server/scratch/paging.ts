import { UserModel } from './database';

async function main() {
    async function t(next: any) {
        const baseQuery = await UserModel.scan().startAt(next).limit(1).exec();
        
        return {
            users: baseQuery,
            nextToken: baseQuery.lastKey
        }
    }

    const t1 = await t(null);

    console.log(JSON.stringify(t1));

    const t2 = await t(t1.nextToken);

    console.log(JSON.stringify(t2));
}

main();