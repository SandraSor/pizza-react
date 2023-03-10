import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyEnum {
	RATING_ASC = 'rating',
	RATING_DESC = '-rating',
	PRICE_ASC = 'price',
	PRICE_DESC = '-price',
	TITLE_ASC = 'title',
	TITLE_DESC = '-title',
}

export type Sort = {
	name: string;
	sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: Sort;
}

const initialState: FilterSliceState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности ASC',
		sortProperty: SortPropertyEnum.RATING_ASC,
	},
};

export const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			// console.log('action setCategoryId', action);
			state.categoryId = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			// console.log('action setCategoryId', action);
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			// console.log('action setCategoryId', action);
			state.sort = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			// console.log('action setCategoryId', action);
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			// console.log('action setCategoryId', action);
			if (Object.keys(action.payload).length) {
				state.categoryId = +action.payload.categoryId;
				state.currentPage = +action.payload.currentPage;
				state.sort = action.payload.sort;
			} else {
				state.categoryId = 0;
				state.currentPage = 1;
				state.sort = {
					name: 'популярности ASC',
					sortProperty: SortPropertyEnum.RATING_ASC,
				};
			}
		},
	},
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
	setCategoryId,
	setSearchValue,
	setSort,
	setCurrentPage,
	setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
