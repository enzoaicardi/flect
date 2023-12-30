import Flect from "../../bundle.js";

let context = Flect.signal("no name...");

Flect.define("p", function (signal, html, css) {
    this.array = signal([1, 2, 3]);
    this.style = "haha";

    setTimeout(() => {
        this.array([2, 3, 4]);
    }, 1000);

    return html`<template x-for="array()" key="num"
        ><p x-style="num()">Item in array <span x-text="num()"></span></p
    ></template>`;
});
