import playlistListElement from "./elements/playlistListElement.js";
import songListElement from "./elements/songListElement.js";
import playerElement from "./elements/playerElement.js";

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));
player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

const playerEl = new playerElement(player.songs[0], 0, 0);
document.body.append(playerEl.element);

const songList = new songListElement(
   document.getElementById("songs"),
   player.songs
);

const playlistList = new playlistListElement(
   document.getElementById("playlists"),
   player.playlists
);

document.addEventListener("songChanged", (event) => {
   console.log(event);
});
