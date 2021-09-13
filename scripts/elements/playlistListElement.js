import playlistElement from "./playlistElement.js";

export default class playlistListElement {
   constructor(parentElement, playlists) {
      this.data = playlists;
      this.parentElement = parentElement;
      for (const playlist of playlists) {
         const plEl = new playlistElement(playlist);
         this.parentElement.append(plEl.element);
      }

      this.parentElement.addEventListener("click", (event) => {
         this.clickHandler(event);
      });
   }

   clickHandler(event) {
      if (event.target.tagName !== "BUTTON") return;
      const action = event.target.value;
   }
}
