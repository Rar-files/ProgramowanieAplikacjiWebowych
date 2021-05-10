export class Weather{
    opwApiKey = "4ae9208ad817322c6b83986c2773d7a2";

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