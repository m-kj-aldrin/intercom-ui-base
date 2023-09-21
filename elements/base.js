import { dragZone, draggable } from "../interact/drag.js";

export class Base extends HTMLElement {
    constructor() {
        super();

        this.addEventListener("elements:context", (e) => {
            if (e.currentTarget == e.target) return;
            if (!this.parentElement) return;

            let name = "";

            if (this.constructor.name == "List") {
                name = `${this.parentElement.constructor.name}-${this.constructor.name}`;
            } else {
                name = this.constructor.name;
            }

            e.detail[name] = this;
        });

        this.attached = false;
    }

    get index() {
        const parent = this.parentElement;
        if (!parent) return -1;

        const children = parent.children;

        let i = 0;
        for (const child of children) {
            if (child == this) {
                return i;
            }
            i++;
        }
        return -1;
    }

    disconnectedCallback() {}

    connectedCallback() {
        if (!this.attached) {
            this.emitContext("connected");
            this.attached = true;
        }
    }

    /**@returns {this} */
    remove() {
        if (!this.parentElement) return this;
        this.emitContext("disconnected");
        return this.parentElement.removeChild(this);
    }

    /**@param {string} type */
    emitContext(type) {
        this.dispatchEvent(
            new CustomEvent("elements:context", {
                bubbles: true,
                detail: {
                    emitter: this,
                    type,
                },
            })
        );
    }
}

export class Network extends Base {
    constructor() {
        super();
    }
}

export class List extends Base {
    constructor() {
        super();
    }
}

export class Chain extends Base {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        dragZone(this);
    }
}

export class Module extends Base {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();

        draggable(this);
        this.innerHTML = `
    <span>PTH</span>
    `;
    }
}

customElements.define("x-base", Base);
customElements.define("x-network", Network);
customElements.define("x-list", List);
customElements.define("x-chain", Chain);
customElements.define("x-module", Module);
