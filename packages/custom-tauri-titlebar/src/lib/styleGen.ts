import { TitleBarOptions } from '../types/titlebar';
import { lighten } from './color';

export function styleGen(config: TitleBarOptions) {
	/*========================================*
	 *              Root Styles               *
	 *========================================*/
	const titlebarStyles = `
    .${config.className} {
		height: ${config.height}px;
		background: ${config.theme.bgPrimary};
		color: ${config.theme.fontPrimary};
		user-select: none;
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}`;

	/*========================================*
	 *             Section Styles             *
	 *========================================*/
	const sectionStyles = `
    .${config.className}-section {
		display: flex;
		align-items: center;
	}`;

	/*========================================*
	 *             Title Styles               *
	 *========================================*/
	const titleStyles = `
	.${config.className}-title {
		cursor: none;
	}
	`;

	/*========================================*
	 *             Icon Styles                *
	 *========================================*/
	const iconStyles = `
    .${config.className}-icon {
        height: ${config.height}px;
        width: ${config.height}px;
		cursor: none;
    }

    .${config.className}-icon img {
        height: calc(${config.height}px - 6px);
        width: calc(${config.height}px - 6px);
        padding: 3px;
    }
    `;

	/*========================================*
	 *           Menu/Button Styles           *
	 *========================================*/

	const sharedButtonStyles = `
    .${config.className}-button,
	.${config.className}-menu {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		height: ${config.height}px;
	}
    
    .${config.className}-button:hover,
	.${config.className}-menu:hover {
		background: ${lighten(config.theme.bgPrimary, -0.1)};
	}
	
	.${config.className}-button:active,
	.${config.className}-menu:active {
		background: ${lighten(config.theme.bgPrimary, 0.1)};
	}`;

	const buttonStyles = `
    .${config.className}-button {
		width: ${config.height}px;
	}`;

	const menuStyles = `
    .${config.className}-menu {
		padding: 0 6px;
	}`;

	/*========================================*
	 *           Bootstrap Override           *
	 *========================================*/
	const bootstrapOverride = `
    .${config.className} div.dropdown {
        padding: 0 8px;
    }
	.${config.className} ul.dropdown-menu {
		background: ${config.theme.bgSecondary};
	}
	
	.${config.className} .dropdown-item {
		color: ${config.theme.fontSecondary};
	}
    `;

	/*========================================*
	 *              Util Classes              *
	 *========================================*/
	const util = `
	.${config.className}-vh {
		height: calc(100vh - ${config.height}px);
	} 
	`;

	return `
    <style>
    ${titlebarStyles}
	${titleStyles}
    ${sectionStyles}
    ${iconStyles}
    ${sharedButtonStyles}
    ${buttonStyles}
    ${menuStyles}
    ${bootstrapOverride}
	${util}
    </style>`;
}
