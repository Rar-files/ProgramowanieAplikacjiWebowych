import IAppStorage from "../../interfaces/IAppStorage";
import INote from "../../interfaces/INote";
import Note from "../Note";

export default class localStorage implements IAppStorage{
    key = "noteKeep"

    constructor(){
        this.getNotes();
    }

    async editNote(id: number, title?: string, body?: string, color?: string, date?: string, pined?: boolean) : Promise<boolean>{
        try{
            const notes = await this.getNotes();
            let note = notes[id];
            if(note == undefined){
                note = new Note(id);
            }
            if(title)
                note.title = title;
            if(body)
                note.body = body;
            if(color)
                note.color = color;
            if(date)
                note.date = date;
            if(pined)
                note.pined = pined;
            await this.editNoteFromeNote(note);
        }
        catch{
            return false;
        }
        return true;
    }

    async editNoteFromeNote(note : INote) : Promise<boolean>{
        try{
            await this.deleteNote(note.id);
            await this.saveNote(note);
        }
        catch{
            return false;
        }
        return true;
    }

    async saveNote(note: INote): Promise<boolean> {
        try{
            const notes = await this.getNotes();
            notes.push(note);
            window.localStorage.setItem(this.key, JSON.stringify(notes));
        }
        catch{
            return false;
        }
        return true;
    }

    async getNotes() : Promise<INote[]>{
        try{
            return await JSON.parse(window.localStorage.getItem(this.key))
        }
        catch{
            window.localStorage.setItem(this.key, JSON.stringify([]));
            return [];
        }
    }

    async deleteNote(id: number) : Promise<boolean>{
        try{
            const filteredArr = (await this.getNotes()).filter((item: INote) => item.id != id);
            window.localStorage.setItem(this.key, JSON.stringify(
                (filteredArr)
            ))
        }
        catch{
            return false;
        }
        return true;
    }
}