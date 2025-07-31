import axios from 'axios';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL;
const STRAPI_MEDIA_URL = import.meta.env.VITE_STRAPI_MEDIA_URL;
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

export const api = axios.create({
	baseURL: STRAPI_URL,
	headers: {
		Authorization: `bearer ${STRAPI_TOKEN}`
	}
});

export { STRAPI_MEDIA_URL, STRAPI_URL };
