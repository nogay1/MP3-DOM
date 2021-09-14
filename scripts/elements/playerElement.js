import { createElement, formatDuration } from "../helpers.js";

export default class playerElement {
   constructor(playerElement, currentSong) {
      this._playerElement = playerElement;
      this._passedTime = 0;
      this.song = currentSong;
      this._countingIntervel = setInterval(() => {
         this.tick();
      }, 1000);
   }

   set song(song) {
      this._song = song;
      const { coverArt, duration } = song;

      const $ = (sel) => this._playerElement.querySelector(sel);

      $(".info img").setAttribute("src", coverArt);
      $("#time").innerText = formatDuration(duration);
   }

   tick() {
      this._passedTime++;
      const $ = (sel) => this._playerElement.querySelector(sel);
      $("#progressPoint").style.left =
         Math.floor((100 * this._passedTime) / this._song.duration) + "%";
      $("#negativeTime").innerText = formatDuration(this._passedTime);
   }
}
