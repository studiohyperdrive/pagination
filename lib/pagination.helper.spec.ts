import {
	calculateTotalPages,
	formatLink,
	formatQuerystring,
	Pagination,
} from './pagination.helper';
import { IPagination } from './pagination.types';

interface IItem {
	key: string;
}

const items: IItem[] = [{
	key: '1',
}, {
	key: '2',
}, {
	key: '3',
}, {
	key: '4',
}, {
	key: '5',
}];

describe('Pagination', () => {
	it('Should format a paginated response (all parameters)', (done: jest.DoneCallback) => {
		const paginated: IPagination<IItem> = Pagination<IItem>({
			items,
			page: 5,
			size: 10,
			total: 100,
			path: '/api/items',
			query: {
				key: 'value',
				page: 5,
				size: 10,
			},
		});
		expect(paginated).toEqual({
			items,
			total: 100,
			pages: 10,
			page: 5,
			size: 10,
			self: '/api/items?key=value&page=5&size=10',
			first: '/api/items?key=value&page=1&size=10',
			last: '/api/items?key=value&page=10&size=10',
			next: '/api/items?key=value&page=6&size=10',
			prev: '/api/items?key=value&page=4&size=10',
		});
		done();
	});

	it('Should format a paginated response (no next page)', (done: jest.DoneCallback) => {
		const paginated: IPagination<IItem> = Pagination<IItem>({
			items,
			page: 10,
			size: 10,
			total: 100,
			path: '/api/items',
			query: {
				key: 'value',
				page: 10,
				size: 10,
			},
		});
		expect(paginated).toEqual({
			items,
			total: 100,
			pages: 10,
			page: 10,
			size: 10,
			self: '/api/items?key=value&page=10&size=10',
			first: '/api/items?key=value&page=1&size=10',
			last: '/api/items?key=value&page=10&size=10',
			prev: '/api/items?key=value&page=9&size=10',
		});
		done();
	});

	it('Should format a paginated response (no previous page)', (done: jest.DoneCallback) => {
		const paginated: IPagination<IItem> = Pagination<IItem>({
			items,
			page: 1,
			size: 10,
			total: 100,
			path: '/api/items',
			query: {
				key: 'value',
				page: 1,
				size: 10,
			},
		});
		expect(paginated).toEqual({
			items,
			total: 100,
			pages: 10,
			page: 1,
			size: 10,
			self: '/api/items?key=value&page=1&size=10',
			first: '/api/items?key=value&page=1&size=10',
			last: '/api/items?key=value&page=10&size=10',
			next: '/api/items?key=value&page=2&size=10',
		});
		done();
	});

	it('Should format a paginated response (no page links)', (done: jest.DoneCallback) => {
		const paginated: IPagination<IItem> = Pagination<IItem>({
			items,
			page: 5,
			size: 10,
			total: 100,
		});
		expect(paginated).toEqual({
			items,
			total: 100,
			pages: 10,
			page: 5,
			size: 10,
		});
		done();
	});

	it('Should format a paginated response (no query parameters)', (done: jest.DoneCallback) => {
		const paginated: IPagination<IItem> = Pagination<IItem>({
			items,
			page: 5,
			size: 10,
			total: 100,
			path: '/api/items',
		});
		expect(paginated).toEqual({
			items,
			total: 100,
			pages: 10,
			page: 5,
			size: 10,
			self: '/api/items?page=5&size=10',
			first: '/api/items?page=1&size=10',
			last: '/api/items?page=10&size=10',
			next: '/api/items?page=6&size=10',
			prev: '/api/items?page=4&size=10',
		});
		done();
	});

	describe('calculateTotalPages', () => {
		it('Should calculate the total amount of pages', (done: jest.DoneCallback) => {
			const pages: number = calculateTotalPages(100, 10);
			expect(pages).toEqual(10);
			done();
		});
	});

	describe('formatQuerystring', () => {
		it('Should format the querystring', (done: jest.DoneCallback) => {
			const qs: string = formatQuerystring(1, 10, { key: 'value', page: 1, size: 10 });
			expect(qs).toEqual('?key=value&page=1&size=10');
			done();
		});
	});

	describe('formatLink', () => {
		it('Should format a link', (done: jest.DoneCallback) => {
			const link: string = formatLink('/api/items', 1, 10, { key: 'value', page: 1, size: 10 });
			expect(link).toEqual('/api/items?key=value&page=1&size=10');
			done();
		});
	});
});
