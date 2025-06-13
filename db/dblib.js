import { mysqlConnection, executeMySQL } from "./connect.js";

export async function insertData(db, sql, data) {
  const conn = mysqlConnection(db);
  const results = await executeMySQL(conn, sql, data)
  return results;
}

export async function dbCheck(db) {
  const conn = await mysqlConnection(db);
  const results = await executeMySQL(conn, 'SHOW TABLES');
  conn.end();
  return results;
}
