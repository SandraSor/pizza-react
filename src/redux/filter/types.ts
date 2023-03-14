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
