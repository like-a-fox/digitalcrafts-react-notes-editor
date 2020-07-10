import React from 'react';
export const Notes = React.lazy(() => import('./_NoteList'));
export { NotesReducer } from './_NoteSlice';
