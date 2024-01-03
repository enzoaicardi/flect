/*
    Flect reconcile algorithm implementation based on signals
*/

import { reactive } from "../reactivity/signal.js";
import { elementCloneNode } from "../utils/shortcuts.js";
import { FLECT } from "../utils/types.js";
import { createFlag, createPart } from "./template.js";

export const forDirective = (context, element, expression) => {
    // TODO -> setup the element datas for hydration

    /** @type {[any]} */
    let prevList = [];

    /** @type {[FLECT.Part]} */
    const parts = [{ flag: createFlag() }];

    /** @type {String} */
    const key = element.getAttribute("key") || "item";

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
 * @param {String} key
 */
function reconcile(context, element, prevList, nextList, parts, key) {
    /** @type {FLECT.Definition} */
    const definition = element.cacheDefinition;

    /** @type {Number} */
    let index = 0;
    /** @type {Number} */
    const prevLength = prevList.length;
    const nextLength = nextList.length;
    let gap = nextLength - prevLength;

    while (index < prevLength && index < nextLength) {
        // if the two values are different
        if (prevList[index] !== nextList[index]) {
            // we update the signal value with the nextList value
            parts[index].signal(nextList[index]);
        }
        index++;
    }

    // ADD ELEMENTS

    /** @type {[Element]} */
    const newElements = [];

    /** @type {Comment} */
    const currentFlag = parts[index].flag;

    while (gap > 0) {
        // clone the template fragment
        const fragment = elementCloneNode(definition.template, true);

        // we create the part corresponding to the fragment
        // the part will be stored into an array of parts
        // for each par we can retrieve the flag, the signal
        // for the current array item, and the component which
        // store the context and the hydration methods
        const part =
            parts[index + 1] ||
            (parts[index + 1] = createPart(context, key, nextList[index]));

        // push the template and the flag into newElements array
        newElements.push(fragment, part.flag);

        // is there is a cached schema, hydrate the fragment
        definition.schema &&
            part.component.hydrate(fragment.children, definition.schema);

        // TODO -> conversion de classes en prototypes + double héritage

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
    else if (gap < 0) {
        /**
         * get the head and tail flags
         * @type {Comment}
         */
        let head = flags[index];
        const tail = flags[index - gap];

        /**
         * Remove all the elements between head and tail
         * move head forward after every deletion and stop
         * when head and tail are equals
         */
        while (head !== tail) {
            const next = head;
            head = head.nextSibling;
            next.remove();
        }
    }
}
