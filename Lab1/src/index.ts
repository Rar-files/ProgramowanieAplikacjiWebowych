class StatsApp{
    data1 : HTMLInputElement;
    data2 : HTMLInputElement;
    data3 : HTMLInputElement;
    data4 : HTMLInputElement;

    sum : HTMLSpanElement;
    avg : HTMLSpanElement;
    min : HTMLSpanElement;
    max : HTMLSpanElement;

    constructor(){
        this.StartApp();
    }

    StartApp(){
        this.GetElements();
        this.AddEventsListner();
    }

    GetElements(){
        this.data1 = document.querySelector("#data1");
        this.data2 = document.querySelector("#data2");
        this.data3 = document.querySelector("#data3");
        this.data4 = document.querySelector("#data4");
        this.sum = document.querySelector("#sum");
        this.avg = document.querySelector("#avg");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
    }

    AddEventsListner(){
        this.data1.addEventListener("input", () => this.CalculateData());
        this.data2.addEventListener("input", () => this.CalculateData());
        this.data3.addEventListener("input", () => this.CalculateData());
        this.data4.addEventListener("input", () => this.CalculateData());
    }

    CalculateData(){
        let value1 : number = +this.data1.value;
        let value2 : number = +this.data2.value;
        let value3 : number = +this.data3.value;
        let value4 : number = +this.data4.value;

        let sum = value1 +value2 + value3 + value4;
        let avg = sum/4;
        let min = Math.min(value1,value2,value3,value4);
        let max = Math.max(value1,value2,value3,value4);

        this.SetSpanValue(sum,avg,min,max);
    }

    SetSpanValue(sum : number, avg: number, min: number, max: number){
        this.sum.innerHTML = String(sum);
        this.avg.innerHTML = String(avg);
        this.min.innerHTML = String(min);
        this.max.innerHTML = String(max);
    }
}