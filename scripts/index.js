import playlistListElement from "./elements/playlistListElement.js";
import songListElement from "./elements/songListElement.js";
import playerElement from "./elements/playerElement.js";
import { validator } from "./helpers.js";

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));
player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

const playerEl = new playerElement(player.songs[0], document.body);

const songList = new songListElement(
   document.getElementById("songs"),
   player.songs
);

const playlistList = new playlistListElement(
   document.getElementById("playlists"),
   player.playlists
);

document.addEventListener("songChanged", (event) => {
   const { song } = event.detail;
   if (!song) return;

   playerEl.song = song;
});

const addSongForm = document.getElementById("addSongForm");
addSongForm.addEventListener("submit", (event) => {
   event.preventDefault();
   const newSong = {
      name: null,
      artist: null,
      coverArt: null,
      album: null,
      title: null,
      duration: null,
   };
   for (const param in newSong) {
      if (!validator[param](addSongForm[param].value)) alert("Bad Song");
      newSong[param] = addSongForm[param].value.trim();
   }
   songList.addSong(newSong);
});

addSongForm.addEventListener(
   "blur",
   (event) => {
      const { name, value } = event.target;
      if (validator[name]) {
         if (validator[name](value)) event.target.classList.remove("invalid");
         else event.target.classList.add("invalid");
      }
   },
   true
);
