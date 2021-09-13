import songElement from "./songElement.js";
import { getSongById } from "../helpers.js";

export default class songListElement {
   constructor(parentElement, songs) {
      this.data = songs;
      this.parentElement = parentElement;
      for (const song of songs) {
         const songEl = new songElement(song);
         this.parentElement.append(songEl.element);
      }

      this.parentElement.addEventListener("click", (event) => {
         this.clickHandler(event);
      });
   }

   removeSong(songId) {
      this.parentElement.removeChild(
         this.parentElement.querySelector(`[id="${songId}"]`)
      );
      this.data = this.data.filter(({ id }) => id !== parseInt(songId));
   }

   playSong(songId) {
      const songToPlay = getSongById(parseInt(songId));
      this.parentElement.dispatchEvent(
         new CustomEvent("songChanged", {
            bubbles: true,
            detail: { song: songToPlay },
         })
      );
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
