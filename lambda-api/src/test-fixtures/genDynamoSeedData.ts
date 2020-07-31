import { util } from "@apollo/protobufjs";
import { userFactory } from "./user-generator";
import fs = util.fs;

// Sort by name and use integer ids for ease of testing
const seedData = [...Array(500)]
  .map((_, index) => userFactory.build({ id: String(index + 1) }))
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((user, index) => ({
    ...user,
    id: String(index + 1),
  }));

fs.writeFile(
  "resources/seed-data/User.json",
  JSON.stringify(seedData),
  (err) => {
    if (err) throw err;
    console.log("Seed data written successfully");
  }
);
