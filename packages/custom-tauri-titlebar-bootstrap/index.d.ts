export as namespace bootstrap;

import Button from './types/button';
import Dropdown from './types/dropdown';

declare global {
	interface JQuery {
		button: Button.jQueryInterface;
		dropdown: Dropdown.jQueryInterface;
	}
}

export { Button, Dropdown };
