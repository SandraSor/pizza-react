import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярности ASC',
		sortProperty: 'rating',
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action) {
			// console.log('action setCategoryId', action);
			state.categoryId = action.payload;
		},
		setSort(state, action) {
			// console.log('action setCategoryId', action);
			state.sort = action.payload;
		},
	},
});

export const { setCategoryId, setSort } = filterSlice.actions;

export default filterSlice.reducer;
