/* eslint-disable @typescript-eslint/no-explicit-any */

export class Weather{
    opwApiKey: string;

    constructor(key: string){
        this.opwApiKey = key;
    }

    async getCityInfo(city: string) : Promise<any>{
        return this.getWeather(city);
    }

    async getWeather(city: string) : Promise<any>{
        let weatherData;
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.opwApiKey}`)
            .then(res => res.json())
            .then(data => weatherData = data)
            .catch()
        return weatherData;
    }

}