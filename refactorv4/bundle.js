/*
    export Flect {
        define: define a new customElement
        signal: create a Flect signal
        observe: execute an action the first time we find the element in the DOM
    }
*/

import { define } from "./define.js";
import { signal } from "./reactivity/signal.js";
import { FLECT } from "./utils/types.js";

/**
 * @type {{define: FLECT.Method.Define, signal: FLECT.Method.Define.Render.Signal, observe: FLECT.Method.Observe}}
 */
const Flect = {
    x: "x",
    define: define,
    signal: signal,
};

export default Flect;
