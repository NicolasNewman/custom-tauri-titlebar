import Titlebar from 'custom-tauri-titlebar';

const tb = new Titlebar({background: '#aaaaaa', color: '#ffffff'});
tb.addButton('close-button', {type: 'html', data: '<p>A</p>'}, () => console.log('close!'), 'start');
tb.addButton('close-button', {type: 'src', data: 'https://api.iconify.design/mdi:close.svg'}, () => console.log('close!'));
tb.addButton('close-button', {type: 'html', data: '<p>A</p>'}, () => console.log('close!'));
