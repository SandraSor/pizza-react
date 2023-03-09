import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';

import 'macro-css';

const rootElem = document.getElementById('root');

if (rootElem) {
	const root = ReactDOM.createRoot(rootElem);

	root.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
}

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
// 	<Provider store={store}>
// 		<App />
// 	</Provider>
// );
