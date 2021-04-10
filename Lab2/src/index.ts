class DrumKit
{
    sounds;

    constructor(){
        this.DrumKitStart()
    }

    DrumKitStart() :void{
        document.addEventListener('keypress', (ev: KeyboardEvent) => this.OnKeyPress(ev));
        this.sounds = this.GetSoundElements();
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
    }
}

class DrumKitView{

    drumKit : DrumKit
    btnsRoot : HTMLDivElement

    constructor(){
        this.GetElements();
        this.CreateButtons();
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
