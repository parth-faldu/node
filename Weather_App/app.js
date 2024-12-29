import readline from 'readline/promises';

const APIKEY = '5cf65cab02c9768ea3ac991c1dfe8c2b';
const BASEURL = `https://api.openweathermap.org/data/2.5/weather`;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = async (city) => {
    const URL = `${BASEURL}?q=${city}&appid=${APIKEY}&units=metric`;
    try {
        const response = await fetch(URL);
        if(!response.ok){
            throw new Error('City Not Found.!!');
        }
        else{
            const weatherData = await response.json();

            console.log('\n---Weather Information---\n');
            console.log(`City : ${weatherData.name}`);
            console.log(`Temperature : ${weatherData.main.temp}℃`);
            console.log(`Description : ${weatherData.weather[0].description}`);
            console.log(`Humidity : ${weatherData.main.humidity}%`);
            console.log(`Wind Speed : ${weatherData.wind.speed}m/s\n`);
        }
    } 
    catch (error) {
        console.log(error.message);
    }
}
const city = await rl.question('Enter City Name : ');
await getWeather(city);
rl.close();