import playlistElement from "./elements/playlistElement.js";
import songListElement from "./elements/songListElement.js";
import { getSongById } from "./helpers.js";

const playlistList = {
   playlists: [],
   parentElement: document.getElementById("playlists"),
};

function initializeLists() {
   for (const playlist of player.playlists) {
      const plEl = new playlistElement(playlist);
      playlistList.playlists.push(plEl);
      playlistList.parentElement.append(plEl.element);
   }
}

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

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));
player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

let songList = new songListElement(
   document.getElementById("songs"),
   player.songs
);
