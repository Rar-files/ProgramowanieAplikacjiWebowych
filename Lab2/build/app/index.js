var DrumKit = /** @class */ (function () {
    function DrumKit() {
        this.DrumKitStart();
    }
    DrumKit.prototype.DrumKitStart = function () {
        var _this = this;
        document.addEventListener('keypress', function (ev) { return _this.OnKeyPress(ev); });
        this.sounds = this.GetSoundElements();
    };
    DrumKit.prototype.GetSoundElements = function () {
        return document.querySelectorAll('#sounds audio');
    };
    DrumKit.prototype.OnKeyPress = function (ev) {
        this.PlaySoundByKey(ev.key);
    };
    DrumKit.prototype.PlaySoundByKey = function (key) {
        var _this = this;
        key = key.toLowerCase();
        this.sounds.forEach(function (e) {
            if (e.dataset.key == key) {
                _this.PlaySound(e);
            }
        });
    };
    DrumKit.prototype.PlaySoundBySoundName = function (sound) {
        var _this = this;
        sound = sound.toLowerCase();
        this.sounds.forEach(function (e) {
            if (e.dataset.sound == sound) {
                _this.PlaySound(e);
            }
        });
    };
    DrumKit.prototype.PlaySound = function (sound) {
        sound.currentTime = 0;
        sound.play();
    };
    return DrumKit;
}());
var DrumKitView = /** @class */ (function () {
    function DrumKitView() {
        this.GetElements();
        this.CreateButtons();
    }
    DrumKitView.prototype.GetElements = function () {
        this.drumKit = new DrumKit();
        this.btnsRoot = document.querySelector("#soundBtns");
    };
    DrumKitView.prototype.CreateButtons = function () {
        var _this = this;
        this.drumKit.sounds.forEach(function (sound) {
            _this.btnsRoot.appendChild(_this.GetNewButton(sound));
        });
    };
    DrumKitView.prototype.GetNewButton = function (sound) {
        var _this = this;
        var btn = document.createElement("button");
        var soundNameElement = document.createElement("h2");
        soundNameElement.innerHTML = sound.dataset.sound;
        btn.appendChild(soundNameElement);
        var keyNameElement = document.createElement("h3");
        keyNameElement.innerHTML = sound.dataset.key;
        btn.appendChild(keyNameElement);
        btn.addEventListener('click', function () { return _this.drumKit.PlaySound(sound); });
        return btn;
    };
    return DrumKitView;
}());
function appStart() {
    var drumKit = new DrumKitView();
}
appStart();
