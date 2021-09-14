import { formatDuration } from "../helpers.js";

export default class playerElement {
   constructor(playerElement, currentSong) {
      this._playerElement = playerElement;
      this._playerElement.addEventListener("click", this.click.bind(this));
      this._passedTime = 0;
      this._queue = [];
      this.song = currentSong;
      this._countingIntervel = setInterval(() => {
         this.tick(1);
      }, 1000);
   }

   addToQueue(...songs) {
      this._queue.push(...songs);
   }

   stop() {
      clearInterval(this._countingIntervel);
   }

   play() {
      this._countingIntervel = setInterval(() => {
         this.tick(1);
      }, 1000);
   }

   playNext() {
      if (this._queue.length < 1) this.song = this._song;
      this.song = this._queue.pop();
   }

   click(event) {
      const button = event.target;
      if (button.tagName !== "BUTTON") return;
      console.log(button.innerText);

      if (button.innerText === "Stop") {
         this.stop();
         console.log(button);
         button.innerText = "Play";
      } else if (button.innerText === "Play") {
         this.play();
         button.innerText = "Stop";
      }
   }

   set song(song) {
      this._song = song;
      this._passedTime = 0;
      const { coverArt, duration } = song;

      const $ = (sel) => this._playerElement.querySelector(sel);

      $(".info img").setAttribute("src", coverArt);
      $("#time").innerText = formatDuration(duration);
      this.tick(0);
   }

   tick(time) {
      this._passedTime += time;
      const $ = (sel) => this._playerElement.querySelector(sel);
      $("#progressPoint").style.left =
         Math.floor((100 * this._passedTime) / this._song.duration) + "%";
      $("#negativeTime").innerText = formatDuration(this._passedTime);

      if (this._passedTime >= this._song.duration) this.playNext();
   }
}
