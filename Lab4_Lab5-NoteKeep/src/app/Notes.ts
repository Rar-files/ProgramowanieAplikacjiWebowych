import {appStorage} from "./index"
import INote from "../interfaces/INote";
import Note from "./Note";
import NoteHTMLFactory from "./NoteHTMLFactory";

export default class Notes{

    Start() : void{
        this.updateNotesInView();
        document.querySelector(".addBtn").addEventListener('click', () => this.createNote());
    }

    async updateNotesInView() : Promise<void>{
        const notesList = await appStorage.getNotes()
        document.querySelector(".PinedNoteRoot").innerHTML = "";
        document.querySelector(".NoteRoot").innerHTML = "";
        notesList.forEach( (note : INote) => this.addNoteToView(note));
    }

    addNoteToView(noteData : INote) : void{
        let root : HTMLDivElement;

        if(noteData.pined)
            root = document.querySelector(".PinedNoteRoot");
        else
            root = document.querySelector(".NoteRoot");

        const factory = new NoteHTMLFactory(noteData);
        root.appendChild(factory.getHTMLNote());
    }

    async createNote() : Promise<void>{
        const root = document.querySelector(".NoteRoot");
        const notes = await appStorage.getNotes();
        let id;
        try{
            id = notes[notes.length-1].id+1
        }
        catch{
            id = 0
        }
        const noteData = new Note(id);
        const factory = new NoteHTMLFactory(noteData);
        const note = factory.getHTMLNote();
        factory.editorModeToggle(note);
        appStorage.saveNote(noteData);
        root.appendChild(note);
    }
}