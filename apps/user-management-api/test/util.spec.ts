import "reflect-metadata";
import * as fs from "fs";
import * as path from "path";

import {
  emitSchemaDefinitionFile,
} from "type-graphql";
import { createSchema } from '../src/handler';


const TEST_DIR = path.resolve(process.cwd());

describe("Emitting schema definition file", () => {

  it("should write file with schema SDL successfully", async () => {
    const targetPath = path.join(TEST_DIR,'..',"schema.gql");
    const schema = createSchema()
    await emitSchemaDefinitionFile(targetPath, schema);
    expect(fs.existsSync(targetPath)).toEqual(true);
  });

});
