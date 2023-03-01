import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './component/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// import pizzas from './assets/pizza.json';

import './scss/app.scss';
import ScrollToTop from './utils/ScrollToTop';

function App() {
	return (
		<div className='wrapper'>
			<BrowserRouter>
				<ScrollToTop />
				<Header />
				<Routes>
					<Route path='/' element={<Home />}></Route>
					<Route path='/cart' element={<Cart />}></Route>
					<Route path='*' element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
