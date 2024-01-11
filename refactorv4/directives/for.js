/*
    Flect reconcile algorithm implementation based on signals
*/

import { reactive } from "../reactivity/signal.js";
import { childrenOf, elementCloneNode } from "../utils/shortcuts.js";
import { FLECT } from "../utils/types.js";
import { createFlag, createPart } from "./template.js";

/*
    TODO -> explain
*/
export const forDirective = (context, element, expression) => {
    /** @type {[any]} */
    let prevList = [];

    /** @type {[FLECT.Part]} */
    const parts = [{ flag: createFlag() }];

    /** @type {string} */
    const key = element.getAttribute("key") || "item";

    /** @type {FLECT.Element.DisconnectCallback} */
    element.disconnectCallback = () => {
        for (let x = 1; x < parts.length; x++) {
            parts[x].manager.disconnectCallback();
        }
    };

    // replace the current element by the main flag
    element.replaceWith(parts[0].flag);

    return reactive(() => {
        /** @type {Array} */
        const nextList = expression(context);

        // apply reconcile algorithm
        reconcile(context, element, prevList, nextList, parts, key);

        // update prevList value to nextList
        prevList = nextList;
    });
};

/**
 * Implementation of reconcile algorithm
 * @param {FLECT.Element.Datas} context
 * @param {HTMLTemplateElement} element
 * @param {[any]} prevList
 * @param {[any]} nextList
 * @param {[FLECT.Part]} parts
 * @param {string} key
 */
function reconcile(context, element, prevList, nextList, parts, key) {
    /** @type {DocumentFragment} */
    const content = element.content;

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
            parts[index + 1].property(nextList[index]);
        }
        index++;
    }

    // ADD ELEMENTS
    /** @type {[Element]} */
    const newElements = [];

    /** @type {Comment} */
    const currentFlag = parts[index].flag;

    while (gap > 0) {
        let part;
        // clone the template fragment
        const fragment = elementCloneNode(content, true);

        // we create the part corresponding to the fragment
        // the part will be stored into an array of parts
        // for each part we can retrieve the flag, the signal
        // for the current array item, and the manager which
        // store the context and the hydration methods
        // if the part already exist, update the property value
        if ((part = parts[index + 1])) {
            part.property(nextList[index]);
        } else {
            part = parts[index + 1] = createPart(context, key, nextList[index]);
        }

        // push the template fragment and the flag into newElements array
        newElements.push(fragment, part.flag);

        // if there is a cached schema, hydrate the fragment
        element.immutableSchema &&
            part.manager.hydrate(childrenOf(fragment), element.immutableSchema);

        // update indexes
        gap--;
        index++;
    }

    // replace the current flag by the new elements
    // at the end of the list
    if (newElements.length) {
        currentFlag.replaceWith(currentFlag, ...newElements);
    }

    // REMOVE ELEMENTS
    while (gap < 0) {
        /**
         * get the head and tail flags
         * @type {Comment}
         */
        let head = parts[index].flag.nextSibling;
        const tail = parts[index + 1].flag;

        // unHydrate the element
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

        gap++;
        index++;
    }
}
