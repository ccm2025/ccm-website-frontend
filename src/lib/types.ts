export interface StrapiImage {
	url: string;
	alternativeText?: string;
}

export interface StrapiResponse<T> {
	data: (T & { publishedAt: string }) | null;
	meta?: object;
}
