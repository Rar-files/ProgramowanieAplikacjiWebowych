import INote from "../interfaces/INote";
import {appStorage, ColorsPallete, notesApp} from "./index"
import { PaletteColors } from "./Palette";

export default class NoteHTMLFactory{
    NoteElement : HTMLDivElement;
    noteData : INote;

    constructor(noteData : INote){

        if(!this.checkIsPaletteColor(noteData.color))
            noteData.color = PaletteColors.blue;

        this.noteData = noteData;
    }

    private checkIsPaletteColor (color : string) {
        let isPaletteColor = false
        for (const item in PaletteColors) {
            if(item == color)
            {
                isPaletteColor = true;
                break;
            }
        }
        return isPaletteColor;
    }

    getHTMLNote() : HTMLDivElement{
        return this.CreateHTMLNoteElement();
    }

    editorModeToggle(element : HTMLElement) : void{
        //toogle-btn-classes
        const PaletteBtn = element.children[0].children[1].children[0];
        const DeleteBtn = element.children[0].children[1].children[1];  
        const PinBtn = element.children[0].children[1].children[2];
        PaletteBtn.classList.toggle("invisible");
        DeleteBtn.classList.toggle("invisible");
        PinBtn.classList.toggle("invisible");

        //toogle-title-classes
        const TitleText = element.children[0].children[0].children[0];
        const TitleInput = element.children[0].children[0].children[1] as HTMLInputElement;
        TitleText.classList.toggle("invisible");
        TitleInput.classList.toggle("invisible");
        TitleInput.value = TitleText.innerHTML;

        //toogle-body-classes
        const BodyText = element.children[1].children[0];
        const BodyInput = element.children[1].children[1] as HTMLInputElement;
        BodyText.classList.toggle("invisible");
        BodyInput.classList.toggle("invisible");
        BodyInput.value = BodyText.innerHTML;
    }


    //Create-Note

    private CreateHTMLNoteElement() : HTMLDivElement{
        const NoteElement = document.createElement("div");

        NoteElement.classList.add("Note");
        NoteElement.classList.add(`color-${this.noteData.color}`);

        NoteElement.id = this.noteData.id.toString();

        NoteElement.appendChild(this.CreateNoteBarDiv());
        NoteElement.appendChild(this.CreateBodyDiv());
        NoteElement.appendChild(this.CreateDateDiv());

        return NoteElement;
    }


    //Create-NoteBar

    private CreateNoteBarDiv() : HTMLDivElement {
        const div = document.createElement("div");
        
        div.classList.add("NoteBarDiv");

        div.appendChild(this.CreateTitleDiv());
        div.appendChild(this.CreateToolsDiv());

        return div;
    }


    //Create-Data

    private CreateDateDiv() : HTMLDivElement {
        const div = document.createElement("div");
        
        div.classList.add("DateDiv");

        div.innerHTML = this.noteData.date;

        return div;
    }


    //Create-Tools

    private CreateToolsDiv() : HTMLDivElement {
        const div = document.createElement("div");

        div.classList.add("ToolsDiv");
        
        div.appendChild(this.CreateDeleteBtn());
        div.appendChild(this.CreatePaletteBtn());
        div.appendChild(this.CreatePinBtn());
        div.appendChild(this.CreateEditBtn());

        return div;
    }


    //Create-Buttons

    private CreateDeleteBtn() : HTMLImageElement{
        const Btn = document.createElement("img");

        Btn.classList.add("DeleteBtn");
        Btn.classList.add("Btn");

        Btn.src = '../assets/garbage.svg';

        Btn.addEventListener('click', (e) => this.DelateNote(e.target as HTMLElement))

        return Btn;
    }

    private CreateEditBtn() : HTMLImageElement{
        const Btn = document.createElement("img");

        Btn.classList.add("EditBtn");
        Btn.classList.add("Btn");

        Btn.src = '../assets/pen.svg';

        Btn.addEventListener('click', (e) => this.EditNote(e.target as HTMLElement))

        return Btn;
    }

