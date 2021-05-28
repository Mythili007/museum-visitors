const express = require("express");
const router = express.Router();
const MuseumVisitorsService = require("../services/MuseumVisitors");
const _ = require("lodash");
const http = require("http");
const https = require("https");
const Promise = require("bluebird");
const request = require("request");



/**
 * @GET api to fetch visitor information for the given date
 * @api /visitors?from=&to=
 * @returns 
    ● The month of the search
    ● The year of the search
    ● The total visitors for the month, not counting the ignored museum
    ● The museum with the highest number of visitors, not counting the ignored museum
    ● The museum with the lowest number of visitors, not counting the ignored museum
    ● The ignored museum.
 */
// module.exports.museumVisitorsExternal = (callback) =>{
//     let data = "";
//    https.get('https://data.lacity.org/resource/trxm-jn3c.json', (resp) => {
//         resp.on("data", chunk => {
//             data += chunk;
//         });

//         resp.on("end", () => {
//             // console.log("data: *** ", data);
//             // call service here

//             return callback(JSON.parse(data));
//         })
//     }).on("error", err => {
//         console.log("Error: ", err.message);
//     });
// };

// router.get("/visitors?date=", async (req, res) => {
//     // console.log("req: ", req);
//     // const opts = _.assign({},{date: req.query.date, ignored: _.get(req.query, "ignored")});
//     let data1;
//     https.get('https://data.lacity.org/resource/trxm-jn3c.json', (resp) => {
//         resp.on("data", chunk => {
//             data += chunk;
//         });

//         resp.on("end", () => {
//             // console.log("data: *** ", data);
//             // call service here

//             return callback(JSON.parse(data));
//         })
//     }).on("error", err => {
//         console.log("Error: ", err.message);
//     });
//     console.log("file: museumVisitors.rest.js ~ line 43 ~ router.get ~ data", data)
//     res.json(data);
// });

let data1;

module.exports.museumVisitorsApi = (callback) => {
    request('https://data.lacity.org/resource/trxm-jn3c.json', {json: true}, (err, res, body) => {
        if(err)
            return callback(err);
        return callback(body);
    });
}

router.get("/api/visitors", async (req, res)=>{
    // const opts = _.assign({},{from: req.query.from, to: req.query.to});
    // try {
    //     const docs = await CalendarService.getAllEvents(opts);
    //     return res.json(docs);
    // } catch (err){
    //     console.log("Error while fetching events: ", err);
    //     res.json({ message: err });
    // }
    https.createServer((req,res) => {
        request('https://data.lacity.org/resource/trxm-jn3c.json', response => {
            data1 = res.write(JSON.stringify(response));
            res.end();
        });
    });
    console.log("data1: ", data1);
});


module.exports = router;