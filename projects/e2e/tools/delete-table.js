const db = require('./db-api');

async function fn() {
    await db.deleteTable();
}

fn();
