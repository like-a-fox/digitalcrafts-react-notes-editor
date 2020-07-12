import clsx from 'clsx';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputAdornment, Button, makeStyles, fade } from '@material-ui/core';
import { toggleMarkdownPreview } from './_NoteSlice';

const useEndAdornmentStyles = makeStyles((theme) => ({
	buttonOption: {
		display: 'flex',
		minWidth: 'fit-content',
		color: theme.palette.secondary.dark,
		backgroundColor: fade(theme.palette.primary.light, 0.5),
		opacity: 0.5,
		'&$secondaryButton': {
			boxShadow: 'none',
			opacity: 0.7,
			color: theme.palette.common.white,
			backgroundColor: fade(theme.palette.error.dark, 0.7),
		},
	},
	secondaryButton: {},
	endAdornment: { width: 'unset' },
}));

export const MarkdownAdornment = () => {
	const previewMarkdown = useSelector(
		(state) => state.notesList.previewMarkdown
	);
	const dispatch = useDispatch();
	const handleClick = useCallback(() => dispatch(toggleMarkdownPreview()), [
		dispatch,
	]);
	const classes = useEndAdornmentStyles();
	let markdown = Boolean(previewMarkdown);
	return (
		<InputAdornment className={classes.endAdornment} position={'end'}>
			<Button
				disableElevation
				size='small'
				variant={'contained'}
				className={clsx(classes.buttonOption, {
					[classes.secondaryButton]: !markdown,
				})}
				onClick={handleClick}>
				{!markdown ? 'Raw' : 'Markdown'}
			</Button>
		</InputAdornment>
	);
};
