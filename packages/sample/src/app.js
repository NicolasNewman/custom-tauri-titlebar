import Titlebar from 'custom-tauri-titlebar';

const tb = new Titlebar({});
tb.addTitle('My Application');
tb.addIcon({ type: 'src', data: 'https://api.iconify.design/ph:globe-hemisphere-west-bold.svg' });
tb.addMenu(
	{
		label: 'File',
		items: [
			{ type: 'item', label: 'Open' },
			{ type: 'item', label: 'Save' },
			{ type: 'divider' },
			{
				type: 'submenu',
				submenu: {
					label: 'Submenu',
					items: [
						{ type: 'item', label: 'Item A' },
						{ type: 'item', label: 'Item B' },
						{
							type: 'submenu',
							submenu: {
								label: 'Submenu 2',
								items: [
									{ type: 'item', label: 'Item C' },
									{ type: 'item', label: 'Item D' },
								],
							},
						},
					],
				},
			},
			{ type: 'item', label: 'Close' },
		],
	},
	'start',
);
// eslint-disable-next-line @typescript-eslint/no-empty-function
tb.addButton('close-button', { type: 'html', data: '<p>A</p>' }, () => console.log('close!'), 'start');
tb.addButton('close-button', { type: 'src', data: 'https://api.iconify.design/mdi:close.svg' }, () =>
	console.log('close!'),
);
tb.addButton('close-button', { type: 'html', data: '<p>A</p>' }, () => console.log('close!'));
