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
  e.currentTarget.classList.add("dragging");
  document.documentElement.classList.add(e.currentTarget.tagName);
  document.documentElement.setAttribute("data-dragging", "true");
}

/**@param {HTMLEvent<DragEvent>} e */
function dragEnd(e) {
  e.currentTarget.classList.remove("dragging");
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

  /**@type {HTMLElement} */
  const dragged = document.querySelector(".dragging");

  /**@type {NodeListOf<HTMLElement>} */
  const children = e.currentTarget.querySelectorAll(
    `${selector}:not(.dragging)`
  );

  let closest = null;
  closest = getClosest(children, e.clientY);

  const fromList = dragged.parentElement;
  const toList = e.currentTarget.querySelector("x-list");

  if (closest == null) {
    if (dragged == toList.lastElementChild) return;
    // toList.appendElement(dragged, false);
    toList?.appendChild(dragged);
  } else if (closest.previousElementSibling != dragged) {
    // toList.insertElement(dragged, closest, false);
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
