import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import './scss/app.scss';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />}></Route>
					<Route path='cart' element={<Cart />}></Route>
					<Route path='pizza/:id' element={<FullPizza />}></Route>
					<Route path='*' element={<NotFound />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
