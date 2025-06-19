import 'dotenv/config';
import axios from 'axios';
import * as color from './utilities/consoleColorsES6.js'
import { dbCheck, channelExists, addChannel, addVideo } from './db/dblib.js';


const playlistUrl = process.env.PLAYLISTITEMS;
const playlistInfo = process.env.PLAYLISTDATA;
const channelAPIInfo = process.env.CHANNELDATA;
const apiVideoInfo = process.env.VIDEODATA;
// const playlistItems = [];
let playlistItems
let playlistAttribs, channelInfo


async function retrievePlaylistitems(playlistid) {
  try {
    let response1 = await axios.get(`${playlistInfo}&id=${playlistid}`)
    let response = await axios.get(`${playlistUrl}&playlistId=${playlistid}`);
    let response3 = await axios.get(`${channelAPIInfo}&id=${response1.data.items[0].snippet.channelId}`)

    playlistAttribs = response1.data.items[0]

    channelInfo = {
      channelId: (response1.data.items[0].snippet.channelId === response3.data.items[0].id) ? response1.data.items[0].snippet.channelId : "channel id error",
      title: response3.data.items[0].snippet.title,
      description: (response3.data.items[0].snippet.description) ? response3.data.items[0].snippet.description : response1.data.items[0].snippet.description,
      customUrl: response3.data.items[0].snippet.customUrl,
      publishedAt: response3.data.items[0].snippet.publishedAt,
      thumbnails: response3.data.items[0].snippet.thumbnails,
      viewCount: response3.data.items[0].statistics.viewCount
    }

    const allItems = [...response.data.items];
    while (response.data.nextPageToken) {
      const url = `${playlistUrl}&playlistId=${playlistid}&pageToken=${response.data.nextPageToken}`;
      response = await axios.get(url);
      allItems.push(...response.data.items);
    }

    // response.data.items.forEach(x => {
    //   data = {
    //     position: x.snippet.position + 1,
    //     videoid: x.contentDetails.videoId,
    //     publishedAt: x.snippet.publishedAt,
    //     title: x.snippet.title,
    //     description: x.snippet.description,
    //     thumbnails: x.snippet.thumbnails,
    //     duration: apiInfo.data.items[0].contentDetails.duration
    //   }

    //   playlistItems.push(data)
    // });

    // while (response.data.nextPageToken) {
    //   const url = `${playlistUrl}&playlistId=${playlistid}&pageToken=${response.data.nextPageToken}`
    //   response = await axios.get(url);
    //   response.data.items.forEach(x => {
    //     data = {
    //       position: x.snippet.position + 1,
    //       videoid: x.contentDetails.videoId,
    //       publishedAt: x.snippet.publishedAt,
    //       title: x.snippet.title,
    //       description: x.snippet.description,
    //       thumbnails: x.snippet.thumbnails,
    //       duration: apiInfo.data.items[0].contentDetails.duration
    //     }

    //     playlistItems.push(data)
    //   });
    // }

    const videoDetails = await getVideoDetailsBatch(allItems.map(x => x.contentDetails.videoId));
    playlistItems = allItems.map((x, index) => {
      const apiInfo = videoDetails[index];
      return {
        position: x.snippet.position + 1,
        videoid: x.contentDetails.videoId,
        publishedAt: x.snippet.publishedAt,
        title: x.snippet.title,
        description: x.snippet.description,
        thumbnails: x.snippet.thumbnails,
        duration: apiInfo.contentDetails.duration        
      };
    });

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
    playlistItems
  };
}

async function populateDatabase(dbname, data) {
  let sql = "INSERT INTO youtube_downloads (channel_owner_id, play_length, sequence, title, description, status, url)"
}

async function getVideoDetailsBatch(videoIds, batchSize = 50) {
  const batches = []; // Holds a batch of 50 videoid's

  // From the input list of videoid'd create 50-element slices and add to batches array.
  for (let i = 0; i < videoIds.length; i += batchSize) {
    batches.push(videoIds.slice(i, i + batchSize));
  }

  // Process the batches array
  const results = await Promise.all(
    batches.map(batch => {
      const url = `${apiVideoInfo}&id=${batch.join(',')}`; // run an API request on a batch of videoid's (50 at a time)
      return retryAPIRequest(url);
    })
  );

  return results.flatMap(r => r.items);
}

class YouTubeAPIError extends Error {
  constructor(message, statusCode, url) {
    super(message);
    this.name = 'YouTubeAPIError';
    this.statusCode = statusCode;
    this.url = url;
  }
}

async function safeAPIRequest(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new YouTubeAPIError(
      error.message,
      error.response?.status,
      url
    );
  }
}

async function retryAPIRequest(url, maxRetries = 3, delay = 1000) {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await safeAPIRequest(url);
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
}

async function main(id) {
  let addChannelResponse, videoChannelId;
  const list = await retrievePlaylistitems(id);
  // console.log(list.channelInfo, list.playlistInfo)
  console.log(list.playlistItems.length)
  let channelStatus = await channelExists('test', list.playlistInfo.channelId)
  if (!channelStatus) {
    let newChannelData = [
      list.playlistInfo.channelName,
      `https://www.youtube.com/${list.channelInfo.customUrl}`,
      list.channelInfo.channelId,
      list.playlistInfo.description,
      list.channelInfo.customUrl,
      list.channelInfo.publishedAt,
      list.channelInfo.viewCount,
      JSON.stringify(list.playlistInfo.thumbnails)
    ]

    addChannelResponse = await addChannel('test', newChannelData);

    if (addChannelResponse) {
      let message = `${color.brightGreen}Channel Id${color.Reset} ${color.brightCyan}${list.channelInfo.channelId}${color.Reset} ${(!channelStatus) ? `${color.brightGreen}is not archived in the database. Added with objid${color.Reset} ${color.brightCyan}${addChannelResponse.rows.insertId}${color.Reset}` : `${color.brightRed}error${color.Reset}`}`
      console.log(message);
    } else {
      console.log(addChannelResponse);
    }
  } else {
    videoChannelId = channelStatus.objid
    console.log(`${color.brightGreen}Channel${color.Reset} ${color.brightBlue}${channelStatus.owner_name}${color.Reset} ${color.brightGreen}has Database ID${color.Reset} ${color.brightBlue}${videoChannelId}${color.Reset}, ${color.brightGreen}Channel ID:${color.Reset} ${list.channelInfo.channelId} ${color.brightGreen}for Playlist${color.Reset} ${color.brightBlue}${id}${color.Reset} ${color.brightGreen}which has${color.Reset} ${color.brightYellow}${list.playlistItems.length}${color.Reset} ${color.brightGreen}items.${color.Reset}`);
  }
  // newChannelResults = await addVideo('test', )
  // console.log(list.playlistItems[0])
  let batch = list.playlistItems.map(item => {
    let newVideoData = [
      videoChannelId,
      "https://www.youtube.com/watch?v=" + item.videoid,
      item.duration,
      item.title,
      item.description,
      item.position,
      item.publishedAt,
      JSON.stringify(item.thumbnails)
    ]
    // url, play_length, caption, description, sequence, upload_date, thumbnail
    return newVideoData;
  });

  // console.log(batch.length)
  batch.sort((a, b) => (a[5] > b[5]) ? 1 : (a[5] < b[5]) ? -1 : 0)
  batch.forEach((array, i) => console.log(`[${i}] ${array[0]} ${array[5]}`))
  // console.log(batch);
}

main(process.argv[2]);
