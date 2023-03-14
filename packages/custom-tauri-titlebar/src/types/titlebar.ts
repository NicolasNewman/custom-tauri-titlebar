export type Position = 'start' | 'middle' | 'end';

export interface TitleBarOptions {
	className: string;
	height: number;
	background: string;
	color: string;
}

export const TitleBarOptionsDefault: TitleBarOptions = {
	className: 'titlebar',
	height: 30,
	color: '#000',
	background: '#fff',
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
