import { Module } from "../elements/base.js";

/**
 * @typedef {Object} HTMLTarget
 * @property {HTMLElement} target
 * @property {HTMLElement} currentTarget
 */

/**
 * @template {DragEvent | InputEvent | MouseEvent} T
 * @typedef {T & HTMLTarget} HTMLEvent
 */

/**@param {HTMLEvent<DragEvent>} e */
function dragStart(e) {
    if (e.currentTarget != e.target) return;
    // e.currentTarget.classList.add("dragging");
    e.currentTarget.setAttribute("data-dragged", "true");
    document.documentElement.classList.add(e.currentTarget.tagName);
    document.documentElement.setAttribute("data-dragging", "true");
}

/**@param {HTMLEvent<DragEvent>} e */
function dragEnd(e) {
    // e.currentTarget.classList.remove("dragging");
    e.currentTarget.removeAttribute("data-dragged");
    document.documentElement.classList.remove(e.currentTarget.tagName);
    document.documentElement.removeAttribute("data-dragging");
}

/**
 * @template {HTMLElement} T
 * @param {T} target
 */
export function draggable(target) {
    target.draggable = true;

    target.addEventListener("dragstart", dragStart);
    target.addEventListener("dragend", dragEnd);

    return target;
}

/**
 * @param {NodeListOf<HTMLElement>} children
 * @param {number} y
 */
function getClosest(children, y) {
    let closestElement = null;
    let closestoffsetY = Number.NEGATIVE_INFINITY;

    for (const child of children) {
        const childBox = child.getBoundingClientRect();
        const offsetY = y - childBox.top - childBox.height / 2;

        if (offsetY < 0 && offsetY > closestoffsetY) {
            closestElement = child;
            closestoffsetY = offsetY;
        }
    }

    return closestElement;
}

/**
 * @param {string} selector
 * @param {HTMLEvent<DragEvent>} e
 */
function dragOver(selector, e) {
    e.preventDefault();

    /**@type {Module} */ // @ts-ignore
    const dragged = document.querySelector("[data-dragged='true']");

    /**@type {NodeListOf<HTMLElement>} */
    const children = e.currentTarget.querySelectorAll(
        `${selector}:not([data-dragged="true"])`
    );

    let closest = null;
    closest = getClosest(children, e.clientY);

    const fromList = dragged.parentElement;
    if (!fromList) return;
    const toList = e.currentTarget.querySelector("x-list");
    if (!toList) return;

    dragged.attached = false;

    if (closest == null) {
        if (dragged == toList.lastElementChild) return;
        const d = dragged.remove();
        toList.appendChild(d);
    } else if (closest.previousElementSibling != dragged) {
        const d = dragged.remove();
        toList.insertBefore(dragged, closest);
    }
}

/**
 * @template {HTMLElement} T
 * @param {T} target
 */
export function dragZone(target) {
    target.addEventListener("dragover", dragOver.bind({}, "x-module"));
    return target;
}
