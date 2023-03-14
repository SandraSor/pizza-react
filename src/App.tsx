import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loadable from 'react-loadable';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

// const Cart = React.lazy(
// 	() => import(/*webpackChunkName: "Cart"*/ './pages/Cart')
// );
const Cart = Loadable({
	loader: () => import(/*webpackChunkName: "Cart"*/ './pages/Cart'),
	loading: () => <div>Идет загрузка корзины...</div>,
});
const FullPizza = React.lazy(
	() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza')
);
const NotFound = React.lazy(
	() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound')
);

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />}></Route>
					<Route path='cart' element={<Cart />}></Route>
					<Route
						path='pizza/:id'
						element={
							<React.Suspense fallback={<div>Идет загрузка...</div>}>
								<FullPizza />
							</React.Suspense>
						}
					></Route>
					<Route
						path='*'
						element={
							<React.Suspense fallback={<div>Идет загрузка ошибки...</div>}>
								<NotFound />
							</React.Suspense>
						}
					></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
