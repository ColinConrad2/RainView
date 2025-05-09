/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */;

const functions = require("firebase-functions");
const axios = require("axios");
const cors = require("cors")({origin: true});

exports.getWeather = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const {lat, lon} = req.query;
    const apiKey = "74998a7eff5cb76329a40f8ef1081ab0"

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      const rain = response.data.rain ? response.data.rain["1h"] || 0 : 0;

      res.send(`
        <div id="weatherInfo">
          <h2>Rainfall at [${lat}, ${lon}]</h2>
          <p><strong>${rain} mm</strong> in the past hour.</p>
        </div>
      `);
    } catch (error) {
      res.status(500).send(`
        <div id="weatherInfo">
          <p>Error fetching data.</p>
        </div>
      `);
    }
  });
});
