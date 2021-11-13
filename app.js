const express = require("express");
const cors = require("cors");
const { json } = require("express");
const axios = require('axios');
const SoundCloud = require("soundcloud-scraper");

const SCAPIKey = SoundCloud.keygen();
const client = new SoundCloud.Client(SCAPIKey);
const SCUserURL = "https://soundcloud.com/markkeeble";

const IAPIKey = "WgcK1w0WJTadBjw1OWz1C9O64Uv3s0nVkFQhAUiI";
const IURL = "https://itch.io/api/1/";
const IReqURL = IURL + "/" + IAPIKey + "/my-games";

const port = 8080;
const app = express();

app.use(json());
app.use(cors());
app.options('*', cors());

app.get("/gamesdata", async (req, res) => {
    axios.get(IReqURL)
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        res.status(400).send(error);
    });
});

app.get("/musicsdata", async (req, res) => {
    client.getUser(SCUserURL)
    .then(response => {
        async function getSongInfos () {
            let songs = [];
            let tracks = response.tracks;

            await tracks.reduce(async (promise, song) => {
              await promise;
              const songInfo = await client.getSongInfo(song.url);
              songs.push(songInfo);
            }, Promise.resolve(songs));

            return songs;
        }

        getSongInfos()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.status(400).send(error);
        })
    })
    .catch(error => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});