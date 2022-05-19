import { Pool, QueryResult } from "pg";

const dbUser = process.env.DB_USERNAME;
const dbPass = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOSTNAME;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const pool = new Pool({
  user: dbUser,
  password: dbPass,
  host: dbHost,
  port: parseInt(dbPort!),
  database: dbName,
});

export const query = <T>(
  text: string,
  params: any[]
): Promise<QueryResult<T>> => {
  return pool.query<T>(text, params);
};
