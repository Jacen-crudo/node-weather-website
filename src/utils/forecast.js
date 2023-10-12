const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e6693879fcf37e326b2f1d7d141ca81b&query='+ latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to reach the Weather Service!')
        } else if (body.error) {
            callback('Unable to find Location for Lon: ' + longitude + ', Lat: ' + latitude)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                unit: body.request.unit.toUpperCase(),
                temperature: body.current.temperature,
                feelslike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast;