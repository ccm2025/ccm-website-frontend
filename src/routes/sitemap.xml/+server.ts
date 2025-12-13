import { env } from '$env/dynamic/private';
import { ALLOWED_LANGS } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

const siteUrl = env.PRIVATE_SITE_URL;

const basePaths = [
	'/',
	'/about',
	'/events',
	'/freshman',
	'/give',
	'/plan-your-visit',
	'/support',
	'/volunteer'
];

export const GET: RequestHandler = async () => {
	const sitemap = `<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
	${basePaths
		.map((path) => {
			const cleanPath = path === '/' ? '' : path;
			return `
        <url>
          <loc>${siteUrl}/en${cleanPath}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          
          ${ALLOWED_LANGS.map(
						(lang) => `
            <xhtml:link
              rel="alternate"
              hreflang="${lang}"
              href="${siteUrl}/${lang}${cleanPath}"
            />
          `
					).join('')}
        </url>
      `;
		})
		.join('')}
    </urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
