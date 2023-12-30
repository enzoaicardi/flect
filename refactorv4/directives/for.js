/*
    Flect reconcile algorithm implementation based on signals
*/

import { reactive, signal } from "../reactivity/signal.js";
import { xcomment } from "../templates/html.js";
import { isXTemplate } from "../utils/tests.js";
import { Flect } from "../utils/types.js";

/** @returns {Comment} */
const createMarker = () => xcomment.cloneNode();

export function forDirective(context, element, expression) {
    if (isXTemplate(element)) {
        /** @type {[any]} */
        let prevList = [];

        /** @type {[Flect.Signal]} */
        let signals = [];

        // we create the first marker used to prepend elements
        /** @type {[Comment]} */
        const markers = [createMarker()];

        /** @type {String} */
        const key = element.getAttribute("key") || "item";

        // replace the current element by the main marker
        element.replaceWith(markers[0]);

        return reactive(() => {
            /** @type {Array} */
            const nextList = expression(context);

            // apply reconcile algorithm
            reconcile(
                context,
                element,
                prevList,
                nextList,
                signals,
                markers,
                key
            );

            // update prevList value to nextList
            prevList = nextList;
        });
    }
}

/**
 *
 * @param {Flect.Element.Datas} context
 * @param {HTMLTemplateElement} element
 * @param {[any]} prevList
 * @param {[any]} nextList
 * @param {[Flect.Signal]} signals
 * @param {[Comment]} markers
 * @param {String} key
 */
function reconcile(
    context,
    element,
    prevList,
    nextList,
    signals,
    markers,
    key
) {
    /** @type {Flect.Definition} */
    const definition = element.cacheDefinition;
    /** @type {Flect.Template} */
    const fragment = definition.template;

    /** @type {Number} */
    let index = 0;
    /** @type {Number} */
    let gap = nextList.length - prevList.length;

    for (; index < prevList.length && index < nextList.length; index++) {
        // if the two values are different
        if (prevList[index] !== nextList[index]) {
            // we update the signal value with the nextList value
            signals[index](nextList[index]);
        }
    }

    /** @type {Flect.Element} */
    const component = context.component;

    /** @type {[Element]} */
    const newElements = [];

    /** @type {Comment} */
    const currentMarker = markers[index];

    // CREATE
    while (gap > 0) {
        /** @type {DocumentFragment} */
        const part = fragment.cloneNode(true);
        /** @type {Comment} */
        const partMarker = (markers[index + 1] = createMarker());
        /** @type {Flect.Signal} */
        const partSignal = (signals[index] = signal(nextList[index]));

        // push the part and the marker into newElements array
        newElements.push(part, partMarker);

        // hydrate the fragment with custom context
        component.hydrate(part.children, definition.schema, {
            ...context,
            [key]: partSignal,
        });

        // update indexes
        gap--;
        index++;
    }

    // TODO -> test si plus rapide de replace un seul tableau ou replace au fur et a mesure dans while
    if (newElements.length) {
        currentMarker.replaceWith(currentMarker, ...newElements);
    }

    // REMOVE
    while (gap < 0) {
        // unbind using signal dependencies directly
        // remove + unbind + append at the end
        gap++;
    }
}

/*
 On a une liste de valeurs
    - on stocke la liste
    - on créer une liste de signaux correspondants

    On change la liste
    pour chaque element:
    - si element identique = on fait rien
    - sinon = on met a jour la valeur du signal

    - hydrate(nodeList, schema, {...datas, [key]: arrayItem})

    si la liste est plus grande, on créer les elements correspondants
    si la liste est plus petite, on supprime les elements coorepondants
*/
