const request = require('request')

const getForecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7d51e589158e59c46537d1c037816dd7&query=' 
        + location.latitude + ',' + location.longitude
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            const data = body.current
            callback(undefined, {
                description: data.weather_descriptions[0],
                temperature: data.temperature,
                feelslike: data.feelslike
            })
        }
    })
}

module.exports = {
    getForecast: getForecast
}