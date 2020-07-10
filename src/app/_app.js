import React, { Suspense } from 'react';
import {
	createMuiTheme,
	ThemeProvider,
	CircularProgress,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './_store';
import { default as ErrorBoundary } from './_errors';
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#e1f5fe',
		},
		secondary: {
			main: '#c51162',
		},
	},
});

export const makeApp = (AppRouteSwitch) => () => {
	return (
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<ThemeProvider theme={theme}>
					<ErrorBoundary>
						<Suspense fallback={<CircularProgress />}>
							<AppRouteSwitch />
						</Suspense>
					</ErrorBoundary>
				</ThemeProvider>
			</ConnectedRouter>
		</Provider>
	);
};
