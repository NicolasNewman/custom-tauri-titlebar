export type MenuItem =
	| {
			type: 'item';
			label: string;
			action: () => void;
			shortcut?: string;
	  }
	| { type: 'divider' };

export type Menu = { label: string; items: MenuItem[] };

export type MenuGroup = Menu[];
