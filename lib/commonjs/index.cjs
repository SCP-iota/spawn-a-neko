"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Panel = exports.Button = void 0;
exports.start = start;
const oneko_1 = __importDefault(require("./oneko"));
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
class Button {
    constructor(button) {
        this.button = button;
        const panelEl = createPanel();
        document.body.appendChild(panelEl);
        this.panel = new Panel(panelEl);
        this.button.addEventListener('click', this.panel.toggle.bind(this.panel));
    }
}
exports.Button = Button;
class Panel {
    constructor(panel) {
        this.isOpen = false;
        this.panel = panel;
        this.spawnButton = panel.querySelector('.spawn-a-neko-spawn-button');
        this.spawnButton.addEventListener('click', oneko_1.default);
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
exports.Panel = Panel;
function start() {
    const button = createButton();
    new Button(button);
    document.body.appendChild(button);
}
