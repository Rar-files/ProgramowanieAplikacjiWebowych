var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class Weather {
    constructor() {
        this.opwApiKey = "4ae9208ad817322c6b83986c2773d7a2";
        this.getCityInfo("myślenice");
    }
    getCityInfo(city) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getWeather(city);
        });
    }
    getWeather(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
            const weatherResponse = yield fetch(openWeatherUrl);
            const weatherData = yield weatherResponse.json();
            console.log(weatherData);
            return weatherData;
        });
    }
}
