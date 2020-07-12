import { createSlice, createSelector } from '@reduxjs/toolkit';

const createCursor = () => Math.random().toString(36).substr(2, 9);

let emptyNote = () => ({
	cursor: createCursor(),
	title: 'New Note Title',
	content: 'New Note Content',
});

const noteIndex = (notes, cursor) =>
	notes instanceof Array &&
	notes.length &&
	notes.findIndex((note) => note.cursor === cursor);

const NoteSlice = createSlice({
	name: 'note_list',
	initialState: {
		activeNote: {
			cursor: null,
			title: '',
			content: '',
		} /*cursor of new or edited note*/,
		previewMarkdown: false,
		notes: [],
	},
	reducers: {
		createNewNote: (state, action) => {
			const newNote = emptyNote();
			if (action.payload) {
				newNote.title = action.payload;
			}
			state.notes.push(newNote);
			state.activeNote = newNote;
		},
		selectExistingNote: (state, action) => {
			if (noteIndex(state.notes, action.payload) !== -1) {
				state.activeNote = state.notes[noteIndex(state.notes, action.payload)];
			}
		},
		deleteNote: (state, action) => {
			let index = noteIndex(state.notes, action.payload);
			if (index !== -1) {
				state.activeNote = null;
				state.notes.splice(index, 1);
			}
		},
		toggleMarkdownPreview: (state) => {
			state.previewMarkdown = !state.previewMarkdown;
		},
		updateNote: (state, action) => {
			let { cursor, name, value } = action.payload;
			let index = noteIndex(state.notes, cursor);
			if (index !== -1) {
				let note = state.notes[index];
				if (note[name] !== value) {
					state.notes[index][name] = value;
				}
			}
		},
	},
});

export const {
	actions: {
		createNewNote,
		selectExistingNote,
		deleteNote,
		toggleMarkdownPreview,
		updateNote,
	},
	reducer: NotesReducer,
} = NoteSlice;

export const getNotes = createSelector(
	[(state) => state.notesList.notes],
	(notes) => [...notes]
);

export const getIsSelected = createSelector(
	[(state) => state.notesList.activeNote, (_, props) => props.cursor],
	(activeNote, cursor) => {
		if (activeNote && activeNote.cursor) {
			return cursor === activeNote.cursor;
		}
	}
);

export const getNote = createSelector(
	[(state) => state.notesList],
	(noteState) => {
		const { activeNote, previewMarkdown } = noteState;
		return {
			previewMarkdown,
			...activeNote,
		};
	}
);
