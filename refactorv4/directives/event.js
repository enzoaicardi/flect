import { Flect } from "../utils/types.js";

/**
 * Set HTMLElement eventListener from the expression result
 * @type {Flect.Directive}
 */
export function eventDirective(context, element, expression, attributeName) {
    /**
     * create the event handler object
     * we store it on the element for memory reasons
     * because when the element is removed from the DOM
     * the handler is deleted by the garbage collector
     * @type {Flect.Handler}
     */
    const eventHandler = (element.handler = element.handler || new xHandler());

    // assign the event handler method
    eventHandler[attributeName] = expression(context);

    // add the correponding listener to element
    element.addEventListener(attributeName, eventHandler);
}

/** @type {Flect.Handler} */
export class xHandler {
    handleEvent(event) {
        this[event.type](event);
    }
}
