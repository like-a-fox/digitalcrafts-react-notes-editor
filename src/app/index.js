import React from 'react';
import { makeApp } from './_app';
import { Notes } from '../views';
import { Switch, Route } from 'react-router';

const AppRouteSwitch = () => {
	return (
		<Switch>
			<Route path='/' exact component={Notes} />
			{/* <Route path='/:noteId' exact component={NoteView} /> */}
		</Switch>
	);
};

export default makeApp(AppRouteSwitch);
