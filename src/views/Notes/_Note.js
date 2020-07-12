import PropTypes from 'prop-types';
import React from 'react';
import { Paper, TextField, makeStyles } from '@material-ui/core';
import { default as marked } from 'marked';

const useNoteStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		padding: theme.spacing(2),
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(2),
		flex: 1,
		height: '-webkit-fill-available',
	},
	fab: {
		position: 'sticky',
		bottom: 0,
		right: 0,
	},
}));

export const Note = (props) => {
	const { handleChangeNote, title, content, previewMarkdown } = props;
	const classes = useNoteStyles();

	return (
		<Paper className={classes.root}>
			<TextField
				variant={'filled'}
				fullWidth
				value={title}
				placeholder={'Note Title'}
				name={'title'}
				label={'Note Title'}
				margin={'normal'}
				onChange={handleChangeNote}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				fullWidth
				multiline
				rows={12}
				margin={'normal'}
				InputLabelProps={{
					shrink: true,
				}}
				variant={'filled'}
				onChange={handleChangeNote}
				value={previewMarkdown ? marked(content) : content}
				placeholder={'Write your content here'}
				name={'content'}
				label={'Note Content'}
			/>
		</Paper>
	);
};

Note.propTypes = {
	content: PropTypes.string,
	cursor: PropTypes.string,
	handleChangeNote: PropTypes.func,
	handleCreateNote: PropTypes.func,
	previewMarkdown: PropTypes.bool,
	title: PropTypes.string,
};
