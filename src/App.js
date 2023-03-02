import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './component/Header';
import AppContext from './context';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';
import ScrollToTop from './utils/ScrollToTop';

function App() {
	const [searchValue, setSearchValue] = React.useState('');

	return (
		<div className='wrapper'>
			<BrowserRouter>
				<ScrollToTop />
				<AppContext.Provider value={{ searchValue, setSearchValue }}>
					<Header />
					<Routes>
						<Route path='/' element={<Home />}></Route>
						<Route path='/cart' element={<Cart />}></Route>
						<Route path='*' element={<NotFound />}></Route>
					</Routes>
				</AppContext.Provider>
			</BrowserRouter>
		</div>
	);
}

export default App;
