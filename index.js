import 'dotenv/config';
import axios from 'axios';
import { dbCheck, insertData, channelExists, addChannel, addVideo } from './db/dblib.js';
import { executeMySQL } from './db/connect.js';

const playlistUrl = process.env.PLAYLISTITEMS;
const playlistInfo = process.env.PLAYLISTDATA;
const channelAPIInfo = process.env.CHANNELDATA;
const playlistItems = [];
let playlistAttribs, channelInfo
let data

async function retrievePlaylistitems(playlistid) {
  try {
    let response1 = await axios.get(`${playlistInfo}&id=${playlistid}`)
    let response = await axios.get(`${playlistUrl}&playlistId=${playlistid}`);
    let response3 = await axios.get(`${channelAPIInfo}&id=${response1.data.items[0].snippet.channelId}`)

    playlistAttribs = response1.data.items[0]
    // console.log(response1.data.items[0].snippet)
    // console.log(response.data.pageInfo.totalResults);
    // console.log(response3.data.items[0])
    channelInfo = {
      title: response3.data.items[0].snippet.title,
      description: (response3.data.items[0].snippet.description) ? response3.data.items[0].snippet.description : response1.data.items[0].snippet.description,
      customUrl: response3.data.items[0].snippet.customUrl,
      publishedAt: response3.data.items[0].snippet.publishedAt,
      thumbnails: response3.data.items[0].snippet.thumbnails,
      viewCount: response3.data.items[0].statistics.viewCount
    }
    // console.log(channelInfo)

    response.data.items.forEach(x => {
      data = {
        position: x.snippet.position,
        videoid: x.contentDetails.videoId,
        publishedAt: x.snippet.publishedAt,
        title: x.snippet.title,
        description: x.snippet.description,
        thumbnails: x.snippet.thumbnails
      }
      playlistItems.push(data)
    });

    // playlistItems.push(...response.data.items);
    // while (response.data.nextPageToken && i <= response.data.pageInfo.totalResults) {
    while (response.data.nextPageToken) {
      let url = `${playlistUrl}&playlistId=${playlistid}&pageToken=${response.data.nextPageToken}`
      response = await axios.get(url);
      response.data.items.forEach(x => {
        data = {
          position: x.snippet.position,
          videoid: x.contentDetails.videoId,
          publishedAt: x.snippet.publishedAt,
          title: x.snippet.title,
          description: x.snippet.description,
          thumbnails: x.snippet.thumbnails
        }
        playlistItems.push(data)
      });

      // playlistItems.push(...response.data.items);
      // playlistItems.push(data);
    }
  } catch(err) {
    console.log(err);
  }

  return { 
    channelInfo,
    playlistInfo: {
      playlistId: playlistid,
      channelName: playlistAttribs.snippet.channelTitle,
      title: playlistAttribs.snippet.title, 
      description: playlistAttribs.snippet.description, 
      channelId: playlistAttribs.snippet.channelId, 
      thumbnails: playlistAttribs.snippet.thumbnails,
      playlistItemCount: playlistAttribs.contentDetails.itemCount,
    },
    items: playlistItems
  };
}

// async function channelExist(channel) {
//   const sql = `SELECT * FROM youtube_channel_owners where channel_id = '${channel}'`
//   const result = await channelExists('test', sql)
//   console.log(result)
//   if (result.length === 0) {
//     return false
//   } else {
//     return result
//   }
// }




async function populateDatabase(dbname, data) {
  let sql = "INSERT INTO youtube_downloads (channel_owner_id, play_length, sequence, title, description, status, url)"
}


// dbCheck('test')
//   .then(x => console.log(x));

// retrievePlaylistitems(process.argv[2])
//   .then(x => {
//     console.log(Object.keys(x.items[0]));
//     // console.log(`[${x.position}] ${x.title}`)
//     // x.items.forEach(item => {
//     //   console.log(`[${item.position+1}] ${item.title}`);
//     // })
//   });
//   .then(x => {
//     // console.log(x.kind, x.etag, x.id, "\n", Object.keys(x.snippet), "\n", Object.keys(contentDetails), Object.keys(status));
//     // console.log(x.kind, x.etag, x.id);
//     // console.log(Object.keys(x))
//     x.forEach(item => {
//       let version1 = `kind: ${item.kind} etag: ${item.etag} id: ${item.id}`
//       let version2 = `
//         [${item.snippet.position}]: ${item.snippet.title}
//         ${item.snippet.publishedAt}
//         ${item.snippet.description}
//         ${item.snippet.thumbnails}
//         ${item.snippet.playlistId}
//         ${item.snippet.videoOwnerChannelId}, ${item.snippet.videoOwnerChannelTitle}
//       `
//       let version2a = `[${item.snippet.position}]: ${item.snippet.title} ${item.snippet.publishedAt}`

//       let version3 = `
//         ${item.contentDetails.videoId} ${item.contentDetails.videoPublishedAt} status: ${item.status.privacyStatus}
//       `
//       console.log(`${version2a}`);
      
//     });
//   });

async function main(id) {
  let channelInfo, videoChannelId;
  const list = await retrievePlaylistitems(id);
  let channelStatus = await channelExists('test', list.channelId)
  console.log(Object.keys(list))
  if (!channelStatus) {
    let newChannelData = [
      list.channelName,
      list.title,
      list.description,
      list.channelId,
      list.thumbnails
    ]
    channelInfo = await addChannel('test', list.channelId);
    console.log(`Channel ID: ${list.channelId}\n${channelStatus}\naddChannel Message: ${channelInfo}`);
  } else {
    videoChannelId = channelStatus.objid
    console.log(`Channel ID: ${list.channelId}\nDatabase ID: ${videoChannelId}\nPlaylist: ${id} has ${list.items.length} items.`);
  }
  // newChannelResults = await addVideo('test', )

}

main(process.argv[2]);
