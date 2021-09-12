const formatDuration = (duration) =>
   ("00" + Math.floor(parseInt(duration) / 60)).slice(-2) +
   ":" +
   ("00" + (parseInt(duration) % 60)).slice(-2);
const getSongById = (songId) => player.songs.find(({ id }) => id === songId);
/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
   // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
   const children = [
      createElement("img", [], "coverArt", {
         alt: "Cover art of the song",
         src: coverArt,
      }),
      createElement("p", [], "desc"),
      createElement("span", formatDuration(duration), "duration"),
   ];
   children[1].innerHTML = `
    <strong>${title}</strong> ${artist}<br>
      album: ${album}
      `;
   const attrs = { onclick: `playSong(${id})` };
   return createElement("div", children, "song", attrs);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ name, songs }) {
   console.log(songs);
   const duration = songs.reduce(
      (sum, songId) => getSongById(songId).duration + sum,
      0
   );
   console.log(duration);
   const children = [
      createElement("p", [], "desc"),
      createElement("span", formatDuration(duration), "duration"),
   ];
   children[0].innerHTML = `
    <strong>${name}</strong> <br>
      ${songs.length} songs
      `;
   return createElement("div", children, "playlist");
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
function createElement(tagName, children = [], classes = [], attributes = {}) {
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

player.songs.sort((songA, songB) => songA.title.localeCompare(songB.title));

player.songs.forEach((song) => {
   document.querySelector("#songs").append(createSongElement(song));
});

player.playlists.sort((pl1, pl2) => pl1.name.localeCompare(pl2.name));

player.playlists.forEach((playlist) => {
   document.querySelector("#playlists").append(createPlaylistElement(playlist));
});
