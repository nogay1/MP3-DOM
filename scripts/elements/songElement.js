import {
   createElement,
   formatDuration,
   durationColorScale,
} from "../helpers.js";

export default class songElement {
   constructor(song) {
      this.song = song;
      this.element = this.createSongElement(song);
   }

   createSongElement({ id, title, album, artist, duration, coverArt }) {
      const children = [
         createElement("img", [], "coverArt", {
            alt: "Cover art of the song",
            src: coverArt,
         }),
         createElement("p", [], "desc"),
         createElement(
            "div",
            [
               createElement("button", "play", [], { value: "play" }),
               createElement("button", "remove", [], { value: "remove" }),
            ],
            "options"
         ),
         createElement("span", formatDuration(duration), "duration", {
            style: `color: ${durationColorScale(duration)}`,
         }),
      ];
      children[1].innerHTML = `
    <strong>${title}</strong> ${artist}<br>
      album: ${album}
      `;
      const attrs = { id };
      return createElement("div", children, "song", attrs);
   }
}
