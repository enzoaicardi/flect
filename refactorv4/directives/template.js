import { signal } from "../reactivity/signal.js";
import { xcomment } from "../templates/html.js";
import { documentCreateElement, elementCloneNode } from "../utils/shortcuts.js";
import { FLECT } from "../utils/types.js";
import { forDirective } from "./for.js";

/** @returns {Comment} */
export const createFlag = () => elementCloneNode(xcomment);

/**
 * create an abstract DOM part to manipulate a fragment
 * @param {FLECT.Element.Datas} context
 * @param {String} key
 * @param {any} value
 * @returns {FLECT.Part}
 */
export const createPart = (context, key, value) => {
    const flag = createFlag();
    const property = signal(value);
    // TODO explain
    const manager = documentCreateElement("x-template");
    manager.datas = { ...context, [key]: property };

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
