import { html } from "./templates/html.js";

function render() {
    return html` <div>${text} + ${a}</div> `;
}

/**
 * @param {Template} template
 * @param {Template} updated
 * @returns {Update}
 */
function compare(template, updated) {
    let updatedIndexes = [];
    let updatedValues = template.values.filter(
        (value, index) =>
            value !== updated.values[index] && updatedIndexes.push(index)
    );
    return (
        updatedIndexes.length && {
            indexes: updatedIndexes,
            values: updatedValues,
        }
    );
}

/**
 * @param {Template} template
 * @returns {[Action]}
 */
function virtualize(template) {
    return [];
}

function update() {}

let a = 90;
let text = "mytext";
let first = render();
text = "othertext";
let second = render();
console.log(compare(first, second));

this.effect(() => action, ["bgcolor", "title"]);

render(html`
    <div>
        <!-- if $product|isNotEmpty -->
        <p style="background-color: $bgcolor"></p>
        <!-- else if $product|isEmptyBut -->
        <p style="background-color: red"></p>
        <!-- else -->
        <p style="background-color: red"></p>
        <!-- endif -->
        <!-- for $product in $products|asArray -->
        <div text="$title"></div>
        <!-- endfor -->
    </div>
`);
