export class Weather{
    opwApiKey = 'b60eb9a8ecmsh7fa0b5402e50928p15019fjsn7a5b382d1f5e';

    constructor(){
        this.getCityInfo("myślenice");
    }

    async getCityInfo(city: string){
        this.getWeather(city);
    }

    async getWeather(city: string) : Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        return weatherData;
    }


}