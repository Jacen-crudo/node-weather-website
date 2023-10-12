const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamFjZW5jcnVkbyIsImEiOiJjbG0xYzdhaXQyeWlmM2RxanFjMDU2dWZ6In0.L09I55zI5YwZDVCC-B7B0g&limit=1&language=en'

    request({url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to Location Services!')
        } else if (body.features.length === 0) {
            callback('Unable to find location, please try again with different search results.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name_en
            })
        }
    })
}

module.exports = geocode