import { UserModel } from './database';
import * as uuid from 'uuid';

async function main() {
    const user = await UserModel.create({
        id: uuid.v4(),
        name: "Hello"
    });

    console.log(JSON.stringify(user));
}

main();