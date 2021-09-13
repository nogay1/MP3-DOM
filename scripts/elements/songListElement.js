import songElement from "./songElement.js";

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
      const songIndex = this.data.findIndex((song) => song.id === songId);
      this.data = this.data.splice(
         this.data.findIndex((song) => song.id === songId),
         1
      );
   }

   playSong(songId) {
      this.parentElement.dispatchEvent(
         new CustomEvent("songChanged", { bubbles: true, detail: { songId } })
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
