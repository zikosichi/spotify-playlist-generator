# TicketSwap assessment
Thank you for doing our frontend assessment. The goal of the assessment would be to create a simple yet full experience Spotify search. We already setup some things for you, including build tools (js and css), React basic setup, Spotify auth redirect and a Spotify API helper. So you can focus on the frontend only. If you have any questions you can always [contact us](mailto:rob@ticketswap.com).

## Design
The design is included in the repo at `./design`. Included is a Sketch file and some preview images.

## Setup
First of all, you need to setup your local environment.
We already created a small boilerplate where you can work with. If you don't have [node/npm](https://nodejs.org/en/) installed yet be sure to do so.

#### Download repository
You can download/clone the repo to your local machine and follow the next instructions to get everything up and running.

#### Installing dependencies
```
npm install
```

#### Start development server
```
npm start
```
The server will start at [localhost:1337](http://localhost:1337)
You can edit the JS files at `./src/js` and the sass files at `./src/css`. After making changes to the files the server will automatically reload the page. If you want to make changes to the HTML file you can find it at `./dist/index.html`.

#### Start build
```
npm run build
```
This will generate all the files needed for a full exported build. For convenience it also starts up a server to easily test the build.

## Spotify API
Because we are using the Spotify API you need a Spotify account. It could be a new free account or your existing account (no extra permissions needed). If you want more details about the API you can have a look[here](https://developer.spotify.com/web-api/).

We already included a [Spotify web API](https://github.com/JMPerez/spotify-web-api-js) helper so you can easily query for the different types of data you want without fully understanding the spotify API. Check the [repo](https://github.com/JMPerez/spotify-web-api-js) for everything you can do with this helper.

You can import and use the Spotify web API helper by importing it in the JS file like so:
```
import spotifyApi from 'utils/spotify'
```
(Which we already did in `./src/js/components/App.js`)

## Handing in the assessment
When you're finished developing the web-app (as per design) you can send it to us in reply of the mail you got with this assessment.

### References
- [React docs](https://reactjs.org/docs/hello-world.html)
- [Spotify API docs](https://developer.spotify.com/web-api/)
- [Spotify web API helper docs](https://github.com/JMPerez/spotify-web-api-js)
- [SASS docs](http://sass-lang.com/documentation/file.SASS_REFERENCE.html)

### Good luck
And again if you have any questions, [let us know](mailto:rob@ticketswap.com)!
