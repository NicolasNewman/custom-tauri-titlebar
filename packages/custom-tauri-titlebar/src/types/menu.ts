export type MenuItem =
	| {
			type: 'item';
			label: string;
			action: () => void;
			shortcut?: string;
	  }
	| { type: 'divider' }
	| { type: 'submenu'; submenu: Menu };

export type Menu = { label: string; items: MenuItem[] };

export type MenuGroup = Menu[];
