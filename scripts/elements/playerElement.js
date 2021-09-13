import { createElement } from "../helpers.js";

export default class playerElement {
   constructor(song, parentElement, top = 0, left = 0) {
      this._song = song;
      this._top = top;
      this._left = left;
      this._parentElement = parentElement;
      this._element = this.createPlayerElement(song);
      this._parentElement.append(this._element);
   }

   set song(song) {
      this._song = song;
      this._parentElement.removeChild(this._element);
      this._element = this.createPlayerElement(this._song);
      this._parentElement.append(this._element);
   }

   createPlayerElement({ title, coverArt }) {
      const children = [
         createElement("img", [], [], { src: coverArt }),
         createElement("span", title),
      ];
      const element = createElement("div", children, "player");
      element.style.top = this._top;
      element.style.left = this._left;
      return element;
   }
}
