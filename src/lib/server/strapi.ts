import { env } from '$env/dynamic/private';
import axios from 'axios';

const STRAPI_URL = env.PRIVATE_STRAPI_URL;
const STRAPI_MEDIA_URL = env.PRIVATE_STRAPI_MEDIA_URL;
const STRAPI_TOKEN = env.PRIVATE_STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
	throw new Error('Missing required Strapi environment variables');
}

export const api = axios.create({
	baseURL: STRAPI_URL,
	headers: {
		Authorization: `bearer ${STRAPI_TOKEN}`
	},
	timeout: 10000
});

export { STRAPI_MEDIA_URL, STRAPI_URL };
