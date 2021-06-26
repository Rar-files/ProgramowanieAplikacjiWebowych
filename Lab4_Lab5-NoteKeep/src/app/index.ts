import environment from '../config/config';
import '../style/main.scss';
import AppReducers from "./AppReducers";
import Notes from './Notes';

export const appStorage = AppReducers(environment);

export const notesApp = new Notes();

notesApp.Start()