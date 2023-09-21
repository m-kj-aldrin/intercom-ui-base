import { dragZone, draggable } from "../interact/drag.js";

export class Base extends HTMLElement {
  constructor() {
    super();

    this.index = -1;

    this.addEventListener("elements:context", (e) => {
      if (e.currentTarget == e.target) return;
      if (this.constructor.name == "List") {
        e.detail[
          `${this.parentElement.constructor.name}-${this.constructor.name}`
        ] = this;
        return;
      }
      e.detail[this.constructor.name] = this;
    });

    this.attached = false;
  }

  disconnectedCallback() {
    this.emitContext("disconnected");
  }

  connectedCallback() {
    this.emitContext("connected");
    console.log(this.parentElement);

    if (!this.attached) {
      this.attached = true;
    }
  }

  remove() {
    this.emitContext("disconnected");
    this.parentElement?.removeChild(this);
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

/**@type {MutationCallback} */
function listIndexer(mutations) {
  console.log(mutations);
  mutations.forEach((mutation) => {
    /**@type {List} */
    const target = mutation.target;

    /**
     * @template {Base} T
     * @type {HTMLCollectionOf<T>}
     */
    const children = target.children;

    let i = 0;
    for (const child of children) {
      child.index = i;
      i++;
    }
  });
}

export class List extends Base {
  constructor() {
    super();

    const observer = new MutationObserver(listIndexer);
    observer.observe(this, {
      childList: true,
    });
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
