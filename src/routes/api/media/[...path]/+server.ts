import { STRAPI_MEDIA_URL } from '$lib/server/strapi';
import { type RequestHandler } from '@sveltejs/kit';

const ALLOWED_EXTENSIONS = [
	'.jpg',
	'.jpeg',
	'.png',
	'.gif',
	'.webp',
	'.svg',
	'.pdf',
	'.mp4',
	'.mp3',
	'.mov'
] as const;

function validateMediaPath(path: string): { isValid: boolean; sanitizedPath: string } {
	if (!path || typeof path !== 'string') {
		return { isValid: false, sanitizedPath: '' };
	}

	const cleanPath = path.split('?')[0].split('#')[0];

	// Basic security checks
	if (
		cleanPath.includes('..') ||
		cleanPath.includes('//') ||
		cleanPath.startsWith('/') ||
		cleanPath.includes('\0') ||
		cleanPath.includes('%00')
	) {
		return { isValid: false, sanitizedPath: '' };
	}

	try {
		new URL(cleanPath);
		return { isValid: false, sanitizedPath: '' };
	} catch {
		// Not a valid URL, which is expected
	}

	// Check for allowed extensions
	const ext = cleanPath.toLowerCase().slice(cleanPath.lastIndexOf('.'));
	if (!ALLOWED_EXTENSIONS.includes(ext as any)) {
		return { isValid: false, sanitizedPath: '' };
	}

	// Sanitize multiple slashes and trim spaces
	const sanitizedPath = cleanPath.replace(/\/+/g, '/').trim();

	return { isValid: true, sanitizedPath };
}

export const GET: RequestHandler = async ({ params, request }) => {
	const { path } = params as { path: string };

	const { isValid, sanitizedPath } = validateMediaPath(path);

	if (!isValid || !sanitizedPath) {
		console.warn('Suspicious media path request:', {
			path,
			ip: request.headers.get('x-forwarded-for'),
			userAgent: request.headers.get('user-agent')
		});
		return new Response('Invalid media path', { status: 400 });
	}

	let mediaUrl: URL;
	try {
		const baseUrl = STRAPI_MEDIA_URL.endsWith('/')
			? STRAPI_MEDIA_URL.slice(0, -1)
			: STRAPI_MEDIA_URL;
		mediaUrl = new URL(`${baseUrl}/${sanitizedPath}`);

		// Ensure the media URL is within the allowed origin
		const baseOrigin = new URL(STRAPI_MEDIA_URL).origin;
		if (mediaUrl.origin !== baseOrigin) {
			throw new Error('Invalid media origin');
		}
	} catch (e) {
		console.error('Failed to construct media URL:', e);
		return new Response('Invalid media URL', { status: 400 });
	}

	try {
		const response = await fetch(mediaUrl.href, {
			signal: AbortSignal.timeout(10000)
		});

		if (!response.ok) {
			console.error(`Failed to fetch media from ${mediaUrl.href}:`, response.statusText);
			return new Response('Media not found', { status: 404 });
		}

		// Verify content type to prevent serving unexpected files
		const contentType = response.headers.get('content-type') || '';
		const allowedTypes = [
			'image/',
			'video/',
			'audio/',
			'application/pdf',
			'application/octet-stream'
		];

		if (!allowedTypes.some((type) => contentType.startsWith(type))) {
			console.warn('Unexpected content type:', contentType, 'for', mediaUrl.href);
			return new Response('Invalid media type', { status: 400 });
		}

		const newHeaders = new Headers(response.headers);
		newHeaders.set('Cache-Control', 'public, max-age=604800, immutable');
		newHeaders.set('X-Content-Type-Options', 'nosniff'); // Prevent MIME type sniffing

		// Prevent path traversal in filename
		const filename = sanitizedPath.split('/').pop() || 'media';
		newHeaders.set('Content-Disposition', `inline; filename="${filename}"`);

		const newResponse = new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: newHeaders
		});

		return newResponse;
	} catch (e) {
		if (e instanceof Error && e.name === 'TimeoutError') {
			console.error('Media request timeout:', mediaUrl.href);
			return new Response('Request timeout', { status: 504 });
		}

		console.error('Failed to proxy media request:', e);
		return new Response('Internal server error', { status: 500 });
	}
};
