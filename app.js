import "./elements/base.js";

document.body.addEventListener("elements:context", (e) => {
  console.log(e.detail.type);
  console.log(e.detail.emitter.index);
});

const network = document.createElement("x-network");
const networkList = document.createElement("x-list");

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

document.body.appendChild(network);
network.appendChild(networkList);

networkList.append(c0, c1);
