import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';

export const getReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
	});
