const request = require("postman-request");

module.exports = function geocode (address, callback) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYm9kYW1hdCIsImEiOiJja3NlajNuaWUxMHh3Mm9xa2FqMHg0c3ppIn0.r4-rm-EWug5H4AOMYJk-tw&limit=1'

    request(url, { json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}
