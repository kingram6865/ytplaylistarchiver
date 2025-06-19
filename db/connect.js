import 'dotenv/config';
import mysql from 'mysql2'

function setMySqlConfig() {
  return {
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS
  }
}

export function mysqlConnectionPool(db) {
  let config = setMySqlConfig()
  config = { ...config, database: db }
  const connection = mysql.createPool(config);
  return connection;
}

export async function mysqlConnection(db) {
  let config = setMySqlConfig()
  config = { ...config, database: db }
  const connection = await mysql.createConnection(config);
  return connection;
}

export async function executeMySQL(conn, sql, data = []) {
  let SQL
  if (data.length > 0) {
    SQL = mysql.format(sql, data);
  } else {
    SQL = sql
  }
  try {
    const [rows, fields] = await conn.promise().query(SQL)
    return { success: true, rows, fields }
  } catch(err) {
    if (err.sqlState === '45000') {
      return { success: false, error: {message: err.sqlMessage, sql: err.sql} };
    }
    throw err;
  }
}
