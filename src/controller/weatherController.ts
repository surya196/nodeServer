const axios = require('axios');

const WEATHER_API_KEY = '18ef645d15e795f78888fc6d318245cc';
const WEATHER_API_URL = `https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${13.082680}&lon=${80.270721}&appid=${WEATHER_API_KEY}`;

const calculateSMA = (data: any, period: any) => {
    let sma: number = 0;
    for (const val of data) {
        sma += val?.main?.temp;
    }
    return sma / (period * 24);
};

const getWeatherAndSMA = async (req: any, res: any) => {
    try {
        const period = req.params.period;
        const response = await axios.get(WEATHER_API_URL +`& cnt=${ period }`);
        const weatherResponse = response?.list;
        const currentTemperature = weatherResponse[weatherResponse.length - 1].main.temp;
        const sma = calculateSMA(weatherResponse, period);

        res.json({
            currentTemperature,
            sma: sma
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching weather data');
    }
};

module.exports = {
    getWeatherAndSMA,
};
