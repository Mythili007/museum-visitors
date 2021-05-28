const _ = require("lodash");
const moment = require("moment");


/**
 * @returns The below function returns the sum of retrieved museum object values
 */
const sumValues = (obj) => {
    let sum = 0;
    for (let element in obj) {
        if (obj.hasOwnProperty(element))
            sum += parseInt(obj[element]);
    }
    return sum;
};

/**
 * This is to constructing the required response
 * @params query parameters that user pass, and the data that we got from the LA city endpoint
 * @returns required response as below 
 * {
        "attendance": {
        “month”: string,
        “year”: number,
        “highest”: {
        “museum”: string,
        “visitors”: number
        },
        “lowest”: {
        “museum”: string,
        “visitors”: number},
        “ignored”: {
        “museum”: string,
        “visitors”: number
        },
        “total”: number
        }
    }
 */

module.exports.getVisitorInfo = async (queryParams, data) => {
    const date = moment(queryParams.date, "x").format("YYYY-MMM-DD");
    const ignoredMuseum = queryParams.ignored || "";
    const savedByMonth = {};
    const docs = JSON.parse(data);
    docs.map((doc) => {
        let _date = doc.month.split("T")[0];
        _date = moment(_date).format("YYYY-MMM-DD");
        delete doc.month;
        savedByMonth[_date] = doc;
    });
    const doc = savedByMonth[date];
    const year = parseInt(date.split('-')[0]);
    const month = date.split('-')[1];
    let sortedObj = _.mapValues(_.invert(_.invert(doc)), parseInt);
    let total = sumValues(doc);
    let highest, lowest;
    // If the ignored museum is lowest
    const museums = Object.keys(sortedObj);
    if (museums[0] === ignoredMuseum) {
        lowest = {
            museum: Object.keys(sortedObj)[1],
            visitors: sortedObj[museums[1]]
        };
    } else {
        lowest = {
            museum: Object.keys(sortedObj)[0],
            visitors: sortedObj[museums[0]]
        };
    }
    // If the ignored museum is the highest
    if (museums[museums.length - 1] === ignoredMuseum) {
        const _highest = Object.keys(sortedObj)[Object.keys(sortedObj).length - 2];
        highest = {
            museum: _highest,
            visitors: sortedObj[museums[museums.length - 2]]
        };
    } else {
        const _highest = Object.keys(sortedObj)[Object.keys(sortedObj).length - 1];
        highest = {
            museum: _highest,
            visitors: sortedObj[museums[museums.length - 1]]
        };
    }
    const attendance = _.assign({}, {
        month,
        year,
        highest,
        lowest,
        total
    });

    // If ignored museum is present
    if (!_.isEmpty(ignoredMuseum)) {
        attendance.ignored = {
            museum: ignoredMuseum,
            visitors: parseInt(doc[ignoredMuseum])
        };
        attendance.total = total - parseInt(doc[ignoredMuseum]);
    }
    return attendance;
};