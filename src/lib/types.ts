export interface StrapiMedia {
	url: string;
	alt?: string;
}

export interface StrapiResponse<T> {
	data: T | null;
	meta?: object;
}

export interface StyledTextProps {
	text: string;
	font_size?: 'Small' | 'Normal' | 'Large' | 'Extra-Large';
	color?: 'Default' | 'Website-Theme-Color1' | 'Website-Theme-Color2';
	font_style?: 'Normal' | 'Italic' | 'Bold' | 'Underline';
}

export interface InfoSection {
	id: number;
	subtitle?: string;
	title: string;
	content: StyledTextProps[];
	image: StrapiMedia;
	button_text?: string;
	button_url?: string;
}

export const ALLOWED_LANGS = ['en', 'zh-Hans'] as const;
export type AllowedLang = (typeof ALLOWED_LANGS)[number];
