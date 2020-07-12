import { buildSchema } from "graphql";
import { schemaTemplate } from "../src/schema";

const res = buildSchema(schemaTemplate);
console.log(JSON.stringify(res));