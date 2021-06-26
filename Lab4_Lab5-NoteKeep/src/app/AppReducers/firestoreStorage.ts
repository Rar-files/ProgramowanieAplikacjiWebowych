import IAppStorage from "../../interfaces/IAppStorage";
import INote from "../../interfaces/INote";
import {db} from "../firebase";
import Note from "../Note";

export default class firestoreStorage implements IAppStorage{
    async saveNote(note: INote) : Promise<void>{
        await db.collection("notes").doc(note.id.toString()).set(this.noteToUnknown(note));
    }

    async editNoteFromeNote(note: INote) : Promise<void>{
        await this.saveNote(note);
    }

    async editNote(id: number, title?: string, body?: string, color?: string, date?: string, pined?: boolean) : Promise<void>{
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
    
    async getNotes() : Promise<INote[]>{
        return await db.collection("notes").get().then((querySnapshot) => {
            const notes: INote[] = [];
            querySnapshot.forEach((doc) => {
                notes.push(doc.data() as INote)
            })
            return notes;
          });
    }

    async deleteNote(id: number) : Promise<void>{
        await db.collection('notes').doc(id.toString()).delete()
    }

    private noteToUnknown(note: INote) : INote {
        return Object.assign({}, note);
    }
} 