import { STRAPI_URL } from '$lib/server/strapi';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, request }) => {
	const { searchParams } = new URL(request.url);
	const mediaUrl = searchParams.get('url');

	if (!mediaUrl || !mediaUrl.startsWith(STRAPI_URL)) {
		return new Response('Forbidden: Invalid path', { status: 403 });
	}

	const cacheKey = new Request(mediaUrl);
	const cache = platform?.caches.default;

	if (cache) {
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse) {
			return cachedResponse;
		}
	}

	try {
		const response = await fetch(mediaUrl);

		if (!response.ok) {
			throw error(response.status, `Failed to fetch media from Strapi: ${response.statusText}`);
		}

		const responseToCache = response.clone();

		if (cache) {
			responseToCache.headers.set('Cache-Control', 'public, s-maxage=86400');
			platform.context.waitUntil(cache.put(mediaUrl, responseToCache));
		}

		return response;
	} catch (e) {
		console.error(`Failed to proxy media request for ${mediaUrl}:`, e);
		throw error(500, 'Media proxy error');
	}
};
