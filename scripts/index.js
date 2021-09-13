import songElement from "./songElement.js";
import playlistElement from "./playlistElement.js";
import { getSongById } from "./helpers.js";

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

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));

player.songs.forEach((song) => {
   const s = new songElement(song);
   document.querySelector("#songs").append(s.element);
});

player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

player.playlists.forEach((playlist) => {
   const p = new playlistElement(playlist);
   document.querySelector("#playlists").append(p.element);
});

currentPlaylist = player.songs.map((song) => song.id);

playSong(player.songs[0].id);
