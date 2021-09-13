import playlistListElement from "./elements/playlistListElement.js";
import songListElement from "./elements/songListElement.js";

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));
player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

const songList = new songListElement(
   document.getElementById("songs"),
   player.songs
);

const playlistList = new playlistListElement(
   document.getElementById("playlists"),
   player.playlists
);