    private CreatePaletteBtn() : HTMLImageElement{
        const Btn = document.createElement("img");

        Btn.classList.add("PaletteBtn");
        Btn.classList.add("Btn");
        Btn.classList.add("invisible");

        Btn.src = '../assets/palette.svg';

        Btn.addEventListener('click', (e) => this.PaletteNote(e.target as HTMLElement))

        return Btn;
    }

    private CreatePinBtn() : HTMLImageElement{
        const Btn = document.createElement("img");

        Btn.classList.add("PinBtn");
        Btn.classList.add("Btn");

        Btn.src = '../assets/pin.svg';

        Btn.addEventListener('click', (e) => this.PinNote(e.target as HTMLElement))

        return Btn;
    }

    //Buttons-Functions

    private async DelateNote(e : HTMLElement) : Promise<void>{
        const Note = e.parentNode.parentNode.parentNode as HTMLDivElement;
        await appStorage.deleteNote(+Note.id);
        Note.parentNode.removeChild(Note);
    }

    private async EditNote(e : HTMLElement) : Promise<void> {
        const Note = e.parentNode.parentNode.parentNode as HTMLDivElement;
        this.editorModeToggle(Note);
    }

    private async PaletteNote(e : HTMLElement) : Promise<void>{
        const Note = e.parentNode.parentNode.parentNode as HTMLDivElement;
        const color = await ColorsPallete.showPalette()

        Note.className = "";
        Note.classList.add("Note")
        Note.classList.add(`color-${color}`);

        appStorage.editNote(+Note.id,null,null,color);
    }

    private async PinNote(e: HTMLElement) : Promise<void> {
        const Note = e.parentNode.parentNode.parentNode.parentNode as HTMLDivElement;
        const notes = await appStorage.getNotes();
        const note = notes[+Note.id];

        if(note.pined)
            note.pined = false;
        else
            note.pined = true;

        await appStorage.editNoteFromeNote(note);
        notesApp.updateNotesInView();
    }


    //Create-Title

    private CreateTitleDiv() : HTMLDivElement {
        const div = document.createElement("div");
        
        div.classList.add("TitleDiv");

        div.appendChild(this.CreateTitleText());
        div.appendChild(this.CreateTitleInput());

        return div;
    }

    private CreateTitleText() : HTMLDivElement{
        const div = document.createElement("div");
        
        div.classList.add("TitleText");

        div.innerHTML = this.noteData.title;

        return div;
    }

    private CreateTitleInput() : HTMLInputElement{
        const input = document.createElement("input");
        
        input.classList.add("TitleInput");
        input.classList.add("invisible");

        input.addEventListener('input', (e) => this.TitleInputed(e.target as HTMLInputElement))

        return input;
    }

    //Title-Functions

    private TitleInputed(e :  HTMLInputElement) : void {
        appStorage.editNote(this.noteData.id,e.value)
        e.parentNode.children[0].innerHTML = e.value;
    }


    //Create-Body

    private CreateBodyDiv() : HTMLDivElement {
        const div = document.createElement("div");

        div.classList.add("BodyDiv");

        div.appendChild(this.CreateBodyText());
        div.appendChild(this.CreateBodyInput());
        
        return div;
    }
    
    private CreateBodyText() : HTMLDivElement{
        const div = document.createElement("div");
        
        div.classList.add("BodyText");

        div.innerHTML = this.noteData.body;

        return div;
    }

    private CreateBodyInput() : HTMLInputElement{
        const input = document.createElement("input");
        
        input.classList.add("BodyInput");
        input.classList.add("invisible");

        input.addEventListener('input', (e) => this.BodyInputed(e.target as HTMLInputElement))

        return input;
    }

    //Body-Functions

    private BodyInputed(e :  HTMLInputElement) : void {
        appStorage.editNote(this.noteData.id,null,e.value)
        e.parentNode.children[0].innerHTML = e.value;
    }
}