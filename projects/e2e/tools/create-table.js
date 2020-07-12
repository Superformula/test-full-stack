const db = require('./db-api');

async function fn() {
    await db.createTable();
}

fn();
