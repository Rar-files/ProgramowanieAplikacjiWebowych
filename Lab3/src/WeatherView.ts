import {Weather} from './Weather.js';

export class WeatherView{
    weatherAppInstance: Weather;

    constructor(){
        this.startView();
    }

    startView() : void{
        this.weatherAppInstance = new Weather();
    }

    addEventsListeners() : void{
        document.querySelector('.addBtn').addEventListener('click', () => this.addWeatherBlock())
    }

    addWeatherBlock() : void{
        let cityToAdd = (document.querySelector('cityInput') as HTMLInputElement).value;
        let cityData = this.weatherAppInstance.getCityInfo(cityToAdd);
        let weatherBlock = this.getWeatherBlock(cityData);
    }

    getWeatherBlock(cityData : Promise<void>) : any{
        
    }
}