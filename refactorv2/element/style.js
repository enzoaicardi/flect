import { STYLE_ATTRIBUTE } from "../utils/vars.js";

let styleRefIndex = 0;
let styleSheet = false;

export function createStylerules(render) {
    let selector = "x" + styleRefIndex++;

    if (!styleSheet) {
        styleSheet = document.createElement("style");
        document.head.appendChild(styleSheet);
    }

    styleSheet.textContent += render(`[${STYLE_ATTRIBUTE}="${selector}"]`);

    return selector;
}
