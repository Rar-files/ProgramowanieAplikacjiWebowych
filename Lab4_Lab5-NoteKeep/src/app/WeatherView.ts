/* eslint-disable @typescript-eslint/no-explicit-any */
import {Weather} from './Weather';

export class WeatherView{
    weatherAppInstance: Weather;
    cityArr: string[];
    root : HTMLDivElement;

    constructor(){
        this.weatherAppInstance = new Weather("4aa22253676913da0265dca40bf37854");
    }

    public Start() : void{
        this.addEventsListeners();
        this.root = document.querySelector(".WeatherRoot");
        this.readLocalStorage();

        this.root.appendChild(document.createElement("Note"))
    }

    addEventsListeners() : void{
        document.querySelector('.AddBtn').addEventListener('click', () => this.addWeatherBlockFromInput());
        document.querySelector('body').addEventListener("keydown", (ev: KeyboardEvent) => this.keyPressed(ev));
    }

    keyPressed(ev : KeyboardEvent):void{
        if (ev.key == "Enter") {
            ev.preventDefault();
            this.addWeatherBlockFromInput();
        }
    }

    readLocalStorage() : void{
        this.cityArr = JSON.parse(localStorage.getItem("weatherCities"));
        if(this.cityArr){
            this.cityArr.forEach(cityToAdd => this.getWeatherBlockFromAPI(cityToAdd))
        }
        else{
            this.cityArr = [];
        }
    }

    addWeatherBlockFromInput() : void{
        const cityToAdd = (document.querySelector('.CityInput') as HTMLInputElement).value;
        if(cityToAdd){
            this.cityArr.push(cityToAdd);
            localStorage.setItem("weatherCities", JSON.stringify(this.cityArr));
            this.getWeatherBlockFromAPI(cityToAdd);
        }
    }

    async getWeatherBlockFromAPI(cityToAdd : string) : Promise<void>{
        const cityData = await this.weatherAppInstance.getCityInfo(cityToAdd);
        const weatherBlock = this.getWeatherBlock(cityData);
        this.root.appendChild(weatherBlock);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    getWeatherBlock(data : any) : HTMLDivElement{

        const WeatherBlock = document.createElement("div");
        WeatherBlock.setAttribute("class", "WeatherBlock");


        const BlockHeader = document.createElement("div");
        BlockHeader.setAttribute("class", "BlockHeader");

        const WeatherIcn  = document.createElement("div");
        WeatherIcn.setAttribute("class", "WeatherIcn");

        const img = document.createElement("img");
        img.setAttribute("src",`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
        WeatherIcn.appendChild(img);
        BlockHeader.appendChild(WeatherIcn);

        const Locality = document.createElement("div");
        Locality.setAttribute("class", "Locality");
        const spanName = document.createElement("span");
        spanName.setAttribute("class", "spanName");
        spanName.innerText = data.name;
        Locality.appendChild(spanName);
        const spanWeatherState = document.createElement("span");
        spanWeatherState.innerText = data.weather[0].main;
        Locality.appendChild(spanWeatherState);
        BlockHeader.appendChild(Locality);
        WeatherBlock.appendChild(BlockHeader);


        const WeatherData = document.createElement("div");
        WeatherData.setAttribute("class", "WeatherData");

        const LeftData  = document.createElement("div");
        LeftData.setAttribute("class", "LeftData");


        const cloudTxt = document.createElement("span");
        cloudTxt.innerText = "Clouds:"
        LeftData.appendChild(cloudTxt);

        const cloudSpeed = document.createElement("span");
        cloudSpeed.innerText = data.clouds.all + "%";
        LeftData.appendChild(cloudSpeed);

        const windTxt = document.createElement("span");
        windTxt.innerText = "Wind:"
        LeftData.appendChild(windTxt);

        const windSpeed = document.createElement("span");
        windSpeed.innerText = data.wind.speed + " km/h";
        LeftData.appendChild(windSpeed);

        WeatherData.appendChild(LeftData);

        const RightData  = document.createElement("div");
        RightData.setAttribute("class", "RightData");

        const pressure = document.createElement("span");
        pressure.innerText = data.main.pressure + " hPa"
        RightData.appendChild(pressure);

        const humidity = document.createElement("span");
        humidity.innerText = data.main.humidity + "%";
        RightData.appendChild(humidity);

        const Temp = document.createElement("span");
        Temp.setAttribute("class", "Temp");
        Temp.innerText = Math.round(data.main.temp) + "°C";
        RightData.appendChild(Temp);
        WeatherData.appendChild(RightData);
        WeatherBlock.appendChild(WeatherData);

        return WeatherBlock;
    }
}