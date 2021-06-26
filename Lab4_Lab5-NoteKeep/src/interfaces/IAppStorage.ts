import INote from "./INote"

interface IAppStorage {
    saveNote: (note: INote) => Promise<boolean>,
    editNoteFromeNote: (note: INote) => Promise<boolean>,
    editNote: (id: number, title?: string, body?: string, color?: string, date?: string, pined?: boolean) => Promise<boolean>,
    getNotes: () => Promise<INote[]>,
    deleteNote: (id: number) => Promise<boolean>,
}

export default IAppStorage;