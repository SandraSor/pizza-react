import React from 'react';

import Card from '../component/Card/Card';
import Skeleton from '../component/Card/Skeleton';
import Categories from '../component/Categories';
import Sort from '../component/Sort';

const Home = () => {
	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0); //Categories
	const [sortType, setSortType] = React.useState({
		name: 'популярности ASC',
		sortProperty: 'rating',
	}); //Sort

	React.useEffect(() => {
		setIsLoading(true);
		fetch(
			`http://localhost:3001/pizzas?${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&_sort=${sortType.sortProperty.replace('-', '')}&_order=${
				sortType.sortProperty.includes('-') ? 'desc' : 'asc'
			}`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories
						value={categoryId}
						onChangeCategory={(i) => setCategoryId(i)}
					/>
					<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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
