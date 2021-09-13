import { createElement } from "../helpers.js";

//   createSongElement({ id, title, album, artist, duration, coverArt }) {

const FORM_CONTENT = `
   <label for="name"> title </label>
   <input name="title" id="name"/>

   <label for="album"> album </label>
   <input name="album" id="album"/>
   
   <label for="atist"> artist </label>
   <input name="artist" id="artist"/>

   <label for="duration"> duration </label>
   <input type="number" name="duration" id="duration"/>

   <label for="coverArt"> cover art URL </label>
   <input name="coverArt" id="coverArt"/>

   <button type="submit"> Add Song </buttton>
`;

export default class addSongElement {
   constructor(callback) {
      this._callback = callback;
      this._element = this.createAddSongDialog();
      document.body.append(this._element);
      document.body.classList.toggle("freeze");

      this._element.addEventListener("submit", (event) => {
         event.preventDefault();
         const { title, album, artist, duration, coverArt } =
            event.target.elements;

         document.body.removeChild(this._element);
         document.body.classList.toggle("freeze");

         callback({
            title: title.value,
            album: album.value,
            artist: artist.value,
            duration: duration.value,
            coverArt: coverArt.value,
         });
      });
   }
   createAddSongDialog() {
      const element = createElement("form", [], "add-song-dialog");
      element.innerHTML = FORM_CONTENT;
      return element;
   }
}
