import { createSlice } from '@reduxjs/toolkit';
const createCursor = () => Math.random().toString(36).substr(2, 9);

let emptyNote = (title = '') => ({
	cursor: createCursor(),
	title,
	content: '',
});

const noteIndex = (notes, cursor) =>
	notes instanceof Array && notes.findIndex((note) => note.cursor === cursor);

const NoteSlice = createSlice({
	name: 'note_list',
	initialState: {
		activeNote: null /*cursor of new or edited note*/,
		previewMarkdown: false,
		notes: [],
	},
	reducers: {
		createNewNote: (state, action) => {
			let title = action.payload || '';
			const newNote = emptyNote(title);
			state.notes.push(newNote);
			state.activeNote = newNote.cursor;
		},
		selectExistingNote: (state, action) => {
			if (noteIndex(state.notes, action.payload) !== -1) {
				state.activeNote = action.payload;
			}
		},
		deleteNote: (state, action) => {
			let index = noteIndex(state.notes, action.payload);
			if (index !== -1) {
				state.activeNote = null;
				state.notes.splice(index, 1);
			}
		},
		handleChangeSelectedNote: (state, action) => {
			const { cursor, name, value } = action.payload;
			let index = noteIndex(state.notes, cursor);
			if (index !== -1 && state.activeNote === cursor) {
				let note = state.notes[index];
				if (note[name] !== value) {
					state.notes[index][name] = value;
				}
			}
		},
	},
});

export const {
	actions: { createNewNote, selectExistingNote, deleteNote },
	reducer: NotesReducer,
} = NoteSlice;
