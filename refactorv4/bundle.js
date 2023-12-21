/*
    export Flect ->
        .define -> definir un nouvel element
        .observe -> definir une action lors de la détection d'un element
*/

import { define } from "./define.js";
import { Flect as FlectTypes } from "./utils/types.js";

/**
 * @type {{define: FlectTypes.Method.Define, observe: FlectTypes.Method.Observe}}
 */
const Flect = {
    define: define,
};

export default Flect;
