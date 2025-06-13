import 'dotenv/config';
import axios from 'axios';
import { dbCheck, insertData } from './db/dblib.js';


const playlistUrl = process.env.PLAYLISTITEMS;
const playlistInfo = process.env.PLAYLISTDATA;
const playlistItems = [];
let playlistAttribs
let data

async function retrievePlaylistitems(playlistid) {
  try {
    let response1 = await axios.get(`${playlistInfo}&id=${playlistid}`)
    let response = await axios.get(`${playlistUrl}&playlistId=${playlistid}`);
    playlistAttribs = response1.data.items[0]

    console.log(response.data.pageInfo.totalResults);
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
    playlistId: playlistid,
    channelName: playlistAttribs.snippet.channelTitle,
    title: playlistAttribs.snippet.title, 
    description: playlistAttribs.snippet.description, 
    channelId: playlistAttribs.snippet.channelId, 
    thumbnails: playlistAttribs.snippet.thumbnails,
    playlistItemCount: playlistAttribs.contentDetails.itemCount,
    items: playlistItems};
}



// dbCheck('test')
//   .then(x => console.log(x));

retrievePlaylistitems(process.argv[2])
  .then(x => console.log(x));
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