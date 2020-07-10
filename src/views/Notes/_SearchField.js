import PropTypes from 'prop-types';
import React, { useState, useCallback, memo } from 'react';
import { InputBase, makeStyles, fade } from '@material-ui/core';
import { default as SearchIcon } from '@material-ui/icons/Search';

const useSearchFieldStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

/**
 * @component
 * @type {import('react').FunctionComponent}
 * @param {object} props
 * @param {function} props.handleAddNote
 * @param {array} props.notes
 */
const SearchField = (props) => {
	const { notes = [], handleAddNote } = props;
	const [filteredNotes, setFilteredNotes] = useState(notes);
	const [searchString, setSearchString] = useState('');

	const handleChange = useCallback(
		(event) => {
			const { value } = event.target;
			if (value !== searchString) {
				setSearchString(value);
				if (filteredNotes.length) {
					setFilteredNotes(
						filteredNotes.filter((note) => JSON.stringify(note).includes(value))
					);
				}
			}
		},
		[filteredNotes, searchString]
	);

	const handleEnter = useCallback(
		(event) => {
			if (event.keyCode === 13) {
				if (!filteredNotes || !filteredNotes.length) {
					if (searchString) {
						handleAddNote(searchString);
					}
				}
			}
		},
		[filteredNotes, handleAddNote, searchString]
	);
	const classes = useSearchFieldStyles();
	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				onKeyUp={handleEnter}
				onChange={handleChange}
				placeholder='Search…'
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search' }}
			/>
		</div>
	);
};

SearchField.propTypes = {
	handleAddNote: PropTypes.func,
	notes: PropTypes.array,
};

export default memo(SearchField);
