export declare class Button {
    button: HTMLButtonElement;
    panel: Panel;
    constructor(button: HTMLButtonElement);
}
export declare class Panel {
    panel: HTMLDivElement;
    spawnButton: HTMLButtonElement;
    isOpen: boolean;
    constructor(panel: HTMLDivElement);
    open(): void;
    close(): void;
    toggle(): void;
}
export declare function start(): void;
