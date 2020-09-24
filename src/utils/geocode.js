const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoiam9uZGFyIiwiYSI6ImNrZXVmbGk5ZzAxdW0ycXA1aXcwN3VvbTEifQ.8NuIjSus8ehD6p2XCEgG_g&limit=1'
    
    request ({ url: url, json:true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to mapbox API', undefined)
        } else if (body.features.length === 0){
            callback('Please specify a valid location. Try another search.')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode