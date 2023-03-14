export type FetchPizzasArgs = {
	sortBy: string;
	order: string;
	category: string;
	currentPage: string;
	searchValue: string;
};

export type PizzaItem = {
	id: number;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: PizzaItem[];
	status: Status;
}
