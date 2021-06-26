import { waitUntil } from 'async-wait-until';

export const PaletteColors = {
    blue: "blue",
    yellow: "yellow",
    red: "red",
    violet: "violet",
    green: "green",
    orange: "orange"
}

export default class Palette {
    private checkedColor: string;
    private PaletteElement: HTMLDivElement;

    constructor(){
        this.checkedColor = PaletteColors.blue;
        this.PaletteElement = document.querySelector(".PalleteOfColors")

        this.loadColorsToPalette();
    }

    private loadColorsToPalette(){
        for (const item in PaletteColors) {
            this.loadColor(item);
          }
    }

    private loadColor(color: string){
        const colorDiv = document.createElement('div');
        colorDiv.dataset.color = color;
        
        colorDiv.classList.add(`color-${color}`)

        colorDiv.addEventListener('click', (e) => this.getChoosedColor(e.target as HTMLDivElement));

        this.PaletteElement.appendChild(colorDiv);
    }

    private getChoosedColor(e : HTMLDivElement){
        this.checkedColor = e.dataset.color;
        this.PaletteElement.classList.toggle("invisible");
    }


    public async showPalette() : Promise<string>{
        this.PaletteElement.classList.toggle("invisible");
        
        await waitUntil(() => this.PaletteElement.classList.contains("invisible"))
        
        return this.checkedColor;
    }
    
}