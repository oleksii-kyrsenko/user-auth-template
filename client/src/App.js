import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Routes } from './routing';

import { fetchAuthUser } from './pages/Auth/routines';
import { setAuthToken } from './helpers/setAuthToken';

const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
			store.dispatch(fetchAuthUser());
		}
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Route component={Routes} />
			</Router>
		</Provider>
	);
};

export default App;
