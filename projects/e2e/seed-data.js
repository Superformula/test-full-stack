const db = require('./tools/db-api');

async function seedData() {
    await db.uploadUsers();
}

seedData();
