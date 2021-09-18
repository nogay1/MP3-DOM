# MP3 DOM - [Third Weekend Assignment](./original_task.md)

A web app GUI based on the [last week project (Mp3PlayerTask)](https://github.com/noamgolani/Mp3PlayerTask). Using only Vanilla-JS, Events and DOM manipulations.

### [View Online](https://noamgolani.github.io/MP3-DOM/index.html) Version using Github-Pages.

### To run locally

      git clone https://github.com/noamgolani/MP3-DOM.git

      open "index.html" using your favorite browser

## About the project

The MP3-DOM project is build using js classes.

-  `index.js` - calls all the classes (custom elements) and implements "Top level" event-listeners.
-  `player.js` - holds all the initial player data: Songs and Playlists.
-  `helpers.js` - implements helper-functions used in other files.
-  **elements:**
   -  `playerElement.js` - a box displaying the current playing song.
   -  `songElement.js` - single song element displaying song properties.
   -  `songListElement.js` - a list displaying an array of songs and handles the song-related events.
   -  `playlistElement.js` - single playlist element displaying playlist properties.
   -  `playlistListElement.js` - a list displaying an array of playlists.

Bellow you will find descriptions for the "more interesting" files.

## [helpers.js](./helpers.js)

Implements helper-functions used in other files.

-  ### createElement:
   Easily create a HTML Element
-  ### formatDuration:
   Change a sec based duration to `mm:ss` format
-  ### durationToSeconds:
   Change a `mm:ss` based duration to sec format
-  ### getSongById:
   Returns a song from the `player` object
-  ### generateId:
   Finds a unique ID for a given array
-  ### validator:
   An objects that maps a validation function for every input name. `validator['duration']("12")` will return `false` because it is not in `mm:ss` format.

## [Original Assignment](./original_task.md)
