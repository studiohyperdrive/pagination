export interface IEmbedded<T> {
	items: T[];
	size: number;
	page: number;
	pages: number;
	total: number;
}

export interface ILinks {
	self?: string;
	first?: string;
	last?: string;
	next?: string;
	prev?: string;
}

export interface IPagination<T> {
	_embedded: IEmbedded<T>;
	_links?: ILinks;
}
