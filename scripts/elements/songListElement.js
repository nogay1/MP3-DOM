import songElement from "./songElement.js";
import { createElement, getSongById } from "../helpers.js";
import addSongElement from "./addSongElement.js";

export default class songListElement {
   constructor(parentElement, songs) {
      this._data = songs;
      this._parentElement = parentElement;
      this._parentElement.append(...this.createSongListElement());
      this._parentElement.addEventListener("click", (event) => {
         this.clickHandler(event);
      });
   }

   createSongListElement() {
      const children = [];
      for (const song of this._data) {
         const songEl = new songElement(song);
         children.push(songEl.element);
      }
      return [
         createElement(
            "div",
            [createElement("button", "Add Song", [], { value: "addSong" })],
            "songs-options"
         ),
         ...children,
      ];
   }

   removeSong(songId) {
      this._parentElement.removeChild(
         this._parentElement.querySelector(`[id="${songId}"]`)
      );
      this._data = this._data.filter(({ id }) => id !== parseInt(songId));
   }

   playSong(songId) {
      const songToPlay = getSongById(parseInt(songId));
      this._parentElement.dispatchEvent(
         new CustomEvent("songChanged", {
            bubbles: true,
            detail: { song: songToPlay },
         })
      );
   }

   addSong() {
      const dialog = new addSongElement((songData) => {
         console.log(songData);
      });
   }

   clickHandler(event) {
      if (event.target.tagName !== "BUTTON") return;
      const action = event.target.value;

      if (action === "addSong") this.addSong();

      const songEl = event.target.closest("song");
      if (!songEl) return;

      if (action === "remove") this.removeSong(songEl.id);
      if (action === "play") this.playSong(songEl.id);
   }
}
