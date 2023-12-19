/**
 * Set HTMLElement eventListener from the expression result
 * @type {xDirective}
 */
export function eventDirective(context, element, expression, attributeName) {
    // create the event handler object
    const eventHandler = (expression.handler =
        expression.handler || new xHandler());

    // assign the event handler method
    eventHandler[attributeName] = expression(context);

    // add the correponding listener to element
    element.addEventListener(attributeName, eventHandler);
}

/** @type {xHandler} */
export class xHandler {
    handleEvent(event) {
        this[event.type](event);
    }
}
