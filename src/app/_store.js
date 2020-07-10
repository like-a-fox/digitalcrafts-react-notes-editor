import { configureStore } from '@reduxjs/toolkit';
import { getReducer } from './_reducers';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const store = configureStore({ reducer: getReducer(history) });
