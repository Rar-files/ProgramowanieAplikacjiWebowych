import INote from "./INote"

interface IAppStorage {
    saveNote: (note: INote) => Promise<void>,
    editNoteFromeNote: (note: INote) => Promise<void>,
    editNote: (id: number, title?: string, body?: string, color?: string, date?: string, pined?: boolean) => Promise<void>,
    getNotes: () => Promise<INote[]>,
    deleteNote: (id: number) => Promise<void>,
    deleteAllNotes: () => Promise<boolean>
}

export default IAppStorage;