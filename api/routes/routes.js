const { Router } = require("express");
const axios = require('axios');

const IUserID = 2308460;
const IURL = "https://itch.io/api/1/";
const IAPIKey = "WgcK1w0WJTadBjw1OWz1C9O64Uv3s0nVkFQhAUiI";
const IReqURL = IURL + "/" + IAPIKey + "/my-games";

const router = Router();

router.get("/gamesdata", async (req, res) => {
    axios.get(IReqURL)
    .then(response => {
        console.log(response.data.games[0]);
        // res.set("Content-Type", "application/json");
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.error(error);
        res.status(400).send(error);
    });
});

router.get("/musicsdata", async (req, res) => {
  
});

module.exports = router;