/*
    Flect reconcile algorithm implementation based on Lit.js
    https://github.com/lit/lit/blob/main/packages/lit-html/src/directives/repeat.ts
*/

import { reactive, signal } from "../reactivity/signal.js";
import { xcomment } from "../templates/html.js";
import { Flect } from "../utils/types.js";

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

/** @returns {Comment} */
const createMarker = () => xcomment.cloneNode();

export function forDirective(context, element, expression) {
    /** @type {DocumentFragment} */
    const fragment = element.content;

    // if the fragment has no childNodes we don't need to create markers and reactivity
    if (fragment && fragment.childNodes.length) {
        /** @type {[any]} */
        let prevList = [];

        /** @type {[Flect.Signal]} */
        let signals = [];

        // we create the first marker used to prepend elements
        /** @type {[Comment]} */
        const markers = [createMarker()];

        /** @type {String} */
        const key = element.getAttribute("key");

        // replace the current element by the main marker
        fragment.replaceWith(markers[0]);

        return reactive(() => {
            /** @type {Array} */
            const nextList = expression(context);

            // apply reconcile algorithm
            reconcile(prevList, nextList, signals, markers, fragment, key);

            // update prevList value to nextList
            prevList = nextList;
        });
    }
}

/**
 *
 * @param {[any]} prevList
 * @param {[any]} nextList
 * @param {[Flect.Signal]} signals
 * @param {[Comment]} markers
 * @param {DocumentFragment} fragment
 * @param {String} key
 */
function reconcile(prevList, nextList, signals, markers, fragment, key) {
    let index = 0;
    let gap = nextList.length - prevList.length;

    for (; index < prevList.length && index < nextList.length; index++) {
        // if the two values are different
        if (prevList[index] !== nextList[index]) {
            // we update the signal value with the nextList value
            signals[index](nextList[index]);
        }
    }

    /** @type {[Element]} */
    const newElements = [];

    /** @type {Comment} */
    const currentMarker = markers[index];

    while (gap > 0) {
        // clone the fragment and corresponding marker and signal
        const part = fragment.cloneNode(true);
        const partMarker = (markers[index + 1] = createMarker());
        const partSignal = (signals[index + 1] = signal(nextList[index]));

        // push the part and the marker into newElements array
        newElements.push(part, partMarker);

        // hydrate the fragment with custom context
        this.hydrate(part.children, schema, {
            ...context,
            [key || "item"]: partSignal,
        });

        // update indexes
        gap--;
        index++;
    }

    // TODO -> test si plus rapide de replace un seul tableau ou replace au fur et a mesure dans while
    if (newElements.length) {
        currentMarker.replaceWith(currentMarker, ...newElements);
    }

    while (gap < 0) {
        // unbind using signal dependencies directly
        // remove + unbind + append at the end
        gap--;
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

// -------------

export function Lit(previousList, nextList, markers, fragment) {
    // Head and tail pointers
    let oldHead = 0;
    let oldTail = previousList.length - 1;
    let newHead = 0;
    let newTail = nextList.length - 1;

    /**
     * Comment is a marker
     * DocumentFragment is a clone of fragment
     * @type {[Comment, DocumentFragment]}
     */
    const newParts = [];

    while (oldHead <= oldTail && newHead <= newTail) {
        if (previousList[oldHead] === null) {
            // `null` means old part at head has already been used below
            oldHead++;
        } else if (previousList[oldTail] === null) {
            // `null` means old part at tail has already been used below
            oldTail--;
        } else if (previousList[oldHead] === nextList[newHead]) {
            // old head matches new head
            oldHead++;
            newHead++;
        } else if (previousList[oldTail] === nextList[newTail]) {
            // old tail matches new tail
            oldTail++;
            newTail++;
        } else if (previousList[oldHead] === nextList[newTail]) {
            // old head matches new tail, move to new tail
            oldHead++;
            newTail--;
        } else if (previousList[oldTail] === nextList[newHead]) {
            // old tail matches new head, move to new head
            oldTail--;
            newHead++;
        } else {
            if (!nextList.includes(previousList[oldHead])) {
                // old head is no longer in new list
                oldHead++;
            } else if (!nextList.includes(previousList[oldTail])) {
                // old tail is no longer in new list
                oldTail--;
            } else {
                const index = previousList.indexOf(nextList[newHead]);
                const part = index + 1 ? previousList[index] : null;

                if (part === null) {
                    nextList[newHead] = "JUST CREATED";
                } else {
                    previousList[index] = null;
                }
                newHead++;
            }
        }
    }

    while (newHead <= newTail) {
        // end additions
    }

    while (oldHead <= oldTail) {
        // end removes
    }
}
/*
    comment placer G123 avant E123 de manière efficace ?
    option 1 insertbefore -> a effectuer sur tout les elements
    option 2 replaceWith -> a effectuer sur un commentaire

    E1, E2, E1 / F1, F2, F3 / G1, G2, G3


    EC1 E1, E2, E1 / EF1 F1, F2, F3 / EG1 G1, G2, G3

    EC1.replaceWith(EG1, G1, G2, G3, EC1)
    sans passer par une boucle on a un déplacement instantané de tout nos elements, mais combien de reflow

    pour la création -> clone fragment + hydrate + append
    pour la suppression -> prend tableau + unhydrate + .remove


*/

/*
    const diff = length - length

    [1,2,3] -> 1->el / 2->el / 3->el
    [8,3,4,5,1]

    -> indexOf 2 in old

    si prev ==== unde => rien
    si prev ==== next => rien
    si prev dans next => on bouge prev a la position de next
    si next           => on change le bind de prev
    sinon             => on remove

    while diff > 0 -> REMOVE
    while diff < 0 -> ADDITION
*/

function customReconcile(prevList, nextList, markers, fragment) {
    for (let index = 0; index < nextList.length; index++) {
        const prev = prevList[index];
        const next = nextList[index];

        if (prev !== next && prev !== null) {
            const nextInPrev = prev.indexOf(next);
            if (nextInPrev + 1) {
                // move
            } else if (next !== undefined) {
                // change bind
            } else {
                // unbind + remove
            }
        }
    }

    const gap = nextList.length - prevList.length;

    while (gap > 0) {
        // create + bind + append at the end
        gap--;
    }
}
