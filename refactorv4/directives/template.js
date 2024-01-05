/*
    What append in a directive function ?
    1 - the directive function is stored inside component's schema
    2 - during the hydration process the directive function run with the following parameters
    3 - the directive function includes a reactive function, once activated it rerun every
        time a containing signal change. On every run the reactive function will trigger the
        expression with the new context (contains all this... values)
    4 - the result of the expression based on the context is used to update the directive
*/

import { xManager } from "../classes/manager.js";
import { signal } from "../reactivity/signal.js";
import { xcomment } from "../templates/html.js";
import { elementCloneNode } from "../utils/shortcuts.js";
import { FLECT } from "../utils/types.js";
import { forDirective } from "./for.js";

/** @returns {Comment} */
export const createFlag = () => elementCloneNode(xcomment);

/**
 * create an abstract DOM part to manipulate a fragment
 * @param {FLECT.Element.Datas} context
 * @param {string} key
 * @param {any} value
 * @returns {FLECT.Part}
 */
export const createPart = (context, key, value) => {
    // create a flag to identify the head and tail of the fragment
    const flag = createFlag();
    // create a signal for the current array value
    const property = signal(value);
    // create a manager to manage the fragment state and setup its context
    // 1 - clone the current context
    // 2 - add a new [key] or "item" property corresponding
    //    to signal of current array value
    const manager = new xManager({ ...context, [key]: property });

    // return the part
    return { flag, property, manager };
};

/**
 * Retrieve the corresponding directive from the attribute name
 * @param {HTMLElement.attribute} attribute
 */
export const templateDirective = (attribute) => {
    switch (attribute.name) {
        case "x-for":
            return forDirective;
        case "x-if":
            return;
    }
};
