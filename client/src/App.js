import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Routes } from './routing';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<h1>New App</h1>
				<Route component={Routes} />
			</Router>
		</Provider>
	);
};

export default App;
