export type Position = 'start' | 'middle' | 'end';

export interface TitleBarOptions {
	className: string;
	height: number;
	theme: Theme;
}

export interface Theme {
	bgPrimary: string;
	bgSecondary: string;
	fontPrimary: string;
	fontSecondary: string;
}

export const TitleBarOptionsDefault: TitleBarOptions = {
	className: 'titlebar',
	height: 30,
	theme: {
		bgPrimary: '#c0c0c0',
		bgSecondary: '#ffffff',
		fontPrimary: '#191919',
		fontSecondary: '#000000',
	},
};

export type InnerData =
	| {
			type: 'src' | 'html';
			data: string;
	  }
	| {
			type: 'element';
			data: Element;
	  };
