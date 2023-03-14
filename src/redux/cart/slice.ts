import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { CartItem, CartSliceState } from './types';

const { items, totalPrice } = getCartFromLS();

const initialState: CartSliceState = {
	totalPrice,
	items,
	// count: 0,
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find((obj) => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({ ...action.payload, count: 1 });
			}

			state.totalPrice = calcTotalPrice(state.items);
		},
		minusItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
				state.totalPrice = state.totalPrice - findItem.price;
			}
		},
		removeItem(state, action: PayloadAction<number>) {
			const findItem = state.items.find((obj) => obj.id === action.payload);
			if (findItem) {
				state.totalPrice = state.totalPrice - findItem.price * findItem.count;
			}
			state.items = state.items.filter((obj) => obj.id !== action.payload);
		},
		clearItem(state) {
			state.items = [];
			state.totalPrice = 0;
		},
	},
});

export const { addItem, minusItem, removeItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
