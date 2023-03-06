import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice.js';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Card from '../component/Card/Card';
import Skeleton from '../component/Card/Skeleton';
import Categories from '../component/Categories';
import Pagination from '../component/Pagination/Pagination';
import Sort from '../component/Sort';
import AppContext from '../context';

import { list } from '../component/Sort';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filter
	);
	const sortType = sort.sortProperty;

	const [items, setItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const { searchValue } = React.useContext(AppContext);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const fetchPizzas = async () => {
		setIsLoading(true);

		const sortBy = sortType.replace('-', '');
		const order = sortType.includes('-') ? 'desc' : 'asc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';

		try {
			const res = await axios.get(
				`http://localhost:3001/pizzas?_page=${currentPage}&_limit=4&${category}&_sort=${sortBy}&_order=${order}&q=${searchValue}`
			);
			setItems(res.data);
		} catch (error) {
			console.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	//Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	React.useEffect(() => {
		// console.log('1 useEff window bef', isSearch.current);
		isMounted.current = false;
		isSearch.current = false;
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
		// console.log('1 useEff window aft', isSearch.current);
	}, []);

	//Проверка нужно ли вшивать в URL параметры: 1 рендер-НЕТ, дальнейшие ДА
	React.useEffect(() => {
		// console.log('2 useEff isMon bef', isMounted.current);
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
		// console.log('2 useEff isMon aft', isMounted.current);
	}, [categoryId, sortType, currentPage]);

	//Если был первый рендер, то запрашиваем наши пиццы
	React.useEffect(() => {
		window.scrollTo(0, 0);
		// console.log('3-1 useEff fetchPizza bef', isSearch.current);
		if (!isSearch.current) {
			fetchPizzas();
		}
		isSearch.current = false;
		// console.log('3-1 useEff fetchPizza aft', isSearch.current);
	}, [categoryId, sortType, searchValue, currentPage]);

	const pizzas = items.map((obj) => <Card key={obj.id} {...obj} />);

	const skeleton = [...new Array(4)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='content'>
			<div className='container'>
				<div className='content__top'>
					<Categories value={categoryId} onChangeCategory={onChangeCategory} />
					<Sort />
				</div>
				<h2 className='content__title'>Все пиццы</h2>
				<div className='content__items'>{isLoading ? skeleton : pizzas}</div>
				<Pagination onChangePage={onChangePage} />
			</div>
		</div>
	);
};

export default Home;
