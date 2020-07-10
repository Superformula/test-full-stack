import { graphql, buildSchema } from "graphql";
import { schemaTemplate } from "../src/schema";

let res = buildSchema(schemaTemplate);
console.log(JSON.stringify(res));