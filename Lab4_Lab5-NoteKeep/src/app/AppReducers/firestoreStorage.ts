import IAppStorage from "../../interfaces/IAppStorage";
import INote from "../../interfaces/INote";
import {db} from "../firebase";
import Note from "../Note";

export default class firestoreStorage implements IAppStorage{

    async saveNote(note: INote) : Promise<boolean>{
        try{
            await db.collection("notes").doc(note.id.toString()).set(this.noteToUnknown(note));
        }
        catch{
            return false;
        }
        return true;
    }

    async editNoteFromeNote(note: INote) : Promise<boolean>{
        try{
            await this.saveNote(note); 
        }
        catch{
            return false;
        }
        return true;
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
    
    async getNotes() : Promise<INote[]>{
        return await db.collection("notes").get().then((querySnapshot) => {
            const notes: INote[] = [];
            querySnapshot.forEach((doc) => {
                notes.push(doc.data() as INote)
            })
            return notes;
          });
    }

    async deleteNote(id: number) : Promise<boolean>{
        try{
            await db.collection('notes').doc(id.toString()).delete()
        }
        catch{
            return false;
        }
        return true;
    }

    private noteToUnknown(note: INote) : INote {
        return Object.assign({}, note);
    }
} 