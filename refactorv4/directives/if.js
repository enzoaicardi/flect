/*
    Directive executée depuis template x-if=""
    reprend le template.content et s'en sert pour faire du clonnage d'éléments
    Fait partie des attr directives
*/

import { reactive } from "../reactivity/signal.js";
import { createFlag } from "./template.js";

/*
    TODO -> explain
*/
export const ifDirective = (context, element, expression) => {
    // const flag = createFlag()

    return reactive(() => {
        const bool = !!expression(context);
    });
};
