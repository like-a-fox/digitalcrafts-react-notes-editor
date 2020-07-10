import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import { NotesReducer } from '../views';
export const getReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		notesList: NotesReducer,
	});
