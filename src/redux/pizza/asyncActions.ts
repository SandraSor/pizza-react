import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchPizzasArgs, PizzaItem } from './types';

export const fetchPizza = createAsyncThunk<PizzaItem[], FetchPizzasArgs>(
	'pizza/fetchPizzaStatus',
	async (params) => {
		const { sortBy, order, category, currentPage, searchValue } = params;
		const { data } = await axios.get<PizzaItem[]>(
			`http://localhost:3001/pizzas?_page=${currentPage}&_limit=4&${category}&_sort=${sortBy}&_order=${order}&q=${searchValue}`
		);
		return data;
		// return res.data as CartItem[];
	}
);
