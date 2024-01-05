/*
    export Flect {
        define: define a new customElement
        signal: create a Flect signal
        observe: execute an action the first time we find the element in the DOM
        navigate: update the current route, history and url global signal
    }
*/

import { define } from "./define.js";
import { signal } from "./reactivity/signal.js";
import { FLECT } from "./utils/types.js";

/**
 * @type {{define: FLECT.Method.Define, signal: FLECT.Method.Signal, observe: FLECT.Method.Observe}}
 */
const Flect = {
    define: define,
    signal: signal,
};

export default Flect;
