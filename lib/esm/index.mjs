import oneko from './oneko';
function createButton() {
    const button = document.createElement('button');
    button.className = 'spawn-a-neko-button';
    button.innerText = ':3';
    return button;
}
function createPanel() {
    const panel = document.createElement('div');
    panel.className = 'spawn-a-neko-panel spawn-a-neko-panel-closed';
    panel.innerHTML = `
Spawn a neko:
<button class="spawn-a-neko-spawn-button">🐈</button>
`;
    return panel;
}
export class Button {
    constructor(button) {
        this.button = button;
        const panelEl = createPanel();
        document.body.appendChild(panelEl);
        this.panel = new Panel(panelEl);
        this.button.addEventListener('click', this.panel.toggle.bind(this.panel));
    }
}
export class Panel {
    constructor(panel) {
        this.isOpen = false;
        this.panel = panel;
        this.spawnButton = panel.querySelector('.spawn-a-neko-spawn-button');
        this.spawnButton.addEventListener('click', oneko);
    }
    open() {
        this.panel.classList.remove('spawn-a-neko-panel-closed');
        this.panel.classList.add('spawn-a-neko-panel-open');
        this.isOpen = true;
    }
    close() {
        this.panel.classList.remove('spawn-a-neko-panel-open');
        this.panel.classList.add('spawn-a-neko-panel-closed');
        this.isOpen = false;
    }
    toggle() {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    }
}
export function start() {
    const button = createButton();
    new Button(button);
    document.body.appendChild(button);
}
