const MAX_LENGTH = 15 * 60; // 15 min
const MIN_LENGTH = 3 * 60; // 3 min

export function createElement(
   tagName,
   children = [],
   classes = [],
   attributes = {}
) {
   const elem = document.createElement(tagName);
   if (children && typeof children !== "object") children = [children];
   elem.append(...children);
   if (classes && typeof classes !== "object") classes = [classes];
   elem.classList.add(...classes);
   for (let attr in attributes) {
      elem.setAttribute(attr, attributes[attr]);
   }
   return elem;
}

export function formatDuration(duration) {
   return (
      ("00" + Math.floor(parseInt(duration) / 60)).slice(-2) +
      ":" +
      ("00" + (parseInt(duration) % 60)).slice(-2)
   );
}

export function durationColorScale(duration) {
   duration =
      duration < MIN_LENGTH
         ? MIN_LENGTH
         : duration > MAX_LENGTH
         ? MAX_LENGTH
         : duration;
   const scale = Math.floor((duration / (MAX_LENGTH - MIN_LENGTH)) * 255); // from 0 to 255;
   return `rgb(${scale},${255 - scale},0)`;
}
export function getSongById(songId) {
   return player.songs.find(({ id }) => id === songId);
}

export function generateId(elements) {
   const ids = elements.map(({ id }) => id);
   let index = 0;
   while (ids.indexOf(index) >= 0) index++;
   return index;
}

export const validator = {
   title: (value) => {
      if (value.trim().length > 0) return true;
   },
   name: (value) => {
      if (value.trim().length > 0) return true;
   },
   album: (value) => {
      if (value.trim().length > 0) return true;
   },
   duration: (value) => {
      if (value.trim().length > 0) return true;
   },
   coverArt: (value) => {
      if (value.trim().length > 0) return true;
   },
   artist: (value) => {
      if (value.trim().length > 0) return true;
   },
};
