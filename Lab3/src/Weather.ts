export class Weather{
    opwApiKey = "4aa22253676913da0265dca40bf37854";

    constructor(){
        this.getCityInfo("myślenice");
    }

    async getCityInfo(city: string){
        this.getWeather(city);
    }

    async getWeather(city: string) : Promise<void> {
        let weatherData;
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.opwApiKey}`)
            .then(res => res.json())
            .then(data => weatherData = data);
        console.log(weatherData);
        return weatherData;
    }

}