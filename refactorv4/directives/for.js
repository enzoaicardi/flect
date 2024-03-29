/*
    Flect reconcile algorithm implementation based on signals
*/

import { reactive } from "../reactivity/signal.js";
import { FLECT } from "../utils/types.js";
import {
    addPart,
    removePart,
    setupTemplateDirective,
    updatePart,
} from "./template.js";

/**
 * reconcile algorithm implementation
 * @param {FLECT.Element.Datas} context
 * @param {HTMLTemplateElement} element
 * @param {[any]} prevList
 * @param {[any]} nextList
 * @param {string} key
 */
const reconcile = (context, element, prevList, nextList, key) => {
    /** @type {number} */
    let index = 0;
    const prevLength = prevList.length;
    const nextLength = nextList.length;

    /** @type {number} */
    let gap = nextLength - prevLength;

    // UPDATE ELEMENTS
    while (index < prevLength && index < nextLength) {
        // if the two values are different
        if (prevList[index] !== nextList[index]) {
            // we update the signal value with the nextList value
            updatePart(element, index, nextList[index]);
        }
        index++;
    }

    // ADD ELEMENTS
    while (gap > 0) {
        addPart(element, context, index, key, nextList[index]);
        gap--;
        index++;
    }

    // REMOVE ELEMENTS
    while (gap < 0) {
        removePart(element, index);
        gap++;
        index++;
    }
};

/*
    TODO -> explain
*/
export const forDirective = (context, element, expression) => {
    setupTemplateDirective(element);

    /** @type {[any]} */
    let prevList = [];

    /** @type {string} */
    const keyName = "item";
    const key = element.getAttribute(keyName) || keyName;

    return reactive(() => {
        /** @type {Array} */
        const nextList = expression(context);

        // apply reconcile algorithm
        reconcile(context, element, prevList, nextList, key);

        // update prevList value to nextList
        prevList = nextList;
    });
};
