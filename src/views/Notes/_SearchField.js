import PropTypes from 'prop-types';
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { default as SearchIcon } from '@material-ui/icons/Search';
import { MarkdownAdornment } from './_ToggleMarkDownButton';

export const SearchField = (props) => {
	const { searchString, handleChange, handleEnter } = props;

	return (
		<TextField
			InputProps={{
				startAdornment: (
					<InputAdornment position={'start'}>
						<SearchIcon />
					</InputAdornment>
				),
				endAdornment: <MarkdownAdornment />,
			}}
			onKeyUp={handleEnter}
			onChange={handleChange}
			placeholder='Search…'
			label={'Search Notes'}
			value={searchString}
			variant={'filled'}
			margin={'normal'}
			fullWidth
			InputLabelProps={{
				shrink: true,
			}}
		/>
	);
};

SearchField.propTypes = {
	handleChange: PropTypes.func,
	handleEnter: PropTypes.func,
	searchString: PropTypes.string,
};
