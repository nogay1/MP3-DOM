import { createElement } from "../helpers.js";

export default class playerElement {
   constructor(song, top, left) {
      this.song = song;
      this.element = this.createPlayerElement(song);
   }

   createPlayerElement({ title, coverArt }) {
      const children = [
         createElement("img", [], [], { src: coverArt }),
         createElement("span", title),
      ];
      return createElement("div", children, "player");
   }
}
