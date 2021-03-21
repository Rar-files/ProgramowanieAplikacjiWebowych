class StatsApp{
    numbersOfParam : HTMLInputElement;
    inputsDiv : HTMLDivElement;
    delateInputBtn : HTMLButtonElement;

    sum : HTMLSpanElement;
    avg : HTMLSpanElement;
    min : HTMLSpanElement;
    max : HTMLSpanElement;

    waitingIcn : string;

    constructor(){
        this.StartApp();
    }

    StartApp(){
        this.GetBasicElements();
        this.AddBasicEventListners();
    }

    GetBasicElements(){
        this.numbersOfParam = document.querySelector("#numbersOfParam");
        this.inputsDiv = document.querySelector("#inputDiv");
        this.delateInputBtn = document.querySelector("#delateInputBtn");
        this.sum = document.querySelector("#sum");
        this.avg = document.querySelector("#avg");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
        this.waitingIcn = "<i class=\"fas fa-hourglass-half\"></i>"
    }

    AddBasicEventListners(){
        this.numbersOfParam.addEventListener("input", () => this.SetInputElements());
        this.delateInputBtn.addEventListener("click", () => this.DelateSelectedInputs());
    }

    DelateSelectedInputs(){
        let inputsArr = this.inputsDiv.querySelectorAll("div");
        inputsArr.forEach(item => this.CheckToDelateInput(item));
        this.CalculateData();
    }

    CheckToDelateInput(item : HTMLDivElement){
        if((item.children[1] as HTMLInputElement).checked == true)
            item.remove();
    }

    SetInputElements(){
        this.inputsDiv.innerHTML = '';
        for(let i = 0; i<+this.numbersOfParam.value ; i++)
        {
            this.inputsDiv.appendChild(this.GetElementWithInput());
        }
    }

    GetElementWithInput(){
        let elementDiv = document.createElement("div");

        let inputElement = document.createElement("input");
        inputElement.addEventListener("input", () => this.CalculateData());
        elementDiv.appendChild(inputElement);

        let checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        elementDiv.appendChild(checkBox);
        return elementDiv;
    }

    CalculateData(){
        let inputsArr = this.inputsDiv.querySelectorAll("div");
        let inputsValueArr: number[] = Array.prototype.slice.call(inputsArr).map(function(item : HTMLDivElement){
            return +(item.children[0] as HTMLInputElement).value;
        })
        console.log(inputsValueArr);

        let sum : number = 0;
        inputsValueArr.forEach(n => sum+= n);
        let avg = sum/inputsValueArr.length;
        if(!isNaN(avg))
        {
        let min = Math.min.apply(null, inputsValueArr);
        let max = Math.max.apply(null, inputsValueArr);

        this.SetSpanValue(sum,avg,min,max);
        }
        else
        {
            this.WaitingForValue();
        }
    }

    SetSpanValue(sum : number, avg: number, min: number, max: number){
        this.sum.innerHTML = String(sum);
        this.avg.innerHTML = String(avg);
        this.min.innerHTML = String(min);
        this.max.innerHTML = String(max);
    }

    WaitingForValue(){
        this.sum.innerHTML = this.waitingIcn;
        this.avg.innerHTML = this.waitingIcn;
        this.min.innerHTML = this.waitingIcn;
        this.max.innerHTML = this.waitingIcn;
    }
}

let App = new StatsApp;