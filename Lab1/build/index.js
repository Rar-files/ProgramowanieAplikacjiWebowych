var StatsApp = /** @class */ (function () {
    function StatsApp() {
        this.StartApp();
    }
    StatsApp.prototype.StartApp = function () {
        this.GetBasicElements();
        this.AddBasicEventListners();
    };
    StatsApp.prototype.GetBasicElements = function () {
        this.numbersOfParam = document.querySelector("#numbersOfParam");
        this.inputsDiv = document.querySelector("#inputDiv");
        this.delateInputBtn = document.querySelector("#delateInputBtn");
        this.sum = document.querySelector("#sum");
        this.avg = document.querySelector("#avg");
        this.min = document.querySelector("#min");
        this.max = document.querySelector("#max");
        this.waitingIcn = "<i class=\"fas fa-hourglass-half\"></i>";
    };
    StatsApp.prototype.AddBasicEventListners = function () {
        var _this = this;
        this.numbersOfParam.addEventListener("input", function () { return _this.SetInputElements(); });
        this.delateInputBtn.addEventListener("click", function () { return _this.DelateSelectedInputs(); });
    };
    StatsApp.prototype.DelateSelectedInputs = function () {
        var _this = this;
        var inputsArr = this.inputsDiv.querySelectorAll("div");
        inputsArr.forEach(function (item) { return _this.CheckToDelateInput(item); });
        this.CalculateData();
    };
    StatsApp.prototype.CheckToDelateInput = function (item) {
        if (item.children[1].checked == true)
            item.remove();
    };
    StatsApp.prototype.SetInputElements = function () {
        this.inputsDiv.innerHTML = '';
        for (var i = 0; i < +this.numbersOfParam.value; i++) {
            this.inputsDiv.appendChild(this.GetElementWithInput());
        }
    };
    StatsApp.prototype.GetElementWithInput = function () {
        var _this = this;
        var elementDiv = document.createElement("div");
        var inputElement = document.createElement("input");
        inputElement.addEventListener("input", function () { return _this.CalculateData(); });
        elementDiv.appendChild(inputElement);
        var checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        elementDiv.appendChild(checkBox);
        return elementDiv;
    };
    StatsApp.prototype.CalculateData = function () {
        var inputsArr = this.inputsDiv.querySelectorAll("div");
        var inputsValueArr = Array.prototype.slice.call(inputsArr).map(function (item) {
            return +item.children[0].value;
        });
        console.log(inputsValueArr);
        var sum = 0;
        inputsValueArr.forEach(function (n) { return sum += n; });
        var avg = sum / inputsValueArr.length;
        if (!isNaN(avg)) {
            var min = Math.min.apply(null, inputsValueArr);
            var max = Math.max.apply(null, inputsValueArr);
            this.SetSpanValue(sum, avg, min, max);
        }
        else {
            this.WaitingForValue();
        }
    };
    StatsApp.prototype.SetSpanValue = function (sum, avg, min, max) {
        this.sum.innerHTML = String(sum);
        this.avg.innerHTML = String(avg);
        this.min.innerHTML = String(min);
        this.max.innerHTML = String(max);
    };
    StatsApp.prototype.WaitingForValue = function () {
        this.sum.innerHTML = this.waitingIcn;
        this.avg.innerHTML = this.waitingIcn;
        this.min.innerHTML = this.waitingIcn;
        this.max.innerHTML = this.waitingIcn;
    };
    return StatsApp;
}());
var App = new StatsApp;
