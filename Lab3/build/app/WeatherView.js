import { Weather } from './Weather.js';
export class WeatherView {
    constructor() {
        this.startView();
    }
    startView() {
        this.weatherAppInstance = new Weather();
    }
    addEventsListeners() {
        document.querySelector('.addBtn').addEventListener('click', () => this.addWeatherBlock());
    }
    addWeatherBlock() {
        let cityToAdd = document.querySelector('cityInput').value;
        let cityData = this.weatherAppInstance.getCityInfo(cityToAdd);
        let weatherBlock = this.getWeatherBlock(cityData);
    }
    getWeatherBlock(cityData) {
    }
}
