import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../component';
import ScrollToTop from '../utils/ScrollToTop';

const MainLayout: React.FC = () => {
	return (
		<div className='wrapper'>
			<ScrollToTop />
			<Header />
			<Outlet />
		</div>
	);
};

export default MainLayout;
