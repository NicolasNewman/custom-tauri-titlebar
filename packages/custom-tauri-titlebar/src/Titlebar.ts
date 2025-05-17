import { InnerData, Position, TitleBarOptions, TitleBarOptionsDefault } from './types/titlebar';
import { Menu } from './types/menu';
import 'custom-tauri-titlebar-bootstrap/dist/js/bootstrap.bundle.min.js';
import 'custom-tauri-titlebar-bootstrap/dist/css/bootstrap.min.css';
import { styleGen } from './lib/styleGen';
import { getShortcutTrigger } from './types/keys';
import { register } from '@tauri-apps/plugin-global-shortcut';

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
	 * @param {string} [_options.theme] - Theme colors for the titlebar. Primary is used for the titlebar and secondary is used for the menu dropdowns. Please ensure that the provided colors are 6-digit hexidecimal codes.
	 */
	constructor(_options: Partial<TitleBarOptions>) {
		this.options = { ...TitleBarOptionsDefault, ..._options };

		document.head.insertAdjacentHTML('beforeend', styleGen(this.options));

		const titlebar = document.createElement('div');
		titlebar.className = this.options.className;
		titlebar.id = 'custom-tauri-titlebar';
		titlebar.setAttribute('data-tauri-drag-region', '');

		// prevent duplicate titlebars from being inserted into the DOM
		if (!document.getElementById('custom-tauri-titlebar')) {
			document.body.insertAdjacentElement('afterbegin', titlebar);
		}

		this.start = document.createElement('div');
		this.middle = document.createElement('div');
		this.end = document.createElement('div');
		this.slots = {
			start: this.start,
			middle: this.middle,
			end: this.end,
		};
		for (const [, value] of Object.entries(this.slots)) {
			value.className = this.subclass('section');
			value.setAttribute('data-tauri-drag-region', '');
		}
		titlebar.insertAdjacentElement('afterbegin', this.end);
		titlebar.insertAdjacentElement('afterbegin', this.middle);
		titlebar.insertAdjacentElement('afterbegin', this.start);
	}

	private subclass(name: string) {
		return `${this.options.className}-${name}`;
	}

	private createDropdownButton(label: string, ariaLabel: string) {
		const button = document.createElement('div');
		button.id = ariaLabel;
		button.setAttribute('data-bs-toggle', 'dropdown');
		button.setAttribute('data-bs-auto-close', 'outside');
		button.setAttribute('aria-expanded', 'false');
		button.innerText = label;
		return button;
	}

	private async createDropdown(parent: Element, menu: Menu, position: Position, counter = 0) {
		for (const item of menu.items) {
			const li = document.createElement('li');
			if (item.type === 'item') {
				const a = document.createElement('a');
				a.className = 'dropdown-item';
				a.innerText = item.label;
				a.addEventListener('click', item.action);

				li.insertAdjacentElement('afterbegin', a);

				if (item.shortcut) {
					const shortcut = getShortcutTrigger(item.shortcut);
					await register(shortcut, item.action);
				}
			} else if (item.type === 'divider') {
				const hr = document.createElement('hr');
				hr.className = 'dropdown-divider';
				li.insertAdjacentElement('afterbegin', hr);
			} else if (item.type === 'submenu') {
				const positionClassName = position === 'start' ? 'dropend' : position === 'end' ? 'dropstart' : '';
				const ariaLabel = `${item.submenu.label}-submenu-${counter}`;
				li.className = positionClassName;

				const button = this.createDropdownButton(item.submenu.label, ariaLabel);
				button.className = 'dropdown-item';
				button.innerHTML = `
				<span style="display: flex; justify-content: space-between;">
					<span>${button.innerText}</span>
					<span class="${positionClassName === '' ? 'dropend' : positionClassName}-manual"></span>
				</span>
				`;

				const ul = document.createElement('ul');
				ul.className = 'dropdown-menu';
				ul.setAttribute('aria-labelledby', ariaLabel);

				li.insertAdjacentElement('afterbegin', button);
				li.insertAdjacentElement('beforeend', ul);
				this.createDropdown(ul, item.submenu, position, ++counter);
			}
			parent.insertAdjacentElement('beforeend', li);
		}
	}

	/**
	 * Insert a div containing a dropdown menu into the titlebar
	 * @async
	 * @param menu - Object containing the structure of the menu
	 * @param {Position} [position = start] - Position to insert the menu at. Defaults to "start" if unspecified.
	 * @example
	 * // Simple menu with a divider at the default position
	 * titlebar.addMenu({
	 * 	label: 'File',
	 * 	items: [
	 * 		{
	 * 			type: 'item',
	 * 			label: 'Open',
	 * 			action: () => { open() }
	 * 		},
	 * 		{ type: 'divider' }
	 * 		{
	 * 			type: 'item',
	 * 			label: 'Save',
	 * 			action: () => { save() }
	 * 		}
	 * 	]
	 * })
	 */
	async addMenu(menu: Menu, position: Position = 'start') {
		const dropdown = document.createElement('div');
		dropdown.className = 'dropdown';

		const ariaLabel = `${menu.label}-menu`;
		const button = this.createDropdownButton(menu.label, ariaLabel);
		button.className = this.subclass('menu');

		const ul = document.createElement('ul');
		ul.className = 'dropdown-menu';
		ul.setAttribute('aria-labelledby', ariaLabel);
		await this.createDropdown(ul, menu, position);

		dropdown.insertAdjacentElement('afterbegin', button);
		dropdown.insertAdjacentElement('beforeend', ul);

		this.slots[position].insertAdjacentElement('beforeend', dropdown);
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
		div.setAttribute('data-tauri-drag-region', '');

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
		div.setAttribute('data-tauri-drag-region', '');
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
	 * @example
	 * // add a button with id 'close-button' at the default position which prints to the console when clicked
	 * titlebar.addButton('close-button', { type: 'src', data: 'https://api.iconify.design/mdi:close.svg' }, () => console.log('close!'));
);
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
