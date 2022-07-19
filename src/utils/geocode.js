const request = require('request')

const fetchLocation = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json' + 
    '?access_token=pk.eyJ1IjoibW9oc2lucmF6YTEwcCIsImEiOiJjbDU5Zm8ydzMwOTdxM2xyeDQ1MWRoNWFlIn0.--VXUI6Iv0c_xVbTPTBruw&limit=1'
    request({url: geocodeURL, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to mapbox service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('No matching results found!', undefined)
        } else {
            const feature = response.body.features[0]
            const latitude = feature.center[1]
            const longitude = feature.center[0]
            callback(undefined, {
                place: feature.place_name,
                latitude: latitude,
                longitude: longitude
            })
        }
    })
}

module.exports = {
    fetchLocation: fetchLocation
}