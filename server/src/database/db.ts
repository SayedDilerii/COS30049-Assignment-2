import dotenv from "dotenv";
import { Pool, QueryResultRow } from "pg";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT as string, 10),
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (text: string, params?: any[]): Promise<QueryResultRow> => {
  try {
    const res = await pool.query(text, params);
    return res;
  } catch (err: any) {
    console.error("Database query error:", {
      message: err.message,
      query: text,
      parameters: params,
    });
    throw new Error("Database query failed");
  }
};
