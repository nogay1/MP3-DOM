import { createElement } from "../helpers.js";

export default class playerElement {
   constructor(song, top = 0, left = 0) {
      this.song = song;
      this.element = this.createPlayerElement(song);
      this.element.style.top = top;
      this.element.style.left = left;
   }

   createPlayerElement({ title, coverArt }) {
      const children = [
         createElement("img", [], [], { src: coverArt }),
         createElement("span", title),
      ];
      return createElement("div", children, "player");
   }
}
