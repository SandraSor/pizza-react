import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { Sort } from './filterSlice';

// type FetchPizzasArgs = Record<string, string>;

export type FetchPizzasArgs = {
	sortBy: string;
	order: string;
	category: string;
	currentPage: string;
	searchValue: string;
};

type PizzaItem = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}

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

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
};

export const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPizza.pending, (state) => {
			state.status = Status.LOADING;
			state.items = [];
		});
		builder.addCase(fetchPizza.fulfilled, (state, action) => {
			state.items = action.payload;
			state.status = Status.SUCCESS;
		});
		builder.addCase(fetchPizza.rejected, (state) => {
			state.status = Status.ERROR;
			state.items = [];
		});
	},
	// extraReducers: {
	// 	[fetchPizza.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},
	// 	[fetchPizza.fulfilled]: (state, action) => {
	// 		state.items = action.payload;
	// 		state.status = 'success';
	// 	},
	// 	[fetchPizza.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
