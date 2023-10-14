const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', authController.renderLoginPage)

router.post('/login', authController.login);

router.get('/weather', authController.renderWeatherPage)

router.post('/signup', authController.signup);

module.exports = router;