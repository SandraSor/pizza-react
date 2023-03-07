import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import ScrollToTop from '../utils/ScrollToTop';

const MainLayout = () => {
	return (
		<div className='wrapper'>
			<ScrollToTop />
			<Header />
			<Outlet />
		</div>
	);
};

export default MainLayout;
