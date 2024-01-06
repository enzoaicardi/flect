import Flect from "../../bundle.js";

import {
    LitElement,
    html,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js";

const prev = [...Array(4000)].map((_) => Math.ceil(Math.random() * 10));
const next = [...Array(20)].map((_) => Math.ceil(Math.random() * 1000));
const final = [...Array(2000)].map((_) => Math.ceil(Math.random() * 1000));

// let o = performance.now();

// function freeze() {
//     setTimeout(() => {
//         if (performance.now() - o > 30) {
//             console.log("freeze : " + (performance.now() - o));
//         }
//         o = performance.now();
//         freeze();
//     }, 1);
// }

// freeze();

setTimeout(() => {
    // console.log("lit");
    // class BasicElement extends LitElement {
    //     static properties = {
    //         array: {},
    //     };
    //     constructor() {
    //         super();
    //         this.array = prev;
    //         setTimeout(() => {
    //             this.array = next;
    //         }, 1000);
    //         setTimeout(() => {
    //             this.array = final;
    //         }, 2000);
    //     }
    //     render() {
    //         return html`
    //             <ul>
    //                 ${this.array.map(
    //                     (item) =>
    //                         html`<li>${item}</li>
    //                             <p class="fake-class and ${item}">a</p>
    //                             <p data-number="${item}">b</p>
    //                             <p>c</p>
    //                             <p>d</p> `
    //                 )}
    //             </ul>
    //         `;
    //     }
    // }
    // customElements.define("basic-element", BasicElement);
    // console.log("flect");
    // Flect.define("p", function (signal, html, css) {
    //     this.array = signal(prev);
    //     // this.array = signal([1, 2, 3, 4, 5]);
    //     setTimeout(() => {
    //         this.array(next);
    //         // this.array([6]);
    //     }, 1000);
    //     setTimeout(() => {
    //         this.array(final);
    //         // this.array([7, 8, 9, 10, 11, 12, 13, 14]);
    //     }, 2000);
    //     return html` <ul>
    //         <template x-for="array()">
    //             <li><x-d x-item="item()"></x-d></li>
    //         </template>
    //     </ul>`;
    // });
}, 1000);

Flect.define("e", function (signal, html) {
    this.text = signal("XE -> success");

    setTimeout(() => {
        this.text("XE -> success in update");
    }, 1500);

    return this.component.childNodes;
});

setTimeout(() => {
    Flect.define("d", function (signal, html) {
        return this.component.childNodes;
    });
}, 500);

setTimeout(() => {
    Flect.define("p", function (signal, html) {
        this.text = signal(">> XP success");

        setTimeout(() => {
            this.text(">> XP success in update");
        }, 1000);

        return this.component.childNodes;
    });
}, 1000);
