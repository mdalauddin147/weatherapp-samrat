const express = require("express");

const feedController = require("../controllers/auth");

const router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

router.get('/weather', feedController.renderWeatherPage)

module.exports = router;