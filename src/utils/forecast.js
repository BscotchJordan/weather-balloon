const request = require('request');
const querystring = require('querystring');


const forecast = (latitude, longitude, callback) => {
    const params = {
        access_key: 'be3a7998263f403852a64637c4752ac5',
        query: `${latitude},${longitude}`,
        units: 'f'
    };
    const url = `http://api.weatherstack.com/current?${querystring.stringify(params)}`;
    // const url = 'http://api.weatherstack.com/current?access_key=be3a7998263f403852a64637c4752ac5&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json:true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weatherstack API', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })

}

module.exports = forecast