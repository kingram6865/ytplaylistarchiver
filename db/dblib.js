import { mysqlConnectionPool, mysqlConnection, executeMySQL } from "./connect.js";

export async function dbCheck(db) {
  const conn = await mysqlConnection(db);
  const results = await executeMySQL(conn, 'SHOW TABLES');
  conn.end();
  return results;
}

export async function playlistExists(db, channel) {}

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

export async function videoExists(db, videoid) {
  const conn = await mysqlConnection(db);
  let sql = `SELECT 1 FROM youtube_downloads where url LIKE '${videoid}'`
  const results = await executeMySQL(conn, sql);
  conn.end();
  if (results.rows.length === 0) {
    return false
  } else {
    return true
  }
}

export async function addPlaylist(db, data) {
  const conn = await mysqlConnection(db);
  const sql = "INSERT INTO youtube_playlists (channel_db_id, channel_id, playlist_id, playlist_title, playlist_description, status, notes) VALUES (?)"
  try {
    const result = await executeMySQL(conn, sql, [data]);
    if (result.success) {
      return { message: `Added playlist to youtube_playlists objid: ${result.rows.insertId}`};
    } else {
      return { message: result.error.message, sql: result.error.sql }
    }
  } finally {
    conn.end()
  }
}

export async function addChannel(db, data) {
  let resultsCheck = `Add new channel with id 
  owner_name: ${data[0]}
  channel_link: ${data[1]}
  channel_id: ${data[2]}
  description: ${data[3]}
  custom_url: ${data[4]}
  joined: ${data[5]}
  views: ${data[6]}
  thumbnail_link: ${JSON.parse(data[7]).maxres.url}`;
  const conn = await mysqlConnection(db);
  let sql = `INSERT INTO youtube_channel_owners 
  (owner_name, channel_link, channel_id, description, custom_url, joined, views, thumbnail_link) 
  VALUES (?,?,?,?,?,?,?,?)`;
  try {
    const results = await executeMySQL(conn, sql, data);
    return results;
  } finally {
    conn.end();
  }
}

export async function addVideo(db, data) {
  let results = {db, data}
  // let sql = `INSERT INTO youtube_downloads 
  // (channel_owner_id, url, play_length, caption, description, sequence, upload_date, thumbnail, status) 
  // VALUES (${channelid},?,?,?,?,?,?,?,1)`
  // const conn = await mysqlConnectionPool(db);
  // const results = await executeMySQL(conn, sql, data);
  return results;
}

export async function addVideoBatch(db, data) {
  // let results = {db, data}
  const conn = await mysqlConnectionPool(db);
  let sql = `INSERT INTO youtube_downloads 
  (channel_owner_id, url, play_length, caption, description, sequence, upload_date, thumbnail, status) 
  VALUES ?`;

  try {
    const result = await executeMySQL(conn, sql, [data]);
    return result;
  } finally {
    conn.end();
  }  
}
