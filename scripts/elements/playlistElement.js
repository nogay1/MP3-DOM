import { createElement, formatDuration, getSongById } from "../helpers.js";

export default class playlistElement {
   constructor(playlist) {
      this.playlist = playlist;
      this.element = this.createPlaylistElement(playlist);
   }
   createPlaylistElement({ name, songs }) {
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
}
