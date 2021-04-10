class DrumKit
{
    sounds;
    private recordChannel : number;
    private Channels : any[][];
    private ChannelResetTime : number[];

    constructor(){
        this.DrumKitStart()
    }

    DrumKitStart() :void{
        document.addEventListener('keypress', (ev: KeyboardEvent) => this.OnKeyPress(ev));
        this.sounds = this.GetSoundElements();
        this.recordChannel = -1;
        this.Channels = new Array<Array<any>>();
        this.ChannelResetTime = new Array<number>();
    }
    
    GetSoundElements() : NodeListOf<HTMLAudioElement>{
        return document.querySelectorAll('#sounds audio');
    }
    
    OnKeyPress(ev: KeyboardEvent): void{
        this.PlaySoundByKey(ev.key);
    }
    
    PlaySoundByKey(key: string) : void{
        key = key.toLowerCase();
        this.sounds.forEach((e : HTMLAudioElement) => {
            if(e.dataset.key == key){
                this.PlaySound(e);
            }
        });
    }

    PlaySoundBySoundName(sound: string) : void {
        sound = sound.toLowerCase();
        this.sounds.forEach((e : HTMLAudioElement) => {
            if(e.dataset.sound == sound){
                this.PlaySound(e);
            }
        });
     }
    
    
    PlaySound(sound : HTMLAudioElement) : void{
        sound.currentTime = 0;
        sound.play();
        this.AddSoundToRecordChannel(sound);
    }

    AddSoundToRecordChannel(sound : HTMLAudioElement) : void{
        if(this.recordChannel != -1){
            this.Channels[this.recordChannel].push({sound, time: document.timeline.currentTime});
        }
    }

    RecordStart(channel: number){
        this.recordChannel = channel;
        this.Channels[channel] = [];
        this.ChannelResetTime[channel] = document.timeline.currentTime;
    }

    RecordStop(){
        this.recordChannel = -1;
    }

    RecordPlay(channel: number){
        let bufforResetTime = this.ChannelResetTime[channel];
        this.Channels[channel].forEach(soundTimeObj => {
            setTimeout(() => this.PlaySound(soundTimeObj.sound) ,(soundTimeObj.time - bufforResetTime))
        })
    }

}

class DrumKitView{

    drumKit : DrumKit
    btnsRoot : HTMLDivElement

    constructor(){
        this.CreateDrumKitView();
    }

    CreateDrumKitView(){
        this.GetElements();
        this.CreateButtons();
        this.AddEventListeners();
    }

    AddEventListeners(){
        document.querySelector("#Play").addEventListener('click', () => this.drumKit.RecordPlay(1));
        document.querySelector("#Stop").addEventListener('click', () => this.drumKit.RecordStop());
        document.querySelector("#Record").addEventListener('click', () => this.drumKit.RecordStart(1));
    }

    GetElements() : void{
        this.drumKit = new DrumKit();
        this.btnsRoot = document.querySelector("#soundBtns");
    }

    CreateButtons(): void{
        this.drumKit.sounds.forEach((sound : HTMLAudioElement) => {
            this.btnsRoot.appendChild(this.GetNewButton(sound));
        });
    }

    GetNewButton(sound : HTMLAudioElement) : HTMLButtonElement{
        let btn = document.createElement("button");
        let soundNameElement = document.createElement("h2");
        soundNameElement.innerHTML = sound.dataset.sound;
        btn.appendChild(soundNameElement);
        let keyNameElement = document.createElement("h3");
        keyNameElement.innerHTML = sound.dataset.key;
        btn.appendChild(keyNameElement);
        btn.addEventListener('click', () => this.drumKit.PlaySound(sound))
        return btn;
    }
}

function appStart() :void{
    let drumKit = new DrumKitView();
}

appStart();
