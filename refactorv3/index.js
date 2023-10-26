/*

*/

import { define } from "./core/define.js";
import { lazy } from "./core/lazy.js";
import { XElement } from "./element/element-class.js";
import { xForElement } from "./core/x-for.js";

// export XElement as Flect.x
export { XElement as x }

// export define as Flect.define
export { define }

// export lazy as Flect.lazy
export { lazy }

// define core elements
define('for', xForElement)
// define('if', xIfElement)
// define('router', xIfElement)