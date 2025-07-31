import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ platform, request }) => {
	const { searchParams } = new URL(request.url);
	const imageUrl = searchParams.get('url');

	if (!imageUrl) {
		return new Response('Image URL is required', { status: 400 });
	}

	const cacheKey = new Request(imageUrl);
	const cache = platform?.caches.default;

	if (cache) {
		const cachedResponse = await cache.match(cacheKey);
		if (cachedResponse) {
			return cachedResponse;
		}
	}

	const imageResponse = await fetch(imageUrl);

	if (!imageResponse || !imageResponse.ok) {
		return new Response('Image not found', { status: 404 });
	}

	if (cache) {
		const responseToCache = new Response(imageResponse.body, imageResponse);

		// Set cache lifetime to 7 days
		responseToCache.headers.set('Cache-Control', 'public, s-maxage=604800');

		platform.context.waitUntil(cache.put(cacheKey, responseToCache));
	}

	return imageResponse;
};
