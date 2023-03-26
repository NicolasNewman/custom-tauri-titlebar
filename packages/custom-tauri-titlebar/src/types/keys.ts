export const SHIFT = 0b001;
export const CTRL = 0b010;
export const ALT = 0b100;

export type Shortcut = {
	shift?: boolean;
	ctrl?: boolean;
	alt?: boolean;
	key: string;
};

/**
 * Convert a Shortcut object to a Tauri globalShortcut string
 * @private
 * @param {Shortcut} shortcut - object containing shortcut modifiers and action key
 * @returns formatted string which is recognized by Tauri as a shortcut trigger
 */
export const getShortcutTrigger = (shortcut: Shortcut) => {
	return `${shortcut.shift ? 'SHIFT+' : ''}${shortcut.ctrl ? 'CTRL+' : ''}${
		shortcut.alt ? 'ALT+' : ''
	}${shortcut.key.toUpperCase()}`;
};
