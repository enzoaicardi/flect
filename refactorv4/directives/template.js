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
import { childrenOf, elementCloneNode } from "../utils/shortcuts.js";
import { FLECT } from "../utils/types.js";
import { forDirective } from "./for.js";
import { ifDirective } from "./if.js";
import { routeDirective } from "./route.js";

/** @returns {Comment} */
export const createFlag = () => elementCloneNode(xcomment);

/**
 * create an abstract DOM part to manipulate a fragment
 * @param {FLECT.Element.Datas} context
 * @param {number} index
 * @param {string} key
 * @param {any} value
 * @returns {FLECT.Part}
 */
export const createPart = (context, index, key, value) => {
    /**
     * create a flag to identify the head and tail of the fragment
     * @type {Comment}
     */
    const flag = createFlag();

    /**
     * create a signal for the current array value
     * @type {FLECT.Signal}
     */
    const property = key && signal(value);

    // add index to property
    if (property) {
        property.index = index;
    }

    // create a manager to manage the fragment state and setup its context
    // 1 - clone the current context
    // 2 - add a new [key] or "item" property corresponding
    //     to signal of current array value
    const manager = new xManager(
        !key ? context : { ...context, [key]: property }
    );

    // return the part
    return { flag, manager, property };
};

export const addPart = (element, context, index, key, value) => {
    /** @type {[FLECT.Part]} */
    const parts = element.templateParts;

    /** @type {FLECT.Part} */
    let part = parts[index + 1];

    /** @type {DocumentFragment} */
    const fragment = elementCloneNode(element.content, true);

    // we create the part corresponding to the fragment
    // the part will be stored into an array of parts
    // for each part we can retrieve the flag, the signal
    // for the current array item, and the manager which
    // store the context and the hydration methods
    // if the part already exist, update the property value
    if (part) {
        part.property && part.property(value);
    } else {
        part = parts[index + 1] = createPart(context, index, key, value);
    }

    // if there is a cached schema, hydrate the fragment
    element.immutableSchema &&
        part.manager.hydrate(childrenOf(fragment), element.immutableSchema);

    // replace the current flag by himself plus fragment
    parts[index].flag.replaceWith(parts[index].flag, fragment, part.flag);
};

export const updatePart = (element, index, value) => {
    // find the part matching to the index and update the signal value
    element.templateParts[index + 1].property(value);
};

/**
 * remove a DOM part from the DOM and disconnect it
 * @param {[FLECT.Part]} parts
 * @param {number} index
 */
export const removePart = (element, index) => {
    /** @type {[FLECT.Part]} */
    const parts = element.templateParts;

    /**
     * get the head and tail flags
     * @type {Comment}
     */
    let head = parts[index].flag.nextSibling;
    const tail = parts[index + 1].flag;

    /**
     * disconnect the manager
     * @type {FLECT.Part}
     */
    parts[index + 1].manager.disconnectCallback();

    /**
     * Remove all the elements between head and tail
     * move head forward after every deletion and stop
     * when head and tail are equals
     */
    while (head !== tail) {
        const prev = head;
        head = head.nextSibling;
        prev.remove();
    }
};

// setup template directives basics as element properties
export const setupTemplateDirective = (element) => {
    /** @type {[FLECT.Part]} */
    element.templateParts = [{ flag: createFlag() }];

    /** @type {FLECT.Element.DisconnectCallback} */
    element.disconnectCallback = () => {
        for (let x = 1; x < element.templateParts.length; x++) {
            element.templateParts[x].manager.disconnectCallback();
        }
    };

    // replace the current element by the main flag
    element.replaceWith(element.templateParts[0].flag);
};

/**
 * Retrieve the corresponding directive from the attribute name
 * @param {string} attributeName
 */
export const templateDirective = (attributeName) => {
    if (attributeName === "x-for") {
        return forDirective;
    } else if (attributeName === "x-if") {
        return ifDirective;
    } else if (attributeName === "x-route") {
        return routeDirective;
    }
};
