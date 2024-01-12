/*
    charge paresseusement un élement lorsque que ce dernier est détecté dans le DOM
    cela permet de mettre en place un routeur sans surcharge
    utile de faire via intersectionobserver ? aucune idée

    Ne le faire qu'une fois !

    Flect.lazy({
        elementName: ()=>import('the url of the element .define')
    })

    TODO cette implémentation est mauvaise, en terme de performance on doit laisser trainer
    un observeur de mutation, et d'un point de vue technique, il n'est meme pas capable de detecter
    les customelements avant leur bind. Trouver une autre solution détournée. passer par les schemas ?
*/

import { dom } from "../utils/shortcuts.js";
import { isXElement } from "../utils/tests.js";

/** @type {{elementTag: function}} */
let observerMemo = {};
let domObserver = null;

const domObserverCallback = (mutations) => {
    // check for each mutation
    for (const mutation of mutations) {
        // check only for childList mutations
        if (mutation.type === "childList") {
            // check added nodes
            for (const node of mutation.addedNodes) {
                let tag;
                // if node is an xElement and have an associated action
                if (
                    node.nodeType === 1 &&
                    isXElement(node) &&
                    observerMemo[(tag = node.tagName.toLowerCase())]
                ) {
                    // execute the associated action
                    // for example : () => import('component-url')
                    observerMemo[tag]();

                    // set the value as false to fire only once
                    observerMemo[tag] = false;

                    // TODO -> remove
                    console.log("registred element found in dom", tag);
                }
            }
        }
    }
};

const setupObserver = () => {
    if (!domObserver) {
        // create observer
        domObserver = new MutationObserver(domObserverCallback);

        // observe document
        domObserver.observe(dom, {
            childList: true,
            subtree: true,
        });
    }
};

/**
 * add
 * @param {{elementTag: function}} actions
 */
export const observe = (actions) => {
    // we need to invert params of Object.assign because
    // we don't want to erase properties of observerMemo
    observerMemo = Object.assign(actions, observerMemo);

    setupObserver();
};
