import playlistElement from "./playlistElement.js";

export default class playlistListElement {
   constructor(parentElement, playlists) {
      this._data = playlists;
      this.parentElement = parentElement;
      for (const playlist of playlists) {
         const plEl = new playlistElement(playlist);
         this.parentElement.append(plEl.element);
      }

      this.parentElement.addEventListener("click", (event) => {
         this.clickHandler(event);
      });
   }

   updateRemovedSong(songId) {
      this.parentElement.innerHTML = "";
      this._data.forEach((playlist, index) => {
         const newArr = this._data[index].songs.filter(
            (id) => parseInt(id) !== parseInt(songId)
         );
         this._data[index].songs = newArr;
         if (newArr.length > 0) {
            const plEl = new playlistElement(this._data[index]);
            this.parentElement.append(plEl.element);
         }
      });
   }

   clickHandler(event) {
      if (event.target.tagName !== "BUTTON") return;
      const action = event.target.value;
   }
}
