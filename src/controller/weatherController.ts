const axios = require('axios');
const sma = require('sma');
const WEATHER_API_KEY = 'ec1c023df80c4125a2f143402241109';

exports.getWeatherAndSMA = async (req: any, res: any) => {
    try {
        const period = req.params.period;
        const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=chennai&days=${period}&aqi=no&alerts=no`);
        const currentTemperature = weatherResponse?.data?.current;
        const avgTempValues = weatherResponse?.data?.forecast?.forecastday?.map((day: any) => day.day.avgtemp_c);
        console.log(avgTempValues)
        res.json({
            currentTemperature,
            sma: sma(avgTempValues, period),
            timeStamp: weatherResponse?.data?.current?.last_updated
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
};