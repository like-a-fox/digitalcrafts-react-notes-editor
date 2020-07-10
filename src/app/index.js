import React from 'react';
import { makeApp } from './_app';
import { NoteList } from '../views';
import { Switch, Route } from 'react-router';

const AppRouteSwitch = () => {
	return (
		<Switch>
			<Route path='/' exact component={NoteList} />
			{/* <Route path='/:noteId' exact component={NoteView} /> */}
		</Switch>
	);
};

export default makeApp(AppRouteSwitch);
