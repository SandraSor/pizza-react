import React from 'react';

import Card from '../component/Card/Card';
import Skeleton from '../component/Card/Skeleton';
import Categories from '../component/Categories';
import Sort from '../component/Sort';

const Home = ({ items, isLoading }) => {
	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories />
					<Sort />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>
					{isLoading
						? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
						: items.map((obj) => <Card key={obj.id} {...obj} />)}
				</div>
			</div>
		</div>
	);
};

export default Home;
