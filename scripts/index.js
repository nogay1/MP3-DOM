const formatDuration = (duration) =>
   ("00" + Math.floor(parseInt(duration) / 60)).slice(-2) +
   ":" +
   ("00" + (parseInt(duration) % 60)).slice(-2);
const getSongById = (songId) => player.songs.find(({ id }) => id === songId);

const MAX_LENGTH = 15 * 60; // 15 min
const MIN_LENGTH = 3 * 60; // 3 min
const colorScale = (duration) => {
   duration =
      duration < MIN_LENGTH
         ? MIN_LENGTH
         : duration > MAX_LENGTH
         ? MAX_LENGTH
         : duration;
   const scale = Math.floor((duration / (MAX_LENGTH - MIN_LENGTH)) * 255); // from 0 to 255;
   return `rgb(${scale},${255 - scale},0)`;
};

let currentPlaylist, currentSong, currentTimeout;

const playNext = () => {
   const currentIndex = currentPlaylist.indexOf(currentSong);
   if (currentIndex + 1 === currentPlaylist.length)
      playSong(currentPlaylist[0]);
   else playSong(currentPlaylist[currentIndex + 1]);
};

function playSong(songId) {
   currentSong = songId;
   const { title, coverArt, artist, duration } = getSongById(songId);
   const currentElem = document.getElementById("current");
   currentElem.querySelector("img").setAttribute("src", coverArt);
   currentElem.querySelector(
      "div"
   ).innerHTML = `<strong>${title}</strong> ${artist}`;
   if (currentTimeout) clearTimeout(currentTimeout);
   currentTimeout = setTimeout(playNext, duration * 1000);
}

function createSongElement({ id, title, album, artist, duration, coverArt }) {
   const children = [
      createElement("img", [], "coverArt", {
         alt: "Cover art of the song",
         src: coverArt,
      }),
      createElement("p", [], "desc"),
      createElement("span", formatDuration(duration), "duration", {
         style: `color: ${colorScale(duration)}`,
      }),
   ];
   children[1].innerHTML = `
    <strong>${title}</strong> ${artist}<br>
      album: ${album}
      `;
   const attrs = { onclick: `playSong(${id})` };
   return createElement("div", children, "song", attrs);
}

function createPlaylistElement({ name, songs }) {
   const duration = songs.reduce(
      (sum, songId) => getSongById(songId).duration + sum,
      0
   );
   const children = [
      createElement("p", [], "desc"),
      createElement("span", formatDuration(duration), "duration"),
   ];
   children[0].innerHTML = `
    <strong>${name}</strong> <br>
      ${songs.length} songs
      `;
   return createElement("div", children, "playlist");
}

function createElement(tagName, children = [], classes = [], attributes = {}) {
   const elem = document.createElement(tagName);
   if (children && typeof children !== "object") children = [children];
   elem.append(...children);
   if (classes && typeof classes !== "object") classes = [classes];
   elem.classList.add(...classes);
   for (let attr in attributes) {
      elem.setAttribute(attr, attributes[attr]);
   }
   return elem;
}

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));

player.songs.forEach((song) => {
   document.querySelector("#songs").append(createSongElement(song));
});

player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

player.playlists.forEach((playlist) => {
   document.querySelector("#playlists").append(createPlaylistElement(playlist));
});

currentPlaylist = player.songs.map((song) => song.id);

playSong(player.songs[0].id);
