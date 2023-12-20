/**
 * Set HTMLElement eventListener from the expression result
 * @type {xDirective}
 */
export function eventDirective(context, element, expression, attributeName) {
    /**
     * create the event handler object
     * we store it on the element for memory reasons
     * because when the element is removed from the DOM
     * the handler is deleted by the garbage collector
     * @type {xHandler}
     */
    const eventHandler = (element.handler =
        element.handler || new xHandler(context));

    // assign the event handler method
    eventHandler[attributeName] = expression(context);

    // add the correponding listener to element
    element.addEventListener(attributeName, eventHandler);
}

/** @type {xHandler} */
export class xHandler {
    constructor(context) {
        /** @type {xDatas} */
        this.context = context;
    }
    handleEvent(event) {
        this[event.type].call(context, event);
    }
}
