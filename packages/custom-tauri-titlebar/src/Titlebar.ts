import { InnerData, Position, TitleBarOptions, TitleBarOptionsDefault } from './types/titlebar';
import { lighten } from './lib/color';

export default class Titlebar {
	private options: TitleBarOptions;
	private start: Element;
	private middle: Element;
	private end: Element;
	private slots: { [key in Position]: Element };

	/**
	 * Constructor to handle initialization of the Titlebar. This includes insertion of the Titlebar to the begining of the \<body \/\> and the styles at the end of the \<head\/\>
	 *
	 * @constructor
	 * @param _options - Object containing customization settings for the titlebar
	 * @param {string} [_options.className=titlebar] - The class name of the Titlebar container and the prefix used for all subclasses. If no class name is specified, "titlebar" is used as the default. If a custom class name is given, ensure you are using the given name when adding your own styles targeting subclasses.
	 * @param {number} [_options.height=30] - The height of the titlebar, in pixels.
	 * @param {string} [_options.color=#000000] - The color of all text in the titlebar. Must be given as a 6 digit hexidecimal code (3 digit codes are unsupported by the lighten function).
	 * @param {string} [_options.background=#ffffff] - The background color of the titlebar. Must be given as a 6 digit hexidecimal code.
	 */
	constructor(_options: Partial<TitleBarOptions>) {
		this.options = { ...TitleBarOptionsDefault, ..._options };

		document.head.insertAdjacentHTML(
			'beforeend',
			`<style>
	.${this.options.className} {
		height: ${this.options.height}px;
		background: ${this.options.background};
		color: ${this.options.color};
		user-select: none;
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}

	.${this.options.className}-section {
		display: flex;
		align-items: center;
	}

	.${this.options.className}-button {
		display: inline-flex;
		justify-content: center;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: ${this.options.height}px;
		height: ${this.options.height}px;
	}

	.${this.options.className}-button:hover {
		background: ${lighten(this.options.background, -0.1)};
	}
	
	.${this.options.className}-button:active {
		background: ${lighten(this.options.background, 0.1)};
	}
</style>`,
		);

		const titlebar = document.createElement('div');
		titlebar.className = this.options.className;
		document.body.insertAdjacentElement('afterbegin', titlebar);

		this.start = document.createElement('div');
		this.start.className = this.subclass('section');
		this.middle = document.createElement('div');
		this.middle.className = this.subclass('section');
		this.end = document.createElement('div');
		this.end.className = this.subclass('section');
		this.slots = {
			start: this.start,
			middle: this.middle,
			end: this.end,
		};
		titlebar.insertAdjacentElement('afterbegin', this.end);
		titlebar.insertAdjacentElement('afterbegin', this.middle);
		titlebar.insertAdjacentElement('afterbegin', this.start);
	}

	private subclass(name: string) {
		return `${this.options.className}-${name}`;
	}

	/**
	 * Insert a div containing an icon into the titlebar
	 *
	 * @param inner - Object containing the div's inner data and the method of insertion.
	 * @param inner.type - Method of insertion into the titlebar.
	 * - "src" creates an \<img \/\> with its source set to inner.data.
	 * - "element" inserts a user-defined Element into the div.
	 * - "html" inserts html as a string into the div.
	 * @param {Position} [position=start] - Position to insert the icon at. Defaults to "start" if unspecified.
	 * @example
	 * // insert an icon as an img element with src='../icon.svg' at the default position
	 * titlebar.addIcon({type: 'src', data: '../icon.svg'})
	 * @example
	 * // insert an icon as a fa-icon provided as an html string at the end position
	 * titlebar.addIcon({type: 'html', data: '<i class="fa-solid fa-globe"></i>'}, 'end')
	 */
	addIcon(inner: InnerData, position: Position = 'start') {
		const div = document.createElement('div');
		div.className = this.subclass('icon');

		if (inner.type === 'src') {
			const icon = document.createElement('img');
			icon.src = inner.data;
			icon.alt = 'Icon';

			div.insertAdjacentElement('afterbegin', icon);
		} else if (inner.type === 'html') {
			div.insertAdjacentHTML('afterbegin', inner.data);
		} else if (inner.type === 'element') {
			div.insertAdjacentElement('afterbegin', inner.data);
		}

		this.slots[position].insertAdjacentElement('beforeend', div);
	}

	/**
	 * Insert a div containing a title into the titlebar.
	 *
	 * @param text - Text to insert into the titlebar.
	 * @param {Position} [position=middle] - Position to insert the icon at. Defaults to "middle" if unspecified.
	 * @example
	 * // insert the title 'Hello, world!' at the default position
	 * titlebar.addTitle('Hello, world!')
	 */
	addTitle(text: string, position: Position = 'middle') {
		const div = document.createElement('div');
		div.className = this.subclass('title');
		div.textContent = text;
		this.slots[position].insertAdjacentElement('beforeend', div);
	}

	/**
	 * Insert a button into the titlebar
	 * @param id - id to be assigned to the element
	 * @param inner - Object containing the button's inner data and the method of insertion.
	 * @param inner.type - Method of insertion into the titlebar.
	 * - "src" creates an \<img \/\> with its source set to inner.data.
	 * - "element" inserts a user-defined Element into the button.
	 * - "html" inserts html as a string into the button.
	 * @param onClick - Event handler for when the button is clicked.
	 * @param {Position} [position=end] - Position to insert the button at. Defaults to "end" if unspecified.
	 */
	addButton(id: string, inner: InnerData, onClick: (e: MouseEvent) => void, position: Position = 'end') {
		const button = document.createElement('div');
		button.id = id;
		button.className = this.subclass('button');
		button.addEventListener('click', onClick);
		if (inner.type === 'src') {
			const icon = document.createElement('img');
			icon.src = inner.data;
			icon.alt = 'Icon';

			button.insertAdjacentElement('afterbegin', icon);
		} else if (inner.type === 'html') {
			button.insertAdjacentHTML('afterbegin', inner.data);
		} else if (inner.type === 'element') {
			button.insertAdjacentElement('afterbegin', inner.data);
		}
		this.slots[position].insertAdjacentElement('beforeend', button);
	}
}
