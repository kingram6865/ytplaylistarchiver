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

export async function channelExists(db, channel) {
  const conn = await mysqlConnection(db);
  let sql = `SELECT * FROM youtube_channel_owners where channel_id = '${channel}'`
  const results = await executeMySQL(conn, sql);
  conn.end();
  if (results.rows.length === 0) {
    return false
  } else {
    return results.rows[0]
  }
}

export async function addChannel(db, data) {
  let results = `Add new channel with id ${data}`;
  // const conn = await mysqlConnection(db);
  // let sql = `INSERT INTO youtube_channel_owners 
  // (owner_name, channel_link, channel_id, description, custom_url, joined, views, thumbnail_link) 
  // VALUES (?,?,?,?,?,?,?,?,?,?)`
  // const results = await executeMySQL(conn, sql, data);
  // conn.end();
  return results;
}

export async function addVideo(db, data) {
  let sql = ``
  const conn = await mysqlConnection(db);
  const results = await executeMySQL(conn, sql, data);
  conn.end();
  return results;
}
