import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	ListItem,
	ListItemText,
	List,
	makeStyles,
	Paper,
} from '@material-ui/core';
import {
	selectExistingNote,
	getIsSelected,
	getNotes,
	createNewNote,
	getNote,
	updateNote,
} from './_NoteSlice';
import { Note } from './_Note';
import { SearchField } from './_SearchField';

const NoteListItem = (props) => {
	const { cursor, title, content } = props;
	const noteSelected = useSelector((state) => getIsSelected(state, props));
	const dispatch = useDispatch();
	const onSelectNote = React.useCallback(
		() => dispatch(selectExistingNote({ cursor, title, content })),
		[cursor, title, content, dispatch]
	);
	if (!cursor) {
		return null;
	}

	return (
		<ListItem selected={noteSelected} button onClick={onSelectNote}>
			<ListItemText
				primary={title || 'New Note Title'}
				secondary={content || 'New Note Content'}
			/>
		</ListItem>
	);
};

NoteListItem.propTypes = {
	content: PropTypes.string,
	cursor: PropTypes.string,
	title: PropTypes.string,
};

const useListStyles = makeStyles((theme) => ({
	root: {
		minHeight: '-webkit-fill-available',
		display: 'flex',
		flexDirection: 'row',
		backgroundColor: theme.palette.primary.light,
	},
	list: {
		minHeight: '-webkit-fill-available',
		minWidth: '30%',
		flexBasis: '30%',
		backgroundColor: theme.palette.background.default,
	},
	item: {
		'&:nth-child(odd)': {
			backgroundColor: theme.palette.primary.light,
			color: theme.palette.text.secondary,
		},
	},
}));

export const NoteList = () => {
	const notes = useSelector(getNotes);
	const classes = useListStyles();
	const dispatch = useDispatch();
	const [searchString, setSearchString] = React.useState('');

	const handleChange = React.useCallback(
		(event) => {
			const { value } = event.target;
			if (value !== searchString) {
				setSearchString(value);
			}
		},
		[searchString]
	);

	const handleEnter = React.useCallback(
		(event) => {
			if (event.keyCode === 13) {
				let filteredNotes = notes.filter((note) =>
					JSON.stringify(note).match(searchString)
				);
				if (!filteredNotes || !filteredNotes.length) {
					if (searchString) {
						dispatch(createNewNote(searchString));
						setSearchString('');
					}
				}
				if (filteredNotes.length === 1) {
					dispatch(selectExistingNote(filteredNotes[0].cursor));
				}
			}
		},
		[notes, dispatch, searchString]
	);
	const note = useSelector(getNote);
	const handleCreateNote = React.useCallback(() => dispatch(createNewNote()), [
		dispatch,
	]);
	const handleChangeNote = React.useCallback(
		(event) => {
			if (!note.cursor) {
				dispatch(createNewNote(event.target.value));
			}
			dispatch(
				updateNote({
					cursor: note.cursor,
					name: event.target.name,
					value: event.target.value,
				})
			);
		},
		[dispatch, note.cursor]
	);

	return (
		<Paper className={classes.root}>
			<List className={classes.list}>
				<ListItem divider>
					<SearchField
						searchString={searchString}
						handleChange={handleChange}
						handleEnter={handleEnter}
					/>
				</ListItem>
				<ListItem divider button onClick={handleCreateNote}>
					<ListItemText primary={'Add New Note...'} />
				</ListItem>
				{notes
					.filter((note) => JSON.stringify(note).match(searchString))
					.map((note) =>
						note ? (
							<NoteListItem
								className={classes.item}
								key={note.cursor}
								{...note}
							/>
						) : null
					)}
			</List>
			<Note
				handleCreateNote={handleCreateNote}
				handleChangeNote={handleChangeNote}
				{...note}
			/>
		</Paper>
	);
};
