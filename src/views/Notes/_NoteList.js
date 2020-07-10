import PropTypes from 'prop-types';
import React from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, ListItemText, List } from '@material-ui/core';
import { selectExistingNote } from './_NoteSlice';

const getNotes = createSelector([(state) => state.notesList.notes], (notes) => [
	...notes,
]);

const NoteListItem = (props) => {
	const { cursor, title, content } = props;
	const dispatch = useDispatch();
	const onSelectNote = React.useCallback(
		() => dispatch(selectExistingNote(cursor)),
		[cursor, dispatch]
	);
	if (!cursor) {
		return null;
	}

	return (
		<ListItem button onClick={onSelectNote}>
			<ListItemText primary={title} secondary={content} />
		</ListItem>
	);
};

NoteListItem.propTypes = {
	content: PropTypes.string,
	cursor: PropTypes.string,
	title: PropTypes.string,
};

const NoteList = () => {
	const notes = useSelector(getNotes);
	return (
		<List>
			{notes.map((note) =>
				note ? <NoteListItem key={note.cursor} {...note} /> : null
			)}
		</List>
	);
};

export default React.memo(NoteList);
