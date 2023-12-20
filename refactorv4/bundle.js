/*
    export Flect ->
        .define -> definir un nouvel element
        .lazy -> definir une action lors de la détection d'un element
        .xElement -> classe parente des elements interactifs
*/

import { define } from "./define.js";

/**
 * @type {{define: Function, lazy: Function}}
 */
const Flect = {
    define: define,
};

export default Flect;
