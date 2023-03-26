import { Shortcut } from './keys';

export type MenuItem =
	| {
			type: 'item';
			label: string;
			action: () => void;
			shortcut?: Shortcut;
	  }
	| { type: 'divider' }
	| { type: 'submenu'; submenu: Menu };

export type Menu = { label: string; items: MenuItem[] };

export type MenuGroup = Menu[];
