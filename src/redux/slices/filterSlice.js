import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
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
		setCurrentPage(state, action) {
			// console.log('action setCategoryId', action);
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			// console.log('action setCategoryId', action);
			state.categoryId = +action.payload.categoryId;
			state.currentPage = +action.payload.currentPage;
			state.sort = action.payload.sort;
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } =
	filterSlice.actions;

export default filterSlice.reducer;
