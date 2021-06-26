import environment from '../config/config';
import '../style/main.scss';
import AppReducers from "./AppReducers";
import Notes from './Notes';
import Palette from './Palette';

export const appStorage = AppReducers(environment);
export const ColorsPallete = new Palette();

export const notesApp = new Notes();

notesApp.Start()