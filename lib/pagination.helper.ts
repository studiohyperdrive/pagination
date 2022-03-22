import { stringify } from 'qs';
import omit from 'lodash.omit';

import { IPagination } from './pagination.types';

/**
 * Calculate the total amount of pages based on the total amount of elements and the page size
 * @param {number} total
 * @param {number} size
 */
export function calculateTotalPages(total: number, size: number): number {
	return Math.ceil(total / size);
}

/**
 * Format the querystring based on the page, the size and the current request querystring
 * @param {number} page
 * @param {number} size
 * @param {Record<string, unknown>} query
 */
export function formatQuerystring(page: number, size: number, query: Record<string, unknown>): string {
	return `?${stringify({
		...omit(query, ['page', 'size']),
		page,
		size,
	})}`;
}

/**
 * Format a link based on the path, the page, the size and the current request querystring
 * @param {number} page
 * @param {number} size
 * @param {Record<string, unknown>} query
 */
export function formatLink(path: string, page: number, size: number, query: Record<string, unknown>): string {
	return `${path}${formatQuerystring(page, size, query)}`;
}

/**
 * Create a paginated response based on the parameters.
 * This function takes in generic "T" to type the provided entities.
 * @param {array} items
 * @param {number} page
 * @param {string} path
 * @param {Record<string, unknown>} query
 * @param {number} size
 * @param {number} total
 */
export function Pagination<T = unknown>({
	items,
	page,
	path = '',
	query = {},
	size,
	total,
}: {
	items: T[];
	page: number;
	path?: string;
	query?: Record<string, unknown>,
	size: number;
	total: number;
}): IPagination<T> {
	const pages: number = calculateTotalPages(total, size);

	return {
	  _embedded: {
			items,
			total,
			pages,
			page,
			size,
	  },
	  ...path && {
			_links: {
		  self: formatLink(path, page, size, query),
		  first: formatLink(path, 1, size, query),
		  last: formatLink(path, pages, size, query),
		  ...(page + 1 <= pages) && {
					next: formatLink(path, page + 1, size, query),
		  },
		  ...(page - 1 > 0) && {
					prev: formatLink(path, page - 1, size, query),
		  },
			},
	  },
	};
}
