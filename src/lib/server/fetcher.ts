import { api } from '$lib/server/strapi';
import type { StrapiResponse } from '$lib/types';
import { error } from '@sveltejs/kit';
import axios from 'axios';

interface FetcherOptions<T> {
	platform: App.Platform | undefined;
	request: Request;
	cacheSeconds?: number;

	endpoint: string;
	params?: object;
	callback?: (data: T) => FetcherResponse<T>;
}

interface FetcherResponse<T> {
	page: T;
}

/**
 * A generic data fetching function with caching capabilities
 * @param options Includes platform, request, endpoint, params, mapper function, and cache duration
 * @returns Returns the final data processed by the mapping function
 */
export async function fetch<ApiAttributes>({
	platform,
	request,
	cacheSeconds = 3600 * 72, // Default cache duration of 72 hours
	endpoint,
	params = {},
	callback = (data: ApiAttributes) => ({ page: data })
}: FetcherOptions<ApiAttributes>): Promise<FetcherResponse<ApiAttributes>> {
	const cacheKey = request.url;
	const cache = platform?.env?.caches?.default;

	if (cache) {
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse) {
			return await cachedResponse.json();
		}
	}

	try {
		const response = await api.get<StrapiResponse<ApiAttributes>>(endpoint, { params: params });

		const pageData = response.data.data;

		if (!pageData) {
			throw error(404, `Data not found: ${endpoint}`);
		}

		const finalData = callback(pageData);

		if (cache) {
			const cacheResponse = new Response(JSON.stringify(finalData), {
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': `s-maxage=${cacheSeconds}`
				}
			});
			platform.context.waitUntil(cache.put(cacheKey, cacheResponse));
		}

		return finalData;
	} catch (e) {
		console.error('Error fetching:', e);
		if (axios.isAxiosError(e)) {
			const status = e.response?.status || 500;
			const message = e.response?.data?.error?.message || 'Failed to load page data.';
			throw error(status, message);
		}
		throw error(500, 'An unexpected error occurred.');
	}
}
