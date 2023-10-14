exports.renderWeatherPage = (req, res, next) => {
    const userName = req.body.userName;
    const defaultLocation = req.body.defaultLocation;

    res.render('index', { userName, defaultLocation});
}