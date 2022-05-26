import { Pool, QueryResult } from "pg";

let regex: RegExp = /postgres:\/\/(.*):(.*)@(.*):(\d*)\/(.*)$/gm
let dbUrl = process.env.DATABASE_URL;

let matches: RegExpExecArray = regex.exec(dbUrl!)!;


let dbUser: string = matches[1];
let dbPass: string = matches[2];
let dbHost: string = matches[3];
let dbPort: string = matches[4];
let dbName: string = matches[5];

const pool = new Pool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: parseInt(dbPort!),
  database: dbName,
  ssl: { rejectUnauthorized: false}
});

export const query = <T>(
  text: string,
  params: any[]
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};
