import app from './App';
import view from './View';
import initModel from './Model';
import update from "./Update";

const node = document.getElementById('app');

app(initModel, view, update, node);
