export interface StrapiImage {
	url: string;
	alternativeText?: string;
}

export interface StrapiFile {
	url: string;
	alternativeText?: string;
}

export interface StrapiResponse<T> {
	data: (T & { publishedAt: string }) | null;
	meta?: object;
}

export interface StyledTextProps {
	text: string;
	font_size?: 'Small' | 'Normal' | 'Large' | 'Extra-Large';
	color?: 'Default' | 'Website-Theme-Color1' | 'Website-Theme-Color2';
	font_style?: 'Normal' | 'Italic' | 'Bold' | 'Underline';
}
