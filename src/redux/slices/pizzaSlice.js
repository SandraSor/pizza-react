import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizza = createAsyncThunk(
	'pizza/fetchPizzaStatus',
	async (params) => {
		const { sortBy, order, category, currentPage, searchValue } = params;
		const res = await axios.get(
			`http://localhost:3001/pizzas?_page=${currentPage}&_limit=4&${category}&_sort=${sortBy}&_order=${order}&q=${searchValue}`
		);
		return res.data;
	}
);

const initialState = {
	items: [],
	status: 'loading', //loading, success, error
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: {
		[fetchPizza.pending]: (state) => {
			state.status = 'loading';
			state.items = [];
		},
		[fetchPizza.fulfilled]: (state, action) => {
			state.items = action.payload;
			state.status = 'success';
		},
		[fetchPizza.rejected]: (state) => {
			state.status = 'error';
			state.items = [];
		},
	},
});

export const selectPizzaData = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
