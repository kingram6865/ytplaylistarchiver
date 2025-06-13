import 'dotenv/config';
import axios from 'axios';

const playlistUrl = process.env.PLAYLISTURL;
const playlistItems = [];

async function retrievePlaylistitems(playlistid) {
  try {
    let response = await axios.get(`${playlistUrl}&playlistId=${playlistid}`);
    console.log(response.data.pageInfo.totalResults);
    playlistItems.push(...response.data.items);
    // while (response.data.nextPageToken && i <= response.data.pageInfo.totalResults) {
    while (response.data.nextPageToken) {
      let url = `${playlistUrl}&playlistId=${playlistid}&pageToken=${response.data.nextPageToken}`
      response = await axios.get(url);
      playlistItems.push(...response.data.items);
    }
  } catch(err) {
    console.log(err);
  }

  return playlistItems;
}

retrievePlaylistitems(process.argv[2])
  .then(x => {
    // console.log(x.kind, x.etag, x.id, "\n", Object.keys(x.snippet), "\n", Object.keys(contentDetails), Object.keys(status));
    // console.log(x.kind, x.etag, x.id);
    // console.log(Object.keys(x))
    x.forEach(item => {
      let part1 = `kind: ${item.kind} etag: ${item.etag} id: ${item.id}`
      let part2 = `
        [${item.snippet.position}]: ${item.snippet.title}
        ${item.snippet.publishedAt}
        ${item.snippet.description}
        ${item.snippet.thumbnails}
        ${item.snippet.playlistId}
        ${item.snippet.videoOwnerChannelId}, ${item.snippet.videoOwnerChannelTitle}
      `
      let part2a = `[${item.snippet.position}]: ${item.snippet.title} ${item.snippet.publishedAt}`

      let part3 = `
        ${item.contentDetails.videoId} ${item.contentDetails.videoPublishedAt} status: ${item.status.privacyStatus}
      `
      console.log(`${part2a}`);
    });
  });