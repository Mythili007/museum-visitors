const router = require('express').Router();
const request = require("request");
const museumVisitorsService = require("../services/MuseumVisitors.js");

router.get("/api/visitors", async (req, res) => {
    const options = {
        url: "https://data.lacity.org/resource/trxm-jn3c.json"
    };
    let qOpts = req.query;
    request(options, async (err, response, body) => {
        if (err)
            return res.status(500).json({
                "Error": err
            });
        let finalRes = await museumVisitorsService.getVisitorInfo(qOpts, body);
        return res.json(finalRes);
    });
});

module.exports = router;