/*
    export Flect {
        define: define a new customElement
        signal: create a Flect signal
        observe: execute an action the first time we find the element in the DOM
    }
*/

import { define } from "./define.js";
import { signal } from "./reactivity/signal.js";
import { Flect as Types } from "./utils/types.js";

/**
 * @type {{define: Types.Method.Define, signal: Types.Method.Define.Render.Signal, observe: Types.Method.Observe}}
 */
const Flect = {
    define: define,
    signal: signal,
};

export default Flect;
