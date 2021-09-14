import songElement from "./songElement.js";
import { durationToSeconds, generateId, getSongById } from "../helpers.js";

export default class songListElement {
   constructor(parentElement, songs) {
      this._data = songs;
      this._parentElement = parentElement;
      this.createSongListElement();
      this._parentElement.addEventListener("click", (event) => {
         this.clickHandler(event);
      });
   }

   createSongListElement() {
      for (const song of this._data) {
         const songEl = new songElement(song);
         this._parentElement.append(songEl.element);
      }
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

   addSong(song) {
      song.duration = durationToSeconds(song.duration);
      song.id = generateId(this._data);
      this._data.push(song);
      const songEl = new songElement(song);
      this._parentElement.prepend(songEl.element);
   }

   clickHandler(event) {
      if (event.target.tagName !== "BUTTON") return;
      const action = event.target.value;

      const songEl = event.target.closest("song");
      if (!songEl) return;

      if (action === "remove") this.removeSong(songEl.id);
      if (action === "play") this.playSong(songEl.id);
   }
}
