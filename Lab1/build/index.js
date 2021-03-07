var StatsApp = /** @class */ (function () {
    function StatsApp() {
        this.StartApp();
    }
    StatsApp.prototype.StartApp = function () {
        this.GetElements();
        this.AddEventsListner();
    };
    StatsApp.prototype.GetElements = function () {
        this.data1 = document.querySelector("#data1");
        this.data2 = document.querySelector("#data2");
        this.data3 = document.querySelector("#data3");
        this.data4 = document.querySelector("#data4");
        this.sum = document.querySelector("#sum");
        this.avg = document.querySelector("#avg");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
    };
    StatsApp.prototype.AddEventsListner = function () {
        var _this = this;
        this.data1.addEventListener("input", function () { return _this.CalculateData(); });
        this.data2.addEventListener("input", function () { return _this.CalculateData(); });
        this.data3.addEventListener("input", function () { return _this.CalculateData(); });
        this.data4.addEventListener("input", function () { return _this.CalculateData(); });
    };
    StatsApp.prototype.CalculateData = function () {
        var value1 = +this.data1.value;
        var value2 = +this.data2.value;
        var value3 = +this.data3.value;
        var value4 = +this.data4.value;
        var sum = value1 + value2 + value3 + value4;
        var avg = sum / 4;
        var min = Math.min(value1, value2, value3, value4);
        var max = Math.max(value1, value2, value3, value4);
        this.SetSpanValue(sum, avg, min, max);
    };
    StatsApp.prototype.SetSpanValue = function (sum, avg, min, max) {
        this.sum.innerHTML = String(sum);
        this.avg.innerHTML = String(avg);
        this.min.innerHTML = String(min);
        this.max.innerHTML = String(max);
    };
    return StatsApp;
}());
