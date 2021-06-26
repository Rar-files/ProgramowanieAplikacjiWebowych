import Firestore from "../src/app/AppReducers/firestoreStorage";
import INote from "../src/interfaces/INote";

const testNotes: INote[] = [
    {id: 99,
    title: "test",
    body: "test",
    date: "test",
    color: "test",
    pined: false,}
]

describe("Firestore", () => {
    const firesotreApp = new Firestore();

    test.each(testNotes)("addNote", (testNote : INote) => {
        expect(firesotreApp.saveNote(testNote)).resolves.toBeTruthy();
    })

    test.each(testNotes)("deleteNote", (testNote : INote) => {
        expect(firesotreApp.deleteNote(testNote.id)).resolves.toBeTruthy();
    })

});