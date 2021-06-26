import INote from "../interfaces/INote";
import {PaletteColors} from "./Palette";

export default class Note implements INote{
    id: number;
    title: string;
    body: string;
    color: string;
    date: string;
    pined: boolean;

    constructor(id: number){
        this.id = id;
        this.title = "";
        this.body = "";
        this.color = PaletteColors.blue;
        this.date = new Date(Date.now()).toLocaleString();
        this.pined = false;
    }
}
