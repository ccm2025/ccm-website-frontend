import { STRAPI_MEDIA_URL } from '$lib/server/strapi';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const GET: RequestHandler = async ({ platform, params }) => {
	const { path } = params as { path: string };

	if (!path) {
		return Response.redirect('https://placehold.co/600x600?text=No+media', 302);
	}

	const url = new URL(path, STRAPI_MEDIA_URL);
	const cache = platform?.caches.default;

	if (cache) {
		const cachedResponse = await cache.match(url);
		if (cachedResponse) {
			return cachedResponse;
		}
	}

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw error(response.status, `Failed to fetch media: ${response.statusText}`);
		}

		const newHeaders: Headers = new Headers(response.headers);
		newHeaders.set('Cache-Control', 'public, s-maxage=604800');
		newHeaders.set('Content-Disposition', `inline; filename="${path.split('/').pop()}"`);

		const newResponse = new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders
		});

		if (cache) {
			const responseClone = newResponse.clone();
			platform.context.waitUntil(cache.put(url, responseClone));
		}

		return newResponse;
	} catch (e) {
		console.error(`Failed to proxy media request for ${url.href}:`, e);
		return new Response('Media not found', {
			status: 404,
			statusText: 'Not Found'
		});
	}
};
