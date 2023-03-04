import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice.js';
import axios from 'axios';

import Card from '../component/Card/Card';
import Skeleton from '../component/Card/Skeleton';
import Categories from '../component/Categories';
import Pagination from '../component/Pagination/Pagination';
import Sort from '../component/Sort';
import AppContext from '../context';

const Home = () => {
	const dispatch = useDispatch();
	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filter
	);
	const sortType = sort.sortProperty;
	// const sortType = useSelector((state) => state.filter.sort.sortProperty);

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	// const [categoryId, setCategoryId] = React.useState(0);
	// const [sortType, setSortType] = React.useState({
	// 	name: 'популярности ASC',
	// 	sortProperty: 'rating',
	// });
	// const [currentPage, setCurrentPage] = React.useState(1);
	const { searchValue } = React.useContext(AppContext);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	React.useEffect(() => {
		setIsLoading(true);

		axios
			.get(
				`http://localhost:3001/pizzas?_page=${currentPage}&_limit=4&${
					categoryId > 0 ? `category=${categoryId}` : ''
				}&_sort=${sortType.replace('-', '')}&_order=${
					sortType.includes('-') ? 'desc' : 'asc'
				}&q=${searchValue}`
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});

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
				<Pagination onChangePage={onChangePage} />
			</div>
		</div>
	);
};

export default Home;
