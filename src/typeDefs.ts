import {readFileSync} from "fs";
import { gql } from 'apollo-server';
import * as path from "path";

const typeDefs = gql(readFileSync(path.join(__dirname, "schema.graphql"), 'UTF-8'));


export default typeDefs;