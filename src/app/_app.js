import React, { Suspense } from 'react';
import {
	createMuiTheme,
	ThemeProvider,
	CircularProgress,
	CssBaseline,
} from '@material-ui/core';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './_store';
import { Notes } from '../views';
import { default as ErrorBoundary } from './_errors';
const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#90caf9',
		},
		secondary: {
			main: '#c51162',
		},
		type: 'dark',
	},
});

export const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ErrorBoundary>
					<Suspense fallback={<CircularProgress />}>
						<Notes />
					</Suspense>
				</ErrorBoundary>
			</ThemeProvider>
		</ConnectedRouter>
	</Provider>
);
