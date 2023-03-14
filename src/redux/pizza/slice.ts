import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPizza } from './asyncActions';
import { PizzaItem, PizzaSliceState, Status } from './types';

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

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
