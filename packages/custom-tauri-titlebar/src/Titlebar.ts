import { InnerData, Position, TitleBarOptions, TitleBarOptionsDefault } from "./types/titlebar";
import { lighten } from "./lib/color";

export default class Titlebar {
    private options: TitleBarOptions;
    private start: Element;
    private middle: Element;
    private end: Element;
    private slots: {[key in Position]: Element};

    constructor(_options: Partial<TitleBarOptions>) {
        this.options = {...TitleBarOptionsDefault, ..._options}

        document.head.insertAdjacentHTML('beforeend', 
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
</style>`)

        const titlebar = document.createElement('div');
        titlebar.className = this.options.className
        document.body.insertAdjacentElement('afterbegin', titlebar)

        this.start = document.createElement('div');
        this.start.className = this.subclass('section')
        this.middle = document.createElement('div');
        this.middle.className = this.subclass('section')
        this.end = document.createElement('div');
        this.end.className = this.subclass('section')
        this.slots = {
            start: this.start,
            middle: this.middle,
            end: this.end
        }
        titlebar.insertAdjacentElement('afterbegin', this.end)
        titlebar.insertAdjacentElement('afterbegin', this.middle)
        titlebar.insertAdjacentElement('afterbegin', this.start)
    }

    private subclass(name: string) {
        return `${this.options.className}-${name}`;
    }

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
            div.insertAdjacentElement('afterbegin', inner.data)
        }

        this.slots[position].insertAdjacentElement('beforeend', div);
    }

    addTitle(text: string, position: Position = 'middle') {
        const div = document.createElement('div');
        div.className = this.subclass('title');
        div.textContent = text;
        this.slots[position].insertAdjacentElement('beforeend', div)
    }

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
            button.insertAdjacentElement('afterbegin', inner.data)
        }
        this.slots[position].insertAdjacentElement('beforeend', button);
    }
}