import { useState, useCallback } from 'react';
import { default as marked } from 'marked';
/*theoretically would hit the backend or firebase for saved notes already in existence
which might come back with

[{
    cursor: ID
    title: String
    content: String.raw() - To Account for md
}]
*/

const createCursor = () => Math.random().toString(36).substr(2, 9);

const mockNotes = [
	{
		cursor: createCursor(),
		title: 'Note 1',
		content: `## Title Of Note

        * Bullet
        [Label](link)
        `,
	},
];

let emptyNote = (title = '') => ({
	cursor: createCursor(),
	title,
	content: '',
});

export const useNotesList = () => {
	const [notes, setNotes] = useState(mockNotes);
	const [openNote, setNoteOpen] = useState(null);
	const onAddNote = useCallback(
		(title) => {
			setNotes(notes.splice(0, 0, emptyNote(title)));
			setNoteOpen(notes[0].cursor);
		},
		[notes]
	);
	const onDeleteNote = useCallback(
		(cursor) => {
			let noteIndex = notes.findIndex((note) => note.cursor === cursor);
			if (noteIndex !== -1) {
				setNotes(notes.splice(noteIndex, 1));
				setNoteOpen(null);
			}
		},
		[notes]
	);
	const onEditNote = useCallback(
		(cursor) => {
			let noteIndex = notes.findIndex((note) => note.cursor === cursor);
			if (noteIndex !== -1) {
				setNoteOpen(notes[noteIndex].cursor);
			}
		},
		[notes]
	);
	const onSaveNoteChanges = useCallback(({ title, content, cursor }) => {
		setNotes((notes) => {
			let noteIndex = notes.findIndex((note) => note.cursor === cursor);
			if (noteIndex !== -1) {
				notes.splice(noteIndex, 1, {
					cursor,
					title: notes[noteIndex].title || title,
					content: marked(notes[noteIndex].content || content),
				});
			}
		});
		setNoteOpen(null);
	}, []);

	return {
		onEditNote,
		onDeleteNote,
		onAddNote,
		onSaveNoteChanges,
		openNote,
		notes,
	};
};
