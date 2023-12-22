/*
    export Flect {
        define: define a new customElement
        observe: execute an action the first time we find the element in the DOM
    }
*/

import { define } from "./define.js";
import { Flect as Types } from "./utils/types.js";

/**
 * @type {{define: Types.Method.Define, observe: Types.Method.Observe}}
 */
const Flect = {
    define: define,
};

export default Flect;
