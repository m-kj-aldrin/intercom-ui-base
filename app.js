import "./elements/base.js";
import { Chain, List, Module, Network } from "./elements/base.js";
import "./interact/menu.js";

let dragCapture = false;
let start;
let end;

/**
 * @param {HTMLElementEventMap['elements:context']['detail']} context
 */
function extractContext(context) {
    let s = "";

    if (context.emitter instanceof Module) {
        let ra = context.type == "disconnected" ? "-r" : "-a";
        s = `c ${context.Chain?.index} m ${context.emitter.index} ${ra}`;
    }

    if (context.emitter instanceof Chain) {
        let ra = context.type == "disconnected" ? "-r" : "-a";
        s = `c ${context.emitter.index} ${ra}`;
    }

    return s;
}

document.body.addEventListener("elements:context", (e) => {
    const { emitter, type, Chain, Module } = e.detail;

    if (emitter instanceof List || emitter instanceof Network) {
        return;
    }

    // if (dragCapture) {
    //     if (!start) {
    //         start = emitter.index;
    //     } else {
    //         end = emitter.index;
    //     }
    // } else {
    //     const s = extractContext(e.detail);

    //     console.log(`⇢      ${s}`);
    // }

    const s = extractContext(e.detail);

    console.log(`⇢      ${s}`);
});

// document.addEventListener("dragstart", (e) => {
//     dragCapture = true;
// });

// document.addEventListener("dragend", (e) => {
//     console.log(start, end);
// });

const network = document.createElement("x-network");
const networkList = document.createElement("x-list");
network.appendChild(networkList);

const c0 = document.createElement("x-chain");
const c0_list = document.createElement("x-list");
c0.appendChild(c0_list);

const m0 = document.createElement("x-module");
const m1 = document.createElement("x-module");
const m2 = document.createElement("x-module");

c0_list.append(m0, m1, m2);

const c1 = document.createElement("x-chain");
const c1_list = document.createElement("x-list");
c1.appendChild(c1_list);

const m0_1 = document.createElement("x-module");
const m1_1 = document.createElement("x-module");
const m2_1 = document.createElement("x-module");

c1_list.append(m0_1, m1_1, m2_1);

networkList.append(c0, c1);
document.body.appendChild(network);
