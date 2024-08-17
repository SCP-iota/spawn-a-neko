(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SpawnANeko = {}));
})(this, (function (exports) { 'use strict';

    // oneko.js: https://github.com/adryd325/oneko.js
    function oneko() {
        const isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
        if (isReducedMotion)
            return;
        const nekoEl = document.createElement("div");
        let nekoPosX = 32;
        let nekoPosY = 32;
        let mousePosX = 0;
        let mousePosY = 0;
        let frameCount = 0;
        let idleTime = 0;
        let idleAnimation = null;
        let idleAnimationFrame = 0;
        const nekoSpeed = 10;
        const spriteSets = {
            idle: [[-3, -3]],
            alert: [[-7, -3]],
            scratchSelf: [
                [-5, 0],
                [-6, 0],
                [-7, 0],
            ],
            scratchWallN: [
                [0, 0],
                [0, -1],
            ],
            scratchWallS: [
                [-7, -1],
                [-6, -2],
            ],
            scratchWallE: [
                [-2, -2],
                [-2, -3],
            ],
            scratchWallW: [
                [-4, 0],
                [-4, -1],
            ],
            tired: [[-3, -2]],
            sleeping: [
                [-2, 0],
                [-2, -1],
            ],
            N: [
                [-1, -2],
                [-1, -3],
            ],
            NE: [
                [0, -2],
                [0, -3],
            ],
            E: [
                [-3, 0],
                [-3, -1],
            ],
            SE: [
                [-5, -1],
                [-5, -2],
            ],
            S: [
                [-6, -3],
                [-7, -2],
            ],
            SW: [
                [-5, -3],
                [-6, -1],
            ],
            W: [
                [-4, -2],
                [-4, -3],
            ],
            NW: [
                [-1, 0],
                [-1, -1],
            ],
        };
        function init() {
            nekoEl.id = "oneko";
            nekoEl.ariaHidden = "true";
            nekoEl.style.width = "32px";
            nekoEl.style.height = "32px";
            nekoEl.style.position = "fixed";
            nekoEl.style.pointerEvents = "none";
            nekoEl.style.imageRendering = "pixelated";
            nekoEl.style.left = `${nekoPosX - 16}px`;
            nekoEl.style.top = `${nekoPosY - 16}px`;
            nekoEl.style.zIndex = "2147483647";
            let nekoFile = "https://cdn.jsdelivr.net/gh/adryd325/oneko.js@master/oneko.gif";
            const curScript = document.currentScript;
            if (curScript && curScript.dataset.cat) {
                nekoFile = curScript.dataset.cat;
            }
            nekoEl.style.backgroundImage = `url(${nekoFile})`;
            document.body.appendChild(nekoEl);
            document.addEventListener("mousemove", function (event) {
                mousePosX = event.clientX;
                mousePosY = event.clientY;
            });
            window.requestAnimationFrame(onAnimationFrame);
        }
        let lastFrameTimestamp;
        function onAnimationFrame(timestamp) {
            // Stops execution if the neko element is removed from DOM
            if (!nekoEl.isConnected) {
                return;
            }
            if (!lastFrameTimestamp) {
                lastFrameTimestamp = timestamp;
            }
            if (timestamp - lastFrameTimestamp > 100) {
                lastFrameTimestamp = timestamp;
                frame();
            }
            window.requestAnimationFrame(onAnimationFrame);
        }
        function setSprite(name, frame) {
            const sprite = spriteSets[name][frame % spriteSets[name].length];
            nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
        }
        function resetIdleAnimation() {
            idleAnimation = null;
            idleAnimationFrame = 0;
        }
        function idle() {
            idleTime += 1;
            // every ~ 20 seconds
            if (idleTime > 10 &&
                Math.floor(Math.random() * 200) == 0 &&
                idleAnimation == null) {
                let avalibleIdleAnimations = ["sleeping", "scratchSelf"];
                if (nekoPosX < 32) {
                    avalibleIdleAnimations.push("scratchWallW");
                }
                if (nekoPosY < 32) {
                    avalibleIdleAnimations.push("scratchWallN");
                }
                if (nekoPosX > window.innerWidth - 32) {
                    avalibleIdleAnimations.push("scratchWallE");
                }
                if (nekoPosY > window.innerHeight - 32) {
                    avalibleIdleAnimations.push("scratchWallS");
                }
                idleAnimation =
                    avalibleIdleAnimations[Math.floor(Math.random() * avalibleIdleAnimations.length)];
            }
            switch (idleAnimation) {
                case "sleeping":
                    if (idleAnimationFrame < 8) {
                        setSprite("tired", 0);
                        break;
                    }
                    setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
                    if (idleAnimationFrame > 192) {
                        resetIdleAnimation();
                    }
                    break;
                case "scratchWallN":
                case "scratchWallS":
                case "scratchWallE":
                case "scratchWallW":
                case "scratchSelf":
                    setSprite(idleAnimation, idleAnimationFrame);
                    if (idleAnimationFrame > 9) {
                        resetIdleAnimation();
                    }
                    break;
                default:
                    setSprite("idle", 0);
                    return;
            }
            idleAnimationFrame += 1;
        }
        function frame() {
            frameCount += 1;
            const diffX = nekoPosX - mousePosX;
            const diffY = nekoPosY - mousePosY;
            const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
            if (distance < nekoSpeed || distance < 48) {
                idle();
                return;
            }
            idleAnimation = null;
            idleAnimationFrame = 0;
            if (idleTime > 1) {
                setSprite("alert", 0);
                // count down after being alerted before moving
                idleTime = Math.min(idleTime, 7);
                idleTime -= 1;
                return;
            }
            let direction;
            direction = diffY / distance > 0.5 ? "N" : "";
            direction += diffY / distance < -0.5 ? "S" : "";
            direction += diffX / distance > 0.5 ? "W" : "";
            direction += diffX / distance < -0.5 ? "E" : "";
            setSprite(direction, frameCount);
            nekoPosX -= (diffX / distance) * nekoSpeed;
            nekoPosY -= (diffY / distance) * nekoSpeed;
            nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
            nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
            nekoEl.style.left = `${nekoPosX - 16}px`;
            nekoEl.style.top = `${nekoPosY - 16}px`;
        }
        init();
    }

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
    class Panel {
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
    function start() {
        const button = createButton();
        new Button(button);
        document.body.appendChild(button);
    }

    exports.Button = Button;
    exports.Panel = Panel;
    exports.start = start;

}));
