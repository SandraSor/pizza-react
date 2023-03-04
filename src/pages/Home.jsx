import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice.js';

import Card from '../component/Card/Card';
import Skeleton from '../component/Card/Skeleton';
import Categories from '../component/Categories';
import Pagination from '../component/Pagination/Pagination';
import Sort from '../component/Sort';
import AppContext from '../context';

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sort } = useSelector((state) => state.filter);
	const sortType = sort.sortProperty;
	// const sortType = useSelector((state) => state.filter.sort.sortProperty);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [categoryId, setCategoryId] = React.useState(0);
	// const [sortType, setSortType] = React.useState({
	// 	name: 'популярности ASC',
	// 	sortProperty: 'rating',
	// });
	const [currentPage, setCurrentPage] = React.useState(1); //Categories
	const { searchValue } = React.useContext(AppContext);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	React.useEffect(() => {
		setIsLoading(true);
		fetch(
			`http://localhost:3001/pizzas?_page=${currentPage}&_limit=4&${
				categoryId > 0 ? `category=${categoryId}` : ''
			}&_sort=${sortType.replace('-', '')}&_order=${
				sortType.includes('-') ? 'desc' : 'asc'
			}&q=${searchValue}`
		)
			.then((res) => res.json())
			.then((json) => {
				setItems(json);
				setIsLoading(false);
			})
			.catch((error) => console.log(error));
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);

	// .filter((obj) =>
	// 			obj.title.toLowerCase().includes(searchValue.toLowerCase())
	// 		)
	const pizzas = items.map((obj) => <Card key={obj.id} {...obj} />);

	const skeleton = [...new Array(6)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort />
					{/* <Sort value={sortType} onChangeSort={(i) => setSortType(i)} /> */}
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeleton : pizzas}</div>
				<Pagination onChangePage={(number) => setCurrentPage(number)} />
			</div>
		</div>
	);
};

export default Home;
